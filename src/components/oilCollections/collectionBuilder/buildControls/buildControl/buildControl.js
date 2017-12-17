import React from 'react';
import BuildControlWrapper from './buildControl.style'

export const BuildControl = (props) => (
    <BuildControlWrapper>
        <div className="Label">{props.label}</div>
        <button 
            className={`Less${props.label}`} 
            onClick={props.removed}
            disabled={props.disabled}>- 5</button>
        <button 
            className={`More${props.label}`} 
            onClick={props.added}>+ 5</button>
    </BuildControlWrapper>
);

export const BuildControlFiftyFive = (props) => (
    <BuildControlWrapper>
        <div className="Label">{props.label}</div>
        <button 
            className={`Less${props.label}`} 
            onClick={props.removed}
            disabled={props.disabled}>- 5</button>
        <button 
            className={`More${props.label}`} 
            onClick={props.added}>+ 5</button>
    </BuildControlWrapper>
);

export const BuildControlOneHundred = (props) => (
    <BuildControlWrapper>
        <div className="Label">{props.label}</div>
        <button 
            className={`Less${props.label}`} 
            onClick={props.removed}
            disabled={props.disabled}>- 10</button>
        <button 
            className={`More${props.label}`} 
            onClick={props.added}>+ 10</button>
    </BuildControlWrapper>
);

export const BuildControlOneHundredFifty = (props) => (
    <BuildControlWrapper>
        <div className="Label">{props.label}</div>
        <button 
            className={`Less${props.label}`} 
            onClick={props.removed}
            disabled={props.disabled}>- 15</button>
        <button 
            className={`More${props.label}`} 
            onClick={props.added}>+ 15</button>
    </BuildControlWrapper>
);

export const BuildControlTwoHundred = (props) => (
    <BuildControlWrapper>
        <div className="Label">{props.label}</div>
        <button 
            className={`Less${props.label}`} 
            onClick={props.removed}
            disabled={props.disabled}>- 20</button>
        <button 
            className={`More${props.label}`} 
            onClick={props.added}>+ 20</button>
    </BuildControlWrapper>
);

export const BuildControlThreeHundred = (props) => (
    <BuildControlWrapper>
        <div className="Label">{props.label}</div>
        <button 
            className={`Less${props.label}`} 
            onClick={props.removed}
            disabled={props.disabled}>- 30</button>
        <button 
            className={`More${props.label}`} 
            onClick={props.added}>+ 30</button>
    </BuildControlWrapper>
);

