import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PersonCard from '../../PersonCard/PersonCard';
import css from './PeoplePage.scss';


class PeoplePage extends PureComponent {
  render() {
    const { post } = this.props;
    const { people } = post;

    return (
      <div className={css.PeopleContainer}>
        <div className={css.PeopleWrapper}>
          <div className={css.People}>
            {people.map((person, index) => {
              return <PersonCard key={index} person={person} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}


PeoplePage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PeoplePage;
