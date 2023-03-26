import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../css/Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      image: this.props.image,
      closeModal: this.props.closeModal,
    };
  }

  closeModalbyEsc = event => {
    if (event.key === 'Escape') {
      this.state.closeModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.closeModalbyEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModalbyEsc, false);
  }

  render() {
    return (
      <div onClick={this.state.closeModal} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.state.image} alt="" />
        </div>
      </div>
    );
  }
}
