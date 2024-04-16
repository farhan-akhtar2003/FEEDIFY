import { Link } from "react-router-dom";
import Banner from "../../components/Student/Banner";

function Home() {
  return (
    <>
      <div className=" pt-[1rem] lg:pt-[2rem] overflow-hidden">
        {/* <Navbar/> */}
        <Banner />

      </div>
    </>
  );
}

export default Home;
