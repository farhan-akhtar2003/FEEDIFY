import { useState } from "react";
import { Link } from "react-router-dom";
import { getDateFromMillis } from "../../utils";
import { deleteForm } from "../../db";
import RenderPlainForm from "../../components/Admin/RenderPlainForm";
import deleteIcon from "../../../public/delete.png";

function FormCard({ form, onDelete }) {
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this form?")) return;
    setLoading(true);
    await deleteForm(form.formId);
    setLoading(false);
    onDelete(form.formId);
  };

  return (
    <div className="card  bg-n-2 shadow-md rounded-lg overflow-hidden border border-gray-200 hover:border-[#8e3a59] hover:border-width-20rem transition duration-300 group">
      <div className="p-4">
        <h2 className=" font-bold text-2xl mb-2 text-black">{form.title}</h2>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setPreview(true)}
            className="text-white bg-blue-500 focus:outline-none rounded-lg p-2 transition duration-300  hover:bg-blue-800 hover:text-white "
          >
            Preview
          </button>
          <Link
            to={`/submission/${form.formId}`}
            className="text-white bg-green-500 focus:outline-none rounded-lg p-2 transition duration-300  hover:bg-green-800 hover:text-white "
          >
            Submissions
          </Link>
          <button
            onClick={handleDelete}
            className="text-white bg-n-2 focus:outline-none rounded-lg p-2 transition duration-300 hover:bg-n-6 hover:text-white relative group"
          >
            {loading ? (
              <span className="spinner red"></span>
            ) : (
              <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
            )}
          </button>
        </div>
        <p className="text-gray-800 mt-2">
          Created on: {getDateFromMillis(form.createdAt)}
        </p>
      </div>
      {preview && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="modal-content bg-white rounded-lg overflow-hidden p-4">
            <span
              className="absolute top-1 right-3 cursor-pointer text-red-400 hover:text-red-600"
              onClick={() => setPreview(false)}
            >
              &times;
            </span>
            <RenderPlainForm model={form} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FormCard;
