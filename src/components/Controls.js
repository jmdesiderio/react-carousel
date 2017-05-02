import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
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

const LeftArrow = styled(Button)`
  left: 20px;
`

const RightArrow = styled(Button)`
  right: 20px;
`

const Controls = (props) => {
  const { goToPreviousSlide, goToNextSlide } = props

  return (
    <Wrapper>
      <LeftArrow
        dangerouslySetInnerHTML={{ __html: '&larr;' }}
        onClick={goToPreviousSlide}
      />
      <RightArrow
        dangerouslySetInnerHTML={{ __html: '&rarr;' }}
        onClick={goToNextSlide}
      />
    </Wrapper>
  )
}

Controls.propTypes = {
  goToPreviousSlide: PropTypes.func,
  goToNextSlide: PropTypes.func
}

export default Controls
