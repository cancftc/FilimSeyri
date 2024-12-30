import "./Home.css";
import Category from "../../components/category/category";
import Post from "../../components/post/post";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);

  const getPosts =()=>{
    axios
    .post("http://localhost:5000/api/post/getAll", {
      category: selectedCategory,
    })
    .then((res) => {
      setPosts(res.data);
    });
  }

  useEffect(() => {
    getPosts()
  }, [selectedCategory]);
  
  return (
    <div>
      <Category setSelectedCategory={setSelectedCategory}></Category>
      <div className="post">
      <Post posts={posts}></Post>
      </div>
    </div>
  );
}

export default Home;
