import React from "react";
import "./app.scss";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import HeadingListings from "./component/HeadingListings";
import CardsContainer from "./component/CardsContainer";
import GoogleMap from "./component/GoogleMap";
import FilterContainer from "./component/FilterContainer";
import ModalCreateProperty from "./component/ModalCreateProperty";

import { connect } from "react-redux";
import { loadingData } from "./store/actions/booking";

class App extends React.Component {
  componentDidMount() {
    this.props.loadingData();
  }

  addRefsToState = (ref) => {
    if (!this.props.refs.includes(ref)) {
      this.props.refs.push(ref);
    }
  };

  render() {
    const {
      properties,
      isFiltering,
      filteredProperties,
      isLoading,
    } = this.props;

    const newProperties = isFiltering ? filteredProperties : properties;

    return (
      <>
        {isLoading ? (
          <Flex className="media-block">
            <Flex className="map-wrapper">
              <GoogleMap properties={newProperties} />
            </Flex>
            <Box className="offer-wrapper">
              <FilterContainer />
              <HeadingListings />
              <CardsContainer
                properties={newProperties}
                addRefsToState={this.addRefsToState}
              />
            </Box>
            <ModalCreateProperty />
          </Flex>
        ) : (
          <Flex align="center" justify="center" h="100vh">
            <Spinner
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              speed="0.65s"
            />
          </Flex>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    properties: state.booking.properties,
    isLoading: state.booking.isLoading,
    refs: state.booking.refs,
    filterProperties: state.booking.filterProperties,
    filteredProperties: state.booking.filteredProperties,
    isFiltering: state.booking.isFiltering,
  };
}

const mapDispatchToProps = {
  loadingData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
