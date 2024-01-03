import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux"
import { FetchingAllPosts, FetchingPostsFailed, GottenAllPosts } from '../../Redux/AllPosts';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDataAsync = async () => {
      dispatch(FetchingAllPosts())
      try {
        const response = await axios.get(url);
        setData(response.data.Allposts);
        dispatch(GottenAllPosts(response.data.Allposts))
      } catch (error) {
        setError(error.message);
        dispatch(FetchingPostsFailed(error.message))
      }
    };

    fetchDataAsync();
  }, [url]);
    
  // console.log("Data in useFetch: ", data);
  // console.log("Error in useFetch: ", error);

  return { data, error };
  
};

export default useFetch;