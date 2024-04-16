import React from "react";
import waves from "../../../public/wavesOpacity1.svg";

const Banner = () => {
  const backgroundStyle = {
    backgroundImage: `url(${waves})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  return (
    <section
      className="bg-n-1 w-full flex-center flex-col  border-[#93D1C3] border-y-[1.5rem] "
      style={backgroundStyle}
    >
      <h1 className="head_text text-center">
        Welcome The Admin
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">
          {"  "}
          Create and Analyize Feedback
        </span>
      </h1>
      <br></br>
      <p className="desc text-center pb-10">
        Have the authority to create multiples feedbacks and track the
        performance of faculties and associations.
      </p>
    </section>
  );
};

export default Banner;
