import { useState, useEffect } from "react";
import axios from "axios";
import FormCard from "../../components/Student/FormCard";

function Forms() {
  const [forms, setForms] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/forms");
        // console.log(response.data);
        setForms(response.data.allForms); // allForms name comes from authController getForm
        setLoading(false);
        // console.log("SETFORMS",forms);
      } catch (error) {
        setLoading(false);
        setMsg(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("SETFORMS", forms,forms&&forms.length); // Log the updated state here
  }, [forms]);
  //console.log(forms);

  return (
    <div>
      <h1 className="heading text-gray-800 mt-5 text-center">All Forms</h1>

      {loading ? (
        <p className="text-center mt-1">
          <span className="spinner"></span>
        </p>
      ) : msg ? (
        <h3 className="text-3xl text-gray-950 flex justify-center mt-1">Nothing to show</h3>
      ) : (
        <div className="cards-container">
          {forms.length > 0 ? (
            forms.map((form) => <FormCard key={form.formId} form={form} />)
          ) : (
            <h3 className="msg mt-1">Nothing to show</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Forms;
