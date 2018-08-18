import React from 'react';
function TitleImg(props) {
  return (
    <img className={props.classes} src={props.src} role="presentation" alt={props.alt || 'titleImg'} />
  );
}

export default TitleImg;