import React from 'react';
import ProgressLabel from 'react-progress-label';


export const TankCapacity = () => {
  const progress = 50;
  const textStyle = {
    'fill': 'black',
    'textAnchor': 'middle',
    'fontSize': '20px'
}
return (
  <ProgressLabel
    progress={progress}
    startDegree={0}
    progressWidth={8}
    trackWidth={20}
    cornersWidth={4}
    size={300}
    fillColor="yellow"
    trackColor="grey"
    progressColor="yellow">

    <text x="150" y="150" style={textStyle}>{`${progress}%`}</text>

  </ProgressLabel>
)
}