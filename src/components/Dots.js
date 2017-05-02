import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  bottom: 20px;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
`

const Dot = styled.div`
  background-color: ${props => props.isCurrentSlide ? '#000' : '#666'}
  border-radius: 100%;
  cursor: pointer;
  height: 10px;
  margin: 4px;
  opacity: .8;
  width: 10px;
`

class Dots extends Component {
  renderDots () {
    const { currentSlide, goToSlide, numberOfSlides } = this.props

    return Array(numberOfSlides).fill().map((_, index) => {
      const isCurrentSlide = index === currentSlide

      return (
        <Dot
          key={index}
          isCurrentSlide={isCurrentSlide}
          onClick={() => goToSlide(index)}
        />
      )
    })
  }

  render () {
    return (
      <Wrapper>
        {this.renderDots()}
      </Wrapper>
    )
  }
}

Dots.propTypes = {
  currentSlide: PropTypes.number,
  goToSlide: PropTypes.func,
  numberOfSlides: PropTypes.number
}

export default Dots
