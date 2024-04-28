import React from "react";

const SelectStudentModal = ({
  students,
  selectedStudents,
  setSelectedStudents,
  onClose,
  isOpen,
}) => {
  const handleStudentSelection = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(
        selectedStudents.filter((userId) => userId !== studentId)
      );
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="">
        <div className="flex items-center justify-center h-screen">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl text-black flex justify-center font-semibold mb-4">
              Choose Students
            </h2>
            <table className="w-full table-auto text-black border border-black">
              <thead className="bg-gray-200 border border-black">
                <tr>
                  <th className="px-4 py-2">Serial No.</th>
                  <th className="px-4 py-2">Roll No</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Select</th>
                </tr>
              </thead>
              <tbody className="">
                {students.map((student, index) => (
                  <tr
                    key={student.userId}
                    className={index % 2 === 0 ? "bg-gray-100" : "" }
                  >
                    <td className="border px-4 py-2">{index + 1}.</td>
                    <td className="border px-4 py-2">{student.userId}</td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="checkbox"
                        value={student.userId}
                        checked={selectedStudents.includes(student.userId)}
                        onChange={() => handleStudentSelection(student.userId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4  flex justify-center">
              <button
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded mr-2  "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectStudentModal;
