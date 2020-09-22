import React from "react";
import { Select, IconButton } from "@chakra-ui/core";
import { connect } from "react-redux";
import {
  closeModalFilter,
  handleFilterChange,
  clearFilter,
} from "../store/actions/booking";

class FilterContainer extends React.Component {
  render() {
    const {
      modalFilter,
      closeModalFilter,
      handleFilterChange,
      clearFilter,
    } = this.props;

    return (
      <>
        <form
          ref={(el) => (this.formRef = el)}
          className={`filter ${modalFilter ? "filter-active" : ""}`}
        >
          <div className="filterBox">
            <label htmlFor="filterBedrooms">Bedrooms</label>
            <Select
              id="filterBedrooms"
              name="filterBedrooms"
              w="90px"
              size="sm"
              onChange={handleFilterChange}
            >
              <option value="Any">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Select>
          </div>
          <div className="filterBox">
            <label htmlFor="filterBathrooms">Bathrooms</label>
            <Select
              id="filterBathrooms"
              name="filterBathrooms"
              w="90px"
              size="sm"
              onChange={handleFilterChange}
            >
              <option value="Any">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
          </div>
          <div className="filterBox">
            <label htmlFor="filterCars">Car Spaces</label>
            <Select
              id="filterCars"
              name="filterCars"
              w="90px"
              size="sm"
              onChange={handleFilterChange}
            >
              <option value="Any">Any</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
          </div>
          <div className="filterBox">
            <label htmlFor="priceFrom">Min Price</label>
            <Select
              id="priceFrom"
              name="priceFrom"
              w="100px"
              size="sm"
              onChange={handleFilterChange}
            >
              <option value="0">Any</option>
              <option value="500000">500000</option>
              <option value="600000">600000</option>
              <option value="700000">700000</option>
              <option value="800000">800000</option>
              <option value="900000">900000</option>
            </Select>
          </div>
          <div className="filterBox">
            <label htmlFor="priceTo">Max Price</label>
            <Select
              id="priceTo"
              name="priceTo"
              w="100px"
              size="sm"
              onChange={handleFilterChange}
            >
              <option value="1000001">Any</option>
              <option value="600000">600000</option>
              <option value="700000">700000</option>
              <option value="800000">800000</option>
              <option value="900000">900000</option>
              <option value="1000000">1000000</option>
            </Select>
          </div>
          <div className="filterBox">
            <label htmlFor="filterSort">Order by</label>
            <Select
              id="filterSort"
              name="filterSort"
              w="180px"
              size="sm"
              onChange={handleFilterChange}
            >
              <option value="Any">Default</option>
              <option value="0">Price: - Low to High</option>
              <option value="1">Price: - High to Low</option>
            </Select>
          </div>
          <div className="filterBox">
            <button
              className="btn-clear"
              onClick={(e) => clearFilter(e, this.formRef)}
            >
              Clear
            </button>
          </div>
          <IconButton
            onClick={closeModalFilter}
            _hover={{ cursor: "pointer" }}
            color="blue.500"
            bg="#fff"
            border="none"
            position="absolute"
            right="5px"
            top="5px"
            fontSize="20px"
            aria-label="close filter"
            icon="close"
          />
        </form>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalFilter: state.booking.modalFilter,
  };
}

const mapDispatchToProps = {
  closeModalFilter,
  handleFilterChange,
  clearFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer);
