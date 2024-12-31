import React, { useState } from 'react';
import NoteItem from './NoteItem';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const ParentComponent = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Note 1', content: 'Content of Note 1', category: 'work' },
    { id: 2, title: 'Note 2', content: 'Content of Note 2', category: 'study' },
  ]);
  
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const handleEdit = (noteId) => {
    const noteToEdit = notes.find(note => note.id === noteId);
    setCurrentNote(noteToEdit);
    setOpen(true);
  };

  const handleDelete = (noteId) => {
    console.log("Deleting note with ID:", noteId);
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentNote(null);
  };

  const handleSave = () => {
    setNotes(notes.map(note => 
      note.id === currentNote.id ? currentNote : note
    ));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={currentNote ? currentNote.title : ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            variant="outlined"
            value={currentNote ? currentNote.content : ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ParentComponent;