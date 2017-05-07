import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Controls from './Controls'
import DisplayWindow from './DisplayWindow'
import Dots from './Dots'
import Track from './Track'

const Wrapper = styled.div`
  position: relative;
`

class Carousel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentSlide: 0,
      dragStartX: null,
      dragOffsetX: null,
      numberOfSlides: this.props.children.length,
      shouldTransition: false,
      width: null
    }

    this.carouselNode = null
    this.eventuallyDisableTransitionsTimeoutId = null
  }

  componentDidMount () {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    clearTimeout(this.eventuallyDisableTransitionsTimeoutId)
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  updateDimensions = () => {
    this.setState({ width: this.carouselNode.offsetWidth })
  }

  handleKeyDown = ({ key }) => {
    switch (key) {
      case 'ArrowLeft':
        return this.goToPreviousSlide()
      case 'ArrowRight':
        return this.goToNextSlide()
    }
  }

  handleDragStart = ({ clientX }) => {
    this.setState({ dragStartX: clientX })

    window.addEventListener('mousemove', this.handleDragMove)
    window.addEventListener('mouseup', this.handleDragEnd)
  }

  handleDragMove = ({ clientX }) => {
    this.setState({ dragOffsetX: clientX - this.state.dragStartX })
  }

  handleDragEnd = () => {
    window.removeEventListener('mousemove', this.handleDragMove)
    window.removeEventListener('mouseup', this.handleDragEnd)

    if (this.state.dragOffsetX > this.state.width / 6) {
      this.goToPreviousSlide()
    } else if (this.state.dragOffsetX < this.state.width / -6) {
      this.goToNextSlide()
    } else {
      this.enableThenEventuallyDisableTransitions()
    }

    this.setState({
      dragStartX: null,
      dragOffsetX: null
    })
  }

  enableThenEventuallyDisableTransitions () {
    this.setState({ shouldTransition: true })
    this.eventuallyDisableTransitions()
  }

  eventuallyDisableTransitions = () => {
    clearTimeout(this.eventuallyDisableTransitionsTimeoutId)

    this.eventuallyDisableTransitionsTimeoutId = setTimeout(
      this.setState.bind(this),
      this.props.transitionDuration,
      { shouldTransition: false }
    )
  }

  goToSlide = (index) => {
    this.setState({
      currentSlide: index,
      shouldTransition: true
    })

    this.eventuallyDisableTransitions()
  }

  goToNextSlide = () => {
    if (!this.props.isInfinite && this.state.currentSlide === this.state.numberOfSlides - 1) {
      return this.enableThenEventuallyDisableTransitions()
    }

    const nextSlideIndex = (this.state.currentSlide + 1) % this.state.numberOfSlides

    this.goToSlide(nextSlideIndex)
  }

  goToPreviousSlide = () => {
    if (!this.props.isInfinite && this.state.currentSlide === 0) {
      return this.enableThenEventuallyDisableTransitions()
    }

    const previousSlideIndex = (this.state.currentSlide === 0)
      ? this.state.numberOfSlides - 1
      : this.state.currentSlide - 1

    this.goToSlide(previousSlideIndex)
  }

  render () {
    const {
      goToSlide,
      goToPreviousSlide,
      goToNextSlide
    } = this

    const {
      children,
      isInfinite,
      slidesToShow,
      transitionDuration
    } = this.props

    const {
      currentSlide,
      dragOffsetX,
      shouldTransition,
      numberOfSlides,
      width
    } = this.state

    return (
      <div
        onMouseDown={this.handleDragStart}
        ref={(node) => { this.carouselNode = node }}
      >
        <Wrapper>
          <DisplayWindow>
            <Track
              currentSlide={currentSlide}
              dragOffsetX={dragOffsetX}
              isInfinite={isInfinite}
              numberOfSlides={numberOfSlides}
              shouldTransition={shouldTransition}
              slidesToShow={slidesToShow}
              transitionDuration={transitionDuration}
              width={width}
            >
              {children}
            </Track>
          </DisplayWindow>
          <Dots
            goToSlide={goToSlide}
            currentSlide={currentSlide}
            numberOfSlides={numberOfSlides}
          />
          <Controls
            currentSlide={currentSlide}
            numberOfSlides={numberOfSlides}
            goToPreviousSlide={goToPreviousSlide}
            goToNextSlide={goToNextSlide}
            isInfinite={isInfinite}
          />
        </Wrapper>
      </div>
    )
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  isInfinite: PropTypes.bool.isRequired,
  slidesToShow: PropTypes.number.isRequired,
  transitionDuration: PropTypes.number.isRequired
}

Carousel.defaultProps = {
  isInfinite: false,
  slidesToShow: 1,
  transitionDuration: 300
}

export default Carousel
