import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import AllPosts from "../../Redux/AllPosts";
import { BsArrowRightShort, BsArrowLeftShort, BsCalendarDateFill } from 'react-icons/bs'
import { FaComments, } from 'react-icons/fa'
import Loading from './Loading';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import EditorsPick from "../../Containers/EditorsPick";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { IoSendSharp } from "react-icons/io5";

const ShowingPosts = () => {
  const [username, setusername] = useState("")
  const [loading, setloading] = useState(false)
  const [email, setemail] = useState("")
  const [postContent, setpostContent] = useState("")
  const [AllComments, setAllComments] = useState([]);
  // const [showInp, setshowInp] = useState(false)  
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Scroll to the top when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const { fetchingSuccessful } = useSelector((state) => state.AllPosts);
  // console.log("AllPosts from viewOne :", fetchingSuccessful)

  const { id } = useParams();
  // console.log("PostId :", id)

  // Get all comments
  useEffect(() => {
    fetch(`http://localhost:5100/Api/Comments/allComments/${id}`)
      .then(res => res.json())
      .then(data => {
        const allComments = data.comments;
        setAllComments(allComments);
        // console.log("All Comments for singlePost Post :", allComments);
      })
      .catch(error => {
        console.error("Error fetching comments:", error);
        // Handle the error as needed
      });
  }, [AllComments]);

  const singlePost = fetchingSuccessful.find((post) => post._id === id);

  // console.log("Single Post:", singlePost);
  const [showLoading, setShowLoading] = useState(true);

  // getting the other images array
  const OtherImages = singlePost.OtherImages



  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (showLoading) {
    return <Loading />;
  }

  if (!singlePost) {
    return <div className="w-full h-[80vh] flex flex-col items-center justify-center text-4xl text-slate-600 bg-[#142030]"><h1>Post not found</h1>
      <p className="text-xl text-slate-500 mt-5">The post you are looking for is not available</p>
      <p className="text-xl ">Go back to <Link className="text-blue-400" to="/">Home</Link> </p>
    </div>;
  }



  const postIndex = fetchingSuccessful.findIndex(post => post._id === singlePost.id);

  // const showPreviousButton = postIndex > 0;
  // const showNextButton = postIndex < fetchingSuccessful.length - 1;

  // Moving to the next Post Onclick of next
  const nextPostIndex = postIndex + 1;
  const PreviousPostIndex = postIndex - 1;

  const hasNextPost = nextPostIndex > 0 && nextPostIndex < fetchingSuccessful.length - 1;
  const hasPreviousPost = PreviousPostIndex > 0 && PreviousPostIndex < fetchingSuccessful.length - 1;



  // Posting data
  const postingData = {
    Username: username,
    Email: email,
    PostContent: postContent,
    commentedPostId: id
  };

  // Posting endpoint
  const postEndpoint = `http://localhost:5100/Api/Comments/postComment`;

  // Posting comments
  const handlePostComment = async () => {
    if (!username || !email || !postContent) {
      toast.error("Input fields cannot be empty");
    } else {
      setloading(true);
      try {
        const response = await axios.post(postEndpoint, postingData);
        console.log(response.data);
        toast.success("Post Uploaded Successfully");
      } catch (error) {
        console.error("Error posting comment:", error);
        toast.error("Error posting comment");
      } finally {
        setusername("");
        setemail("");
        setpostContent("");
        setloading(false);
      }
    }
  };
  // const replyToComment = (id) => {
  //   console.log(id)
  //   if (editingCommentId === id) {
  //     setEditingCommentId(null);
  //   }
  // }
  const handleReply = () => {
    // Handle the submission of the reply here.
    // You can use the 'replyText' state to access the reply content.
    console.log(`Reply submitted for comment ID ${editingCommentId}: ${replyText}`);
    

    // Reset the reply input field and editingCommentId
    setReplyText('');
    setEditingCommentId(null);
  };

  const replyToComment = (commentId) => {
    console.log(commentId)
  };


  return (
    <div className="bg-[#142030] w-full h-full ">
      <div className="container max-w-[1100px] px-4 mx-auto  py-6">
        <div className="bg-[#5469d4] w-full p-8">
          <h1 className="text-2xl md:text-4xl text-slate-200 text-center">{singlePost.Category.toUpperCase()}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 ">
            <div className="bg-opacity-20 bg-gray-500 p-4 h-fit">
              <img src={singlePost.PostImage} className="w-full h-full" alt="" />
              <div className="p-5">
                <p className=" z-5  bg-[#5469d4] hover:bg-[#5870eb] py-1 px-8 my-5  text-slate-200 w-fit">
                  {singlePost.Category}
                </p>
                <h1 className="text-slate-200 text-xl md:text-2xl  font-bold">{singlePost.Title}</h1>

                <div className="flex items-center w-full justify-between md:w-[70%] mt-4 gap-2 md:gap-6  ">
                  <div className="text-sm flex items-center gap-4 text-slate-400">
                    <img className="w-[40px] h-[40px] rounded-full" src={singlePost.AuthorImage} alt="" />
                    {singlePost.Author}
                  </div>
                  <p className="text-sm flex items-center gap-1 text-slate-400"><BsCalendarDateFill /> {singlePost.date}</p>
                  <p className="text-sm hidden md:flex items-center gap-2 text-slate-400">
                    <FaComments /> {AllComments?.length}
                    <span className="ml-[1px]">Comments</span>
                  </p>
                </div>

                <p className="text-lg my-8 text-slate-400 border-l-2  border-[#5870eb] pl-2">{singlePost.PostContent}</p>

                <div>
                  <h2 className="text-[#5870eb] text-2xl font-bold font-serif mt-8">Other Images </h2>
                  {OtherImages && OtherImages.map((image, index) => (
                    <img key={index} src={image} alt={`Other Image ${index}`} className="w-full mt-4" />
                  ))}

                </div>

                <div className="flex items-center justify-between relative mb-4">
                  {hasPreviousPost && (
                    <Link to={`/posts/${fetchingSuccessful[PreviousPostIndex]._id}`} className="text-lg my-8 flex items-center text-slate-200 px-3 py-1 rounded-sm bg-[#5870eb] pl-2">
                      <BsArrowLeftShort /> Previous Post
                    </Link>
                  )}
                  {hasNextPost && (
                    <Link to={`/posts/${fetchingSuccessful[nextPostIndex]._id}`} className="text-lg my-8 flex items-center text-slate-200 px-3 py-1 rounded-sm bg-[#5870eb] pl-2">
                      Next Post <BsArrowRightShort />
                    </Link>
                  )}
                </div>

                {/* comments */}
                <b className="text-slate-100 mb-4  font-extrabold text-lg border-b-4 border-[#5469d4]">{AllComments?.length} Comments</b>
                {Array.isArray(AllComments) && AllComments.length > 0 ? AllComments.map((comment) => (
                  <div key={comment._id}>
                    <div className="flex items-center justify-between gap-6 my-4" >
                      <div className="flex items-center gap-3">
                        <div>
                          <img className="w-[40px] h-[40px] rounded-full" src={comment.CommentAuthorImage} alt="" />
                        </div>
                        <div>
                          <b className="text-slate-200 text-sm md-text-md">{comment.CommentAuthor}</b>
                          <p className="text-sm hidden md:block text-slate-500">{comment.date}</p>
                          <p className="text-slate-400 text-xs md-text-md">{comment.CommentPosted}</p>
                          <div onBlur={() => replyToComment(comment._id)}>
                            {editingCommentId === comment._id ? (
                              <div className="flex gap-4 items-center justify-between">
                                <input
                                  type="text"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  className="border-b border-l-1 p-1 text-slate-300 shadow-lg outline-none mt-2  border-[#5469d4] bg-transparent placeholder-slate-300 placeholder:text-sm placeholder-opacity-50"
                                  placeholder="Reply to comment..."
                                  style={{ borderStyle: "none none solid none" }}
                                />
                                <div onClick={handleReply} title="send" className="pt-4">
                                  <IoSendSharp  className="text-[#5469d4]" size={20} />
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div >
                        <button onClick={() => {
                          setEditingCommentId(comment._id)
                        }}

                          className="bg-[#142030] hover:bg-[#212c3a] shadow-lg text-white py-2 px-5 font-light text-sm">
                          Reply
                        </button>
                      </div>
                    </div>
                    {comment.Replies.length > 0 ? (<p className="text-sm text-slate-400 pl-16 mt-[-10px]">{comment.Replies.length} reply</p>) : null}
                  </div>
                )) : null}
                {/* End of comments */}

                {/* Post a comment */}
                <div className="bg-opacity-20 bg-gray-500 px-4 py-8 mt-5 h-fit">
                  <h1 className="text-slate-400 tet-2xl">Post A Comment</h1>
                  <div className="grid text-center">
                    <div className="grid md:grid-cols-2 gap-4 my-4">
                      <div className="grid text-start">
                        <label className="text-slate-300" htmlFor="name">Username</label>
                        <input
                          onChange={(ev) => setusername(ev.target.value)}
                          value={username}
                          type="text"
                          placeholder="Enter Name"
                          className="w-full rounded-sm focus-ring focus:ring-2 ring-[#5870eb] outline-none p-2 bg-slate-400 text-white"
                        />
                      </div>
                      <div className="grid text-start">
                        <label className="text-slate-300" htmlFor="email">Email</label>
                        <input
                          onChange={(ev) => setemail(ev.target.value)}
                          value={email}
                          type="text"
                          placeholder="Enter Email"
                          className="w-full rounded-sm focus-ring focus:ring-2 ring-[#5870eb] outline-none p-2 bg-slate-400 text-slate-100"
                        />
                      </div>
                    </div>
                    <div className="grid text-start">
                      <label className="text-slate-300" htmlFor="comment">Comment</label>
                      <textarea onChange={(ev) =>
                        setpostContent(ev.target.value)}
                        value={postContent}
                        placeholder="Enter Your Sujestion " name="" className="w-full rounded-sm focus-ring focus:ring-2 ring-[#5870eb] outline-none p-2  bg-slate-400 text-white" id="" cols="30" rows="5"></textarea>
                    </div>

                  </div>
                  <button onClick={handlePostComment} className="text-sm my-8 flex items-center text-slate-200 px-5  py-2 mx-auto rounded-sm  bg-[#142030] hover:bg-[#212c3a] shadow-lg pl-2">{loading ? "Loading..." : "Post Comment"}</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <EditorsPick />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShowingPosts;
