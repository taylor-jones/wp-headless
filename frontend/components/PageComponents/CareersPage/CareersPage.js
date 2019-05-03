import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './CareersPage.scss';

class CareersPage extends Component {
  render() {
    const { post } = this.props;
    let { opportunities } = post;

    // filter to just employment opportunities
    opportunities = opportunities.filter(opp => opp.acf.category.name === 'Employment');
    console.log(opportunities);

    return (
      <div>
        Careers Page
      </div>
    );
  }
}

CareersPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CareersPage;
