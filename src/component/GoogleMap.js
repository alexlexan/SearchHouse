import React, { Component } from 'react'
import { GoogleMap, LoadScript, InfoWindow   } from '@react-google-maps/api'
import { Spinner, Flex, Box, IconButton } from "@chakra-ui/core";
import MarkerContainer from './MarkerContainer'

import {deleteActiveInfoWindow,closeMap} from '../store/actions/booking'

import { connect } from 'react-redux'

class MyComponents extends Component {
  
  state = {
    defaultMarkerIcon: ''
  }

  onLoad = () => {
    this.setState({
      defaultMarkerIcon : {
        url: 'https://ihatetomatoes.net/react-tutorials/google-maps/images/img_map-marker.png',
        // This marker is 22 pixels wide by 40 pixels high.
        size: new window.google.maps.Size(22, 55),
        // The origin for this image is (0, 0).
        origin: new window.google.maps.Point(0, -15),
        // The anchor for this image is the base of the cross (11, 52).
        anchor: new window.google.maps.Point(11, 52)
      }
    })
    
  }

  render() {
    
    const {properties, activeProperty,closeMap,isFiltering,filteredProperties,deleteActiveInfoWindow,isInfoWindow,isOpenMap} = this.props;
    const {latitude,longitude,address} = activeProperty 
    const positionInfoWindow = 0.0015
    const openMapClass = isOpenMap ? '' : 'map-container--hide'

     return (
       <Flex className={`map-container ${openMapClass}`} justify="center" align="center">
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyD30__JPhmKFr6qzoxbWmYLMgkwEfYbEGg"
          onLoad={this.onLoad}
          loadingElement={ <Spinner  speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" m="0 auto" /> }
        >
          <GoogleMap
            id='example-map'
            zoom={15}
            mapContainerStyle	= {{width:'100%',height: '100%'}}
            center={{lat: latitude,lng: longitude}}
          >
            { !(filteredProperties.length === 0 && isFiltering) && isInfoWindow &&
              <InfoWindow
              position={{lat: latitude + positionInfoWindow, lng: longitude}}
              onCloseClick={deleteActiveInfoWindow}
              >
                <Box fontSize="14px" p="5px" fontWeight="600">
                  {address}
                </Box>
            </InfoWindow> }
            {
              isOpenMap && 
              <IconButton onClick={closeMap} position="absolute" right="60px" top="10px" variant="outline" color="blue.500"
                borderRadius= "2px" aria-label="Call Sage" icon="close" background="none rgb(255, 255, 255)"
                border= "0px" _hover= {{cursor:'pointer'}} fontSize="18px" boxShadow= "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px"
              />
            }
            {
              properties && 
              <MarkerContainer 
                properties={properties} 
                defaultMarkerIcon={this.state.defaultMarkerIcon} 
              />
            }
          </GoogleMap> 
        </LoadScript>
      </Flex>

      
     )
  }
}
function mapStateToProps(state){
  return {
    activeProperty: state.booking.activeProperty,
    isInfoWindow: state.booking.isInfoWindow,
    isFiltering: state.booking.isFiltering,
    filteredProperties: state.booking.filteredProperties,
    isOpenMap: state.booking.isOpenMap
  }
}

const mapDispatchToProps = {
  deleteActiveInfoWindow,
  closeMap
}

export default connect(mapStateToProps,mapDispatchToProps)(MyComponents)