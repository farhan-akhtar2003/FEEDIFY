import React from 'react'
import Banner from '../../components/Faculty/Banner'
import Navbar from "../../components/Faculty/Navbar";
import QuesChartsContainer from '../../components/Faculty/QuesChartsContainer';

const Home = () => {
  return (
    <>
    <div className=" pt-[1rem] lg:pt-[2rem] overflow-hidden">
      {/* <Navbar/> */}
      <Banner/>
      <QuesChartsContainer/>
    </div>
    </>
  )
}

export default Home