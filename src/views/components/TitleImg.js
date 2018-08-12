import React from 'react';
function TitleImg(props) {
    return (
      <img className={props.classes} src={props.src} role="presentation" />
    );
  }

export default TitleImg;