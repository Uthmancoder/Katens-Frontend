import { useState } from 'react'
import { IoIosImages } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const CreateBlog = () => {
    const [title, settitle] = useState("")
    const [category, setcategory] = useState("")
    const [author, setauthor] = useState("")
    const [postImage, setpostImage] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [postContent, setpostContent] = useState("")

    const Navigate = useNavigate()

    const handleFileChange = (ev) => {
        const file = ev.target.files[0]

        if (file) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setpostImage(reader.result)
            }

            reader.readAsDataURL(file)
        }
    }

    const handleMultipleFileChange = (e) => {
        const files = e.target.files;

        if (files.length > 0) {
            const filesArray = Array.from(files);

            // Use Promise.all to handle multiple asynchronous file reading operations
            Promise.all(filesArray.map(file => readFileAsDataURL(file)))
                .then(images => {
                    setSelectedFiles(images);
                })
                .catch(error => {
                    console.error("Error reading files:", error);
                });
        }
    };

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };



    const savePost = () => {
        if (title === "" || category === "" || author === "" || postImage === "" || postContent === "") {
            toast.error("Please Fill All The Field")
            return

        }
        console.log("Posting data : ", PostData)
    }

    //  Posting Data
    const PostData = {
        Title: title,
        Category: category,
        Author: author,
        PostImage: postImage,
        PostContent: postContent,
        OtherImages: selectedFiles
    }
    const createPost = async () => {
        if (title === "" || category === "" || author === "" || postImage === "" || postContent === "") {
            toast.error("All Input fields are required!!")
            return

        }
        console.log("PostData : ", PostData);
        try {
            const response = await axios.post("https://katens-blog-backend.onrender.com/Api/CreatePost", PostData)
            console.log(response.data)
            toast.success(response.data.message)
            setTimeout(() => {
                Navigate("/")
            }, 2000);
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="w-full h-full py-16 bg-[#142030] text-white">
            <h1 className="text-slate-200 text-3xl font-bold text-center ">New Blog Post</h1>
            <div className="PostingForm w-[96%] md:w-[70%] mx-auto p-6 rounded-md shadow-xl  border border-slate-600   mt-4">
                <div className='grid md:grid-cols-2 gap-6'>
                    <div className='grid gap-2 mt-4 text-start'>
                        <label className='text-slate-400'>Title <sup className="text-[#5469d4]">*</sup> </label>
                        <input onChange={(ev) => settitle(ev.target.value)} className="bg-slate-400 text-slate-700 outline-none focus-ring focus:ring-2 ring-slate-400 p-2 rounded-md placeholder-slate-700 placeholder-opacity-50" type="text" placeholder='Enter Post Title..' />
                    </div>
                    <div className='grid gap-2 mt-4 text-start'>
                        <label className='text-slate-400'>Blog Category <sup className="text-[#5469d4]">*</sup> </label>
                        <select onChange={(ev) => setcategory(ev.target.value)} className='bg-slate-400 text-slate-700 outline-none focus-ring focus:ring-2 ring-slate-400 p-2 rounded-md' name="category" id="category">
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Culture">Culture</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Celebration">Celebration</option>
                        </select>
                    </div>
                    <div className='grid gap-2 mt-4 text-start'>
                        <label className='text-slate-400'>Blogger <sup className="text-[#3d56d1] ">*</sup> </label>
                        <input onChange={(ev) => setauthor(ev.target.value)} className="bg-slate-400 text-slate-700 focus-ring focus:ring-2 ring-slate-400 outline-none p-2 rounded-md placeholder-slate-700 placeholder-opacity-50" type="text" placeholder='Enter Post Author..' />
                    </div>
                    <div className='grid gap-2 mt-4 text-start'>
                        <label className='text-slate-400'>Attach File <sup className="text-[#3d56d1] ">*</sup> </label>
                        <div className='flex items-center justify-between gap-4 pt-2'>
                            <input
                                onChange={handleFileChange}
                                className="bg-slate-400 text-slate-700 outline-none p-2 rounded-md placeholder-slate-700 placeholder-opacity-50 placeholder:bg-transparent w-full"
                                type="file"
                                accept="image/*"
                            />
                            <div className=''>
                                {postImage ? (<img className=" w-[90px] h-[50px] rounded-md  object-cover" src={postImage} alt="" style={{ objectFit: "cover" }} />) : null}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Post Content */}
                <div className='mt-8'>
                    <textarea onChange={(ev) => setpostContent(ev.target.value)} placeholder="Enter Your Sujestion " name="" className="w-full rounded-sm focus-ring focus:ring-2 ring-slate-400 placeholder-slate-700 placeholder-opacity-50 outline-none p-2  bg-slate-400 text-slate-700" id="" cols="30" rows="5"></textarea>
                </div>
                <div className="grid md:grid-cols-2 mt-4  gap-6">
                    <div className="flex gap-2">
                        <div className="py-1">
                            <IoIosImages className="text-[#3d56d1]" size={40} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-200 ">Attach up to three images!</p>
                            <p className="text-sm text-slate-400">Enhance your post by adding images to make it more engaging and visually appealing.</p>
                        </div>
                    </div>
                    <div className="grid text-start">
                        <label className='text-slate-400'>Choose Image <sup className="text-[#3d56d1] ">*</sup> </label>
                        <div className='grid items-center justify-between gap-2 w-full'>
                            <input
                                className="bg-slate-400 text-slate-700 outline-none p-2 rounded-md placeholder-slate-700 placeholder-opacity-50"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleMultipleFileChange}
                            />

                            {/* Display image previews */}
                            <div className="mt-4 flex items-center gap-2 max-w-[300px] overflow-x-auto scrollbar-style">
                                {selectedFiles.map((imageDataUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageDataUrl}
                                        alt={`Preview ${index + 1}`}
                                        className="rounded-md w-[100px] h-[50px]border border-slate-400"
                                        style={{ height: "50px" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-4 justify-between ">
                    <button onClick={savePost} className="bg-[#3d56d1] text-white px-6 py-2 rounded-md mt-4">Save  To Collection</button>
                    <button onClick={createPost} className="bg-[#3d56d1] text-white px-6 py-2 rounded-md mt-4">Post Blog</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog