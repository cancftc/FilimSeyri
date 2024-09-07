import { useEffect, useState } from "react";
import "./AdminCategory.css";
import axios from "axios";

function AdminCategory() {
  const [name, setName] = useState("");
  const [images, setImages] = useState();
  const [gettCategory, SetgettCategory] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateImage, setUpdateImage] = useState(null);

  const category = (event) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("images", images);

    event.preventDefault();
    axios
      .post("http://localhost:5000/api/categories/add", formData)
      .then((res) => {
        alert(res.data.message);
        setName("");
        setImages();
        getCategory();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const getCategory = () => {
    axios.get("http://localhost:5000/api/categories").then((res) => {
      SetgettCategory(res.data);
    });
  };

  const removeById = (_id) => {
    axios
      .post("http://localhost:5000/api/categories/removeById", { _id })
      .then((res) => {
        alert(res.data.message);
        getCategory();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleUpdateClick = (category) => {
    setUpdateCategory(category);
    setUpdateName(category.name);
    setUpdateImage(null);
  };

  const updateCategoryHandler = (event) => {
    const formData = new FormData();
    formData.append("_id", updateCategory._id);
    formData.append("name", updateName);
    if (updateImage) {
      formData.append("images", updateImage);
    }

    event.preventDefault();
    axios
      .post("http://localhost:5000/api/categories/update", formData)
      .then((res) => {
        alert(res.data.message);
        setUpdateName("");
        setUpdateImage(null);
        getCategory();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="category-wrapper">
      <button
        className="categoryButton"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Categori Ekle
      </button>
      <table className="content-table">
        <thead>
          <tr>
            <th>Kategori adı</th>
            <th>Kategori Resimi</th>
            <th>Güncelle</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {gettCategory.map((val, index) => {
            return (
              <tr key={index}>
                <td>{val.name}</td>
                <td>
                  {val.images && val.images.path && (
                    <img
                      className="category-img"
                      src={`http://localhost:5000/${val.images.path}`}
                      alt={val.name}
                    />
                  )}
                </td>
                <td>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    className="categoryButton"
                    onClick={() => handleUpdateClick(val)}
                  >
                    Güncelle
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => removeById(val._id)}
                    className="categoryButton"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Kategori Ekle
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={category}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                    Kategori Adı
                  </label>
                  <input
                    id="name"
                    className="form-control"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Kategori Resmi</label>
                  <input
                    className="form-control"
                    required
                    onChange={(e) => setImages(e.target.files[0])}
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
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">
                Kategori Güncelle
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={updateCategoryHandler}>
              <div className="modal-body">
              <div className="mb-3">
                  <label htmlFor="name" className="col-form-label">
                  Kategori Adı
                  </label>
                  <input
                    id="updateName"
                    className="form-control"
                    value={updateName}
                    required
                    onChange={(e) => setUpdateName(e.target.value)}
                    type="text"
                  placeholder="Kategori adı giriniz"
                  />
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Kategori Resmi</label>
                  <input
                    className="form-control"
                    required
                    onChange={(e) => setUpdateImage(e.target.files[0])}
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
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategory;
