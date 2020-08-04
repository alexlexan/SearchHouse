import {LOADING_DATA_SUCCESS,OPEN_MODAL_CREATE_PROPERTY,CLOSE_MODAL_CREATE_PROPERTY,FILTER_CHANGED,SET_FILTERED_PROPERTIES,UPDATE_PROPERTY,
    OPEN_MAP,CLOSE_MAP,OPEN_MODAL_FILTER,CLOSE_MODAL_FILTER,CLEAR_FILTER_ACTION,SET_ACTIVE_CARD,SET_ACTIVE_INFO_WINDOW,DELETE_ACTIVE_INFO_WINDOW} from './actionTypes'
import getData from '../../utils/loadingData'

export function loadingData() {
    return async dispatch => {
        
        const data = await getData()
        dispatch(loadingDataSuccess(data))
    }
}

export function loadingDataSuccess(data) {
    return {
        type: LOADING_DATA_SUCCESS,
        data
    }
}

export function openModalCreateProperty(){
    return {
        type: OPEN_MODAL_CREATE_PROPERTY,
    }
}

export function closeModalCreateProperty(){
    return {
        type: CLOSE_MODAL_CREATE_PROPERTY,
    }
}

//
export function openMap(){
    return {
        type: OPEN_MAP
    }
}
export function closeMap(){
    return {
        type: CLOSE_MAP
    }
}
// Filter 
export function openModalFilter(){
    return {
        type: OPEN_MODAL_FILTER,
    }
}

export function closeModalFilter(){
    return {
        type: CLOSE_MODAL_FILTER,
    }
}

export function handleFilterChange(event){
    return (dispatch, getState) => {
        const {value, name} = event.target

        dispatch(filterChange(value,name))
 
        const state = getState().booking
        filterProperties(dispatch,state)
    }
}

export function filterChange(value,name){
    return {
        type: FILTER_CHANGED,
        value,
        name
    }
}

export function filterProperties(dispatch,state){
    const {properties, filterProperties} = state
    const {filterBedrooms, filterBathrooms,filterCars,filterSort,priceTo,priceFrom} = filterProperties
    const isFiltering = 
        filterBedrooms !== 'Any' || 
        filterBathrooms !== 'Any' || 
        filterCars !== 'Any' || 
        filterSort !== 'Any' ||
        priceTo !== '1000001' ||
        priceFrom !== '0';

    const getFilteredProperties = (properties) => {
      const filteredProperties = []
      properties.forEach(property => {
        const {bedrooms,bathrooms,carSpaces,price} = property;
        const match = 
          (bedrooms === parseInt(filterBedrooms) || filterBedrooms === 'Any') &&
          (bathrooms === parseInt(filterBathrooms) || filterBathrooms === 'Any') &&
          (carSpaces === parseInt(filterCars) || filterCars === 'Any') &&
          (price >= priceFrom && price <= priceTo) 
      
        match && filteredProperties.push(property)
      })

      switch (filterSort) {
        case '0':
            filteredProperties.sort((a, b) => a.price - b.price)
            break;
        case '1':
            filteredProperties.sort((a, b) => b.price - a.price)
            break;
        default:
          return filteredProperties.sort((a, b) => a.price - b.price)   
      }

      return filteredProperties
    }
  
    dispatch(setFilteredProperties(getFilteredProperties,properties,isFiltering))

  }

export function setFilteredProperties(getFilteredProperties,properties,isFiltering){
    return {
        type: SET_FILTERED_PROPERTIES,
        getFilteredProperties,
        properties,
        isFiltering
    }
}


export function clearFilter (e,form){
    return (dispatch, getState) => {
    e.preventDefault();

    dispatch(clearFilterAction())

    form.reset()
    }
}

export function clearFilterAction(){
    return {
        type: CLEAR_FILTER_ACTION
    }
}

export function setActiveCard(property){
    return {
        type: SET_ACTIVE_CARD,
        property
    }
}

export function setActiveProperty(property,index){
    return (dispatch, getState) => {
        const state = getState().booking

        dispatch(setActiveCard(property))

        if(!state.isInfoWindow){
            dispatch(setActiveInfoWindow())
        }  
        
        if (state.refs){
            state.refs[index].scrollIntoView({ behavior: "smooth" });
        }    
    }    
}

export function setActiveInfoWindow(){
    return {
        type: SET_ACTIVE_INFO_WINDOW
    }
}

export function deleteActiveInfoWindow(){
    return {
        type: DELETE_ACTIVE_INFO_WINDOW
    }
}

export function updateProperty(property){
    return {
        type: UPDATE_PROPERTY,
        property
    }
}