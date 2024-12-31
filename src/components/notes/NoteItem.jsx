import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  IconButton,
  Chip 
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Edit as EditIcon,
  PushPin as PinIcon 
} from '@mui/icons-material';

const getCategoryColor = (category) => {
  switch (category?.toLowerCase()) {
    case 'work':
      return '#ffeb3b'; 
    case 'study':
      return '#4caf50'; 
    case 'personal':
      return '#9c27b0'; 
    case 'health':
      return '#f06292';
    case 'shopping':
      return '#ba68c8'; 
    case 'tasks':
      return '#ff9800'; 
    case 'ideas':
      return '#00bcd4';
    default:
      return '#ffffff'; 
  }
};


const NoteItem = ({ note, onEdit, onDelete }) => {
  const { loading } = useSelector((state) => state.notes);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note.id);
    }
  };

  return (
    <Card 
      sx={{ 
        minHeight: 200,
        backgroundColor: getCategoryColor(note.category),
        position: 'relative',
        '&:hover': {
          boxShadow: ' rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {note.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {note.content}
        </Typography>
        {note.category && (
          <Chip 
            label={note.category}
            size="small"
            sx={{ position: 'absolute', bottom: '40px' }}
          />
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton 
          size="small" 
          onClick={() => onEdit(note)}
          disabled={loading}
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={handleDelete}
          disabled={loading}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NoteItem;
