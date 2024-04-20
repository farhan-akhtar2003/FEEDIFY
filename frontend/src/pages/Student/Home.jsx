import Banner from "../../components/Student/Banner";
import Forms from "../../components/Student/Forms";

function Home() {
  return (
    <>
      <div className=" pt-[1rem] lg:pt-[3rem] overflow-hidden">
        {/* <Navbar/> */}
        <Banner />
        <Forms />
      </div>
    </>
  );
}

export default Home;
