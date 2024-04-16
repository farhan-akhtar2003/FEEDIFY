import React from "react";
import Insights from "../components/Insights";
import Ratereview from "../components/Ratereview";
import Teammates from "../components/Teammates";

const Home = () => {
  return (
    <>
      <div className="pt-[1rem] lg:pt-[2rem] overflow-hidden">
        <Insights />
        <Ratereview />
        <Teammates />
      </div>
    </>
  );
};

export default Home;
