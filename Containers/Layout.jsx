import NavBar from "../src/Components/NavBar"
import Footer from "../src/Components/Footer"
import { Outlet } from "react-router-dom"
// import {AiOutlineMenu } from 'react-icons/ai'
// import { Tooltip } from "@mui/material"
// import { FaAngleUp } from 'react-icons/fa'

const Layout = () => {
  return (
    <div>
      <div className="sticky top-0 z-[999] bg-[#142030]">
        <NavBar />
      </div>
      {/* <div className="bg-[#5469d4] p-2 rounded-full fixed top-12 right-10"><AiOutlineMenu/></div> */}
      <Outlet />
      <Footer />

    </div>
  )
}

export default Layout