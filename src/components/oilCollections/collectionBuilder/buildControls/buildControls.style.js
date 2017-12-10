import styled from 'styled-components';
import { borderRadius } from '../../../../config/style-util';


const BuildControlsWrapper = styled.div`
  width: 100%;
  background-color: #CF8F2E;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 2px 1px #ccc;
  padding: 10px 0;
  ${borderRadius('5px')};

  @media only screen and (max-width: 300px) {
    padding: 50px 20px;
    flex-direction: column;
    height: auto;
  }

  .OrderButton {
    background-color: #DAD735;
    outline: none;
    cursor: pointer;
    border: 1px solid #966909;
    color: #966909;
    font-family: inherit;
    font-size: 1.2em;
    padding: 15px 30px;
    box-shadow: 2px 2px 2px #966909;

      &:hover {
        background-color: #A0DB41;
        border: 1px solid #966909;
        color: #966909;
      }

      &:active {
        background-color: #A0DB41;
        border: 1px solid #966909;
        color: #966909;
      }
      &:disabled {
        background-color: #C7C6C6;
        cursor: not-allowed;
        border: 1px solid #ccc;
        color: #888888;
      }
  }
  
 
  
  .OrderButton:not(:disabled) {
      animation: enable 0.3s linear;
  }
  
  @keyframes enable {
      0% {
          transform: scale(1);
      }
      60% {
          transform: scale(1.1);
      }
      100% {
          transform: scale(1);
      }
  }
}
`;

export default BuildControlsWrapper ;
