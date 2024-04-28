import Banner from "../../components/Admin/Banner";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <>
      <div className="pt-[1rem] lg:pt-[3rem] overflow-hidden">
        <Banner />
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 justify-center m-8">
          <div className="p-6 border-4 border-black bg-[#9ab973] rounded-xl">
            <h3 className="text-gray-900 text-2xl font-semibold mb-2  ">
              CREATE FORMS
            </h3>
            <button
              onClick={() => handleNavigate("/create")}
              className="border-none outline-none px-8 py-4 rounded-lg bg-[#1d2951] text-white font-bold uppercase shadow-md hover:shadow-sm hover:bg-[#2b4083] duration-300 "
            >
              ENTER
            </button>
          </div>
          <div className=" p-6 border-4 border-black bg-[#fbab60] rounded-xl">
            <h3 className="text-gray-900 text-2xl font-semibold mb-2 ">
              VIEW ALL FORMS
            </h3>
            <button
              onClick={() => handleNavigate("/forms")}
              className="border-none outline-none px-8 py-4 rounded-lg bg-[#1d2951] text-white font-bold uppercase shadow-md hover:shadow-sm hover:bg-[#2b4083] duration-300"
            >
              ENTER
            </button>
          </div>
          <div className="p-6 border-4 border-black bg-[#cca01d] rounded-xl">
            <h3 className=" font-semibold mb-2 text-gray-900 text-2xl">
              ALL STUDENTS
            </h3>
            <button
              onClick={() => handleNavigate("/students")}
              className="border-none outline-none px-8 py-4 rounded-lg bg-[#1d2951] text-white font-bold uppercase shadow-md hover:shadow-sm hover:bg-[#2b4083] duration-300"
            >
              ENTER
            </button>
          </div>
          <div className="p-6 border-4 border-black bg-[#319177] rounded-xl">
            <h3 className="font-semibold mb-2 text-gray-900 text-2xl">
              ALL FACULTY
            </h3>
            <button
              onClick={() => handleNavigate("/faculties")}
              className="border-none outline-none px-8 py-4 rounded-lg bg-[#1d2951] text-white font-bold uppercase shadow-md hover:shadow-sm hover:bg-[#2b4083] duration-300 "
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
