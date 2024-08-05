import { useEffect, useState, useCallback, useRef } from 'react'
import { mapOrder } from '~/utils/sorts' // import dạng {} nếu không khai báo export default ...
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  // rectIntersection,
  getFirstCollision
  // closestCenter
} from '@dnd-kit/core'

// import { MouseSensor } from '~/customLibraries/dndKitSensors'
import {
  arrayMove
  // SortableContext,
  // sortableKeyboardCoordinates,
  // verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import ListColumns from './ListColumns/ListColumns'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  // Nhấn giữ 250ms và dung sai của cảm ứng 500px thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 200 } })

  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất
  // const websensors = useSensors(pointerSensor)
  const websensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])


  const [activeDragItemId, setactiveDragItemId] = useState(null)
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [originColumn, setOriginColumn] = useState(null)

  // Điểm va chạm cuối cùng trước đó (xử lý thuật toán phát hiện va chạm)
  const lastOverId = useRef(null)

  useEffect( () => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm một column theo cardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds
    //bởi ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới và cập nhật ngược lại State
    return orderedColumns.find(columns => columns?.cards?.map(card => card._id)?.includes(cardId) )
  }

  // Fuction chung xử lý việc cập nhật lại state trong trường hợp di chuyển Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      // Tìm vị trí (index) của overCard trong column đích (nơi activeCard sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // console.log ('overCardIndex: ', overCardIndex)

      // Đây là logic tính toán "cardIndex mới" ( trên hoặc dưới của overCard)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
              active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column?._id === activeColumn?._id)
      const nextOverColumn = nextColumns.find(column => column?._id === overColumn?._id)
      // Column cũ
      if (nextActiveColumn) {
        // Xóa card ở column active (có thể hiểu là column cũ, lúc kéo card ra khỏi nó để sang column khác)
        // Filter ở đây sẽ lấy toàn bộ card mà không phải card có id của cái đang active card và trả nó về mảng mới
        // Sau khi trả về mảng mới thì gán ngược lại vào ActiveColumn.cards
        nextActiveColumn.cards = nextActiveColumn?.cards?.filter(card => card?._id !== activeDraggingCardId)

        // Thêm Placeholder Card nếu Column rỗng: bị kéo hết Card đi, không còn cái nào nữa
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }


        // Cập nhật lại mảng cardOrrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn?.cards.map(card => card._id)
      }
      //Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
        nextOverColumn.cards = nextOverColumn?.cards?.filter(card => card?._id !== activeDraggingCardId)

        // Phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa hai column khác nhau

        // Tiếp theo là thêm card đang kéo vào overColumn theo vị trí index mới
        // ToSpliced sẽ trả về cho mình mảng mới và không đụng gì tới mảng cũ
        // truyền vào newCardIndex, 0 (vì không xóa phần tử nào mà chỉ thêm vào), dữ liệu của card mình muốn thêm vào (activeDraggingCarđata)
        nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(
          newCardIndex,
          0,
          {
            ...activeDraggingCardData,
            columnId: nextOverColumn?._id
          }
        )

        // Xóa placeholder Card nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn?.cards.map(card => card._id)

      }
      // Lý do bug là mỗi lần ta kéo là một lần set ngược cái State lại cho nguyên đám column của ta nên tạm thời ta phải return cái spread operator prevColumns
      return nextColumns
    })
  }

  // Trigger khi bắt đầu kéo một phần tử (drag)
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set origin column
    if (event?.active?.data?.current?.columnId) {
      setOriginColumn(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong quá trình kéo một phần tử
  const handleDragOver = (event) => {

    // Không làm gì thêm khi kéo column vì code kéo column đang oke
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các column
    // console.log('handleDragOver: ', event)
    const { active, over } = event
    // Kiểm tra nếu như không tồn tại active hoặc over thì không làm gì để tránh chết web
    if (!active || !over) return

    // activeDraggingCard là card được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là card đang tương tác trên hoặc dưới so với card được kéo ở trên
    const { id: overCardId, data: { current: overCardData } } = over

    // Tìm 2 columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // debug 2 biến trên
    // console.log('activeColumn: ', activeColumn)
    // console.log('overColumn: ', overColumn)

    // Tránh crash web
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của nó thì không làm gì
    // Vì đây đang là đoạn xử lý handleDragOver, còn xử lý lúc kéo xong thì nó là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      //
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }

  }
  // Trigger khi kết thúc hành động kéo một phần tử => thả (drop)
  const handleDragEnd = (event) => {

    const { active, over } = event
    // Kiểm tra nếu không tồn tại over ( kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return
    // console.log('handleDragEnd: ', event)

    // Xử lý kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard là card được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: là card đang tương tác trên hoặc dưới so với card được kéo ở trên
      const { id: overCardId = over, data: { current: overCardData } } = over

      // Tìm 2 columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      // debug 2 biến trên
      // console.log('activeColumn: ', activeColumn)
      // console.log('overColumn: ', overColumn)

      // Tránh crash web
      if (!activeColumn || !overColumn) return

      // Hành động kéo thả card giữa 2 column khác nhau
      // Phải dùng tới activeDragItemData?.columnId hoặc originColumn._id ( set vào state từ bước handleDragStart ) chứ
      // không phải activeData trong scope
      // handleDragEnd này vì sau khi đi qua onDragOver tới đây là state của card đã bị cập nhật một lần rồi
      // console.log('originColumn: ', originColumn)
      // console.log('overColumn: ', overColumn)


      // New update: Ở đây nên sử dụng originColumn chứ không nên dùng activeDragItemData vì sẽ gặp bug
      // if (activeDragItemData._id !== overColumn._id) {

      if (originColumn._id !== overColumn._id) {
        // console.log('activeDragItemData: ', activeDragItemData)
        // Hành động kéo thả card trong column khác nhau
        // Gặp bug là bởi vì columnId khi sử dụng activeDragItemData chưa được cập nhật và khi kéo từ column khác về thì columnId sẽ bị conflict
        // Nó sẽ bị rơi vào trường hợp kéo cùng 1 column vì columnId không được thay đổi và mất dữ liệu của column kéo về
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )

      } else {

        // Hành động kéo thả card trong cùng một cái column

        // Lấy vị trí cũ từ originColumn
        const oldCardIndex = originColumn?.cards?.findIndex(c => c?._id === activeDragItemId)
        // activeDragItemId là dữ liệu trong State lấy từ State cho chuẩn
        // Lấy vị trí mới từ over

        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        // vị trí mới sẽ là overCardId vì ở trên đã khai báo const { id: overCardId, data: { current: overCardData } } = over
        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu

        // Dùng arrayMove vì kéo card trong một column thì tương tự với logic kéo column trong một board content
        const dndOrderedCards = arrayMove(originColumn?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
        // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)
          // Tìm tới column chúng ta đang thả target column sẽ được tìm bởi thằng nextColumns trỏ đến _id giống với _id của overColumn (id của column mà phần tử được thả)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)

          // Cập nhật lại giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          // console.log('targetColumn: ', targetColumn)

          return nextColumns
        })

      }
    }

    // Xử lý kéo thả Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id ) {
      // Lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        // Lấy vị trí mới từ over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // 2 console.log dữ liệu này sau dùng để xử lý gọi API
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) // Để sau làm BE gọi API và cập nhật đúng dữ liệu dndOrderedColumnsIds này vào Database
        // console.log('dndOrderedColums: ', dndOrderedColumns)
        // console.log('dndOrderedColumsIds: ', dndOrderedColumnsIds)

        // Cập nhật lại state columns ban đầu sau khi đã kéo thả
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Những dữ liệu sau khi kéo thả này luôn phải đưa về giá trị null mặc định ban đầu
    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
    setOriginColumn(null)
  }

  // Animation khi thả (Drop) phần tử - Test bằng cách kéo xong thả trực tiếp và nhìn phần giữ chỗ Overlay
  const customdropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }


  // custom lại thuật toán phát hiện va chạm tối ưu cho việc kéo thả card giữa nhiều columns
  // useCallback sẽ nhận các tham số và đối số (arguments)
  const collisionDetectionStrategy = useCallback((args) => {
    // console.log('collisionDetectionStrategy: ', collisionDetectionStrategy)
    // Trường hợp kéo column thì dùng thuật toán closestCorners
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    // Tìm điểm giao nhau, va chạm, trả về một mảng các va chạm - intersection với con trỏ
    const pointerIntersections = pointerWithin(args)

    // Nếu pointerIntersections là mảng rỗng, return luôn không làm gì hết
    // Fix triệt để bug flickering của thư viện Dnd=kit trong trường hợp sau:
    // Kéo một card có image cover lớn và kéo lên phía trên cùng ra khỏi khu vực kéo thả
    if (!pointerIntersections?.length) return

    //Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây

    // const intersections = !!pointerIntersections?.lenghth ? pointerIntersections : rectIntersection(args)

    // Tìm overId đầu tiên trong đám intersections ở trên
    let overId = getFirstCollision(pointerIntersections, 'id')
    // console.log('overId: ', overId)
    if (overId) {
      // Nếu cái over nó là column thì sẽ tìm tới cái cardId gần nhất bên trong khu vực va chạm đó dựa vào thuật toán phát hiện va chạm closestCenter hoặc closestCorners đều được. Tuy nhiên ở đây dùng closestCenter mượt mà hơn

      const intersectColumn = orderedColumns.find(column => column?._id === overId)
      if (intersectColumn) {
        overId = closestCorners ({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (intersectColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    // Nếu overId là null thì trả về mảng rỗng - tránh chết web
    return lastOverId.current ? [{ id: lastOverId.current }] : []

  }, [activeDragItemType, orderedColumns])
  return (
    <DndContext
      sensors={websensors}
      // collisionDetection={closestCorners} Thuật toán phát hiện va chạm
      // (nếu không có nó thì card với cover lớn sẽ không kéo qua Column được vì lúc này nó đang bị conflict giữa card và column)
      // chúng ta sẽ dùng closestCorners thay vì closestCenter

      // Update: Nếu chỉ dùng closestCorners sẽ có bug flickering + sai dữ liệu khi di Media Card vào giữa 2 column
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} >
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#353b48' : '#ea8685'),
        overflowX: 'auto',
        overflowY: 'hidden',
        p: '10px 0' // Để thanh scroll ngang của website không bị nằm quá xa phần content
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={customdropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDragItemData} />)}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />)}

        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
