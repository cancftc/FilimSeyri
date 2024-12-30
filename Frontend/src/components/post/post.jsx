import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./post.css";

function Post({ posts }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(false);
  const [liked, setLiked] = useState([]);

  const user = localStorage.getItem("user");

  const getFavorite = () => {
    if (userId) {
      axios
        .post("http://localhost:5000/api/favorite/getAll", { userId: userId })
        .then((res) => {
          const favoritePostIds = res.data.map((fav) => fav.postId);
          const likedStatus = posts.map((post) =>
            favoritePostIds.includes(post._id)
          );
          setLiked(likedStatus);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const favoriteAdd = (postId, index) => {
    const data = {
      userId: userId,
      postId: postId,
    };

    axios
      .post("http://localhost:5000/api/favorite/add", data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.data.message);
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

    if (userId) {
      getFavorite();
    }
  }, [posts, userId]);

  return (
    <div className="post-wrapper">
      {posts &&
        posts.map((val, index) => {
          return (
            <div key={index} className="post-content">
              <div className="post-header">
                <div className="post-header-left">
                  {val.profileImg && val.profileImg.path ? (
                    <img
                      className="post-avatar"
                      onClick={() => navigate("/userProfile/" + val.userId)}
                      src={`http://localhost:5000/${val.profileImg.path.replace(
                        "\\",
                        "/"
                      )}`}
                    />
                  ) : (
                    <img
                      className="post-avatar"
                      onClick={() => navigate("/userProfile/" + val.userId)}
                      src="../../avatar2.jpg"
                      alt=""
                    />
                  )}
                  <div
                    onClick={() => navigate("/userProfile/" + val.userId)}
                    className="post-name"
                  >
                    {val.name}
                  </div>
                </div>
                {user ? (
                  <div
                    className="post-header-rigth"
                    onClick={() => favoriteAdd(val._id, index)}
                  >
                    {liked[index] ? (
                      <i className="bi bi-bookmark-fill"></i>
                    ) : (
                      <i className="bi bi-bookmark"></i>
                    )}
                  </div>
                ) : (
                  <div
                    className="post-header-rigth"
                    onClick={() => navigate("/login")}
                  >
                    <i className="bi bi-bookmark"></i>
                  </div>
                )}
              </div>
              <div
                className="post-center"
                onClick={() => navigate("/post-details/" + val._id)}
              >
                <div className="post-title">{val.title}</div>
                <img
                  className="post-img"
                  src={
                    val.images && val.images.path
                      ? `http://localhost:5000/${val.images.path.replace(
                          "\\",
                          "/"
                        )}`
                      : "default-image.jpg"
                  }
                  alt={val.name}
                />
                <div className="post-description">
                  {val.description.slice(0, 240)}
                  <strong> devamı</strong>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Post;
