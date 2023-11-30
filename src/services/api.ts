import { Student } from "@/slices/StudentSlice";
import axios from "axios";

const fetchStudents = async () => {
  try {
    const response = await axios.get("http://localhost:3001/students");
    return response.data;
  } catch (error) {
    console.error(`Error fetching students:`, error);
  }
};

const postStudents = async (newStudentData: Student) => {
  try {
    console.log("Posting data:", newStudentData);
    const response = await axios.post(
      "http://localhost:3001/students",
      newStudentData
    );
    return response.data;
  } catch (error) {
    console.error(`Error posting students:`, error);
  }
};

export { fetchStudents, postStudents };
