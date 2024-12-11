import React from 'react';
import '../css/style.css';

const Carousel = () => {
  const carouselItems = [
    {
      src: "https://i.pinimg.com/736x/2a/99/bc/2a99bca2fa6ddc7ba2a6204b6b01a8c4.jpg",
      alt: "Image 1"
    },
    {
      src: "https://img3.wallspic.com/previews/0/0/1/6/7/176100/176100-black_anime-anime_art-animated_cartoon-cartoon-sleeve-x750.jpg",
      alt: "Image 2"
    },
    {
      src: "https://e0.pxfuel.com/wallpapers/467/458/desktop-wallpaper-boy-in-dark-art-sleeve-black.jpg",
      alt: "Image 3"
    },
    {
      src: "https://e1.pxfuel.com/desktop-wallpaper/872/427/desktop-wallpaper-bad-vibes-smoking-by-sykonik-aesthetic-smokers.jpg",
      alt: "Image 4"
    }
  ];

  return  (
    <section className="deepfakes-section d-flex align-items-center">
    <div className="container-fluid">
      <div className="row">
      
        <div className="col-12 image-column position-relative">
          <div
            id="carouselExample"
            className="carousel slide"
            data-bs-ride="carousel" 
            data-bs-interval="2000" // Set the interval time to 2000 milliseconds (3 seconds)
          >
            <div className="carousel-inner">
              {carouselItems.map((item, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  key={index}
                >
                  <img
                    src={item.src}
                    className="d-block w-100"
                    alt={item.alt}
                    style={{ maxHeight: '100vh', objectFit: 'cover' }} // Adjusted maxHeight for full-screen effect
                  />
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="button-container d-flex justify-content-between align-items-center">
              <button
                className="prev slick-arrow"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
                aria-label="Previous slide"
              >
                <i className="fas fa-angle-left"></i>
              </button>
              <button
                className="next slick-arrow"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
                aria-label="Next slide"
              >
                <i className="fas fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
};


export default Carousel;
