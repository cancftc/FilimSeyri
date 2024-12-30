import axios from "axios";
import { useEffect, useState } from "react";
import "./category.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Category({ setSelectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategoryState] = useState("");

  const getCategory = () => {
    axios.get("http://localhost:5000/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategoryState(categoryName);
    setSelectedCategory(categoryName);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 15,
    slidesToScroll: 1,
    draggable: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 13,
        },
      },
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 10,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 8,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="category-wrapper">
      <Slider {...sliderSettings}>
        <div
          className={`category-item ${selectedCategory === "" ? "active" : ""}`}
          onClick={() => handleCategoryClick("")}
        >
          Tümü
        </div>
        {categories.map((val, index) => (
          <div
            key={index}
            className={`category-item ${
              selectedCategory === val.name ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(val.name)}
          >
            <div>{val.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Category;
