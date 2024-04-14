import React from "react";
import waves from "../../../public/wavesOpacity.svg";

const Banner = () => {
  const backgroundStyle = {
    backgroundImage: `url(${waves})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <section
      className="bg-n-1 w-full flex-center flex-col  border-[#00B6B8] border-y-[1.5rem] "
      style={backgroundStyle}
    >
      <h1 className="head_text text-center">
        Welcome The Reviewee
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          {"  "}
          Analyize Your Performance
        </span>
      </h1>
      <br></br>
      <p className="desc text-center pb-10">
        See the feedbacks that been collected by your administration and been
        submitted by your respective reviewers for you.
      </p>
    </section>
  );
};

export default Banner;
