import React from "react";
import { Grid, Flex } from "@chakra-ui/core";
import Card from "./Card";
import image from "../images/location-map.svg";

import { setActiveCard } from "../store/actions/booking";
import { connect } from "react-redux";

class CardsContainer extends React.Component {
  render() {
    const {
      activeProperty,
      addRefsToState,
      setActiveCard,
      isFiltering,
      properties,
    } = this.props;

    return (
      <>
        <Grid templateColumns="repeat(3, 1fr)" gap="5px" p="5px">
          {properties.map((property) => {
            return (
              <Card
                key={property._id}
                property={property}
                activeProperty={activeProperty}
                addRefsToState={addRefsToState}
                onClickHandler={setActiveCard}
              />
            );
          })}
        </Grid>

        {isFiltering && properties.length === 0 && (
          <Flex justify="center" align="center">
            <p className="warning">
              <img src={image} alt="no property" /> <br />
              No properties were found.
            </p>
          </Flex>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeProperty: state.booking.activeProperty,
    isFiltering: state.booking.isFiltering,
  };
}

const mapDispatchToProps = {
  setActiveCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsContainer);
