import React from 'react';
import PropTypes from 'prop-types';

function TitleImg({
  classes,
  src,
  alt
}) {
  return (
    <img
      className={classes}
      src={src}
      role="presentation"
      alt={alt || 'titleImg'}
    />
  );
}

TitleImg.propTypes = {
  classes: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string
};

TitleImg.defaultProps = {
  classes: '',
  alt: ''
};

export default TitleImg;
