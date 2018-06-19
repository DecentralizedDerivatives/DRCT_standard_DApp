import React from 'react';
import './circularProgressStyles.css';

const CircularProgress = () => {
  return (
    <div class="preloader-wrapper active progress">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle" />
        </div>
        <div class="gap-patch">
          <div class="circle" />
        </div>
        <div class="circle-clipper right">
          <div class="circle" />
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
