import { useState } from "react";
import AddFieldModal from "../../components/Admin/AddFieldModal";
import RenderPlainForm from "../../components/Admin/RenderPlainForm";
import { updateObjState } from "../../utils";
import { createForm as saveForm } from "../../db";

function Create() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const openAddModal = (inputType) => {
    setShowAddModal(true);
    setInputType(inputType);
  };

  const [formModel, setFormModel] = useState({
    title: "",
    createdAt: +new Date(),
    fields: [
      {
        title: "Enter your email",
        type: "short-text",
        required: true,
      },
    ],
    endMessage: "",
    expiration: "",
  });

  const addFieldToFormModel = (field) => {
    let _model = { ...formModel }; // Using spread operator for shallow copy
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

  const createForm = async () => {
    if (loading) return;
    setErr("");

    if (!formModel.title.trim()) return setErr("Title is required");
    if (formModel.title.trim().length < 5 || formModel.title.trim().length > 50)
      return setErr("Title should be 5 - 50 characters long");

    if (formModel.expiration.trim() && formModel.expiration < 1)
      return setErr("Validity should be at least an hour");

    if (formModel.fields.length < 2)
      return setErr("You need to add at least one field");

    setLoading(true);
    try {
      await saveForm(formModel);
      setLoading(false);
      // Redirect to the desired route after form creation
      window.location.href = "/forms";
    } catch (e) {
      setErr(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto bg-n-6 pt-10 pb-10">
      <h1 className="text-3xl text-black font-semibold pt-20 mb-6">
        Create New Form
      </h1>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-800">Title of the Form</label>
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
          <label className="mb-1 text-gray-800">End Message</label>
          <input
            type="text"
            placeholder="What should user see after submitting the form"
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

        <button
          className="btn py-2 px-4 bg-n-4 text-black rounded hover:bg-green-600"
          onClick={createForm}
        >
          {loading ? "Creating Form..." : "Create Form"}
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="rounded mt-6 bg-n-3 py-10 mb-5">
          <p className="text-3xl pl-5 mb-1 text-black">Add new field</p>
          <div className="grid grid-cols-2 py-4 bg-n-2 md:grid-cols-3 lg:grid-cols-3 gap-2 px-4">
            {inputTypes.map((inputType, index) => (
              <button
                className="btn py-2 px-4 bg-n-4 text-gray-800 rounded hover:bg-blue-600"
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
      </div>
    </div>
  );
}

export default Create;
