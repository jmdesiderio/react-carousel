import React from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../src'

const slideStyles = {
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  height: '400px'
}

// const settings = {
//   isInfinite: false,
//   slidesToShow: 1,
//   transitionDuration: 300
// }

const Example = () => (
  <Carousel>
    <div style={{ ...slideStyles, backgroundColor: '#F44336' }}>Test 1</div>
    <div style={{ ...slideStyles, backgroundColor: '#2196F3' }}>Test 2</div>
    <div style={{ ...slideStyles, backgroundColor: '#4CAF50' }}>Test 3</div>
    <div style={{ ...slideStyles, backgroundColor: '#FFEB3B' }}>Test 4</div>
  </Carousel>
)

ReactDOM.render(<Example />, document.getElementById('root'))
