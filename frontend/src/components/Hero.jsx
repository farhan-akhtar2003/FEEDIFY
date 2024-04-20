import React from "react";
import hero from "../../public/hero.jpg";

function App() {
  return (
    <div
      className="w-screen h-1/4 text-white"
      style={{
        background:
          "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)",
      }}
    >
      <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          class="lg:w-2/4 md:w-3/6 w-5/6 mb-10 object-cover object-center"
          alt="hero"
          src={hero}
        />
        <div class="text-center lg:w-5/12 w-full">
          <h1 className="my-4 text-5xl font-bold leading-tight">
            Feedback refined, Results defined
          </h1>
          <div className="flex justify-center mx-auto">
            <button className="hover:underline bg-white text-gray-800 font-bold rounded-full  py-4 px-8">
              Get Started: Login 
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
