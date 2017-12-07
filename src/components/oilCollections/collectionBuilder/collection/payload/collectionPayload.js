import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PayloadWrapper from './collectionPayload.style'
//import './collectionPayload.css';

class CollectionPayload extends Component {
    render () {
        let payload = null;

        switch ( this.props.type ) {
            case ( 'waste' ):
            payload = (
              <PayloadWrapper>
                <div className="Waste"></div>
              </PayloadWrapper>
            );
            break;
            case ( 'water' ):
                payload = (
                  <PayloadWrapper>
                    <div className="Water"></div>
                  </PayloadWrapper>
                );
                break;
            case ( 'oil' ):
                payload = (
                  <PayloadWrapper>
                    <div className="Oil"></div>
                  </PayloadWrapper>
                );
                break;
            default:
                payload = null;
        }

        return payload;
    }
}

CollectionPayload.propTypes = {
    type: PropTypes.string.isRequired
};

export default CollectionPayload;