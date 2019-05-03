import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../UI/Wrapper/Wrapper';
import css from './DonatePage.scss';

class DonatePage extends Component {
  render() {
    const { post } = this.props;
    console.log(post);

    return (
      <Wrapper>
        Donate Page
      </Wrapper>
    );
  }
}

DonatePage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DonatePage;
