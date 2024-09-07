import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [gettCategory, SetgettCategory] = useState([]);
  const navigate = useNavigate();

  const getCategory = () => {
    axios.get("http://localhost:5000/api/categories").then((res) => {
      SetgettCategory(res.data);
    });
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="home-wrapper">
      <div className="home">
        <div className="home-header">
          <h1>Keşfet, İzle, Paylaş!</h1>
          <p>Film ve Dizi Dünyasında Yeni Ufuklar Açın!</p>
          <p className="description">
            Bu platform, kullanıcıların izledikleri filmleri ve dizileri
            paylaşmalarına, başkalarının önerilerini keşfetmelerine olanak
            tanır. İlgi alanlarınıza uygun içerikleri kolayca bulabilir, kişisel
            izleme listelerinizi oluşturabilir ve topluluğun sunduğu en iyi
            tavsiyeleri keşfedebilirsiniz.
          </p>
        </div>
      </div>
      <div className="home-container">
        {gettCategory.map((val, index) => {
          return (
            <div
              key={index}
              className="home-content"
              onClick={() => navigate("/category-details/" + val.name)}
            >
              <div>{val.name}</div>
              <img
                src={`http://localhost:5000/${val.images.path}`}
                alt={val.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
