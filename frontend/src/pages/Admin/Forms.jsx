import { useState, useEffect } from "react";
import axios from "axios";
import FormCard from "../../components/Admin/FormCard";

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

  console.log(forms);

  const onFormDelete = (id) => {
    setForms(forms.filter((forms) => forms.formId !== id));
  };

  return (
    <div>
      <h1 className="heading">My Forms</h1>
      {loading ? (
        <p className="text-center mt-1">
          <span className="spinner"></span>
        </p>
      ) : msg ? (
        <h3 className="msg mt-1">{msg}</h3>
      ) : (
        <div className="cards-container">
          {forms.length > 0 ? (
            forms.map((form) => (
              <FormCard key={form.formId} form={form} onDelete={onFormDelete} />
            ))
          ) : (
            <h3 className="msg mt-1">You haven't created any forms yet</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Forms;
