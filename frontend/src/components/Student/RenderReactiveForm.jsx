import { useState, useContext } from "react";
import {
  createFillableModel,
  createSubmitableModel,
  updateArrOfObjState,
  hasError,
} from "../../utils";
import MultiOptionField from "./MultiOptionField";
import FileField from "./FileField";
import FeedbackDescription from "./FeedbackDescription";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";

function RenderReactiveForm({ model, onSubmitted }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [fillableModel, setFillableModel] = useState(
    createFillableModel(model)
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  //console.log("fillablemodel", fillableModel);

  const handleSubmit = async (e, formId) => {
    e.preventDefault();
    setErr("");
    if (loading) return;
    let error = hasError(fillableModel, model._id);
    if (error) return setErr(error);
    setLoading(true);

    let submitableModel = createSubmitableModel(fillableModel);

    console.log("submitableModel", submitableModel);

    try {
      const response = await axios.post(`/forms/fill/${formId}/submissions`, {
        submitableModel,
        formTitle: model.title,
        studentId: user.user.rollId,
        // facultyId: model.facultyId,
      });
      console.log("handlesubmit", response.data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Form Submitted Successfully");
        setLoading(false);
        onSubmitted();
        navigate("/forms");
      }
    } catch (error) {
      setErr(error.message);
      setLoading(false);
      console.error("Form submission error:", error);
      // toast.error("Internal Server Error. Please try again later.");
    }
  };
  //console.log("MODEL", model);
  return (
    <>
      <div>
        <FeedbackDescription model={model} />
        <div className="form-container bg-slate-300 rounded-lg shadow-md p-5 m-5">
          <div className="main-form">
            {fillableModel.map((field, index) => (
              <div key={index} className="input text-gray-800">
                <label>
                  {index + 1}. {field.title}
                  {field.required && (
                    <span className="err text-red-600">*</span>
                  )}
                </label>
                {field.type === "short-text" || field.type === "number" ? (
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    onChange={(e) =>
                      updateArrOfObjState(
                        setFillableModel,
                        fillableModel,
                        index,
                        "value",
                        e.target.value
                      )
                    }
                  />
                ) : field.type === "long-text" ? (
                  <textarea
                    onChange={(e) =>
                      updateArrOfObjState(
                        setFillableModel,
                        fillableModel,
                        index,
                        "value",
                        e.target.value
                      )
                    }
                  ></textarea>
                ) : field.type === "multioption-singleanswer" ||
                  field.type === "multioption-multianswer" ? (
                  <MultiOptionField
                    key={index}
                    fieldModel={field}
                    onSelected={(res) =>
                      updateArrOfObjState(
                        setFillableModel,
                        fillableModel,
                        index,
                        "value",
                        res
                      )
                    }
                  />
                ) : field.type === "file" ? (
                  <FileField
                    key={index}
                    fieldModel={field}
                    onCompleted={(fileName) =>
                      updateArrOfObjState(
                        setFillableModel,
                        fillableModel,
                        index,
                        "value",
                        fileName
                      )
                    }
                  />
                ) : (
                  <p key={index} className="text-red-600">
                    Unknown field type
                  </p>
                )}
              </div>
            ))}
            {err && <p className="err mb-1 text-red-600">{err}</p>}
            <button
              className="btn hover:bg-blue-800 transition duration-300"
              onClick={(e) => handleSubmit(e, model.formId)}
            >
              {loading ? (
                <span className="spinner white"></span>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RenderReactiveForm;
