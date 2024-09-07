import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PostDetails.css";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [postDetail, setPostDetail] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const getPostDetail = () => {
    axios
      .post("http://localhost:5000/api/post/getPostDetails", { postId })
      .then((res) => {
        setPostDetail(res.data);
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
        console.log(res.data);
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

  useEffect(() => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      setUserName(user.name);
      setUserId(user._id);
    }
    getPostDetail();
    getReview();
  }, []);
  
const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString({
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

  return (
    <div className="post-details-wrapper">
      {postDetail.map((val, index) => {
        return (
          <div key={index} className="post-details-content-left">
            <div className="post-details-header">
              {val.profileImg && val.profileImg.path ? (
                <img
                  className="post-details-avatar"
                  src={`http://localhost:5000/${val.profileImg.path.replace(
                    "\\",
                    "/"
                  )}`}
                />
              ) : (
                <img
                  className="post-details-avatar"
                  src="../../avatar2.jpg"
                  alt=""
                />
              )}
              <div className="post-details-name">{val.name}</div>
            </div>
            <div className="post-details-title">{val.title}</div>
            <img
              className="post-details-img"
              src={`http://localhost:5000/${val.images.path}`}
              alt={val.name}
            />
            <div className="post-details-description">{val.description}</div>
          </div>
        );
      })}
      <div className="post-details-content-rigth">
        <div>
          <div className="review-wrapper">
            <div className="review-title">Yorumlar</div>
            <div className="review-content3">
              {reviews.map((val, index) => {
                return (
                  <div key={index} className="review-content2">
                    <div className="review-content">
                      <div className="review-content-header">
                      {val.profileImg && val.profileImg.path?(
                <img
                className="category-details-avatar"
                onClick={() => navigate("/userProfile/" + val.userId)}
                  src={`http://localhost:5000/${val.profileImg.path.replace("\\", "/")}`}
                />
              ) : (
                <img
                className="category-details-avatar"
                onClick={() => navigate("/userProfile/" + val.userId)}
                src="../../avatar2.jpg"
                alt=""
              />
              )}
                      <div className="username" onClick={() => navigate("/userProfile/" + val.userId)}>{val.userName}</div>
                      </div>
                      <div className="reviews-date">
                        {formatDate(val.createdDate)}
                      </div>
                    </div>
                    <div className="reviews-review">{val.review}</div>
                  </div>
                );
              })}
            </div>
            <form action="" onSubmit={reviewAdd}>
              <div className="review-input">
                <input
                  required
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  type="text"
                  placeholder="Yorum ekleyin..."
                />
                <button>Yorum yap</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
