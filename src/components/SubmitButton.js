import React from 'react';

export default (props) => {
  return (
    <>
    <button
        className="btn btn-primary btn-block"
        disabled={props.disabled}
        onClick={ () => props.onClick() }
    >
        {props.text}
    </button>
    </>
  );
};
