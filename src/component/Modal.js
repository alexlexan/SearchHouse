import React from 'react';
import { useForm  } from 'react-hook-form'
import {Progress,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Icon,Box,
    Button,FormControl,Input,FormLabel,Flex,NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,
  } from "@chakra-ui/core";



function CustomModal(props) {


    const {isOpen,onClose,handleChange,handleChangeInputBedrooms,handleChangeInputBathrooms,
            handleChangeInputCar,handleChangeImage,percentUploaded,sendFile,errorPicture} = props     
    const { register,errors,formState } = useForm({ mode: "onBlur"});
    const { isValid } = formState;
    
    if(errorPicture) { errors.errorPicture = errorPicture}
    else { delete errors.errorPicture}
    
    return (


        <>
        <Modal blockScrollOnMount={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent m="0 auto" transform="translateY(-50%)" top= "50%">
                <ModalHeader fontWeight="500" pb="5px">Create your offer</ModalHeader>
                <ModalCloseButton background="transparent" color="blue.500" size="lg" _hover={{ cursor: "pointer"}} 
                                    _focus={{ border: "1px solid #3182ce", rounded:'3px'}}/>
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>City</FormLabel>
                    <Input placeholder="City" name="city" type="text" borderColor="rgb(226, 232, 240)" w="90%" 
                        onChange={handleChange}
                        ref={register({ required: true})}
                    />
                    {errors.city && 
                        <Flex align="center">
                            <Icon name="warning-2" mr="5px" size="16px" color="red.500" />
                            <Box color="red.500">
                                the field cannot be empty
                            </Box>
                        </Flex>
                    
                    }
                    </FormControl>
        
                    <FormControl mt={4}>
                    <FormLabel>Address</FormLabel>
                    <Input placeholder="Address " name="address" borderColor="rgb(226, 232, 240)" w="90%" 
                            onChange={handleChange}
                            ref={register({ required: true})}
                            />
                    {errors.address && 
                     <Flex align="center">
                        <Icon name="warning-2" mr="5px" size="16px" color="red.500" />
                        <Box color="red.500">the field cannot be empty</Box>
                     </Flex>
                    }        
                    </FormControl>
        
                
                    <FormControl mt={4}>
                    <FormLabel>Coordinate</FormLabel>
                        <Flex w="90%">
                        <Input placeholder="lat: -33.944576 " name="latitude" borderColor="rgb(226, 232, 240)" w="45%" onChange={handleChange}
                            ref={register({ 
                                required: true,
                                pattern: /^-?\d{1,}\.?\d{0,}$/

                                })}
                        />
                        <Input placeholder="lng: 151.25584" name="longitude"  ml="4%" borderColor="rgb(226, 232, 240)" w="45%" onChange={handleChange}
                            ref={register({ 
                                required: true,
                                pattern: /^-?\d{1,}\.?\d{0,}$/
                                })}
                        />
                        </Flex>
                        {(errors.latitude || errors.longitude) && 
                            <Flex align="center">
                                <Icon name="warning-2" mr="5px" size="16px" color="red.500" />
                                <Box color="red.500">value is not number</Box>
                            </Flex>
                        }
                    </FormControl>
                    
                    <Flex>
                    <FormControl w="100px" mt={4}>
                        <FormLabel>Bedrooms</FormLabel>
                        <NumberInput defaultValue={0} min={0} max={20} borderColor="rgb(226, 232, 240)"onChange={handleChangeInputBedrooms}>
                        <NumberInputField  name="bedrooms" />
                        <NumberInputStepper borderColor="rgb(226, 232, 240)">
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
        
                    <FormControl w="100px" m="1rem 2rem 0" >
                        <FormLabel>Bathrooms</FormLabel>
                        <NumberInput defaultValue={0} min={0} max={20} borderColor="rgb(226, 232, 240)" onChange={handleChangeInputBathrooms}>
                        <NumberInputField />
                        <NumberInputStepper borderColor="rgb(226, 232, 240)" >
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
        
                    <FormControl w="100px" mt={4}>
                        <FormLabel>Car</FormLabel>
                        <NumberInput defaultValue={0} min={0} max={20} borderColor="rgb(226, 232, 240)" onChange={handleChangeInputCar}>
                        <NumberInputField />
                        <NumberInputStepper borderColor="rgb(226, 232, 240)">
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                    </FormControl>
                    </Flex>
            
                    <FormControl mt={4}>
                    <FormLabel>Price, $</FormLabel>
                        <Input placeholder="price, $ " name="price" borderColor="rgb(226, 232, 240)" w="90%" onChange={handleChange}
                            ref={register({ 
                                required: true,
                                pattern: /^\d{1,}$/
                                })}
                        />
                        {errors.price && errors.price.type ==="required" && 
                            <Flex align="center">
                                <Icon name="warning-2" mr="5px" size="16px" color="red.500" />
                                <Box color="red.500">the field cannot be empty</Box>
                            </Flex>
                        }
                        {errors.price && errors.price.type ==="pattern" && 
                            <Flex align="center">
                                <Icon name="warning-2" mr="5px" size="16px" color="red.500" />
                                <Box color="red.500">value is not number</Box>
                            </Flex>
                        }
                    </FormControl>
        
                    <FormControl mt={4}>
                    <FormLabel>Picture</FormLabel>
                    <Input p="5px 0 0 0" height="auto" mb="10px" border="none" type="file" name="picture" borderColor="rgb(226, 232, 240)" w="90%" onChange={handleChangeImage}
                         ref={register({ 
                            required: true
                            })}
                    />
                    {errors.picture && errors.picture.type ==="required" && 
                            <Flex align="center">
                                <Icon name="warning-2" mr="5px" size="16px" color="red.500" />
                                <Box color="red.500">the field cannot be empty</Box>
                            </Flex>
                    }
                    {errors.errorPicture && 
                            <Flex align="center">
                                <Icon name="warning-2" mr="5px" size="16px" color="red.500" />
                                <Box color="red.500">format should be jpeg/jpg</Box>
                            </Flex>
                    }
                    </FormControl>

                    <Progress color="green" size="sm" value={percentUploaded} />
                </ModalBody>
        
                <ModalFooter pt="0">
                {isValid && 
                    <Button variantColor="blue" mr={3} _hover={{ cursor: "pointer"}} font-family="Roboto" onClick={sendFile}>
                    Save
                    </Button> 
                }
                    <Button onClick={onClose} _hover={{ cursor: "pointer"}} fontFamily="Roboto">Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
  }

export default CustomModal