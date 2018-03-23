import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import './LoadingSpinner.css';


const LoadingSpinner = ({ className }) => (
  <svg
    className={cs('LoadingSpinner', [className])}
    width="65px"
    height="65px"
    viewBox="0 0 66 66"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMinYMid meet">
    <circle
      className="LoadingSpinner-path"
      fill="none"
      strokeWidth="6"
      strokeLinecap="round"
      cx="33"
      cy="33"
      r="30" />
  </svg>
);

LoadingSpinner.defaultProps = {
  className: undefined,
};

LoadingSpinner.propTypes = {
  className: PropTypes.string,
};

export default LoadingSpinner;
