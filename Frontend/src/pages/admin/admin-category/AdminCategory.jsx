import { useEffect, useState } from "react";
import "./AdminCategory.css";
import axios from "axios";

function AdminCategory() {
  const [name, setName] = useState("");
  const [getCategoryList, SetgetCategoryList] = useState([]);
  const [updateCategory, setUpdateCategory] = useState(null);
  const [updateCategoryName, setUpdateCategoryName] = useState("");
  const [removeCategoryId, setRemoveCategoryId] = useState(null);

  const getCategory = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    SetgetCategoryList(res.data);
  };

  const createCategory = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/categories/add", {
        name: name,
      });

      alert(res.data.message);
      setName("");
      getCategory();
      const element = document.getElementById("createModelCloseBtn");
      element.click();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleUpdateClick = (category) => {
    setUpdateCategory(category);
    setUpdateCategoryName(category.name);
  };

  const updateCategoryHandler = async (event) => {
    const formData = {
      _id: updateCategory._id,
      name: updateCategoryName,
    };

    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/categories/update",
        formData
      );

      alert(res.data.message);
      setUpdateCategoryName("");
      getCategory();
      const element = document.getElementById("updateModelCloseBtn");
      element.click();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const removeById = async (_id) => {
    const res = await axios.post(
      "http://localhost:5000/api/categories/removeById",
      { _id }
    );
    alert(res.data.message);
    const element = document.getElementById("removeModelCloseBtn");
    element.click();
    getCategory();
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="admin-category-wrapper">
      <button
        className="admin-category-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Kategori Ekle
      </button>

      <table className="content-table">
        <thead>
          <tr>
            <th>Kategori Adı</th>
            <th>Güncelle</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {getCategoryList.map((category, index) => (
            <tr key={index}>
              <td>{category.name}</td>
              <td>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  className="admin-category-button"
                  onClick={() => handleUpdateClick(category)}
                >
                  Güncelle
                </button>
              </td>
              <td>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#removeModal"
                  onClick={() => setRemoveCategoryId(category._id)}
                  className="admin-category-button"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
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
                id="createModelCloseBtn"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={createCategory}>
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
                id="updateModelCloseBtn"
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
                    value={updateCategoryName}
                    required
                    onChange={(e) => setUpdateCategoryName(e.target.value)}
                    type="text"
                    placeholder="Kategori adı giriniz"
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

      <div
        className="modal fade"
        id="removeModal"
        tabIndex="-1"
        aria-labelledby="removeModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="removeModalLabel">
                Kategori Sil
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
                  <div>Kategoriyi silmek istediğinize eminmisiniz ?</div>
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
                <button type="submit" className="btn btn-danger" onClick={() => removeById(removeCategoryId)}>
                  Sil
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategory;
