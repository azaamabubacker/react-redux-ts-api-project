import { useEffect, useState } from "react";
import { fetchStudentsAsync } from "@/slices/StudentSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Student } from "@/slices/StudentSlice";
import Modal from "react-modal";
import User from "@/assets/User.jpg";

const StudentCard = () => {
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.student.students);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchStudentsAsync());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  return (
    <>
      {isAuthenticated && (
        <h1 className=" text-primary-dark text-lg text-center mt-4 ">
          Welcome, {user?.email}
        </h1>
      )}
      <h1 className="mt-4 text-primary-dark font-bold text-3xl text-center ">
        Explore Student Details
      </h1>
      <div className="flex flex-wrap justify-start mt-8">
        {students.map((student) => (
          <div
            className="bg-background-light shadow-sm px-4 m-2 w-60 rounded-md leading-10 text-accent-light-50 cursor-pointer hover:bg-primary-dark hover:shadow-lg"
            key={student.id}
            onClick={() => openModal(student)}
          >
            <p className="font-bold ">Name: {student.name}</p>
            <p>Age: {student.age}</p>
            <p>Gender: {student.gender}</p>
          </div>
        ))}

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              backgroundColor: "#112D4E",
              width: "50%",
              margin: "auto",
              height: "80vh",
            },
          }}
        >
          <div className="text-right">
            <button
              onClick={closeModal}
              className="text-2xl font-bold text-background-light hover:text-white "
            >
              X
            </button>
          </div>
          {selectedStudent && (
            <div className="text-accent-light-50 font-bold text-center leading-9 text-xl">
              <h1 className="text-2xl text-center text-background-light mb-12 mt-8">
                Explore the Full Student Details
              </h1>
              <img
                src={User}
                alt="user"
                className="w-20 h-20 rounded-full mx-auto"
              />
              <p>
                <span className="text-background-light">Name: </span>
                {selectedStudent.name}
              </p>
              <p>
                <span className="text-background-light">Age: </span>{" "}
                {selectedStudent.age}
              </p>
              <p>
                <span className="text-background-light">Gender: </span>{" "}
                {selectedStudent.gender}
              </p>
              <p>
                <span className="text-background-light">Stream: </span>{" "}
                {selectedStudent.studyingStream}
              </p>
              <p>
                <span className="text-background-light">Email: </span>{" "}
                {selectedStudent.email}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default StudentCard;
