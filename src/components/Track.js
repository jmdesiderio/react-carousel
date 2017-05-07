import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import merge from 'lodash.merge'

const Wrapper = styled.div`
  display: flex;
  transform: translate3d(${props => props.translateOffset}px, 0, 0);
  transition: transform ${props => (props.shouldTransition) ? props.transitionDuration : 0}ms ease-in-out;
  width: ${props => props.trackWidth}px
`

const Track = (props) => {
  const {
    dragOffsetX,
    isInfinite,
    numberOfSlides,
    shouldTransition,
    slidesToShow,
    transitionDuration,
    width
  } = props

  if (!width) return null

  const children = [ ...props.children ]
  let currentSlide = props.currentSlide

  if (isInfinite) {
    children.push(children[0])
    children.unshift(children[numberOfSlides - 1])
    currentSlide = props.currentSlide + 1
  }

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
      {React.Children.map(children, child => {
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
