import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from './components/Carousel.js'

const slideStyles = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '500px'
}

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1
}

const Example = () => (
  <Carousel {...settings}>
    <div style={{ backgroundColor: '#F44336', ...slideStyles }}>Test 1</div>
    <div style={{ backgroundColor: '#2196F3', ...slideStyles }}>Test 2</div>
    <div style={{ backgroundColor: '#4CAF50', ...slideStyles }}>Test 3</div>
    <div style={{ backgroundColor: '#FFEB3B', ...slideStyles }}>Test 4</div>
  </Carousel>
)

ReactDOM.render(<Example />, document.getElementById('root'))