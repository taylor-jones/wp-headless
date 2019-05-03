import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './AdvocatePage.scss';

class AdvocatePage extends Component {
  render() {
    const { post } = this.props;
    console.log(post);

    return (
      <div>
        Advocate Page
      </div>
    );
  }
}

AdvocatePage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AdvocatePage;
