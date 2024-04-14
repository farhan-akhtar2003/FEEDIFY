import React from "react";
import { members } from "../constants";
import Heading from "./Heading";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../../public/assets/svg/ClipPath";

const Teammates = () => {
  return (
    <section id="Teammates">
      <div className="container bg-n-2 z-1 pt-10 pb-10 ">
        <Heading
          className="text-black underline md:max-w-md lg:max-w-2xl"
          title="[  Project TeamMates  ]"
        />
        <div className="grid grid-cols-4 gap-10 mb-10">
          {members.map((item) => (
            <div
              className="relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[20rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 text-n-1 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-2">Roll No: {item.roll}</p>
                <p className="body-2 mb-6 text-n-2">Email Id: {item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-n-3 uppercase tracking-wider">
                    NIT Jalandhar
                  </p>
                </div>
              </div>
              <GradientLight />
              <div
                className="absolute inset-0.5 bg-n-7"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-20">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teammates;
