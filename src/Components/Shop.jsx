import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import element1 from '../assets/element1.svg'
import element2 from '../assets/element2.svg'
import element3 from '../assets/element3.svg'
import element4 from '../assets/element4.svg'
import element5 from '../assets/element5.svg'
import { IoIosSearch } from "react-icons/io";
import Loading from './Loading'
import { TbStarFilled } from "react-icons/tb";
const Shop = () => {
  const [receivedData, setReceivedData] = useState([])
  useEffect(() => {
    const getAllProduct = async () => {
      const response = await axios.get(" http://localhost:9197/AllProducts")
      console.log("AllProducts : ", response.data)
      setReceivedData(response.data)
    }
    getAllProduct()
  }, [])

  return (
    <div className="bg-[#142030] w-full h-full">
      {/* Hero section */}
      <section className=" hero h-screen flex-col flex " id="hero">
        <div className=" container mx-auto">
          <div className=" flex flex-col   text-white justify-center place-content-center">
            <div className="absolute top-28 md:top-28 left-6 md:left-28 ">
              <img src={element1} alt="" className=" w-10" />
            </div>
            <div className="absolute right-6 md:right-28 top-28 ">
              <img src={element2} alt="" className='w-10' />
            </div>
            <div className=" text-primary1 text-4xl md:text-5xl font-semibold  pb-8  mt-8">
              <h1 className="text-center leading-tight line-h-30 ">A Borderless <br /> <span className="text-center">Shoppping Experience</span></h1>
            </div>
            <div className="text-center text-1xl  text-gray-400 pb-3  ">
              <p className="text-sm font-medium">Expressing gratitude, thoughts and heartfelt emotions without border barriers. </p>
            </div>
            <div className="absolute   hidden md:flex  top-[34rem]   left-[35rem] ">
              <img src={element4} alt="" className='w-10' />
            </div>
            <div className="absolute top-[32rem]  right-6 md:right-32 ">
              <img src={element3} alt="" className="w-10" />
            </div>

            <div className="mt-8 flex items-center justify-center mb-10">
              <Link className="rounded shadow-md shadow-black font-500  bg-[#5469d4]   text-white  font-light p-2  w-auto px-16" to='/sign-up' >Get Started</Link>
            </div>


            <div className="relative w-1/2 mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-1">
                {/* Select Dropdown */}
                <select
                  className="bg-gradient bg-[#5469d4] p-2 text-white text-center rounded-full w-auto"
                >
                  <option value="all">All</option>
                  <option value="shoes">Shoes</option>
                  <option value="clothes">Clothes</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <input
                type="text"
                placeholder="Search Products..."
                className="text-black text-xs border-none shadow-md outline-none bg-white focus:border-none w-full py-4 pl-28  rounded-full placeholder-black::placeholder"

              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                {/* Search Icon */}
                <div className="rounded-full p-2 bg-[#5469d4]" >
                  <IoIosSearch className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute top-[32rem] left-3 md:left-32">
              <img src={element5} alt="" className='w-10' />
            </div>
          </div>
        </div>
      </section>

      {/* Product section */}
      <div className='max-w-[1100px] mx-auto'>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receivedData && receivedData.length > 0 ? (
            receivedData.map((item, index) => (
              <div key={index} className='p-4 rounded-md shadow-lg w-fit'>
                <div className="w-[250px] h-[250px]"><img className="w-full h-full background-center object-cover" src={item.productImg} alt={`Product ${index}`} /></div>
                <div className='flex items-center justify-between gap-4'>
                  <p className="text-white font-bold p-2">{item.ProductName}</p>
                  <p className="text-white p-2">₦ {item.ProductPrice}</p>
                 
                </div>
                <p className="text-white p-2">{item.Category}</p>
                <div className='flex items-center justify-around gap-2 w-1/2 text-gray-500 pl-2 '><TbStarFilled size={30} />  <TbStarFilled size={30} /> <TbStarFilled size={30} /> <TbStarFilled size={30} /> <TbStarFilled size={30} /></div>
                <button className="rounded shadow-md shadow-black font-500  bg-[#5469d4]   text-white  font-light p-2  w-full px-16 m-2"> Buy Now </button>
              </div>
            ))
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Shop