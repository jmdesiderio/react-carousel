import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  overflow: hidden;
`

const DisplayWindow = (props) => (
  <Wrapper>
    {props.children}
  </Wrapper>
)

DisplayWindow.propTypes = {
  children: PropTypes.element
}

export default DisplayWindow
