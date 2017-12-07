import React from 'react';
import BuildControlWrapper from './buildControl.style'

const buildControl = (props) => (
    <BuildControlWrapper>
        <div className="Label">{props.label}</div>
        <button 
            className="Less" 
            onClick={props.removed}
            disabled={props.disabled}>- 5</button>
        <button 
            className="More" 
            onClick={props.added}>+ 5</button>
    </BuildControlWrapper>
);

export default buildControl;