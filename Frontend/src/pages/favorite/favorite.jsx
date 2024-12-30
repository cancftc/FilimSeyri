import "./favorite.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Favorite() {
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState([]);
  const navigate = useNavigate();

  const getFavorite = () => {
    axios
      .post("http://localhost:5000/api/favorite/getAll", { userId: userId })
      .then((res) => {
        setPosts(res.data);
        const likedStatus = res.data.map(() => true);
        setLiked(likedStatus);
      });
  };

  const toggleFavorite = (postId, index) => {
    const data = {
      userId: userId,
      postId: postId,
    };

    axios
      .post("http://localhost:5000/api/favorite/add", data)
      .then((res) => {
        alert(res.data.message);
        getFavorite();
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Bir hata oluştu.");
      });

      setLiked((prevLiked) => {
        const updatedLiked = [...prevLiked];
        updatedLiked[index] = !updatedLiked[index];
        return updatedLiked;
      });
  };

  useEffect(() => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getFavorite();
    }
  }, [userId]);

  return (
    <div className="favorite-wrapper">
      <div className="post-wrapper">
        {posts &&
          posts.map((val, index) => {
            return (
              <div key={index} className="post-content">
                <div className="post-header">
                  <div className="post-header-left">
                    {val.posts[0].profileImg && val.posts[0].profileImg.path ? (
                      <img
                        className="post-avatar"
                        onClick={() => navigate("/userProfile/" + val.posts[0].userId)}
                        src={`http://localhost:5000/${val.posts[0].profileImg.path.replace(
                          "\\",
                          "/"
                        )}`}
                      />
                    ) : (
                      <img
                        className="post-avatar"
                        onClick={() =>
                          navigate("/userProfile/" + val.posts[0].userId)
                        }
                        src="../../avatar2.jpg"
                        alt=""
                      />
                    )}
                    <div
                      onClick={() =>
                        navigate("/userProfile/" + val.posts[0].userId)
                      }
                      className="post-name"
                    >
                      {val.posts[0].name}
                    </div>
                  </div>
                  <div
                    className="post-header-right"
                    onClick={() => toggleFavorite(val.posts[0]._id, index)}
                  >
                    {liked[index] ? (
                      <i
                        className="bi bi-bookmark-fill"
                      ></i>
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
                  </div>
                </div>
                <div
                  className="post-center"
                  onClick={() => navigate("/post-details/" + val.posts[0]._id)}
                >
                  <div className="post-title">{val.posts[0].title}</div>
                  <img
                    className="post-img"
                    src={
                      val.posts[0].images && val.posts[0].images.path
                        ? `http://localhost:5000/${val.posts[0].images.path.replace(
                            "\\",
                            "/"
                          )}`
                        : "default-image.jpg"
                    }
                    alt={val.posts[0].name}
                  />
                  <div className="post-description">
                    {val.posts[0].description.slice(0, 240)}
                    <strong>devamı</strong>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Favorite;
