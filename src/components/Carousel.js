import React from 'react';
import '../css/style.css';  

const Carousel = () => {
  // Dummy data for carousel items
  const carouselItems = [
    {
      src: "https://i.pinimg.com/736x/96/67/2a/96672a648e05d177de4c0f8253104b4b.jpg",
      alt: "Image 1"
    },
    {
      src: "https://cdn.hero.page/pfp/840e3a9e-e1cd-43ef-a03f-e43a2e86c7fe-gloom-and-brilliance-anime-pfp-in-dark-aesthetic-mood-2.png",
      alt: "Image 2"
    },
    {
      src: "https://wallpapers-clan.com/wp-content/uploads/2022/10/dark-aesthetic-anime-pfp-1.jpg",
      alt: "Image 3"
    },
    {
      src: "https://i.pinimg.com/236x/63/61/e0/6361e029d37355532fb94992b251ded5.jpg",
      alt: "Image 4"
    }
  ];

  return (
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
