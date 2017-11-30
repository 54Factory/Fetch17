import React from 'react';
import ProfilePic from '../../assets/mocks/profileImages/anonymousProfile200px.png'
import { CustomerCardWrapper } from './customerCard.style';


export default class SingleCustomerView extends React.Component {

  render() {  
    console.log(this.props) 
    const { customer, customerAttributes, customerNote } = this.props;
    const name = `${customer.firstName} ${customer.lastName}` ? `${customer.firstName} ${customer.lastName}` : 'No Name';
        const extraInfos = [];
    customerAttributes.forEach(attribute => {
      const value = customer[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="isoCustomerCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">{value}</p>
          </div>,
        );
      }
    });
    return (
      <CustomerCardWrapper className="isoCustomerCard">
        <div className="isoCustomerCardHead">
          <div className="isoCustomerImage">
            {<img alt="#" src={ProfilePic} /> }
          </div>
          <h1 className="isoCustomerName">{name}</h1>
        </div>
        <div className="isoCustomerInfoWrapper">
          {extraInfos}
        </div>
        <div className="isoCustomerInfoWrapper">
          <div className="isoCustomerCardInfos">
            <p className="isoInfoLabel">Customer Notes</p>
          </div>
        { customerNote.length === 0 ? (
          <div className="isoCustomerCardInfos">
              <li className="isoInfoDetails">This customer doesn't have any notes.</li>
            </div>
        ) : 
          customerNote.map(note => (
            <div className="isoCustomerCardInfos" key={note.id}>
              <li className="isoInfoDetails" key={note.id}>{note.customerNoteContent}</li>
            </div>
          ))}
        </div>
      </CustomerCardWrapper>
    );
  }
}

