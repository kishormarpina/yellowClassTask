import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
 
export default class LightboxExample extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
    //   photoIndex: this.props.location.state.photoIndex,
      photoIndex: this.props.photoIndex,
      isOpen: true,
      images :this.props.images
    };
  }
  
  render() {
    const {images, photoIndex, isOpen } = this.state;
    console.log("in picModel",photoIndex)
    return (
    <div>
    {console.log("in pic model",images)}
        {isOpen && (
        <Lightbox
            mainSrc={images[photoIndex].image}
            nextSrc={images[(photoIndex + 1) % images.length].image}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].image}
            onCloseRequest={() =>{ this.setState({ isOpen: false },()=>{
              console.log("after set state");
              this.props.toggleDisplay()
            })}}
            // toolbarButtons = {[<button onClick={this.props.toggleDisplay} type="button" aria-label="Close lightbox" class="ril-close ril-toolbar__item__child ril__toolbarItemChild ril__builtinButton ril__closeButton"></button>]}
            onMovePrevRequest={() =>
            this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
            })
            }
            onMoveNextRequest={() =>
            this.setState({
                photoIndex: (photoIndex + 1) % images.length,
            })
            }
        />
        )}
    </div>
    );
  }
}