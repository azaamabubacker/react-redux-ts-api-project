import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  id: string;
  name: string;
  age: number,
  gender: string
}

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
  },
});

export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer;
