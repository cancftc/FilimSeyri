import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryDetails.css";

function CategoryDetails() {
  const [gettCategory, SetgettCategory] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  const getCategory = () => {
    axios
      .post("http://localhost:5000/api/post/getAll", { category: name })
      .then((res) => {
        SetgettCategory(res.data);
      });
  };

  useEffect(() => {
    getCategory();
  });

  return (
    <div className="category-details-wrapper">
      {gettCategory.map((val, index) => {
        return (
          <div key={index} className="category-details-content">
            <div className="category-details-header">
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
              <div onClick={() => navigate("/userProfile/" + val.userId)} className="category-details-name">{val.name}</div>
            </div>
            <div className="category-details-center"  onClick={() => navigate("/post-details/" + val._id)}>
            <div className="category-details-title">{val.title}</div>
            <img
              className="category-details-img"
              src={`http://localhost:5000/${val.images.path}`}
              alt={val.name}
            />
            <div className="category-details-description">
              {val.description.slice(0, 150)}{" "}
              <strong>
                devamı
              </strong>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryDetails;
