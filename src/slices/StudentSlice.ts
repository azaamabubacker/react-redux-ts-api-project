import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchStudents, postStudents } from "@/services/api";
import { Dispatch } from "redux";

export interface Student {
  id: string;
  name: string;
  age: number;
  gender: string;
  studyingStream: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudent: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
  },
});

export const { setStudent } = studentSlice.actions;
export default studentSlice.reducer;

export const fetchStudentsAsync = () => async (dispatch: Dispatch) => {
  try {
    const data = await fetchStudents();
    dispatch(setStudent(data));
  } catch (error) {
    console.error(`Error fetching students data:`, error);
  }
};

export const postStudentAsync =
  (newStudentData: Student) => async (dispatch: Dispatch) => {
    try {
      await postStudents(newStudentData);
      const updatedStudents = await fetchStudents();
      dispatch(setStudent(updatedStudents));
    } catch (error) {
      console.error(`Error Posting Student Data:`, error);
    }
  };
