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
    <div className="bg-n-4">
      <div className="card  bg-n-2 shadow-md rounded-lg overflow-hidden border border-gray-200 hover:border-[#e5ff3b] transition duration-300 group">
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
              to={`/submissions/${form.formId}`}
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
          <p className="text-gray-800 mt-2">
            Form URL:{" "}
            <a
              href={`${window.location.origin}/fill/${form.formId}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline overflow-hidden overflow-ellipsis"
              style={{ maxWidth: "20rem" }} // Limit URL length and add ellipsis
            >
              {`${window.location.origin}/fill/${form.formId}`}
            </a>
          </p>
        </div>
        {preview && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="modal-content bg-white rounded-lg overflow-hidden p-4">
              <span
                className="absolute top-0 right-0 cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setPreview(false)}
              >
                &times;
              </span>
              <RenderPlainForm model={form} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormCard;
