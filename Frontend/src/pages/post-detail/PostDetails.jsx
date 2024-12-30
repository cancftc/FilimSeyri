import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";
import ClipLoader from "react-spinners/ClipLoader";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [postDetail, setPostDetail] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState([]);

  const user = localStorage.getItem("user");

  const getPostDetail = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/post/getPostDetails", { postId })
      .then((res) => {
        setPostDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getReview = () => {
    axios
      .post("http://localhost:5000/api/review/getAllReviews", { postId })
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const data = {
    postId: postId,
    userName: userName,
    review: review,
    userId: userId,
  };

  const reviewAdd = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/review/add", data)
      .then((res) => {
        alert(res.data.message);
        setReview("");
        getReview();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
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

  const getFavorite = () => {
    if (userId) {
      axios
        .post("http://localhost:5000/api/favorite/getAll", { userId: userId })
        .then((res) => {
          const favoritePostIds = res.data.map((fav) => fav.postId);
          const likedStatus = postDetail.map((post) =>
            favoritePostIds.includes(post._id)
          );
          setLiked(likedStatus);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const getPosts = () => {
    axios
      .post("http://localhost:5000/api/post/getAll", {
        category: "",
      })
      .then((res) => {
        const shuffledData = res.data.sort(() => Math.random() - 0.5);
        setPosts(shuffledData);
      });
  };

  useEffect(() => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      setUserName(user.name);
      setUserId(user._id);
    }

    getPostDetail();
    getReview();
    getPosts();
  }, []);

  useEffect(() => {
    if (postDetail.length > 0 && userId) {
      getFavorite();
    }
  }, [postDetail, userId]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString({
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {loading ? (
        <div className="spinner">
          <ClipLoader color={"#D0021B"} loading={loading} size={50} />
        </div>
      ) : (
        <div className="post-details-wrapper">
          <div className="post-main">
            {postDetail.map((val, index) => (
              <div key={index} className="posts-content">
                <div className="post-details-header">
                  <div className="post-detail-header-rigth">
                    {val.profileImg && val.profileImg.path ? (
                      <img
                        className="post-details-avatar"
                        onClick={() => navigate("/userProfile/" + val.userId)}
                        src={`http://localhost:5000/${val.profileImg.path.replace(
                          "\\",
                          "/"
                        )}`}
                      />
                    ) : (
                      <img
                        className="post-details-avatar"
                        src="../../avatar2.jpg"
                        onClick={() => navigate("/userProfile/" + val.userId)}
                        alt=""
                      />
                    )}
                    <div
                      className="post-details-name"
                      onClick={() => navigate("/userProfile/" + val.userId)}
                    >
                      {val.name}
                    </div>
                  </div>
                  {user ? (
                    <div
                      className="post-detail-bookmark"
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
                      className="post-detail-bookmark"
                      onClick={() => navigate("/login")}
                    >
                      <i className="bi bi-bookmark"></i>
                    </div>
                  )}
                </div>
                <div className="post-details-title">{val.title}</div>
                <div className="post-details-content">
                  <div className="media-wrapper">
                    {val.videoIframeSrc ? (
                      <iframe
                        className="post-details-img"
                        src={val.videoIframeSrc}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img
                        className="post-details-img"
                        src={`http://localhost:5000/${val.images.path}`}
                        alt={val.name}
                      />
                    )}
                    <div className="post-details-description">
                      {val.description}
                    </div>
                  </div>
                  <div className="details-wrapper">
                    <div className="post-info">
                      <div className="post-info-duration">
                        <strong>Süre: </strong>
                        {val.duration}
                      </div>
                      <div className="post-info-genre">
                        <strong>Tür: </strong>
                        {val.categories}
                      </div>
                      <div className="post-info-cast">
                        <strong>Oyuncular: </strong>
                        {val.actors}
                      </div>
                      <div className="post-info-director">
                        <strong>Yönetmen: </strong>
                        {val.director}
                      </div>
                      <div className="post-info-writer">
                        <strong>Senarist: </strong>
                        {val.writer}
                      </div>
                      <div className="post-info-production">
                        <strong>Yapımı: </strong>
                        {val.production}
                      </div>
                      <div className="post-info-release-date">
                        <strong>Vizyon Tarihi: </strong>
                        {val.relaseDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="recommended">
              {posts &&
                posts.map((val, index) => (
                  <div key={index} className="recommended-item">
                    <div onClick={() => {navigate("/post-details/" + val._id); window.location.reload();}}>
                      <div className="title">{val.title}</div>
                      <img
                        className="recommended-img"
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
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="reviews-wrapper">
            <div className="review-title">Yorumlar</div>
            <form onSubmit={reviewAdd}>
              <div className="review-form">
                <input
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  type="text"
                  required
                  placeholder="Yorum ekleyin..."
                />
                <button
                  className="btn btn-dark"
                  disabled={!review.trim() || !user}
                >
                  Yorum yap
                </button>
              </div>
            </form>
            <div className="reviews">
              {reviews.map((val, index) => {
                return (
                  <div key={index} className="reviews-content">
                    <div className="review-start">
                      <div className="review-start-header">
                        {val.profileImg && val.profileImg.path ? (
                          <img
                            onClick={() =>
                              navigate("/userProfile/" + val.userId)
                            }
                            src={`http://localhost:5000/${val.profileImg.path.replace(
                              "\\",
                              "/"
                            )}`}
                          />
                        ) : (
                          <img
                            onClick={() =>
                              navigate("/userProfile/" + val.userId)
                            }
                            src="../../avatar2.jpg"
                            alt=""
                          />
                        )}
                        <div
                          className="user-name"
                          onClick={() => navigate("/userProfile/" + val.userId)}
                        >
                          {val.userName}
                        </div>
                      </div>
                      <div className="reviews-date">
                        {formatDate(val.createdDate)}
                      </div>
                    </div>
                    <div className="reviews-end">{val.review}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
