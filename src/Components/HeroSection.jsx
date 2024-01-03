import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from './UseFetch';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// import Posts from './Posts';
// import { useSelector } from "react-redux"
import { BsFillPersonFill, BsCalendarDateFill } from 'react-icons/bs'
import { FaComments } from 'react-icons/fa'
import Loading from './Loading';

const HeroSection = () => {
    const [AllComments, setAllComments] = useState([]);
    const [latestPost, setLatestPost] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0);


    const { data, error } = useFetch("http://localhost:5100/Api/GetAllPost")
    // console.log("data : ", data, "error :", error);

    useEffect(() => {
        fetch("http://localhost:5100/Api/Comments/allComments")
          .then(res => res.json())
          .then(data => {
            const allComments = data.allComments;
            setAllComments(allComments);
            // console.log("All Comments :", data.allComments);
          })
          .catch(error => {
            // console.error("Error fetching comments:", error);
            // Handle the error as needed
          });
      }, []);

      const getComment = AllComments.filter((comment) => comment.PostId === latestPost._id);
    //   console.log("Comment :", getComment);
      
      

    useEffect(() => {
        if (data && data.length > 0) {
            // Select the last post in the array as the latest post
            const lastPost = data[data.length - 1];
            setLatestPost(lastPost);
        }

    }, [data, AllComments]);

    const handleTabChange = (index) => {
        setSelectedTab(index);
    };

    const getRecentPost = [...data].reverse().slice(0, 5);
    // console.log("recent Post:", getRecentPost);


    const getCategory = (Category) => {
        const categoryPosts = data.filter((post) => post.Category === Category).reverse().slice(0, 5);
        return categoryPosts.map((post) => (
            <div key={post._id} className="post-card flex items-center gap-3 mt-[12px] w-full">
                <div>
                    <img className="w-[50px] h-[50px] rounded-full" src={post.AuthorImage} alt="Author" />
                </div>
                <div>
                    <h3>{post.Title}</h3>
                </div>
            </div>
        ));
    };

    return (
        <div>
            {!data || data.length === 0 ? <Loading /> : (
                <div className='px-4 md:px-0'>
                    <div className="grid md:grid-cols-3 gap-8 md:gap-4 ">
                        <div className="w-full md:col-span-2">
                            {latestPost && (
                                <div className="latest-post relative h-full md:h-[410px]">
                                    <img className="w-[100%] h-[100%] rounded-xl" src={latestPost.PostImage} alt="Latest Post" />
                                    <Link to={`/posts/${latestPost._id}`} className="absolute bottom-[10%] left-8 text-md sm:text-xl md:tet-2xl lg:text-4xl hover:text-[#5469d4] cursor-pointer font-bold">{latestPost.Title}</Link>
                                    <div className="flex items-center justify-between gap-6 absolute bottom-1 md:bottom-[4%] right-4 md:right-8">
                                        <p className="text-sm flex items-center gap-1 text-slate-400"> <BsFillPersonFill />{latestPost.Author}</p>
                                        <p className="text-sm flex items-center gap-1 text-slate-400"><BsCalendarDateFill /> {latestPost.date}</p>
                                        <p className="text-sm flex items-center gap-1 text-slate-400"> <FaComments />  {getComment.length} Comment</p>
                                    </div>
                                    <h2 className="absolute bottom-[40%] left-8 border shadow-lg border-[#5469d4]  hover:bg-[#4a5fc9] cursor-pointer pt-1 px-5 rounded-3xl pb-2">{latestPost.Category}</h2>
                                </div>
                            )}
                        </div>

                        <Tabs variant="soft-rounded" colorScheme="green" className="all-posts w-full shadow-lg md:col-span-1 border border-slate-600 pt-5 px-2 rounded-xl h-[410px] overflow-hidden ">
                            <TabList className="flex justify-between items-center w-full gap-6">
                                <Tab
                                    className={`w-[50%] text-center pt-1 pb-2 rounded-3xl ${selectedTab === 0 ? 'bg-[#5469d4] hover:bg-[#4a5fc9] hover:text-white' : 'border border-[#4a5fc9] hover:bg-[#4a5fc9]'
                                        }`}
                                    onClick={() => handleTabChange(0)}
                                >
                                    Popular
                                </Tab>
                                <Tab
                                    className={`w-[50%] text-center pt-1 pb-2 rounded-3xl ${selectedTab === 1 ? 'bg-[#4a5fc9] hover:bg-[#5469d4] text-white' : 'border border-[#4a5fc9] hover.bg-[#4a5fc9]'
                                        }`}
                                    onClick={() => handleTabChange(1)}
                                >
                                    Recent
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>{getCategory('Culture')}</TabPanel>
                                <TabPanel>{
                                    getRecentPost.map((post) => (
                                        <div key={post.id} className="post-card flex items-center gap-3 mt-[12px] w-full">
                                            <div>
                                                <img className="w-[50px] h-[50px] rounded-full" src={post.AuthorImage} alt="Author" />
                                            </div>
                                            <div>
                                            <Link to={`/posts/${post._id}`} className="md:mt-5 ">
                                                {post.Title}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }</TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                    <h3 className='p-2 w-full bg-opacity-20 bg-gray-500 my-4 rounded-md text-md'><span className='text-[#4a5fc9] font-bold'>Breaking News</span> : Astronomy Binoculars A Great Alternative </h3>
                    {/* <Posts /> */}
                </div>
            )}
        </div>
    );
};

export default HeroSection;
