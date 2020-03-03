import React from 'react';
import './Switch.css';

function Switch({play, onSwitchChange}) {
  
  return (
  <div className="switch-container">
    <label className="switch">
      <input type="checkbox" 
             className="switch-input" 
             defaultChecked={play ? false : true} 
             onChange={onSwitchChange} />
      <span className="switch-label" data-on="Train" data-off="Play"></span>
      <span className="switch-handle"></span>
    </label>
  </div>
  )
}

export default Switch;