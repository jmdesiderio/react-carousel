import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DisplayWindow from './DisplayWindow'
import Track from './Track'
import Dots from './Dots'
import Controls from './Controls'

const Wrapper = styled.div`
  position: relative;
`

class Carousel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentSlide: 0,
      numberOfSlides: this.props.children.length,
      width: null
    }

    this.updateCarouselWidth = this.updateCarouselWidth.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.goToSlide = this.goToSlide.bind(this)
    this.goToNextSlide = this.goToNextSlide.bind(this)
    this.goToPreviousSlide = this.goToPreviousSlide.bind(this)
  }

  componentDidMount () {
    this.updateCarouselWidth()
    window.addEventListener('resize', this.updateCarouselWidth)
    window.addEventListener('keydown', this.handleKeydown)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateCarouselWidth)
    window.removeEventListener('keydown', this.handleKeydown)
  }

  updateCarouselWidth () {
    this.setState({ width: this.carouselNode.offsetWidth })
  }

  handleKeydown (e) {
    switch (e.key) {
      case 'ArrowLeft':
        return this.goToPreviousSlide()
      case 'ArrowRight':
        return this.goToNextSlide()
    }
  }

  goToSlide (index) {
    this.setState({ currentSlide: index })
  }

  goToNextSlide () {
    const nextSlideIndex = (this.state.currentSlide + 1) % this.state.numberOfSlides
    this.goToSlide(nextSlideIndex)
  }

  goToPreviousSlide () {
    const previousSlideIndex = (this.state.currentSlide === 0)
      ? this.state.numberOfSlides - 1
      : this.state.currentSlide - 1

    this.goToSlide(previousSlideIndex)
  }

  render () {
    const { slidesToShow } = this.props
    const { currentSlide, numberOfSlides, width } = this.state

    return (
      <div ref={(node) => { this.carouselNode = node }}>
        <Wrapper>
          <DisplayWindow>
            <Track
              currentSlide={currentSlide}
              slidesToShow={slidesToShow}
              width={width}
            >
              {this.props.children}
            </Track>
          </DisplayWindow>
          <Dots
            goToSlide={this.goToSlide}
            currentSlide={currentSlide}
            numberOfSlides={numberOfSlides}
          />
          <Controls
            goToPreviousSlide={this.goToPreviousSlide}
            goToNextSlide={this.goToNextSlide}
          />
        </Wrapper>
      </div>
    )
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number
}

Carousel.defaultProps = {
  slidesToShow: 1,
  slidesToScroll: 1
}

export default Carousel
