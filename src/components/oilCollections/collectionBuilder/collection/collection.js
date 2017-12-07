import React from 'react';
//import classes from './collection.css'
import Collection from'./collection.style'
//import ContainerBottom from'./collection.style'
import CollectionPayload from './payload/collectionPayload'

const collection = (props) => {
  let transformedPayloads = Object.keys( props.payloads )
  .map( igKey => {
      return [...Array( props.payloads[igKey] )].map( ( _, i ) => {
          return <CollectionPayload key={igKey + i} type={igKey} />;
      } );
  } )
  .reduce((arr, el) => {
      return arr.concat(el)
  }, []);
if (transformedPayloads.length === 0) {
  transformedPayloads = <p>Add Collection Contents</p>;
}
  return (
      <div className={Collection}>
        {transformedPayloads}
      </div>    
  );
}

export default collection