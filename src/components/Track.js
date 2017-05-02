import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import merge from 'lodash.merge'

const Wrapper = styled.div`
  display: flex;
  transform: translate3d(${props => props.translateOffset}px, 0, 0);
  transition: transform 300ms ease-in-out;
  width: ${props => props.trackWidth}px
`

const Track = (props) => {
  const {
    children,
    currentSlide,
    slidesToShow,
    width
  } = props

  if (!width) { return null }

  const slideWidth = width / slidesToShow
  const trackWidth = slideWidth * children.length
  const translateOffset = currentSlide * slideWidth * -1

  return (
    <Wrapper
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
  slidesToShow: PropTypes.number,
  width: PropTypes.number
}

export default Track
