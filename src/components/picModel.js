import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import Index from './homepage'
// const images = [
//   '//placekitten.com/1500/500',
//   '//placekitten.com/4000/3000',
//   '//placekitten.com/800/1200',
//   '//placekitten.com/1500/1500',
// ];
 
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
    // let images = this.props.location.state.images;
    // let photoIndex = this.props.location.state.photoIndex;
    // let isOpen = this.state.isOpen;
    console.log("in picModel",photoIndex)
    // this.setState({
    //     images : this.props.location.state.images,
    //     photoIndex : this.props.location.state.photoIndex
    // })

    if(!isOpen){
        return (<div><Index toggle={true} images={images}></Index></div>)
    }else{
        return (
        <div>
            {/* <button type="button" onClick={() => this.setState({ isOpen: true })}>
            Open Lightbox
            </button> */}
            <button onClick={this.props.toggleDisplay} type="button" aria-label="Close lightbox" class="ril-close ril-toolbar__item__child ril__toolbarItemChild ril__builtinButton ril__closeButton"></button>
        {console.log("in pic model",images)}
            {isOpen && (
            <Lightbox
                mainSrc={images[photoIndex].image}
                nextSrc={images[(photoIndex + 1) % images.length].image}
                prevSrc={images[(photoIndex + images.length - 1) % images.length].image}
                onCloseRequest={() => this.setState({ isOpen: false })}
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
}