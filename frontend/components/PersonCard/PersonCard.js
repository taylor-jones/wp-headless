import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Picture } from 'react-responsive-picture';
import css from './PersonCard.scss';

class PersonCard extends PureComponent {
  /**
   * Uses the data associated with a person to generate
   * the markup for the card base, including determining the
   * correct icons to display.
   *
   * @param {object} person - the person object to build the base markup from
   * @returns {jsx} the markup to render
   */
  getCardBase = person => {
    return (
      <div>TODO!</div>
    );
  }


  render() {
    const { person } = this.props;

    return (
      <div className={css.PersonCardWrapper}>
        <div className={css.PersonCard}>
          <div className={css.PersonCardHead}>
            <Picture
              className={css.PersonCardImage}
              alt={person.image.alt}
              sources={[{ srcSet: person.image.sizes['hero-sm-portrait'] }]}
            />
          </div>

          <div className={css.PersonCardBody}>
            <div className={css.PersonName}>
              <div className={css.PersonFirstName}>{person.first_name}</div>
              <div className={css.PersonLastName}>{person.last_name}</div>
            </div>
            <div className={css.PersonTitle}>{person.title}</div>
          </div>

          <div className={css.PersonCardBase}>
            Base
          </div>
        </div>
      </div>
    );
  }
}

PersonCard.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PersonCard;
