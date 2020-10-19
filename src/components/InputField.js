import React from 'react';

export default (props) => {
  return (
    <>
    <input
        className="form-control mb-3"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={ (e) => props.onChange(e.target.value) }
    />
    
    </>
  );
};
