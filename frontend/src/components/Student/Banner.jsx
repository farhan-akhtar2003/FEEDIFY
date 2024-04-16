import React from "react";
import waves from "../../../public/wavesOpacity2.svg";

const Banner = () => {
  const backgroundStyle = {
    backgroundImage: `url(${waves})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <section
      className="bg-n-1 w-full flex-center flex-col  border-[##93D1C3] border-y-[1.5rem] "
      style={backgroundStyle}
    >
      <h1 className="head_text text-center">
        Welcome The Student
        <br className="max-md:hidden" />
        <span className="green_gradient text-center">
          {"  "}
          Response and Fill Feedback
        </span>
      </h1>
      <br></br>
      <p className="desc text-center pb-10">
        Complete your feedback form submission created by your Administration.
      </p>
    </section>
  );
};

export default Banner;
