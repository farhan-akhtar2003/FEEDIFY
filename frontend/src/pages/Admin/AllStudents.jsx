//FEEDIFY>FRONTEND>SRC>PAGES>ADMIN>ALLSTUDENTS.JSX
import { useState, useEffect } from "react";
import axios from "axios";
import RegisterModalStudent from "../../components/Admin/RegisterModelStudent";

function AllStudents() {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [studentlist, setStudentlist] = useState([]);
  const [isMounted, setIsMounted] = useState(true); // Add a state variable to track mounted state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Component is mounted
    const fetchStudent = async () => {
      try {
        const response = await axios.get("/students");
        if (isMounted) {
          setStudentlist(response.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setMsg(error.message);
      }
    };

    fetchStudent();
    return () => {
      setIsMounted(false); // Component is unmounted
    };
  }, [isMounted, isRegisterModalOpen]);

  useEffect(() => {}, [studentlist]); // Log the state after it has been updated
  //console.log(studentlist);

  const handleToggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  return (
    <>
      <div className="p-10 m-[6rem] border-4 border-black bg-[#e4d00a] rounded-3xl flex items-center justify-between">
        <h3 className="text-gray-900 text-3xl font-semibold m-2">
          REGISTER NEW STUDENT
        </h3>
        <button
          onClick={handleToggleRegisterModal}
          className="border-none outline-none px-8 py-4 rounded-lg bg-[#007f5c] text-white font-bold uppercase shadow-md hover:shadow-sm hover:bg-[#195905] duration-300"
        >
          ADD
        </button>
      </div>
      <div className="flex justify-center">
        {isRegisterModalOpen && (
          <RegisterModalStudent
            isOpen={isRegisterModalOpen}
            onClose={handleToggleRegisterModal}
          />
        )}

        <div className="w-full max-w-7xl p-4">
          <h3 className="text-gray-900 text-3xl font-semibold mb-6 text-center">
            All Registered Students
          </h3>
          <table className="w-full table-auto text-black bg-n-5 border border-black">
            <thead className="text-white">
              <tr>
                <th className="px-4 py-2">Serial No.</th>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {studentlist.map((student, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border px-4 py-2">{index + 1}.</td>
                  <td className="border px-4 py-2">{student.userId}</td>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p>Loading...</p>}
          {msg && <p className="text-red-600">{msg}</p>}
        </div>
      </div>
    </>
  );
}

export default AllStudents;
