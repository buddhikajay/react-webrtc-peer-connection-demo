import React from 'react';

const ButtonComponent = ({text, onClick}) => {
  return (
    <button
      onClick={onClick}
    >
      {text || 'Click Here'}
    </button>
  )
}

export default ButtonComponent;