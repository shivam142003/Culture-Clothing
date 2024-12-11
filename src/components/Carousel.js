import React from 'react';
import '../css/About.css';

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

  return (
    <section className="carousel-section">
      <div className="container-fluid">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-lg-6 col-md-6 text-section">
            <h2 className="carousel-head">Discover more on our website</h2>
            <p className="carousel-text">
              Dive deeper into our culture, values, and offerings by exploring the sections of our website tailored to your interests.
            </p>
            <a href="/" className="btn btn-primary btn-lg carousel-button">
              Explore Now
            </a>
          </div>

          {/* Carousel Section */}
          <div className="col-lg-6 col-md-6 image-column">
            <div
              id="carouselExample"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="2000"
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
                      style={{ maxHeight: '100vh', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>

              {/* Carousel Controls */}
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
