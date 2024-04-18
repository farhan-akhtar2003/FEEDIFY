import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SubmissionCard from "../../components/Student/SubmissionCard";
import axios from "axios";
import { UserContext } from "../../../context/userContext";

function Submissions() {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [isMounted, setIsMounted] = useState(true); // Add a state variable to track mounted state
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    setIsMounted(true); // Component is mounted

    const fetchData = async () => {
      try {
        const response = await axios.get(`/forms/submissions/${id}`, {
          params: {
            studentID: user.user.rollId,
          },
        });
        if (isMounted) {
          // Check if component is still mounted before updating state
          console.log("Submissions from API:", response.data);
          // Assuming response.data is an array of submissions
          setSubmissions(response.data); // Directly set the submissions array
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        setMsg(e.message);
      }
    };

    fetchData();
    return () => {
      setIsMounted(false); // Component is unmounted
    };
  }, [id, user.user.rollId, isMounted]);


  useEffect(() => {
    console.log("State submissions after setting:", submissions);
  }, [submissions]); // Log the state after it has been updated

  return (
    <div>
      <div className="grid place-items-center">
        {submissions.length > 0 ? (
          <h1 className="text-3xl capitalize mt-20 text-orange-600">
            YOUR FORM SUBMISSION
          </h1>
        ) : (
          <h3 className="msg mt-1 text-red-600">No Submissions yet</h3>
        )}
      </div>

      {
        loading ? (
          <p className="text-center mt-1">
            <span className="spinner"></span>
          </p>
        ) : msg ? (
          <h3 className="msg mt-1 text-red-600">{msg}</h3>
        ) : submissions.length > 0 ? (
          <div className="cards-container submissions">
            {submissions.map((subm, index) => (
              <SubmissionCard key={index} submission={subm} />
            ))}
          </div>
        ) : null /* Render nothing if submissions array is empty */
      }
    </div>
  );

}

export default Submissions;
