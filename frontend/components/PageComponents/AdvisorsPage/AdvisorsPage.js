import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import css from './AdvisorsPage.scss';


class AdvisorsPage extends PureComponent {
  render() {
    const { post } = this.props;
    console.log(post);

    return (
      <div>
        NOTE: Right now, the Advisors page is using the LeadershipPage component.
      </div>
    );
  }
}


AdvisorsPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AdvisorsPage;
