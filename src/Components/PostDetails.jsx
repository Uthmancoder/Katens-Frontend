import { BsFillPersonFill, BsCalendarDateFill } from 'react-icons/bs';
import { FaComments } from 'react-icons/fa';

const PostDetails = (props) => {
    const maxContentLength = 150; // Set your desired character limit
    const content = props.postContent;

    // Check if the content length exceeds the limit
    const truncatedContent = content.length > maxContentLength
        ? content.slice(0, maxContentLength) + '...' // Truncate and add ellipsis
        : content;

    return (
        <div>
            <h2 className='text-md md:text-xl lg:text-xl text-slate-200 font-bold hover:text-[#5469d4] cursor-pointer'>{props.title}</h2>
            <div className="flex items-center justify-between my-2">
                <p className="text-sm flex items-center gap-2 text-slate-400"> <BsFillPersonFill />{props.author}</p>
                <p className="text-sm flex items-center gap-2 text-slate-400"><BsCalendarDateFill /> {props.date}</p>
                <p className="text-sm flex items-center gap-2 text-slate-400"> <FaComments /> {props.comments}</p>
            </div>
            <p className="text-sm text-slate-400 overflow-hidden" style={{ textOverflow: 'ellipsis' }}>
                {truncatedContent}
            </p>
        </div>
    );
}

export default PostDetails;
