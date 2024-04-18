//bjdwbjwsjdwj
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getForm } from "../../db";
import RenderReactiveForm from "../../components/Student/RenderReactiveForm";
import { expired } from "../../utils";
import axios from "axios";

function Fill() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //if (!localStorage.getItem("token")) return; ///////////////////
    const fetchData = async () => {
      try {
        let response = await axios.get(`/forms/fill/${id}`);
        console.log(response.data);
        setForm(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setMsg(error.message);
      }
    };
    fetchData();
  }, [id]);
//console.log("FORM",form);
  return (
    <div>
      <h1 className="heading">{form ? form.title : "Fill in the form"}</h1>
      {loading ? (
        <p className="text-center mt-1">
          <span className="spinner"></span>
        </p>
      ) : msg ? (
        <h3 className="msg mt-1 text-gray-800">{msg}</h3>
      ) : submitted ? (
        <h3 className="msg mt-1 text-green-600">
          {form
            ? form.endMessage || "Thank you for submitting the form"
            : "Unknown state"}
        </h3>
      ) : form ? (
        expired() ? (
          <h3 className="msg mt-1 text-red-600">This form has been expired</h3>
        ) : (
          <RenderReactiveForm
            model={form}
            onSubmitted={() => setSubmitted(true)}
          />
        )
      ) : (
        <h3 className="msg mt-1 text-gray-800">Form not found</h3>
      )}
    </div>
  );
}

export default Fill;
