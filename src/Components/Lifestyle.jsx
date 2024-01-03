import { useEffect } from "react"
import Loading from "./Loading"
// import AllPosts from "../../Redux/AllPosts"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import PostCard from "./PostCard"
import PostDetails from "./PostDetails"
import EditorsPick from "../../Containers/EditorsPick"
const LifeStyle = () => {
    // Scroll to the top when the component is mounted
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { isFetching, fetchingSuccessful } = useSelector((state) => state.AllPosts)
    if (isFetching) {
        return (
            <Loading />
        )
    }
    // console.log("From Lifestyle :", fetchingSuccessful)

    // Filter posts based on the category (e.g., 'lifestyle')
    const lifestylePosts = fetchingSuccessful.filter((post) => post.Category === 'Lifestyle');

    console.log("Lifestyle Posts:", lifestylePosts);

    // declaring the Date Object
    const date = new Date()
    const dateNow = date.toDateString()
    console.log(dateNow);
    return (
        <div className="bg-[#142030] w-full h-full  px-4 md:px-16 py-8">
            <div className="bg-[#5469d4] w-full p-8  ">
                <h1 className="text-2xl md:text-4xl text-slate-200 text-center">LIFESTYLES</h1>
            </div>
            <div className=" grid md:grid-cols-3 gap-6 mt-8  ">
                <div className="col-span-2 bg-opacity-20 bg-gray-500 p-4 h-fit">
                    <div className="w-full my-5">
                        {lifestylePosts && lifestylePosts.map((post) => (
                            <div key={post.id} className="latest-post grid md:grid-cols-2 gap-4">
                                <div className="my-3">
                                    <PostCard className="relative w-full h-[200px] overflow-hidden " image={post.PostImage} category={post.Category} />
                                </div>
                                <Link to={`/posts/${post._id}`} className="mt-6">
                                    <PostDetails title={post.Title} author={post.Author} date={post.date} comments="0 Comment" postContent={post.PostContent} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <EditorsPick />
                </div>
            </div>
        </div>
    )
}
export default LifeStyle