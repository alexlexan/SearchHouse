import React from 'react';
import { Marker } from '@react-google-maps/api'
import {setActiveProperty} from '../store/actions/booking'

import { connect } from 'react-redux'

function MarkerContainer(props) {

    const {properties,setActiveProperty,defaultMarkerIcon} = props

    return (
      properties && properties.map((property,number) => {
            const {latitude, longitude, index} = property;
            const position = {lat: latitude,lng: longitude}
            const label = {color: '#ffffff',text: `${index+1}`};

            return <Marker
              key={index}
              onClick={setActiveProperty.bind(null,property,number)}
              position={position}
              icon={defaultMarkerIcon}
              label={label}
            />  

      })
    );
  }


const mapDispatchToProps = {
  setActiveProperty
}


export default connect(null,mapDispatchToProps)(MarkerContainer)