import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
import NoteItem from './NoteItem';
import { fetchNotes, deleteNote } from '../../features/notes/notesSlice';
import EditNote from './EditNote';

const NoteList = () => {
  const dispatch = useDispatch();
  const { filteredNotes, loading } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchNotes(user.uid));
    }
  }, [dispatch, user]);


  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const handleDelete = async (noteId) => {
    try {
      await dispatch(deleteNote({ userId: user.uid, noteId })).unwrap();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  const handleCloseEdit = () => {
    setEditingNote(null);
  };


  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (filteredNotes.length === 0) {
    return (
      <Container>
        <Typography 
          variant="h6" 
          align="center" 
          color="textSecondary"
          sx={{ mt: 4 }}
        >
          No notes found. Create your first note!
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {filteredNotes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <NoteItem 
                note={note} 
                onEdit={handleEdit}  
                onDelete={handleDelete}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

 
      {editingNote && (
        <EditNote
          note={editingNote}
          open={!!editingNote}
          onClose={handleCloseEdit}
        />
      )}
    </>
  );
};

export default NoteList;
