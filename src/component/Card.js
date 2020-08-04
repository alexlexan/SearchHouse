import React from 'react';
import { Flex, Box, Image,PseudoBox} from "@chakra-ui/core";
import {priceFormat} from '../utils/Formatters'


class Card extends React.Component {

    state = {
        ref: ''
    }
    
    componentDidUpdate(){
        this.props.addRefsToState(this.state.ref)
    }
  

    setRefCard = element => {
      this.setState({ ref: element })
    };

    render () {
        const {property,activeProperty,onClickHandler} = this.props
        const {picture, price, bedrooms, bathrooms,carSpaces,city,address, index} = property
    
    return (
        <PseudoBox 
            as="div"
            w="100%" p="5px" boxSizing="border-box"
            _hover={{ cursor: "pointer", border: '1px solid #2196f3'}}
            border={`${activeProperty === property ? '1px solid #2196f3' : '1px solid #ccc'}`} 
            ref={this.setRefCard} 
            id={`card-0${index}`} 
            onClick={onClickHandler.bind(null,property)}
        >
            <Image w="100%" src={picture} alt={city} objectFit="cover" maxH="10em"/>
            <Box fontWeight="700" mt="5px" fontSize="16px" >{priceFormat(price)}</Box>
            <Box className="details">
            <Flex justify="space-between" fontSize="14px" mt="8px">
                <Box className="location">
                {city}<br />{address}
                </Box>
                <Box color="#fff" background={`${activeProperty === property ? '#2196f3' : '#ccc'}`} h="15px" p="5px 10px">{index+1}</Box>
            </Flex>
            <Flex className="features" fontSize="14px" m="8px 0">
                <Box className="icon-bed" pl="24px" mr="10px">{bedrooms}</Box>
                <Box className="icon-bath" pl="24px" mr="10px">{bathrooms}</Box>
                <Box className="icon-car" pl="24px" mr="10px">{carSpaces}</Box>
            </Flex>
            </Box>
        </PseudoBox>
    );
    }   
  }

export default Card