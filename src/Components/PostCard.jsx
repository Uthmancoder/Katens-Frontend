

const PostCard = (props) => {
  return (
    <div className={props.className} style={{ position: 'relative' }}>
      <div className="w-full h-full ">
        <img
          className="w-full h-full transition-transform transform scale-100 hover:scale-125 duration-1000"
          src={props.image}
          alt=""
        />
      </div>
      <p className="absolute z-5 bottom-3 text-slate-300 left-6 bg-[#5469d4] hover:bg-[#5870eb] py-1 px-5">
        {props.category}
      </p>
      {/* <div
        className="w-full h-full absolute top-0 left-0 bg-gradient-to-b  bg-slate-600 from-transparent via-blur to-transparent opacity-30 hover:opacity-0  transition-opacity duration-300"
      ></div> */}
    </div>
  );
};

export default PostCard;
