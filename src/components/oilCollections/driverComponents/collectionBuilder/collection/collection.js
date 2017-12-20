import React from 'react';
import Collection from'./collection.style'
import CollectionPayload from './payload/collectionPayload'

const collection = (props) => {
  let transformedPayloads = Object.keys( props.payloads )
  .map( payloadKey => {
      return [...Array( props.payloads[payloadKey] )].map( ( _, i ) => {
          return <CollectionPayload key={payloadKey + i} type={payloadKey} />;
      } );
  } )
  .reduce((arr, el) => {
      return arr.concat(el)
  }, []);
if (transformedPayloads.length === 0) {
  transformedPayloads = <p style={{ textAlign: 'center', marginBottom: '25px', fontWeight: '500' }}>Add Material!</p>;
}
  return (
      <div className={Collection}>
        {transformedPayloads}
      </div>    
  );
}

export default collection