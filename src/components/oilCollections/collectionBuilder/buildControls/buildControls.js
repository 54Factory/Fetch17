import React from 'react';
import BuildControl from './buildControl/buildControl';
import BuildControlsWrapper from './buildControls.style'

const controls = [
  { label: 'Oil', type: 'oil' },
  { label: 'Waste', type: 'waste' },
  { label: 'Water', type: 'water' }
]

const buildControls = (props) => (
  <BuildControlsWrapper>
    <p>Total Gallons: <strong>{props.totalCollected}</strong></p>
  {controls.map(ctrl => (
      <BuildControl 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.materialAdded(ctrl.type)}
          removed={() => props.materialRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
       />
  ))}
  {/* <button 
      className="OrderButton"
      disabled={!props.purchasable}
      onClick={props.ordered}>ORDER NOW</button> */}
  </BuildControlsWrapper>
)
console.log(buildControls)
export default buildControls;