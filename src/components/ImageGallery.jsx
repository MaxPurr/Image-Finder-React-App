import React, { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';
import css from '../css/ImageGallery.module.css';

export class ImageGallery extends Component {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.exact({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      openModal: this.props.openModal,
    };
  }

  render() {
    const { images } = this.props;
    return (
      <ul className={css.ImageGallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            openModal={this.state.openModal}
          />
        ))}
      </ul>
    );
  }
}
