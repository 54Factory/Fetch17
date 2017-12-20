import React from 'react';
import { BuildControl, BuildControlFiftyFive, BuildControlOneHundred, BuildControlOneHundredFifty, BuildControlTwoHundred, BuildControlThreeHundred } from './buildControl/buildControl';
import BuildControlsWrapper from './buildControls.style'

const controls = [
  { label: 'Oil', type: 'oil' },
  { label: 'Water', type: 'water' },
  { label: 'Waste', type: 'waste' }
  
]

export const BuildControls = (props) => (
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
  <button 
      className="CollectButton"
      disabled={!props.canCollect}
      onClick={props.collected}
      >Collect</button>
  </BuildControlsWrapper>
)

export const BuildControlsFiftyFive = (props) => (
  <BuildControlsWrapper>
    <p>Total Gallons: <strong>{props.totalCollected}</strong></p>
  {controls.map(ctrl => (
      <BuildControlFiftyFive 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.materialAdded(ctrl.type)}
          removed={() => props.materialRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
       />
  ))}
  <button 
      className="CollectButton"
      disabled={!props.canCollect}
      onClick={props.collected}
      >Collect</button>
  </BuildControlsWrapper>
)

export const BuildControlsOneHundred = (props) => (
  <BuildControlsWrapper>
    <p>Total Gallons: <strong>{props.totalCollected}</strong></p>
  {controls.map(ctrl => (
      <BuildControlOneHundred 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.materialAdded(ctrl.type)}
          removed={() => props.materialRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
       />
  ))}
  <button 
      className="CollectButton"
      disabled={!props.canCollect}
      onClick={props.collected}
      >Collect</button>
  </BuildControlsWrapper>
)

export const BuildControlsOneHundredFifty = (props) => (
  <BuildControlsWrapper>
    <p>Total Gallons: <strong>{props.totalCollected}</strong></p>
  {controls.map(ctrl => (
      <BuildControlOneHundredFifty 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.materialAdded(ctrl.type)}
          removed={() => props.materialRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
       />
  ))}
  <button 
      className="CollectButton"
      disabled={!props.canCollect}
      onClick={props.collected}
      >Collect</button>
  </BuildControlsWrapper>
)

export const BuildControlsTwoHundred = (props) => (
  <BuildControlsWrapper>
    <p>Total Gallons: <strong>{props.totalCollected}</strong></p>
  {controls.map(ctrl => (
      <BuildControlTwoHundred 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.materialAdded(ctrl.type)}
          removed={() => props.materialRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
       />
  ))}
  <button 
      className="CollectButton"
      disabled={!props.canCollect}
      onClick={props.collected}
      >Collect</button>
  </BuildControlsWrapper>
)

export const BuildControlsThreeHundred = (props) => (
  <BuildControlsWrapper>
    <p>Total Gallons: <strong>{props.totalCollected}</strong></p>
  {controls.map(ctrl => (
      <BuildControlThreeHundred 
          key={ctrl.label} 
          label={ctrl.label}
          added={() => props.materialAdded(ctrl.type)}
          removed={() => props.materialRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
       />
  ))}
  <button 
      className="CollectButton"
      disabled={!props.canCollect}
      onClick={props.collected}
      >Collect</button>
  </BuildControlsWrapper>
)

