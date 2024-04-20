import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuesChartsContainer from "../../components/Faculty/QuesChartsContainer";
import axios from "axios";
import TextQuesContainer from "../../components/Faculty/TextQuesContainer";

function Analysis() {
  const [loading, setLoading] = useState(true);
  const [allanswer, setAllanswer] = useState([]);
  const [isMounted, setIsMounted] = useState(true); // Add a state variable to track mounted state
  const { id } = useParams();

  useEffect(() => {
    setIsMounted(true); // Component is mounted

    const fetchData = async () => {
      try {
        const response = await axios.get(`/forms/analysis/${id}`);
        if (isMounted) {
          //console.log("Submissions from API:", response.data);
          setAllanswer(response.data); // Directly set the submissions array
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      setIsMounted(false); // Component is unmounted
    };
  }, [id, isMounted]);

  useEffect(() => {
    //console.log("State submissions after setting:", allanswer);
  }, [allanswer]); // Log the state after it has been updated

  return (
    <>
      <div className=" pt-[1rem] lg:pt-[3rem] overflow-hidden">
        {/* Pass the allanswer state to the QuesChartsContainer */}
        <QuesChartsContainer allanswer={allanswer} />
        <TextQuesContainer allanswer={allanswer}/>
      </div>
    </>
  );
}

export default Analysis;
