import {
  LOADING_DATA_SUCCESS,
  OPEN_MODAL_CREATE_PROPERTY,
  CLOSE_MODAL_CREATE_PROPERTY,
  FILTER_CHANGED,
  SET_FILTERED_PROPERTIES,
  UPDATE_PROPERTY,
  OPEN_MODAL_FILTER,
  CLOSE_MAP,
  CLOSE_MODAL_FILTER,
  CLEAR_FILTER_ACTION,
  OPEN_MAP,
  SET_ACTIVE_CARD,
  SET_ACTIVE_INFO_WINDOW,
  DELETE_ACTIVE_INFO_WINDOW,
} from "../actions/actionTypes";

const initialState = {
  properties: [],
  activeProperty: [],
  isLoading: false,
  isInfoWindow: true,
  refs: [],
  modalFilter: false,
  filterProperties: {
    filterBedrooms: "Any",
    filterBathrooms: "Any",
    filterCars: "Any",
    filterSort: "Any",
    priceFrom: 500000,
    priceTo: 1000000,
  },
  filteredProperties: [],
  isFiltering: false,
  isOpenModal: false,
  isOpenMap: false,
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA_SUCCESS:
      return {
        ...state,
        isLoading: true,
        properties: action.data,
        activeProperty: action.data[0],
      };
    case OPEN_MODAL_CREATE_PROPERTY:
      return {
        ...state,
        isOpenModal: true,
      };
    case CLOSE_MODAL_CREATE_PROPERTY:
      return {
        ...state,
        isOpenModal: false,
      };
    case OPEN_MAP:
      return {
        ...state,
        isOpenMap: true,
      };
    case CLOSE_MAP:
      return {
        ...state,
        isOpenMap: false,
      };
    case OPEN_MODAL_FILTER:
      return {
        ...state,
        modalFilter: true,
      };
    case CLOSE_MODAL_FILTER:
      return {
        ...state,
        modalFilter: false,
      };
    case FILTER_CHANGED:
      return {
        ...state,
        filterProperties: {
          ...state.filterProperties,
          [action.name]: action.value,
        },
      };
    case SET_FILTERED_PROPERTIES:
      return {
        ...state,
        filteredProperties: action.getFilteredProperties(action.properties),
        activeProperty:
          action.getFilteredProperties(action.properties)[0] ||
          action.properties[0],
        isFiltering: action.isFiltering,
        refs: [],
      };
    case CLEAR_FILTER_ACTION:
      return {
        ...state,
        properties: state.properties.sort((a, b) => a.index - b.index),
        activeProperty: state.properties[0],
        filterProperties: {
          filterBedrooms: "Any",
          filterBathrooms: "Any",
          filterCars: "Any",
          filterSort: "Any",
          priceFrom: 500000,
          priceTo: 1000001,
        },
        filteredProperties: [],
        isFiltering: false,
      };
    case SET_ACTIVE_CARD:
      return {
        ...state,
        activeProperty: action.property,
      };
    case SET_ACTIVE_INFO_WINDOW:
      return {
        ...state,
        isInfoWindow: true,
      };
    case DELETE_ACTIVE_INFO_WINDOW:
      return {
        ...state,
        isInfoWindow: false,
      };
    case UPDATE_PROPERTY:
      return {
        ...state,
        properties: [...state.properties, action.property],
      };
    default:
      return state;
  }
}
