import { Link } from "react-router-dom";
import Banner from "../../components/Admin/Banner";

function Home() {
  return (
    <>
      <div className=" pt-[1rem] lg:pt-[2rem] overflow-hidden">
        {/* <Navbar/> */}
        <Banner />
        <div className="flex justify-center">
          <Link to="/create" className="btn hover:bg-[#1d2951]">
            Get Started, Create Feedback forms
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
