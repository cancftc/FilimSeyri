import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import AdminCategory from "./pages/admin/admin-category/AdminCategory";
import PostDetails from "./pages/post-detail/PostDetails.jsx";
import UserProfile from "./pages/user-profile/UserProfile.jsx";
import Header from "./components/header/Header.jsx";
import Favorite from "./pages/favorite/favorite.jsx";
import Sidebar from "./components/sidebar/sidebar.jsx";
import Search from "./pages/search/Search.jsx";

function App() {
  const user = localStorage.getItem("user");
  const userAdmin = user ? JSON.parse(user) : {};
  const isAdmin = userAdmin.isAdmin;

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search/:search" element={<Search />} />
          <Route path="/post-details/:postId" element={<PostDetails />}></Route>
          {isAdmin ? (<Route path="/category" element={<AdminCategory />}></Route>): (<Route path="/category" element={<Home />}></Route>)}
          {user ? (<Route path="/profile" element={<Profile />}></Route>): (<Route path="/profile" element={<Home />}></Route>)}
          {user ? (<Route path="/favorite" element={<Favorite />}></Route>): (<Route path="/favorite" element={<Home />}></Route>)}
          <Route path="/userProfile/:userId" element={<UserProfile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
