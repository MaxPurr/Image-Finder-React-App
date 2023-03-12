import { Audio } from 'react-loader-spinner';
import React, { Component } from 'react';
import css from '../css/Loader.module.css';

export class Loader extends Component {
  render() {
    return (
      <div className={css.Loader_container}>
        <Audio
          height="100"
          width="100"
          radius="9"
          color="#3f51b5"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }
}
