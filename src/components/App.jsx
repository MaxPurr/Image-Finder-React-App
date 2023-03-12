import React, { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { Button } from './Button';
import css from '../css/App.module.css';
import api from '../services/api';

export class App extends Component {
  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      images: [],
      showModal: false,
      modalImage: '',
      page: 1,
      searchQuery: '',
      totalHits: 0,
      isLoading: false,
      error: null,
    };
  }

  openModal(evt) {
    const id = Number.parseInt(evt.currentTarget.getAttribute('for'));
    let modalImage;
    for (const image of this.state.images) {
      if (image.id === id) {
        modalImage = image.largeImageURL;
      }
    }
    this.setState({
      showModal: true,
      modalImage: modalImage,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  onSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const searchQuery = form.elements.search.value;
    if (searchQuery) {
      this.setState({
        searchQuery,
        isLoading: true,
        images: [],
        totalHits: 0,
        page: 1,
      });
    }
  }

  loadMore(evt) {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        isLoading: true,
      };
    });
  }

  async componentDidUpdate() {
    if (this.state.isLoading) {
      try {
        const { totalHits, hits } = await api.request(
          this.state.searchQuery,
          this.state.page
        );
        if (totalHits === 0) {
          this.setState({
            error: new Error(
              'There are no images matching your search query. Please try again.'
            ),
          });
        } else {
          const images = hits.map(hit => {
            return {
              webformatURL: hit.webformatURL,
              largeImageURL: hit.largeImageURL,
              tags: hit.tags,
              id: hit.id,
            };
          });
          this.setState(prevState => {
            return {
              images: prevState.images.concat(images),
              totalHits: totalHits,
              error: null,
            };
          });
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const { images, totalHits, page, showModal, modalImage, isLoading, error } =
      this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {images.length !== 0 && (
          <ImageGallery openModal={this.openModal} images={images} />
        )}
        {totalHits >= page * 12 && <Button loadMore={this.loadMore} />}
        {isLoading && <Loader />}
        {showModal && <Modal image={modalImage} closeModal={this.closeModal} />}
      </div>
    );
  }
}
