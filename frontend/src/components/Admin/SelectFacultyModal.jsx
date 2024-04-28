import React from "react";

const SelectFacultyModal = ({
  faculties,
  selectedFaculty,
  setSelectedFaculty,
  onClose,
  isOpen,
}) => {
  const handleFacultySelection = (facultyId) => {
    setSelectedFaculty(facultyId);
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
            <h2 className="text-2xl font-semibold mb-4 flex justify-center text-black">
              Select Faculty
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-black border border-black">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2">Serial No.</th>
                    <th className="px-4 py-2">Faculty Id</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {faculties.map((faculty, index) => (
                    <tr
                      key={faculty.userId}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="border px-4 py-2">{index + 1}.</td>
                      <td className="border px-4 py-2">{faculty.userId}</td>
                      <td className="border px-4 py-2">{faculty.name}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="radio"
                          name="faculty"
                          value={faculty.userId}
                          checked={selectedFaculty === faculty.userId}
                          onChange={() =>
                            handleFacultySelection(faculty.userId)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded mr-2"
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

export default SelectFacultyModal;
