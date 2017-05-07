import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import merge from 'lodash.merge'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  transform: translate3d(${p => p.translateOffset}px, 0, 0);
  transition: transform ${p => p.transitionDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1);
  width: ${p => p.trackWidth}px
`

class Track extends Component {
  render () {
    if (!this.props.width) return null

    const {
      dragOffsetX,
      isInfinite,
      numberOfSlides,
      shouldTransition,
      slidesToShow,
      width
    } = this.props

    const children = [ ...this.props.children ]
    let currentSlide = this.props.currentSlide

    if (isInfinite) {
      children.push(this.props.children.slice(0, slidesToShow))
      children.unshift(this.props.children.slice(numberOfSlides - slidesToShow))
      currentSlide = this.props.currentSlide + slidesToShow
    }

    const transitionDuration = (shouldTransition) ? this.props.transitionDuration : 0
    const slideWidth = width / slidesToShow
    const trackWidth = slideWidth * children.length
    const translateOffset = currentSlide * slideWidth * -1
    const transform = (dragOffsetX)
      ? `translate3d(${translateOffset + dragOffsetX}px, 0, 0)`
      : null

    return (
      <Wrapper
        shouldTransition={shouldTransition}
        style={{ transform }}
        transitionDuration={transitionDuration}
        translateOffset={translateOffset}
        trackWidth={trackWidth}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(
            child,
            merge({}, child.props, {
              style: {
                width: slideWidth
              }
            })
          )
        })}
      </Wrapper>
    )
  }
}

Track.propTypes = {
  children: PropTypes.node,
  currentSlide: PropTypes.number,
  dragOffsetX: PropTypes.number,
  isInfinite: PropTypes.bool,
  numberOfSlides: PropTypes.number,
  shouldTransition: PropTypes.bool,
  slidesToShow: PropTypes.number,
  transitionDuration: PropTypes.number,
  width: PropTypes.number
}

export default Track
