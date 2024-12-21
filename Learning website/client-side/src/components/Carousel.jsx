import React from 'react'

function Carousel({carouselImages}) {
  return (
    <>
           <div id="carouselExampleAutoplaying" className="carousel slide m-0 t-0" data-bs-ride="carousel">
        <div className="carousel-inner" style={{ height: '80vh' }}>
          {carouselImages.map((img) => {
            return (
              <div className="carousel-item active" key={img.index}>
                <img src={img.img} className="d-block w-100" alt="..." style={{ height: '80vh', objectFit: 'cover'}} />
                  <div class="carousel-caption d-none d-md-block">
                    <h5>{img.heading}</h5>
                  </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <span className="visually-hidden">Previous</span>
          </span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true">
            <span className="visually-hidden">Next</span>
          </span>
        </button>
      </div> 
    </>
  )
}

export default Carousel
