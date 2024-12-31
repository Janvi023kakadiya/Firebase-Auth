import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../service/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  doc,
} from 'firebase/firestore';

export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (userId, { rejectWithValue }) => {
    try {
      const notesRef = collection(db, `users/${userId}/notes`);
      const snapshot = await getDocs(notesRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNote = createAsyncThunk(
  'notes/addNote',
  async ({ userId, note }, { rejectWithValue }) => {
    try {
      const notesRef = collection(db, `users/${userId}/notes`);
      const docRef = await addDoc(notesRef, {
        ...note,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...note };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ userId, noteId, noteData }, { rejectWithValue }) => {
    try {
      const noteRef = doc(db, `users/${userId}/notes/${noteId}`);
      await updateDoc(noteRef, {
        ...noteData,
        updatedAt: new Date().toISOString()
      });
      return { id: noteId, ...noteData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async ({ userId, noteId }, { rejectWithValue }) => {
    try {
      const noteRef = doc(db, `users/${userId}/notes/${noteId}`);
      await deleteDoc(noteRef);
      return noteId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    filteredNotes: [],
    searchTerm: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredNotes = state.notes.filter(note => 
        note.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        note.content.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes//
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        state.filteredNotes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Note//
      .addCase(addNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
        state.filteredNotes = state.notes;
      })
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Note//                        
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
          state.filteredNotes = state.notes;
        }
      })
      // Delete Note//
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
        state.filteredNotes = state.notes;
      });
  },
});

export const { setSearchTerm, clearError } = notesSlice.actions;
export default notesSlice.reducer;
