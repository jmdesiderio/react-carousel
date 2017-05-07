import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const DefaultButton = styled.button`
  align-items: center;
  background-color: #444;
  border-radius: 100%;
  border: 0;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 24px;
  height: 40px;
  justify-content: center;
  line-height: 1;
  opacity: .6;
  outline: none;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 200ms ease-in-out;
  width: 40px;

  &:hover {
    opacity: 1;
  }
`

const DefaultArrowLeft = styled(DefaultButton)`
  left: 20px;

  &::after {
    content: '\\2190'
  }
`

const DefaultArrowRight = styled(DefaultButton)`
  right: 20px;

  &::after {
    content: '\\2192'
  }
`

const Controls = (props) => {
  const {
    ArrowLeft,
    ArrowRight,
    currentSlide,
    goToPreviousSlide,
    goToNextSlide,
    isInfinite,
    numberOfSlides
  } = props

  const isFirstSlide = currentSlide === 0
  const isLastSlide = currentSlide === numberOfSlides - 1

  const hideArrowLeft = !isInfinite && isFirstSlide
  const hideArrowRight = !isInfinite && isLastSlide

  return (
    <Wrapper>
      {(hideArrowLeft) ? null : <ArrowLeft onClick={goToPreviousSlide} />}
      {(hideArrowRight) ? null : <ArrowRight onClick={goToNextSlide} />}
    </Wrapper>
  )
}

Controls.propTypes = {
  ArrowLeft: PropTypes.func,
  ArrowRight: PropTypes.func,
  currentSlide: PropTypes.number,
  goToPreviousSlide: PropTypes.func,
  goToNextSlide: PropTypes.func,
  isInfinite: PropTypes.bool,
  numberOfSlides: PropTypes.number
}

Controls.defaultProps = {
  ArrowLeft: DefaultArrowLeft,
  ArrowRight: DefaultArrowRight
}

export default Controls
