import { useState } from "react";
import { Link } from "react-router-dom";
import { getDateFromMillis } from "../../utils";
import RenderPlainForm from "../../components/Student/RenderPlainForm";

function FormCard({ form }) {
  const [preview, setPreview] = useState(false);

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
            to={`/submissions/${form.formId}`}
            className="text-white bg-[#f28500] focus:outline-none rounded-lg p-2 transition duration-300  hover:bg-[#ff4500] hover:text-white "
          >
            Submissions
          </Link>
        </div>
        <p className="text-gray-800 m-2">
          Created on: {getDateFromMillis(form.createdAt)}
        </p>
        <div className="flex justify-center items-center p-4">
          <button
            className="text-black bg-green-500 focus:outline-none rounded-lg p-2 transition duration-300  hover:bg-green-800 hover:text-white "
            onClick={() =>
              window.open(
                `${window.location.origin}/fill/${form.formId}`,
                "_blank"
              )
            }
          >
            Fill Form
          </button>
        </div>
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
