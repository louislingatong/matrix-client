import React from 'react';
import PropTypes from 'prop-types';
import {BarLoader, ClipLoader, BeatLoader} from 'react-spinners';
import { css } from '@emotion/react'

Loader.propTypes = {
  type: PropTypes.oneOf(['bar', 'clip', 'beat']),
  color: PropTypes.oneOf(['light', 'dark']),
};

const override = css`
  display: block;
  width: 100%;
`;

const colors = {
  light: '#fff',
  dark: '#000'
};

function Loader(props) {
  const color = colors[props.color] || colors.dark
  switch (props.type) {
    case 'beat':
      return <div><BeatLoader color={color} loading={true} size={10}/></div>
    case 'clip':
      return <div className="loader-wrapper-overlay"><ClipLoader color={color} loading={true} size={50}/></div>
    case 'bar':
    default:
      return <div className="loader-wrapper"><BarLoader color={color} loading={true} css={override}/></div>
  }
}

export default Loader;