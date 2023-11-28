import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchStudents from '@/services/api';
import { Dispatch } from 'redux'

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
    setStudent: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload
    }
  },
});

export const { addStudent, setStudent } = studentSlice.actions;
export default studentSlice.reducer;

export const fetchStudentsAsync = () => async (dispatch: Dispatch) => {
 
  try{
const data = await fetchStudents()
dispatch(setStudent(data))
  } catch(error) {
    console.error(`Error fetching students data:`, error)
  }
}
