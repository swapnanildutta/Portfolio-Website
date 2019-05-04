import React from 'react';

const Svg = ({ icon, color, className }) => {
  const svgObject = {
    projects: () => (
      <svg className={className} fill={color || 'white'} width="750" height="137" viewBox="0 0 750 137">
      </svg>
    ),
    profile: () => (
      <svg className={className} fill={color || 'white'} width="135" height="765" viewBox="0 0 135 765">
      </svg>
    ),
  }

  return svgObject[icon]();
}

export default Svg;
