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
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupsIcon from '@mui/icons-material/Groups'
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment'
import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import { Add } from '@mui/icons-material'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null) // Ở đây có state là anchorElement và có trạng thái là open = cái boolean trong JS mặc định là null
  const open = Boolean(anchorEl) // Khi click vào thì nó sẽ bắt sự kiện onclick -> giá trị anchorE1 sẽ là true
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#353b48' : '#0984e3'),
      borderTop: '1px solid white',
      overflowX: 'auto',
      overflowY: 'hidden',
      p: '10px 0' // Để thanh scroll ngang của website không bị nằm quá xa phần content
    }}>

      <Box sx={{
        bgcolor: 'inherit', // Kế thừa background của thằng box cha
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track':{ m: 3 }
      }}>
        {/* Box Column 1 */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#dfe6e9'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box Column Header */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
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
              Column Title
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
          <Box sx={{
            p: '0 5px',
            m: '0 5px', // Trick lỏ để thanh scroll bar gần hơn với viền và card
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} -
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
            )`,
            /* width */
            '&::-webkit-scrollbar': {
              width: '7px',
              height: '7px'
            },
            /* Handle */
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#aaa69d',
              borderRadius: '10px'
            },
            /* Handle on hover */
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#84817a',
              borderRadius: '10px'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://cellphones.com.vn/sforum/wp-content/uploads/2022/11/pc-gaming-5-trieu.png"
                title="green iguana"
              />
              <CardContent sx={{
                p: 1.5 }}>
                <Typography>
            PC Gaming with high techology
                </Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupsIcon />}>100</Button>
                <Button size="small" startIcon={<CommentIcon />}>40</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>20</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Test
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Box Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>

        {/* Box Column 2 */}
        <Box sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2d3436' : '#dfe6e9'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}>
          {/* Box Column Header */}
          <Box sx={{
            height: COLUMN_HEADER_HEIGHT,
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
              Column Title
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
          <Box sx={{
            p: '0 5px',
            m: '0 5px', // Trick lỏ để thanh scroll bar gần hơn với viền và card
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} -
            ${COLUMN_HEADER_HEIGHT} -
            ${COLUMN_FOOTER_HEIGHT}
            )`,
            /* width */
            '&::-webkit-scrollbar': {
              width: '7px',
              height: '7px'
            },
            /* Handle */
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#aaa69d',
              borderRadius: '10px'
            },
            /* Handle on hover */
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#84817a',
              borderRadius: '10px'
            }
          }}>
            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://statics.cdn.200lab.io/2023/04/Python-la-gi.png"
                title="green iguana"
              />
              <CardContent sx={{
                p: 1.5 }}>
                <Typography>
            A.I and Data Structure
                </Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px'}}>
                <Button size="small" startIcon={<GroupsIcon />}>45</Button>
                <Button size="small" startIcon={<CommentIcon />}>23</Button>
                <Button size="small" startIcon={<AttachmentIcon />}>15</Button>
              </CardActions>
            </Card>

            <Card sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset' // De hien ra thanh scroll
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
              }}>
                <Typography>
            Other Languages
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Box Column Footer */}
          <Box sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent
