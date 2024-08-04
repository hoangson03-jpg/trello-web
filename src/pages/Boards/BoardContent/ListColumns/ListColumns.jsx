import Column from './Column/Column'
import Button from '@mui/material/Button'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Box } from '@mui/material'
import { useState } from 'react'

function ListColumns({ columns }) {

  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = () => {
    if (!newColumnTitle) {
      // console.error('Please enter the column title!')
      return
    }

    // Gọi API ở đây

    // Đóng trạng thái thêm Column mới & Clear Input
    toggleOpenNewColumnForm()
    // Phải để giá trị là string rỗng còn nếu để null là sẽ bị lỗi vì value không được để null
    setNewColumnTitle('')
  }

  /**
   * SortableContext yêu cầu items là một mảng dạng ['id-1','ide-2'] chứ không phải [{id: 'id-1}, {id: 'id-2'}]
   * Nếu không đúng thì vẫn kéo thả được nhưng không có animation
   * https://github.com/clauderic/dnd-kit-isues/183#isuecomment-812569512
   */
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit', // Kế thừa background của thằng box cha
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track':{ m: 3 }
      }}>
        {columns?.map(column => <Column key={column._id} column={column} />)}


        {/* Box Add New Collumn */}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '8px',
            height: 'fit-content',
            bgcolor:'#ffffff3d'
          }}>
            <Button
              startIcon={<ControlPointIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1.5
              }}>
            Add New Column
            </Button>
          </Box>
          :
          <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '8px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter the column title..."
              type="text"
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle} // Cho giá trị bằng biến trong useState
              onChange={(e) => setNewColumnTitle(e.target.value)} // Bắt sự kiện onChange (event) trỏ đến setSearchValue giá trị của event được hướng đến
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset':{ borderColor: 'white' },
                  '&.Mui-focused fieldset':{ borderColor: 'white' }
                }
              }}
            />
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Button
                onClick={ addNewColumn }
                variant='contained' color='error' size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.6px solid',
                  borderColor: (theme) => theme.palette.info.main,
                  bgcolor: (theme) => theme.palette.mode === 'dark'? '#58B19F' : '#05c46b',
                  '&:hover': { bgcolor: (theme) => theme.palette.mode === 'dark'? '#58B19F' : '#05c46b' }
                }}>
                Add Column
              </Button>
              <CloseIcon sx={{
                color: 'white',
                fontSize: 'small',
                cursor: 'pointer',
                '&:hover': { color: (theme) => theme.palette.warning.dark }
              }}
              onClick = {() => toggleOpenNewColumnForm()}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns
