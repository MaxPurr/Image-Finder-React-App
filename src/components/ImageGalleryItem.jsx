import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../css/ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    image: PropTypes.exact({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      openModal: this.props.openModal,
    };
  }

  render() {
    const { image } = this.props;
    return (
      <li
        htmlFor={image.id}
        className={css.ImageGalleryItem}
        onClick={this.state.openModal}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={css.ImageGalleryItem_image}
        />
      </li>
    );
  }
}
