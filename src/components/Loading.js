import React from 'react';

export const Loading = () => {
  return (
    <div>
      <img className='loading-spinner' alt='Loading' src={require("../imgs/spinner.gif")} />
      <h5>Loading ... </h5>
    </div>
  );
};

export default Loading;
