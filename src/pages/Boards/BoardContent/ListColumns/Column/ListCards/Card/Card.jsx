import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupsIcon from '@mui/icons-material/Groups'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { mapOrder } from '~/utils/sorts'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card?._id,
    data: { ...card }
  })

  const dndKitCardStyles = {
    // Nếu sử dụng CSS.Translate thì sẽ bị lỗi Stretch bị giãn hoặc co lại phần tử
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #eb3b5a' : undefined
  }
  const ShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  return (
    <MuiCard
      ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
        opacity: card.FE_PlaceholderCard ? '0' : '1',
        minWidth: card.FE_PlaceholderCard ? '280px' : 'unset',
        pointerEvents: card.FE_PlaceholderCard ? 'none' : 'unset',
        position: card.FE_PlaceholderCard ? 'fixed' : 'unset'
      }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover}/> }
      <CardContent sx={{
        p: 1.5 }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {ShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length &&
        <Button size="small" startIcon={<GroupsIcon />}>{card?.memberIds.length}</Button>
          }
          {!!card?.comments?.length &&
        <Button size="small" startIcon={<CommentIcon />}>{card?.comments.length}</Button>
          }
          {!!card?.attachments?.length &&
        <Button size="small" startIcon={<AttachmentIcon />}>{card?.attachments.length}</Button>
          }
        </CardActions>
      }
    </MuiCard>
  )
}

export default Card
