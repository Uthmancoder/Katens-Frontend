import Home from "../Containers/Home";
import { Route, Routes } from 'react-router-dom';
import LifeStyle from './Components/Lifestyle.jsx';
import ShowingPosts from './Components/ShowingPosts.jsx';
import Layout from "../Containers/Layout";
import NonFound from './NonFound.jsx';
import Culture from "./Components/Culture";
import Fashion from "./Components/Fashion";
import Shop from "./Components/Shop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SignUp from "./Auth/Signup";
import Login from "./Auth/Login";
import CreateBlog from "./Components/CreateBlog";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lifestyle" element={<LifeStyle />} />
          <Route path="culture" element={<Culture />} />
          <Route path="fashion" element={<Fashion />} />
          <Route path="createPost" element={<CreateBlog />} />
          <Route path="shop" element={<Shop />} />
          <Route path="posts/:id" element={<ShowingPosts />} />
        </Route>
        <Route path="*" element={<NonFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
