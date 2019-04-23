import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import css from './ArticlesPage.scss';

class ArticlesPage extends PureComponent {
  render() {
    const { post } = this.props;

    return (
      <div>
        This is the articles page.
      </div>
    );
  }
}

ArticlesPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ArticlesPage;
