import Heading from "./Heading";
import { insight } from "../constants";
import { grid } from "../../public/assets";

const Insights = () => (
  <section id="Insights">
    <div className="container bg-n-4 pt-5 md:pb-10">
      <Heading tag="[ INSIGHTS ]" title="# OUR PROVIDING SERVICES #" />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
        {insight.map((item) => {
          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] bg-n-2`}
              key={item.id}
            >
              <div className="relative p-8 bg-n-7 rounded-[2.4375rem] overflow-hidden xl:p-15">
                <div className="absolute top-0 left-0 max-w-full">
                  <img
                    className="w-full"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-1">
                  <div className="mb-5 -my-10 -mx-1">
                    <img
                      className="w-full"
                      src={item.imageUrl}
                      width={628}
                      height={426}
                      alt={item.title}
                    />
                  </div>
                  <h4 className="h4 mb-4">{item.title}</h4>
                  <p className="body-2 text-n-1">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Insights;
