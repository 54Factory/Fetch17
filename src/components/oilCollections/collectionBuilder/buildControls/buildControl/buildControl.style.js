import styled from 'styled-components';


const BuildControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;



 button {
  display: block;
  font: inherit;
  padding: 5px;
  margin: 0 5px;
  width: 60px;
  border: 1px solid #AA6817;
  cursor: pointer;
  outline: none;

  &:disabled {
    background-color: #AC9980;
    border: 1px solid #7E7365;
    color: #ccc;
    cursor: default;
  }
  
   &:hover &:disabled {
    background-color: #AC9980;
    color: #ccc;
    cursor: not-allowed;
  }

}

.Label {
  padding: 10px;
  font-weight: bold;
  width: 80px;
}

 .LessOil {  
  background-color: #f4d004;
  color: white;
}

 .MoreOil {
  background-color: #f4d004;
  color: white;
}

.LessWater {  
  background-color: blue;
  color: white;
}

 .MoreWater {
  background-color: blue;
  color: white;
}

.LessWaste {  
  background-color: #D39952;
  color: white;
}

 .MoreWaste {
  background-color: #8F5E1E;
  color: white;
}

 .Less &:hover {  
  background-color: #DAA972;
  color: white;
}

.Less &:active {  
  background-color: #DAA972;
  color: white;
}

 .More &:hover {
  background-color: #99703F;
  color: white;
}

.More &:active {
  background-color: #99703F;
  color: white;
}
`;

export default BuildControlWrapper ;
