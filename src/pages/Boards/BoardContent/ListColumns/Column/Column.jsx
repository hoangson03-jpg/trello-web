import Button from '@mui/material/Button'
import { Menu, MenuItem } from '@mui/material'
import Divider from '@mui/material/Divider'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import { Opacity } from '@mui/icons-material'


function Column({ column, createNewCard }) {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column?._id,
    data: { ...column }
  })

  const dndKitColumnStyles = {
    // Nếu sử dụng CSS.Translate thì sẽ bị lỗi Stretch bị giãn hoặc co lại phần tử
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải luôn max 100% vì nếu không sẽ lỗi lúc kéo column ngăn qua một cái column dài thì phải kéo ở khu vực giữa rất khó chịu
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }
  const [anchorEl, setAnchorEl] = useState(null) // Ở đây có state là anchorElement và có trạng thái là open = cái boolean trong JS mặc định là null
  const open = Boolean(anchorEl) // Khi click vào thì nó sẽ bắt sự kiện onclick -> giá trị anchorE1 sẽ là true
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const orderedCards = column.cards

  //


  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = async () => {
    if (!newCardTitle) {
      // console.error('Please enter the Card title!')
      toast.error('Enter the Card Title please!', {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      })
      return
    }

    // Tạo dữ liệu card để gọi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    await createNewCard(newCardData)

    // Đóng trạng thái thêm Card mới & Clear Input
    toggleOpenNewCardForm()
    // Phải để giá trị là string rỗng còn nếu để null là sẽ bị lỗi vì value không được để null
    setNewCardTitle('')
  }

  return (
    <div ref={setNodeRef}
      style={dndKitColumnStyles}
      {...attributes}
    >
      {/* Box Column 1 */}
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#dfe6e9'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box Column Header */}
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant='h6' sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More options'>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown" // sửa lại id của basic button và basic menu
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><DeleteForeverIcon fontSize='small' /></ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Box List Card */}
        <ListCards cards={orderedCards} />

        {/* Box Column Footer */}
        <Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2
        }}>
          {!openNewCardForm
            ? <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            : <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <TextField
                label="Enter the card title..."
                type="text"
                size='small'
                variant='outlined'
                autoFocus
                data-no-dnd = "true"
                value={newCardTitle} // Cho giá trị bằng biến trong useState
                onChange={(e) => setNewCardTitle(e.target.value)} // Bắt sự kiện onChange (event) trỏ đến setSearchValue giá trị của event được hướng đến
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Button
                  onClick={ addNewCard }
                  variant='contained' color='error' size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.6px solid',
                    borderColor: (theme) => theme.palette.info.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#58B19F' : '#05c46b'),
                    '&:hover': { bgcolor: (theme) => theme.palette.mode === 'dark' ? '#58B19F' : '#05c46b' }
                  }}>
                Add</Button>
                <CloseIcon sx={{
                  color: (theme) => theme.palette.warning.dark,
                  fontSize: 'small',
                  cursor: 'pointer'
                }}
                onClick = {() => toggleOpenNewCardForm()}
                />
              </Box>
            </Box>
          }

        </Box>
      </Box>
    </div>
  )
}

export default Column
