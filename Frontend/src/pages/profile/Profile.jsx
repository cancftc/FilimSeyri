import { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // kategori getirme
  const [getCategoryList, SetgetCategoryList] = useState([]);

  // Post Ekleme
  const [postName, setPostName] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postUserId, setPostUserId] = useState("");
  const [postCategories, setPostCategories] = useState([]);
  const [postImages, setPostImages] = useState(null);
  const [duration, setDuration] = useState("");
  const [actors, setActors] = useState("");
  const [director, setDirector] = useState("");
  const [writer, setWriter] = useState("");
  const [production, setProduction] = useState("");
  const [relaseDate, setRelaseDate] = useState("");
  const [videoIframeSrc, setVideoIframeSrc] = useState("");

  //Profile değiştirme
  const [profileName, setProfileName] = useState("");
  const [profileImages, setProfileImages] = useState(null);
  const [profileUserId, setProfileUserId] = useState("");
  const [profileBiography, setProfileBiography] = useState("");

  // Post'ları Getirme
  const [getByIdPostList, setGetByIdPostList] = useState([]);

  // Profil bilgilerini getirme
  const [getByIdProfile, setGetByIdProfile] = useState(null);

  // Post Silme
  const [removePostId, setRemovePostId] = useState(null);

  const createPost = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", postName);
    formData.append("title", postTitle);
    formData.append("description", postDescription);
    formData.append("categories", postCategories);
    formData.append("userId", postUserId);
    formData.append("images", postImages);
    formData.append("duration", duration);
    formData.append("actors", actors);
    formData.append("director", director);
    formData.append("writer", writer);
    formData.append("production", production);
    formData.append("relaseDate", relaseDate);
    formData.append("videoIframeSrc", videoIframeSrc);

    axios
      .post("http://localhost:5000/api/post/add", formData)
      .then((res) => {
        alert(res.data.message);
        const element = document.getElementById("createModelCloseBtn");
        element.click();
        getByPost();
      })
      .catch((err) => {
        alert(err.data.message);
      });
  };

  const updateProfile = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("images", profileImages);
    formData.append("name", profileName);
    formData.append("biography", profileBiography);
    formData.append("userId", profileUserId);

    axios
      .post("http://localhost:5000/api/auth/updateProfile", formData)
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
      SetgetCategoryList(res.data);
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
          setGetByIdPostList(res.data);
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
          setGetByIdProfile(res.data);
        });
    }
  };

  const removePost = (_id) => {
    axios
      .post("http://localhost:5000/api/post/removeById", { _id })
      .then((res) => {
        alert(res.data.message);
        const element = document.getElementById("removeModelCloseBtn");
        element.click();
        getByPost();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    let userString = localStorage.getItem("user");
    let user = JSON.parse(userString);
    if (user) {
      setPostName(user.name);
      setPostUserId(user._id);

      setProfileUserId(user._id);
    }
    getCategory();
    getByProfile();
    getByPost();
  }, []);

  return (
    <div>
      <div className="profile-wrapper">
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-img">
              {getByIdProfile?.images ? (
                <img
                  className="category-details-avatar"
                  src={`http://localhost:5000/${getByIdProfile?.images.path}`}
                  alt={getByIdProfile.name}
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
              <div className="profile-name">{getByIdProfile?.name}</div>
              <br />
              <div className="profile-biography">{getByIdProfile?.biography || "Biyografi yok"}</div>
            </div>
          </div>
          <div className="profile-update">
            <button data-bs-toggle="modal" data-bs-target="#postModal">
              Gönderi Paylaş
            </button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#profileModal"
              onClick={() => {
                setProfileName(getByIdProfile?.name),
                  setProfileBiography(getByIdProfile?.biography);
                setProfileImages(getByIdProfile?.images);
              }}
            >
              Profili Düzenle
            </button>
          </div>
        </div>
        <div>
          <div className="profile-posts-title">Gönderiler</div>
          <div className="profile-posts-title-span"></div>
          <hr className="profile-posts-hr" />
          <div className="profile-post-wrapper">
            {getByIdPostList.map((post, index) => {
              return (
                <div key={index} className="profile-post-content">
                  <div className="profile-post-header">
                    <div></div>
                    <div
                      className="profile-post-title"
                      onClick={() => navigate("/post-details/" + post._id)}
                    >
                      {post.title}
                    </div>
                    <i
                      className="bi bi-three-dots"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <div className="dropdown-menu">
                      <div
                        onClick={() => setRemovePostId(post._id)}
                        className="post-delete"
                        data-bs-toggle="modal"
                        data-bs-target="#removeModal"
                      >
                        Gönderiyi Sil
                      </div>
                    </div>
                  </div>

                  <img
                    className="profile-post-img"
                    onClick={() => navigate("/post-details/" + post._id)}
                    src={`http://localhost:5000/${post.images.path}`}
                    alt={post.name}
                  />
                  <div
                    className="profile-post-description"
                    onClick={() => navigate("/post-details/" + post._id)}
                  >
                    {post.description.slice(0, 240)}
                    <strong>devamı</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="profileModal"
        tabIndex="-1"
        aria-labelledby="profileModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
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
            <form onSubmit={updateProfile}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                    Kullanıcı Adı
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    value={profileName}
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
                    onChange={(e) => setProfileBiography(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Kullanıcı Adı</label>
                  <input
                    className="form-control"
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

      <div
        className="modal fade"
        id="postModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Gönderi Paylaş
              </h1>
              <button
                type="button"
                className="btn-close"
                id="createModelCloseBtn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={createPost}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Başlık <span className="text-muted">(Zorunlu)</span>
                    </label>
                    <input
                      className="form-control"
                      required
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Resim <span className="text-muted">(Zorunlu)</span>
                    </label>
                    <input
                      onChange={(e) => setPostImages(e.target.files[0])}
                      type="file"
                      required
                      className="form-control mb-3"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Açıklama <span className="text-muted">(Zorunlu)</span>
                    </label>
                    <textarea
                      className="form-control"
                      required
                      rows={5}
                      value={postDescription}
                      onChange={(e) => setPostDescription(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Tür <span className="text-muted">(Zorunlu)</span>
                    </label>
                    <select
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions
                        ).map((option) => option.value);
                        setPostCategories(selectedOptions);
                      }}
                      name="postSelect"
                      id="postSelect"
                      multiple
                      className="form-select mb-3"
                      required
                      size={5}
                    >
                      {getCategoryList.map((val, index) => {
                        return (
                          <option value={val.name} key={index}>
                            {val.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Süre <span className="text-muted">(Opsiyonel)</span>
                    </label>
                    <input
                      className="form-control"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      type="text"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Yönetmen <span className="text-muted">(Opsiyonel)</span>
                    </label>
                    <input
                      className="form-control"
                      value={director}
                      onChange={(e) => setDirector(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Senarist <span className="text-muted">(Opsiyonel)</span>
                    </label>
                    <input
                      className="form-control"
                      value={writer}
                      onChange={(e) => setWriter(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Yapımı <span className="text-muted">(Opsiyonel)</span>
                    </label>
                    <input
                      className="form-control"
                      value={production}
                      onChange={(e) => setProduction(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Vizyon Tarihi{" "}
                      <span className="text-muted">(Opsiyonel)</span>
                    </label>
                    <input
                      className="form-control"
                      value={relaseDate}
                      onChange={(e) => setRelaseDate(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="col-form-label">
                      Oyuncular <span className="text-muted">(Opsiyonel)</span>
                    </label>
                    <input
                      className="form-control"
                      value={actors}
                      onChange={(e) => setActors(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="col-form-label">
                    Fragman{" "}
                    <span className="text-muted">
                      (Opsiyonel) Lütfen YouTube&apos;dan &quot;Yerleştirme kodunu
                      kopyala&quot; seçeneğiyle alınan kod içindeki `src`
                      URL&apos;sini buraya yapıştırın. Örnek:
                      https://www.youtube.com/embed/P7ONGp24jEs
                    </span>
                  </label>
                  <input
                    className="form-control"
                    value={videoIframeSrc}
                    onChange={(e) => setVideoIframeSrc(e.target.value)}
                    type="text"
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

      <div
        className="modal fade"
        id="removeModal"
        tabIndex="-1"
        aria-labelledby="removeModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="removeModalLabel">
                Gönderiyi Sil
              </h1>
              <button
                type="button"
                className="btn-close"
                id="removeModelCloseBtn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 mt-3">
                <div>Gönderiyi silmek istediğinize eminmisiniz ?</div>
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
              <button
                type="submit"
                className="btn btn-danger"
                onClick={() => removePost(removePostId)}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
