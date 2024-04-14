import { Link } from "react-router-dom";
import banner from "../../assets/banner.svg";
import features from "../../assets/features.svg";

function Home() {
  return (
    <div className="pt-20">
      {" "}
      {/* Adding padding top to accommodate the navbar */}
      <div className="container mx-auto">
        <div className="section flex items-center justify-between mb-20">
          <img src={banner} alt="banner" className="w-1/2" />
          <div className="content w-1/2">
            <h1 className="text-5xl font-bold text-n-4 mb-6">
              Create, Share <span className="text-primary">forms</span> easily
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Formale lets you create forms super simply. All you need to do is
              create a free account and you'll be all set. You can share the
              link of your form with others and see their submissions. It's
              suitable for online MCQ exams and for job recruitments.
            </p>
            <Link to="/create" className="btn">
              Get Started
            </Link>
          </div>
        </div>
        <div className="section flex items-center justify-between">
          <div className="content w-1/2">
            <h1 className="text-3xl font-bold mb-6">Why choose us</h1>
            <p className="text-lg text-gray-600 mb-8">
              <span className="li">Easy to use</span>
              <span className="li">100% free</span>
              <span className="li">Share with friends</span>
              <span className="li">No login required for submitting forms</span>
              <span className="li">Supports media files</span>
            </p>
          </div>
          <img src={features} alt="features" className="w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default Home;
