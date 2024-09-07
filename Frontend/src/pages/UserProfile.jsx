import { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();


  // Post'ları Getirme
  const [gettByProfile, setGettByProfile] = useState(null);
  const [gettByPost, setGettByPost] = useState([]);

  const getByPost = () => {
    if (userId) {
      axios
        .post("http://localhost:5000/api/profile/getByProfile", { userId })
        .then((res) => {
          setGettByPost(res.data);
          console.log(userId);
        });
    }
  };

  const getByProfile = () => {
    if (userId) {
      axios
        .post("http://localhost:5000/api/profile/getById", { userId })
        .then((res) => {
          setGettByProfile(res.data);
          console.log(userId);
        });
    }
  };

useEffect(() => {
    getByPost();
    getByProfile();
},)

  return (
    <div>
      <div className="profile-wrapper">
        <div className="profile-header">
          <div className="profile-left">
          <div className="profile-img">
            {gettByProfile?.images ? (
              <img
                className="category-details-avatar"
                src={`http://localhost:5000/${gettByProfile.images.path}`}
                alt={gettByProfile.name}
              />
            ) : (
              <img
                className="category-details-avatar"
                src="../../avatar2.jpg"
                alt=""
              />
            )}
          </div>
          <div>
            <div className="profile-name">{gettByProfile?.name}</div>
            <br />
            <div>{gettByProfile?.biography || "Biyografi yok"}</div>
          </div>
          </div>
          <div className="profile-update">
          </div>
        </div>
        <div>
          <hr />
          <div className="post-add">
          </div>
          <div className="profile-post-wrapper">
            {gettByPost.map((val, index) => {
              return (
                <div key={index} className="profile-post-content">
                  <div className="profile-post-title">{val.title}</div>
                  <img
                    className="profile-post-img"
                    src={`http://localhost:5000/${val.images.path}`}
                    alt={val.name}
                  />
                  <div className="profile-post-description">
                    {val.description.slice(0, 160)}{" "}
                    <strong
                      onClick={() => navigate("/post-details/" + val._id)}
                    >
                      devamı
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
  );
}

export default UserProfile;
