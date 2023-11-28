import axios from "axios";

const fetchStudents = async () => {
    try{
const response = await axios.get('http://localhost:3001/students')
return response.data

    } catch(error){
        console.error(`Error fetching students:`, error)
    }
}

export default fetchStudents