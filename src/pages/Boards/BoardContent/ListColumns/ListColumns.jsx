import Column from './Column/Column'
import Button from '@mui/material/Button'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { Box } from '@mui/material'

function ListColumns({ columns }) {
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
        <Box sx={{
          minWidth: '200px',
          maxWidth: '200px',
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
      </Box>
    </SortableContext>
  )
}

export default ListColumns
