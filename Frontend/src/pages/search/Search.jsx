import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/post/post";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const { search } = useParams();
  const [posts, setPosts] = useState([]);

  const handleSearch = async () => {
    if (search && search.trim()) {
        const res = await axios.post("http://localhost:5000/api/post/search", {
          search: search.trim(),
        });
        setPosts(res.data);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <div className="search-wrapper">
      {posts.length > 0 ? (
        <Post posts={posts} />
      ) : (
        <div className="no-results">
          <div className="title">
            Aradığınız kriterlere uygun bir sonuç bulamadık.
          </div>
          <div>Lütfen farklı bir anahtar kelime deneyin.</div>
        </div>
      )}
    </div>
  );
};

export default Search;
