import React from 'react'
import { Carousel } from 'react-bootstrap'

function Carousels() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/carousel1.png")}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/carousel1.jpg")}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/carousel2.png")}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  )
}

export default Carousels