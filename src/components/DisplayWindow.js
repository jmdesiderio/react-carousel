import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  overflow: hidden;
`

class DisplayWindow extends Component {
  render () {
    return (
      <Wrapper>
        {this.props.children}
      </Wrapper>
    )
  }
}

DisplayWindow.propTypes = {
  children: PropTypes.element
}

export default DisplayWindow
