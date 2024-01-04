import { useState, useEffect } from "react"
import PostCard from "./PostCard"
import PostDetails from "./PostDetails"
import useFetch from "./UseFetch"
import { BsFillPersonFill, BsCalendarDateFill } from 'react-icons/bs'
import { FaComments, } from 'react-icons/fa'
import { Link } from "react-router-dom"
import Loading from "./Loading"
// import fetchingSuccessful from "../../Redux/AllPosts"
import { useSelector } from "react-redux"
import EditorsPick from "../../Containers/EditorsPick"


const Posts = () => {
    const [AllComments, setAllComments] = useState([]);
    const [RelevantStories, setRelevantStories] = useState(null);
    const { data, error } = useFetch("https://ultimate-app.onrender.com/Api/GetAllPost")

    useEffect(() => {
        fetch("https://ultimate-app.onrender.com/Api/Comments/allComments")
            .then(res => res.json())
            .then(data => {
                const allComments = data.allComments;
                setAllComments(allComments);
                // console.log("All Comments from Posts :", data.allComments);
            })
            .catch(error => {
                // console.error("Error fetching comments:", error);
                // Handle the error as needed
            });
    }, []);



    // console.log("data from posts : ", data,);
    const { fetchingSuccessful } = useSelector((state) => state.AllPosts)
    // console.log("Fetching Successfull Array :", fetchingSuccessful// )

    useEffect(() => {
        if (fetchingSuccessful && fetchingSuccessful.length > 0) {
            // Select the last post in the array as the latest post
            const RelevantPost = fetchingSuccessful[fetchingSuccessful.length - 1];
            setRelevantStories(RelevantPost);
        }
    }, [fetchingSuccessful]);

    if (!fetchingSuccessful) {
        return (
            <Loading />
        )
    }



    // console.log(error);
    // declaring the LatestPost Array
    const latestPosts = fetchingSuccessful.slice(0, 5)


    // declaring the PopularPost Pick Array
    const PopularPosts = fetchingSuccessful.slice(7, 9)

    // declaring the Date Object
    // const date = new Date()
    // const dateNow = date.toDateString()
    // console.log(dateNow);

    // Sort the data array in reverse order to start from the last post
    const reversedData = fetchingSuccessful.slice().reverse();

    // Get the four latest posts
    const ToplatestPosts = reversedData.slice(0, 4);


    return (
        <div>
            <div className=" grid md:grid-cols-3 gap-6 ">
                <div className="col-span-2">
                    <div className="bg-opacity-20 bg-gray-500 p-4 h-fit">
                        <div className="bg-[#142030] w-full p-2 pl-6 text-md text-white">Don’t Miss</div>
                        <div className="w-full">
                            {latestPosts.map((post) => (
                                <div key={post._id} className="grid md:grid-cols-2 gap-4 my-6 ">
                                    <div className=" " ><PostCard className="relative w-full h-[200px] overflow-hidden" image={post.PostImage} category={post.Category} /></div>
                                    <Link to={`/posts/${post._id}`} className="md:mt-5 ">
                                        <PostDetails
                                            title={post.Title}
                                            author={post.Author}
                                            date={post.date}
                                            comments={
                                                (AllComments.find(comment => comment.postId === post._id)?.comments.length || 0) + " Comments"
                                            }
                                            postContent={post.PostContent}
                                        />
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className="bg-opacity-20 bg-gray-500 p-4 h-fit mt-6">
                        <div className="bg-[#142030] w-full p-2 pl-6 text-md text-white">Relevant Stories </div>
                        <div className="w-full my-5">
                            {RelevantStories && (
                                <div className="latest-post relative h-full md:h-[350px]">
                                    <img className="w-[100%] h-[100%] " src={RelevantStories.PostImage} alt="Latest Post" />
                                    <Link to={`/posts/${RelevantStories._id}`} className="absolute hover:text-[#4a5fc9] bottom-[15%] left-5 md:left-8 text-sm cursor-pointer  md:text-xl lg:text-3xl font-bold">{RelevantStories.Title}</Link>
                                    <div className="flex items-center justify-between md:w-[50%] gap-2 md:gap-6 absolute bottom-1 md:bottom-[4%] left-4 md:left-8 ">
                                        <p className="text-sm flex items-center gap-1 text-slate-400"> <BsFillPersonFill />{RelevantStories.Author}</p>
                                        <p className="text-sm flex items-center gap-1 text-slate-400"><BsCalendarDateFill /> {RelevantStories.date}</p>
                                        <p className="text-sm flex items-center gap-1 text-slate-400"> <FaComments /> {
                                            AllComments.find(comment => comment.postId === RelevantStories._id)?.comments.length + "   Comments" || 0
                                        }</p>
                                    </div>
                                    <h2 className="absolute bottom-[28%] left-8 border shadow-lg border-[#5469d4]  bg-[#4a5fc9] cursor-pointer pt-1 px-8 hover:rounded-md pb-2">{RelevantStories.Category}</h2>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {PopularPosts && PopularPosts.map((post) => (
                                <div key={post._id} className="latest-post">
                                    <div className="my-3">
                                        <PostCard className="relative w-full h-[200px] overflow-hidden" image={post.PostImage} category={post.Category} />
                                    </div>
                                    <Link to={`/posts/${post._id}`}>
                                        <PostDetails title={post.Title} author={post.Author} date={post.date} comments={
                                            (AllComments.find(comment => comment.postId === post._id)?.comments.length || 0) + " Comments"
                                        } postContent={post.PostContent} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*   Latest articles */}
                    <div className="bg-opacity-20 bg-gray-500 p-4 h-fit mt-5">
                        <div className="bg-[#142030] w-full p-2 pl-6 text-md text-white">Latest Articles </div>
                        <div className="w-full">
                            {ToplatestPosts.map((post) => (
                                <div key={post._id} className="grid md:grid-cols-2 gap-4 my-6 ">
                                    <div className=" " ><PostCard className="relative w-full h-[200px] overflow-hidden" image={post.PostImage} category={post.Category} /></div>
                                    <Link to={`/posts/${post._id}`} className="md:mt-5 "> <PostDetails title={post.Title} author={post.Author} date={post.date} comments={
                                        (AllComments.find(comment => comment.postId === post._id)?.comments.length || 0) + " Comments"
                                    } postContent={post.PostContent} /></Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Second Part */}
                <EditorsPick />
            </div>
        </div>
    )
}
export default Posts