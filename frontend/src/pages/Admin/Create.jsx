import { useState, useEffect } from "react";
import AddFieldModal from "../../components/Admin/AddFieldModal";
import RenderPlainForm from "../../components/Admin/RenderPlainForm";
import { updateObjState } from "../../utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SelectStudentModal from "../../components/Admin/SelectStudentModal";
import SelectFacultyModal from "../../components/Admin/SelectFacultyModal";

function Create() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [studentslist, setStudentslist] = useState([]);
  const [facultylist, setFacultylist] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/students");
        setStudentslist(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get("/faculties");
        setFacultylist(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculty();
  }, []);

  const openAddModal = (inputType) => {
    setShowAddModal(true);
    setInputType(inputType);
  };

  const [formModel, setFormModel] = useState({
    formId: "",
    title: "",
    endMessage: "",
    expiration: "",
    fields: [],
    faculty:"",
    accessibleTo:[],
    createdAt: +new Date(),
  });

  const addFieldToFormModel = (field) => {
    let _model = { ...formModel }; // Using spread operator for shallow copy
    // field.questionId = formModel.fields.length + 1;
    _model.fields.push(field);
    setFormModel(_model);
  };

  const inputTypes = [
    "short-text",
    "long-text",
    "number",
    "multioption-singleanswer",
    "multioption-multianswer",
    "file",
  ];

  const createForm = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErr("");

    if (!formModel.title.trim()) return setErr("Title is required");
    if (formModel.title.trim().length < 5 || formModel.title.trim().length > 50)
      return setErr("Title should be 5 - 50 characters long");

    if (formModel.expiration.trim() && formModel.expiration < 1)
      return setErr("Validity should be at least an hour");

    if (formModel.fields.length < 1)
      return setErr("You need to add at least one field");

    setLoading(true);
    const { title, endMessage, expiration, fields, createdAt } = formModel;
    try {
      const response = await axios.post("/createForms", {
        title,
        endMessage,
        expiration,
        fields,
        faculty: selectedFaculty,
        accessibleTo: selectedStudents,
        createdAt,
      });
      const { data } = response; // Destructure the response object to extract data
      //console.log("create",data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setFormModel({
          formId: "", // Reset formId after successful creation
          title: "",
          endMessage: "",
          expiration: "",
          fields: [],
          faculty: "",
          accessibleTo: [],
          createdAt: "",
        });
        toast.success("Form created Successfully!!!");
        setLoading(false);
        // Redirect to the desired route after form creation
        navigate("/forms");
      }
    } catch (error) {
      setErr(error.message);
      setLoading(false);
      console.log(error);
      toast.error("Internal Server Error. Please try again later.");
    }
  };

  const handleOpenStudentModal = () => {
    setShowStudentModal(true);
  };

  const handleOpenFacultyModal = () => {
    setShowFacultyModal(true);
  };
  // console.log("student", studentslist);
  // console.log("faculty", facultylist);

  return (
    <div className="container mx-auto bg-n-6 pt-10 pb-10">
      <h1 className="text-3xl text-black font-semibold pt-20 mb-6 flex justify-center">
        Create New Form
      </h1>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-800">Form Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="w-full border border-black rounded px-4 py-2 text-gray-800"
            onChange={(e) =>
              updateObjState(setFormModel, formModel, "title", e.target.value)
            }
          />
        </div>

        {formModel.fields.length > 0 && <RenderPlainForm model={formModel} />}

        <div className="flex flex-col">
          <label className="mb-1 text-gray-800">Form Description</label>
          <input
            type="text"
            placeholder="Write description for the form"
            className="w-full border border-black rounded px-4 py-2 text-gray-800"
            onChange={(e) =>
              updateObjState(
                setFormModel,
                formModel,
                "endMessage",
                e.target.value
              )
            }
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-800">Validity (Optional)</label>
          <input
            type="number"
            placeholder="For how many hours the form should be fillable"
            className="w-full border border-black rounded px-4 py-2 text-gray-800"
            onKeyDown={(e) => {
              if (e.key === "." || e.key === "-") {
                e.preventDefault();
              }
            }}
            onChange={(e) =>
              updateObjState(
                setFormModel,
                formModel,
                "expiration",
                e.target.value
              )
            }
          />
        </div>

        {err && <p className="text-red-500">{err}</p>}

        <div className="flex flex-col items-center">
          <div className="rounded mt-6 bg-n-3 py-10 mb-5">
            <p className="text-3xl pl-5 py-1 bg-n-2 text-black">
              Add Questions:
            </p>
            <p className="text-1.5xl  pl-5 my-2 text-black">
              Choose the question fields:
            </p>
            <div className="grid grid-cols-2 py-4 bg-n-2 md:grid-cols-3 lg:grid-cols-3 gap-2 px-4">
              {inputTypes.map((inputType, index) => (
                <button
                  className="btn py-2 px-4 bg-n-4 text-gray-800 rounded hover:bg-[#1d2951]"
                  key={index}
                  onClick={() => openAddModal(inputType)}
                >
                  {inputType.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {showAddModal && (
            <AddFieldModal
              inputType={inputType}
              close={() => setShowAddModal(false)}
              add={addFieldToFormModel}
            />
          )}

          <div className="flex justify-between items-center">
            {/* Buttons for selecting students and faculty */}
            <div>
              <button
                className="bg-red-600 py-3 px-4 text-white rounded hover:bg-red-800"
                onClick={handleOpenStudentModal}
              >
                Choose Students
              </button>
              <button
                className="bg-red-600 py-3 px-4 text-white rounded hover:bg-red-800 ml-2"
                onClick={handleOpenFacultyModal}
              >
                Select Faculty
              </button>
            </div>
            {/* Render the list of selected students */}
            {/* <div>
            <h2>Selected Students:</h2>
            <ul>
              {selectedStudents.map((studentId) => (
                <li key={studentId}>{studentId}</li>
              ))}
            </ul>
          </div> */}

            {/* Render the selected faculty */}
            {/* {selectedFaculty && (
            <div>
              <h2>Selected Faculty:</h2>
              <p>{selectedFaculty}</p>
            </div>
          )} */}
            {/* Button for creating the form */}
            <button
              className="btn ml-5 bg-n-4 text-black rounded hover:bg-green-600"
              onClick={createForm}
            >
              {loading ? "Creating Form..." : "Create Form"}
            </button>
          </div>
        </div>
      </div>

      {/* Student Selection Modal */}
      {showStudentModal && (
        <SelectStudentModal
          isOpen={showStudentModal}
          onClose={() => setShowStudentModal(false)}
          students={studentslist}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
        />
      )}

      {/* Faculty Selection Modal */}
      {showFacultyModal && (
        <SelectFacultyModal
          isOpen={showFacultyModal}
          onClose={() => setShowFacultyModal(false)}
          faculties={facultylist}
          selectedFaculty={selectedFaculty}
          setSelectedFaculty={setSelectedFaculty}
        />
      )}
    </div>
  );
}

export default Create;
