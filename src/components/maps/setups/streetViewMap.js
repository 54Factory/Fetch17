import React from 'react';
import { compose, withProps } from 'recompose'
//import FaAnchor from 'react-icons/lib/fa/anchor'
import {
  withGoogleMap,
  GoogleMap,
  StreetViewPanorama,
  OverlayView,
} from 'react-google-maps'

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const StreetViewPanormaWithAnOverlayView = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCCH6ORS-0oa4Jj3uy7DrB2cXPqMEu7Tgg",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 49.2853171, lng: -123.1119202 },
  }),
  withGoogleMap
)(props =>
  <GoogleMap defaultZoom={8} defaultCenter={props.center}>
    <StreetViewPanorama defaultPosition={props.center} visible>
      <OverlayView
        position={{ lat: 49.28590291211115, lng: -123.11248166065218 }}
          mapPaneName={OverlayView.OVERLAY_LAYER}
          getPixelPositionOffset={getPixelPositionOffset}
      >
        <div style={{ background: `red`, color: `white`, padding: 5, borderRadius: `50%` }}>
          OverlayView
        </div>
      </OverlayView>
    </StreetViewPanorama>
  </GoogleMap>
);

export default class StreetViewMap extends React.Component {
  render() {
    return(
      <StreetViewPanormaWithAnOverlayView 
      
      />
    )
  }
}

