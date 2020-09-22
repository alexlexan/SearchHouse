import React from "react";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import firebase from "../firebase";
import CustomModal from "./Modal";

import { connect } from "react-redux";
import {
  closeModalCreateProperty,
  updateProperty,
} from "../store/actions/booking";

class ModalCreateProperty extends React.Component {
  state = {
    _id: "",
    index: this.props.properties.length,
    price: "",
    picture: null,
    city: "",
    address: "",
    latitude: -33.944516,
    longitude: 151.25524,
    bedrooms: 0,
    bathrooms: 0,
    carSpaces: 0,
    percentUploaded: 0,
    errorPicture: null,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeInputBedrooms = (value) => {
    this.setState({ bedrooms: value });
  };
  handleChangeInputBathrooms = (value) => {
    this.setState({ bathrooms: value });
  };
  handleChangeInputCar = (value) => {
    this.setState({ carSpaces: value });
  };

  handleChangeImage = (event) => {
    this.setState({
      picture: event.target.files[0],
      errorPicture: null,
    });

    if (event.target.files[0] && event.target.files[0].type !== "image/jpeg") {
      this.setState({ errorPicture: "error" });
    }
  };

  uploadFile = (file, metadata, namePicture) => {
    const filePath = `${namePicture}.jpg`;

    const uploadTask = firebase
      .storage()
      .ref()
      .child(filePath)
      .put(file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const percentUploaded = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ percentUploaded });
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          this.updateProperties(url);
        });
      }
    );
  };

  updateProperties = (url) => {
    this.setState({
      picture: url,
    });

    const {
      _id,
      index,
      price,
      picture,
      city,
      address,
      latitude,
      longitude,
      bedrooms,
      bathrooms,
      carSpaces,
    } = this.state;
    const data = {
      _id,
      index,
      price: +price,
      picture,
      city,
      address,
      latitude: +latitude,
      longitude: +longitude,
      bedrooms,
      bathrooms,
      carSpaces,
    };

    this.updateDataFirebase(data);
    this.props.updateProperty(data);
    this.props.onClose();
  };

  updateDataFirebase = (data) => {
    firebase
      .database()
      .ref("data/-M5nKpHmlxdjPIfwYVs8")
      .child("properties")
      .push()
      .set(data);
  };

  sendFile = () => {
    const { picture } = this.state;
    const namePicture = uuidv4();

    if (picture !== null) {
      this.setState({ _id: namePicture }, () => {
        const metadata = { contentType: mime.lookup(picture.name) };
        this.uploadFile(picture, metadata, namePicture);
      });
    }
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { errorPicture, percentUploaded } = this.state;

    return (
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        handleChange={this.handleChange}
        handleChangeInputBedrooms={this.handleChangeInputBedrooms}
        handleChangeInputBathrooms={this.handleChangeInputBathrooms}
        handleChangeInputCar={this.handleChangeInputCar}
        handleChangeImage={this.handleChangeImage}
        sendFile={this.sendFile}
        percentUploaded={percentUploaded}
        errorPicture={errorPicture}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    properties: state.booking.properties,
    isOpen: state.booking.isOpenModal,
  };
}

const mapDispatchToProps = {
  onClose: closeModalCreateProperty,
  updateProperty,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCreateProperty);
