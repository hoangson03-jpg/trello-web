import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts' // import dạng {} nếu không khai báo export default ...
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import {
  arrayMove
  // SortableContext,
  // sortableKeyboardCoordinates,
  // verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'
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


  const [activeDragItemId, setactiveDragItemId] = useState([null])
  const [activeDragItemType, setactiveDragItemType] = useState([null])
  const [activeDragItemData, setactiveDragItemData] = useState([null])


  useEffect( () => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm một column theo cardId
  const findColumnByCardId = (cardId) => {
    // Đoạn này cần lưu ý, nên dùng c.cards thay vì c.cardOrderIds
    //bởi ở bước handleDragOver chúng ta sẽ làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới và cập nhật ngược lại State
    return orderedColumns.find(columns => columns?.cards?.map(card => card._id)?.includes(cardId) )
  }
  // Trigger khi bắt đầu kéo một phần tử (drag)
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)
  }

  // Trigger trong quá trình kéo một phần tử
  const handleDragOver = (event) => {

    // Không làm gì thêm khi kéo column vì code kéo column đang oke
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // Còn nếu kéo card thì xử lý thêm để có thể kéo card qua lại giữa các column
    console.log('handleDragOver: ', event)
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

          // Cập nhật lại mảng cardOrrderIds cho chuẩn dữ liệu
          nextActiveColumn.cardOrderIds = nextActiveColumn?.cards.map(card => card._id)
        }
        //Column mới
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn?.cards?.filter(card => card?._id !== activeDraggingCardId)

          // Tiếp theo là thêm card đang kéo vào overColumn theo vị trí index mới
          // ToSpliced sẽ trả về cho mình mảng mới và không đụng gì tới mảng cũ
          // truyền vào newCardIndex, 0 (vì không xóa phần tử nào mà chỉ thêm vào), dữ liệu của card mình muốn thêm vào (activeDraggingCarđata)
          nextOverColumn.cards = nextOverColumn?.cards?.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn?.cards.map(card => card._id)

        }
        // Lý do bug là mỗi lần ta kéo là một lần set ngược cái State lại cho nguyên đám column của ta nên tạm thời ta phải return cái spread operator prevColumns
        return nextColumns
      })
    }

  }
  // Trigger khi kết thúc hành động kéo một phần tử => thả (drop)
  const handleDragEnd = (event) => {

    // console.log('handleDragEnd: ', event)
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('Kéo thả card - tạm thời không làm gì hết')
      return
    }
    const { active, over } = event
    // Kiểm tra nếu không tồn tại over ( kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id ) {
      // Lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // Lấy vị trí mới từ over
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // 2 console.log dữ liệu này sau dùng để xử lý gọi API
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id) // Để sau làm BE gọi API và cập nhật đúng dữ liệu dndOrderedColumnsIds này vào Database
      // console.log('dndOrderedColums: ', dndOrderedColumns)
      // console.log('dndOrderedColumsIds: ', dndOrderedColumnsIds)

      // Cập nhật lại state columns ban đầu sau khi đã kéo thả
      setOrderedColumns(dndOrderedColumns)
    }
    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
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
  return (
    <DndContext
      sensors={websensors}
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
