import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Paper, 
  TextField, 
  Button, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box 
} from '@mui/material';
import { addNote } from '../../features/notes/notesSlice';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      title,
      content,
      category,
      timestamp: new Date().toISOString(),
    };
    dispatch(addNote({ userId: user.uid, note }));
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="work">Work</MenuItem>
            <MenuItem value="study">Study</MenuItem>
            <MenuItem value="personal">Personal</MenuItem>
            <MenuItem value="health">Health</MenuItem>
            <MenuItem value="shopping">Shopping</MenuItem>
            <MenuItem value="tasks">Tasks</MenuItem>
            <MenuItem value="ideas">Ideas</MenuItem>
          </Select>
        </FormControl>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
        >
          Add Note
        </Button>
      </form>
    </Paper>
  );
};

export default AddNote;
