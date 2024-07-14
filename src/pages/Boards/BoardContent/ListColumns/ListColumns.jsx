import Column from './Column/Column'
import Button from '@mui/material/Button'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { Box } from '@mui/material'

function ListColumns({ columns }) {

  return (
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
  )
}

export default ListColumns
