import React from "react";
import { Flex, Heading, Image, Button } from "@chakra-ui/core";
import image from "../images/house-location-pin.svg";
import { connect } from "react-redux";
import {
  openModalCreateProperty,
  openModalFilter,
  openMap,
} from "../store/actions/booking";

function HeadingListings(props) {
  const { openModalCreateProperty, openModalFilter, openMap } = props;

  return (
    <Flex w="100%" direction="column" bg="#222222" h="160px">
      <Flex w="100%" pt="10px" align="center" justify="center">
        <Image size="60px" mr="10px" src={image} alt="logo" />
        <Heading
          fontSize="34px"
          color="#fff"
          fontFamily="Roboto"
          fontWeight="300"
        >
          Список жилья
        </Heading>
      </Flex>
      <Flex w="100%" align="center" justify="center" p="0 0 20px">
        <Button
          onClick={openModalFilter}
          variantColor="teal"
          variant="outline"
          _hover={{ bg: "#fff", color: "#222222", cursor: "pointer" }}
          right="10px"
          fontFamily="Roboto"
          fontSize="14px"
          fontWeight="300"
          color="#fff"
          p="5px 20px"
          height="auto"
        >
          Фильтр
        </Button>
        <Button
          onClick={openModalCreateProperty}
          variantColor="teal"
          variant="outline"
          _hover={{ bg: "#fff", color: "#222222", cursor: "pointer" }}
          fontFamily="Roboto"
          fontSize="14px"
          fontWeight="300"
          color="#fff"
          p="5px 20px"
          height="auto"
        >
          Добавить жилье
        </Button>
        <Button
          onClick={openMap}
          className="open-map__button"
          variantColor="teal"
          variant="outline"
          _hover={{ bg: "#fff", color: "#222222", cursor: "pointer" }}
          ml="10px"
          fontFamily="Roboto"
          fontSize="14px"
          fontWeight="300"
          color="#fff"
          p="5px 20px"
          height="auto"
        >
          Открыть карту
        </Button>
      </Flex>
    </Flex>
  );
}

const mapDispatchToProps = {
  openModalCreateProperty,
  openModalFilter,
  openMap,
};

export default connect(null, mapDispatchToProps)(HeadingListings);
