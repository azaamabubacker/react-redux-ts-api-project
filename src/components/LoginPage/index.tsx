import { useState, useEffect } from "react";
import { postStudentAsync } from "@/slices/StudentSlice";
import { Student } from "@/slices/StudentSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { login } from "@/slices/AuthSlice";
import { fetchStudentsAsync } from "@/slices/StudentSlice";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.student.students);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStudentsAsync());
  }, [dispatch]);

  const initialFormData = {
    id: "",
    name: "",
    age: 0,
    gender: "male",
    studyingStream: "",
    email: "",
    password: "",
    dateOfBirth: "",
  };
  const [formData, setFormData] = useState<Student>(initialFormData);
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [registrationSucess, setRegistrationSucess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "dateOfBirth") {
      calculateAge(value);
    }
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();

    console.log("Today:", today);
    console.log("Birth Date:", birthDate);
    console.log("Calculated Age:", age);

    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: dob,
      age: age,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting form:", formData);
    if (
      (isRegisterMode &&
        (!formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.studyingStream ||
          !formData.gender ||
          !formData.age)) ||
      (!isRegisterMode && (!formData.email || !formData.password))
    ) {
      console.error("All fields are required");
      return;
    }

    setLoading(true);

    if (isRegisterMode) {
      dispatch(postStudentAsync(formData));
      setRegistrationSucess(true);
      setTimeout(() => {
        setRegistrationSucess(false);
      }, 3000);
    } else {
      const matchingUser = students.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      console.log("Matching User:", matchingUser);

      if (matchingUser) {
        dispatch(
          login({
            email: formData.email,
            password: formData.password,
          })
        );

        console.log("Login Succesfull");
        navigate("/homepage");
      } else {
        console.error("Invalid email or password");
      }
    }
    setFormData(initialFormData);
  };

  return (
    <div className=" mt-8 flex flex-col items-center ">
      {registrationSucess && (
        <p className="text-green-500">
          Registration successful. Please log in.
        </p>
      )}
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        required
        onChange={handleFormChange}
        className="rounded-lg border-accent-light-50 bg-accent-light-50 p-3 text-primary-dark focus:border-accent-light-50 focus:outline-none focus:ring-2 focus:ring-background-light w-1/2 my-2"
      />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        required
        onChange={handleFormChange}
        className="rounded-lg border-accent-light-50 bg-accent-light-50 p-3 text-primary-dark focus:border-accent-light-50 focus:outline-none focus:ring-2 focus:ring-background-light w-1/2 my-2"
      />
      {isRegisterMode && (
        <>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Username"
            required
            className="rounded-lg border-accent-light-50 bg-accent-light-50 p-3 text-primary-dark focus:border-accent-light-50 focus:outline-none focus:ring-2 focus:ring-background-light w-1/2 my-2"
          />
          <input
            id="studyingStream"
            type="text"
            placeholder="Stream"
            required
            value={formData.studyingStream}
            onChange={handleFormChange}
            className="rounded-lg border-accent-light-50 bg-accent-light-50 p-3 text-primary-dark focus:border-accent-light-50 focus:outline-none focus:ring-2 focus:ring-background-light w-1/2 my-2"
          />
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            required
            onChange={handleSelectChange}
            className="rounded-lg border-accent-light-50 bg-accent-light-50 p-3 text-primary-dark focus:border-accent-light-50 focus:outline-none focus:ring-2 focus:ring-background-light w-1/2 my-2"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <div className="flex justify-start items-start w-1/2 mt-6">
            <p className="text-left bg-accent-light-100 rounded-lg px-4">
              Date of birth
            </p>
          </div>
          <input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleFormChange}
            required
            className="rounded-lg border-accent-light-50 bg-accent-light-50 p-3 text-primary-dark focus:border-accent-light-50 focus:outline-none focus:ring-2 focus:ring-background-light w-1/2 my-2"
          />
          <input
            id="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            required
            onChange={handleFormChange}
            className="rounded-lg border-accent-light-50 bg-accent-light-50 p-3 text-primary-dark focus:border-accent-light-50 focus:outline-none focus:ring-2 focus:ring-background-light w-1/2 my-2"
          />
        </>
      )}

      <button
        className="w-1/2 bg-background-light p-2 rounded-lg mt-4 hover:bg-primary-dark text-accent-light-50 text-lg"
        onClick={handleSubmit}
      >
        {isRegisterMode ? "REGISTER" : "LOGIN"}
      </button>
      <p
        className="mt-2 cursor-pointer text-black"
        onClick={() => setIsRegisterMode(!isRegisterMode)}
      >
        {isRegisterMode
          ? "Already have an account? Login here."
          : "Don't have an account? Register here."}
      </p>
    </div>
  );
};

export default Form;
