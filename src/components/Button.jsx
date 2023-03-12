import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../css/Button.module.css';

export class Button extends Component {
  static propTypes = {
    loadMore: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loadMore: this.props.loadMore,
    };
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.state.loadMore}
        className={css.Button}
      >
        Load more
      </button>
    );
  }
}
