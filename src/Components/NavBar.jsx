import { useState, useEffect } from "react"
import { NavLink, Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineClose, AiFillYoutube } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'


const NavBar = () => {

    const navigate = useNavigate()

    const [logState, setLogState] = useState(false);

    useEffect(() => {
        const userStatus = localStorage.getItem("loggedIn");
        console.log("user Status : ", userStatus)
        if (userStatus === "true") {
            setLogState(true);
        }
    }, []);

    const [open, setOpen] = useState(false)
    const goToHome = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleMenu = () => {
        setOpen(!open)
    }
    const links = [
        { name: "Home", href: "/", id: 1 },
        { name: "lifestyle", href: "/lifestyle", id: 2 },
        { name: "culture", href: "/culture", id: 3 },
        { name: "Fashion", href: "/Fashion", id: 4 },
        { name: "Shop", href: "/Shop", id: 5 },
    ]

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
    
        if (confirmLogout) {
            // User clicked "OK"
            localStorage.removeItem("loggedIn");
            navigate("/")
            setLogState(false);
        } else {
            navigate("/")

        }
    };
    
    return (
        <div>
            <div className="flex items-center justify-between sticky top-0 z-[999] text-white w-full  mx-auto navbar pt-5 pb-2 md:pt-1 md:pl-20 px-3 md:px-0  bg-[#142030]  " >
                <div className="logo ">
                    <Link onClick={goToHome} to="/" id="home" className="text-4xl font-extrabold"> Katen <span className="text-[#5469d4]">.</span></Link>
                </div>

                <div className="links hidden md:flex items-center mt-2">
                    {links.map((link) => (
                        <ul key={link.id} className="">
                            <li>
                                <NavLink
                                    className="p-4 NavLink hover:text-[#5469d4]"
                                    to={link.href}
                                    activeClassName="active" // Specify the active class
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        </ul>
                    ))}
                </div>



                <div className="connect hidden  md:flex items-center mt-2 gap-3 ">
                    <ul className="flex items-center ">
                        <li className="p-3 hover:text-[#5469d4]"><Link to="https://web.facebook.com/UthmanCoder?mibextid=ZbWKwL&_rdc=1&_rdr"><FaFacebook /></Link></li>
                        <li className="p-3 hover:text-[#5469d4]"> <Link to="https://twitter.com/uthmancoder"><FaTwitter /></Link></li>
                        <li className="p-3 hover:text-[#5469d4]"> <Link to="https://www.youtube.com/channel/UCUttTeCr-qQk_wyBTjjUYJA"><AiFillYoutube /></Link> </li>
                        <li className="p-3 hover:text-[#5469d4]"> <Link to="https://www.linkedin.com/in/adebayo-uthman-024494259"><FaLinkedin /></Link></li>
                    </ul>

                    {logState ? <div className="flex items-center gap-4">
                        <Link to="/createPost"> <button className="bg-[#5469d4] hover:bg-[#4a5fc9] text-white pt-1 pb-2 px-5 rounded-md  ">Create a post</button> </Link>
                        <Link onClick={handleLogout} to="/"> <button className="bg-[#5469d4] hover:bg-[#4a5fc9] text-white pt-1 pb-2 px-5 rounded-md  ">Logout</button></Link>
                    </div> : <Link to="/login"> <button className="bg-[#5469d4] hover:bg-[#4a5fc9] text-white pt-1 pb-2 px-5 rounded-md  ">Login</button></Link>}
                </div>

                <div onClick={handleMenu}>
                    {!open ? <AiOutlineMenu size={30} className="md:hidden hover:text-[#5469d4]" /> : <AiOutlineClose size={30} className="md:hidden hover:text-[#5469d4]" />}
                </div>
            </div>

            {/* small Page Nav */}
            <div className={open ? "  w-[60%] fixed text-white  top-0 left-0 duration-200 ease-in-out shadow-lg bg-[#142030] h-screen   p-3 " : "  w-[60%] fixed text-white  top-0 left-[-60%] shadow-lg bg-[#142030] h-screen   p-3"}>
                <div className="logo m-5">
                    <h1 className="text-4xl font-extrabold"> Katen <span className="text-[#5469d4]">.</span></h1>
                </div>

                <div className="links grid items-center gap-4" >
                    {links.map((link) => (
                        <ul key={link.id} className="border-b border-slate-400 p-4">
                            <li><Link className="p-5 hover:text-[#5469d4]" to={link.href}>{link.name}</Link></li>
                        </ul>
                    ))}
                </div>

                <div className="links grid items-center ">
                    <ul className="flex items-center py-4">
                        <li className="p-3 hover:text-[#5469d4]"><Link to="https://web.facebook.com/UthmanCoder?mibextid=ZbWKwL&_rdc=1&_rdr"><FaFacebook /></Link></li>
                        <li className="p-3 hover:text-[#5469d4]"> <Link to="https://twitter.com/uthmancoder"><FaTwitter /></Link></li>
                        <li className="p-3 hover:text-[#5469d4]"> <Link to="https://www.youtube.com/channel/UCUttTeCr-qQk_wyBTjjUYJA"><AiFillYoutube /></Link> </li>
                        <li className="p-3 hover:text-[#5469d4]"> <Link to="https://www.linkedin.com/in/adebayo-uthman-024494259"><FaLinkedin /></Link></li>
                    </ul>
                </div>
                <Link to="/login">    <button className="bg-[#5469d4] text-white pt-1 pb-2 px-5 rounded-md w-[75%]   ">Login</button></Link>
            </div>
        </div>
    )
}

export default NavBar
