import { useEffect } from "react"
import HeroSection from "../src/Components/HeroSection"
import Posts from "../src/Components/Posts"
import { Tooltip } from "@mui/material"
import { FaAngleUp } from 'react-icons/fa'

function Home() {
  // Scroll to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="root">
      <div className="max-w-[1100px] mx-auto  py-4 ">
        <HeroSection />
        <Posts /> 
        <div className="fixed bottom-[80%] right-[20%] z-[999] bg-[#5469d4] p-4 rounded-full ">
        <Tooltip title="Scroll to top">
          <div className=" "><FaAngleUp size={25} /></div>
        </Tooltip>
      </div>
      </div>
    </div>
  )
}

export default Home
