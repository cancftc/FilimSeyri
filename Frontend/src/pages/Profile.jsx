import { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // kategori getirme
  const [gettCategory, SetgettCategory] = useState([]);

  // Post Ekleme
  const [postName, setPostName] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postUserId, setPostUserId] = useState("");
  const [postCategories, setPostCategories] = useState("");
  const [postImages, setPostImages] = useState(null);

  //Profile değiştirme
  const [profileName, setProfileName] = useState("");
  const [profileImages, setProfileImages] = useState(null);
  const [profileUserId, setProfileUserId] = useState("");
  const [profileBiography, setProfileBiography] = useState("");

  // Post'ları Getirme
  const [gettByPost, setGettByPost] = useState([]);

  // Profil bilgilerini getirme
  const [gettByProfile, setGettByProfile] = useState(null);
  const [postDelete, setPostDelete] = useState({});

  const postAdd = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", postName);
    formData.append("title", postTitle);
    formData.append("description", postDescription);
    formData.append("categories", postCategories);
    formData.append("userId", postUserId);
    formData.append("images", postImages);

    axios
      .post("http://localhost:5000/api/post/add", formData)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.data.message);
      });
  };

  const prfileUpdate = (event) => {
    event.preventDefault();

    const formData2 = new FormData();
    formData2.append("images", profileImages);
    formData2.append("name", profileName);
    formData2.append("biography", profileBiography);
    formData2.append("userId", profileUserId);

    axios
      .post("http://localhost:5000/api/auth/updateProfile", formData2)
      .then((res) => {
        alert(res.data.message);
        getByPost();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getCategory = () => {
    axios.get("http://localhost:5000/api/categories").then((res) => {
      SetgettCategory(res.data);
      if (res.data.length > 0) {
        setPostCategories(res.data[0].name);
      }
    });
  };

  const getByPost = () => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      axios
        .post("http://localhost:5000/api/post/getById", { userId: user._id })
        .then((res) => {
          setGettByPost(res.data);
          console.log(user._id);
        });
    }
  };

  const getByProfile = () => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      axios
        .post("http://localhost:5000/api/auth/getById", { userId: user._id })
        .then((res) => {
          setGettByProfile(res.data);
          console.log(user._id);
        });
    }
  };

  useEffect(() => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      setPostName(user.name);
      setPostUserId(user._id);

      setProfileName(user.name);
      setProfileUserId(user._id);
    }
    getCategory();
    getByProfile();
    getByPost();
  }, []);

  const deletePostIcon = (postId) => {
    setPostDelete((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const deletePostDiv = (_id) => {
    axios
      .post("http://localhost:5000/api/post/removeById", { _id })
      .then((res) => {
        alert(res.data.message);
        getByPost();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }
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
            <button data-bs-toggle="modal" data-bs-target="#profileModal">
              Profili düzenle
            </button>
          </div>
        </div>
        <div>
          <hr />
          <div className="post-add">
            <button data-bs-toggle="modal" data-bs-target="#postModal">
              Post Ekle
            </button>
          </div>
          <div className="profile-post-wrapper">
            {gettByPost.map((val, index) => {
              return (
                <div key={index} className="profile-post-content">
        {postDelete[val._id] && <div onClick={() => deletePostDiv(val._id)} className="post-delete">Postu Sil</div>}
        <i className="bi bi-three-dots" onClick={() => deletePostIcon(val._id)}></i>
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

      {/* Profil Düzenleme */}
      <div
        className="modal fade"
        id="profileModal"
        tabIndex="-1"
        aria-labelledby="profileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="profileModalLabel">
                Profili Düzenle
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={prfileUpdate}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                    Kullanıcı Adı
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    value={profileName}
                    required
                    onChange={(e) => setProfileName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="biography" className="col-form-label">
                    Biyografi
                  </label>
                  <input
                    id="biography"
                    className="form-control"
                    value={profileBiography}
                    required
                    onChange={(e) => setProfileBiography(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Kullanıcı Adı</label>
                  <input
                    className="form-control"
                    required
                    onChange={(e) => setProfileImages(e.target.files[0])}
                    type="file"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Kapat
                </button>
                <button type="submit" className="btn btn-danger">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Post Ekleme Alanı */}
      <div
        className="modal fade"
        id="postModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Post Ekle
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={postAdd}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="col-form-label">Başlık</label>
                  <input
                    className="form-control"
                    value={postTitle}
                    required
                    onChange={(e) => setPostTitle(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Açıklama</label>
                  <textarea
                    className="form-control"
                    value={postDescription}
                    required
                    onChange={(e) => setPostDescription(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">İl</label>
                  <select
                    onChange={(e) => setPostCategories(e.target.value)}
                    name="postSelect"
                    id="postSelect"
                    className="form-select mb-3"
                    required
                  >
                    {gettCategory.map((val, index) => {
                      return (
                        <option value={val.name} key={index}>
                          {val.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Resim</label>
                  <input
                    required
                    onChange={(e) => setPostImages(e.target.files[0])}
                    type="file"
                    className="form-control mb-3"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Kapat
                </button>
                <button type="submit" className="btn btn-danger">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
