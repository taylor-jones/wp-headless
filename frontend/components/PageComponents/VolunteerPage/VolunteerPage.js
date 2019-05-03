import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './VolunteerPage.scss';

class VolunteerPage extends Component {
  render() {
    const { post } = this.props;
    let { opportunities } = post;

    // filter to just volunteer opportunities
    opportunities = opportunities.filter(opp => opp.acf.category.name === 'Volunteer');
    console.log(opportunities);

    return (
      <div>
        Volunteer Page
      </div>
    );
  }
}

VolunteerPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default VolunteerPage;
