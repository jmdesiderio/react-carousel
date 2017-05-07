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
      dragStartX: null,
      dragOffsetX: null,
      height: null,
      isDragging: false,
      shouldTransition: false,
      numberOfSlides: this.props.children.length,
      width: null
    }
  }

  componentDidMount () {
    this.updateWidth()
    window.addEventListener('resize', this.updateWidth)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    clearTimeout(this.eventuallyDisableTransitionsTimeoutId)
    window.removeEventListener('resize', this.updateWidth)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  updateWidth = () => {
    this.setState({ width: this.carouselNode.offsetWidth })
  }

  updateHeight = () => {
    this.setState({ height: null })
  }

  handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft':
        return this.goToPreviousSlide()
      case 'ArrowRight':
        return this.goToNextSlide()
    }
  }

  handleDragStart = (e) => {
    this.setState({
      dragStartX: e.clientX,
      isDragging: true
    })

    window.addEventListener('mousemove', this.handleDragMove)
    window.addEventListener('mouseup', this.handleDragEnd)
  }

  handleDragMove = (e) => {
    const dragOffsetX = e.clientX - this.state.dragStartX
    this.setState({ dragOffsetX })
  }

  handleDragEnd = () => {
    window.removeEventListener('mousemove', this.handleDragMove)
    window.removeEventListener('mouseup', this.handleDragEnd)

    if (this.state.dragOffsetX > this.state.width / 6) {
      this.goToPreviousSlide()
    } else if (this.state.dragOffsetX < this.state.width / -6) {
      this.goToNextSlide()
    } else {
      this.enableAndEventuallyDisableTransitions()
    }

    this.setState({
      dragStartX: null,
      dragOffsetX: null,
      isDragging: false
    })
  }

  enableAndEventuallyDisableTransitions () {
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
      return this.enableAndEventuallyDisableTransitions()
    }

    const nextSlideIndex = (this.state.currentSlide + 1) % this.state.numberOfSlides
    this.goToSlide(nextSlideIndex)
  }

  goToPreviousSlide = () => {
    if (!this.props.isInfinite && this.state.currentSlide === 0) {
      return this.enableAndEventuallyDisableTransitions()
    }

    const previousSlideIndex = (this.state.currentSlide === 0)
      ? this.state.numberOfSlides - 1
      : this.state.currentSlide - 1

    this.goToSlide(previousSlideIndex)
  }

  render () {
    const {
      isInfinite,
      slidesToShow,
      transitionDuration
    } = this.props

    const {
      currentSlide,
      dragOffsetX,
      isDragging,
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
              isDragging={isDragging}
              shouldTransition={shouldTransition}
              slidesToShow={slidesToShow}
              transitionDuration={transitionDuration}
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
            currentSlide={currentSlide}
            numberOfSlides={numberOfSlides}
            goToPreviousSlide={this.goToPreviousSlide}
            goToNextSlide={this.goToNextSlide}
            isInfinite={isInfinite}
          />
        </Wrapper>
      </div>
    )
  }
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  isInfinite: PropTypes.bool,
  slidesToShow: PropTypes.number,
  transitionDuration: PropTypes.number
}

Carousel.defaultProps = {
  isInfinite: false,
  slidesToShow: 1,
  transitionDuration: 300
}

export default Carousel
