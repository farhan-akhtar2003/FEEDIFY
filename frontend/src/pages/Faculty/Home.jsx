import React from 'react'
import Banner from '../../components/Faculty/Banner'
import Forms from '../../components/Faculty/Forms'

const Home = () => {
  return (
    <>
    <div className=" pt-[1rem] lg:pt-[3rem] overflow-hidden">
      <Banner/>
      <Forms/>
    </div>
    </>
  )
}

export default Home