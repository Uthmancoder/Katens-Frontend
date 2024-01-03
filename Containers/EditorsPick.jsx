import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../src/Components/PostCard"
import PostDetails from "../src/Components/PostDetails"
import Loading from "../src/Components/Loading";
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { AiFillYoutube, AiFillLinkedin } from 'react-icons/ai'
import { BsCalendarDateFill } from 'react-icons/bs'
// import fetchingSuccessful from "../../Redux/AllPosts";
import { useSelector } from "react-redux";

const EditorsPick = () => {
    const [AllComments, setAllComments] = useState([]);
    const { fetchingSuccessful } = useSelector((state) => state.AllPosts)
    // console.log("Fetching Successfull Array :", fetchingSuccessful)

    useEffect(() => {
        fetch("http://localhost:5100/Api/Comments/allComments")
            .then(res => res.json())
            .then(data => {
                const allComments = data.allComments;
                setAllComments(allComments);
                // console.log("All Comments from Posts :", data.allComments);
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
                // Handle the error as needed
            });
    }, []);

    //  console.log("All Comments from Editor'sPiick :", AllComments);
    // Setting Editor's Pick
    const [EditorsPick, setEditorsPick] = useState(null);

    useEffect(() => {
        if (fetchingSuccessful && fetchingSuccessful.length > 0) {
            // Select the last post in the array as the latest post
            const lastPost = fetchingSuccessful[fetchingSuccessful.length - 2];
            setEditorsPick(lastPost);
        }
    }, [fetchingSuccessful]);


    if (!fetchingSuccessful) {
        return (
            <Loading />
        )
    }
    // declaring the LatestPost Array
    const latestPosts = fetchingSuccessful.slice(0, 5)

    // declaring the Editor's Pick Array
    const AllEditorsPick = fetchingSuccessful.slice(4, 9)

    return (
        <div>
            <div className=" col-span-2 md:col-span-1 p-4 bg-opacity-20 bg-gray-500 h-fit text-white">
                <div className="bg-[#142030] w-full p-2 text-md pl-6 text-white">Editors Pick</div>
                {EditorsPick && (
                    <div className="latest-post my-3 ">
                        <div className="my-3">
                            <PostCard className="relative w-full h-[200px] overflow-hidden z-10" image={EditorsPick.PostImage} category={EditorsPick.Category} />
                        </div>
                        <Link to={`/posts/${EditorsPick._id}`}>
                            <PostDetails
                                title={EditorsPick.Title}
                                author={EditorsPick.Author}
                                date={EditorsPick.date}
                                comments={
                                    (AllComments.find(comment => comment.postId === EditorsPick._id)?.comments.length || 0) + " Comments"
                                }
                                postContent={EditorsPick.PostContent}
                            />
                        </Link>
                    </div>
                )}

                <div>
                    {AllEditorsPick.map((post) => (
                        <div key={post._id} className=" my-8 ">
                            <div className="grid grid-cols-2 gap-4  w-full">
                                <div > <img className="w-full md:h-[100px]" src={post.PostImage} alt="" /></div>
                                <div className="grid gap-2">
                                    <Link to={`/posts/${post._id}`} className="font-bold text-md hover:text-[#5469d4] cursor-pointer">{post.Title}</Link>
                                    <div className="flex items-center justify-between my-1">
                                        <p className="text-sm flex items-center gap-2 text-slate-400"><BsCalendarDateFill /> {post.date}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    {EditorsPick && (
                        <div className="latest-post my-3 ">
                            <div className="my-3">
                                <PostCard className="relative w-full h-[200px] overflow-hidden" image={EditorsPick.PostImage} category={EditorsPick.Category} />
                            </div>
                            <Link to={`/posts/${EditorsPick._id}`}>
                                <PostDetails title={EditorsPick.Title} author={EditorsPick.Author} date={EditorsPick.date} comments={
                                    (AllComments.find(comment => comment.postId === EditorsPick._id)?.comments.length || 0) + " Comments"
                                } postContent={EditorsPick.PostContent} />
                            </Link>
                        </div>
                    )}
                </div>


                {/* NewsLetter Part */}
                <div className="Newsletter mt-8">
                    <div className="p-2 w-full bg-[#142030] ">Newsletter</div>
                    <p className="text-slate-400 my-4">Here, I focus on a range of items andfeatures that we use in life without giving them a second thought.</p>
                    <div className="subscribe border border-slate-400 flex items-center justify-center w-fit">
                        <input className="p-2 border-none outline-none text-black " type="Email" placeholder="Email Address" />
                        <button className="shadow-lg border-[#5469d4]  bg-[#4a5fc9] cursor-pointer p-2 px-4  pb-2">Subscribe</button>
                    </div>

                    <p className="mt-4 text-slate-400">You can unsubscribe us at any time</p>
                </div>


                {/* Popular Posts */}

                <div className="PopularPosts mt-8">
                    <div className="p-2 w-full bg-[#142030] ">Most Popular</div>
                    {latestPosts.map((post) => (
                        <div key={post._id} className=" my-4 ">
                            <div className="grid grid-cols-2 gap-4  w-full">
                                <div > <img className="w-full h-[100px]" src={post.PostImage} alt="" /></div>
                                <div className="grid gap-2">
                                    <Link to={`/posts/${post._id}`} className="font-bold text-md hover:text-[#5469d4] cursor-pointer">{post.Title}</Link>
                                    <div className="flex items-center justify-between my-1">
                                        <p className="text-sm flex items-center gap-2 text-slate-400"><BsCalendarDateFill /> {post.date}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Social Networks */}

                <div className="p-2 w-full bg-[#142030] ">Social Network</div>
                <Link className="social bg-blue-500 p-1 flex  items-stretch my-3 " to="https://web.facebook.com/UthmanCoder?mibextid=ZbWKwL&_rdc=1&_rdr" >
                    <FaFacebookSquare size={25} className="mx-2" />
                    <p className="border-l border-r px-12 likes">983 Likes</p>

                    <p className="px-1">Like Our Page</p>
                </Link>
                <Link to="https://twitter.com/uthmancoder" className="bg-[#69C9FF] p-1 flex twit items-stretch my-3">
                    <FaTwitterSquare size={25} className="mx-2" />
                    <p className="border-l border-r px-6 likes" >983 Followers</p>

                    <p className="px-1">Like Our Page</p>
                </Link>
                <Link to="https://www.youtube.com/channel/UCUttTeCr-qQk_wyBTjjUYJA" className="bg-red-500 youtube p-1 flex items-stretch my-3">
                    <AiFillYoutube size={25} className="mx-2" />
                    <p className="border-l border-r px-12 likes">983 Likes</p>

                    <p className="px-1">Like Our Page</p>
                </Link>
                <Link to="https://www.linkedin.com/in/adebayo-uthman-024494259" className="bg-[#0A66C2] linkedin p-1 flex items-stretch my-3">
                    <AiFillLinkedin size={25} className="mx-2" />
                    <p className="border-l border-r px-12 likes" >983 Likes</p>

                    <p className="px-1">Like Our Page</p>
                </Link>
            </div>
        </div>
    )
}

export default EditorsPick