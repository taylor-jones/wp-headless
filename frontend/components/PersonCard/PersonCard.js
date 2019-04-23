import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Picture } from 'react-responsive-picture';
import { FiMail, FiExternalLink } from 'react-icons/fi';
import { FaLinkedinIn, FaPen, FaUser, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import css from './PersonCard.scss';

class PersonCard extends PureComponent {
  /**
   * Inspects a url to try to determine the most
   * appropriate icon to display for the url.
   * This function can be extended with additional
   * inspections as needed.
   *
   * @param {string} url - the url of the link
   * @returns {jsx} the markup for the icon to render
   */
  getLinkIcon = url => {
    if (url.includes('linkedin')) {
      return <FaLinkedinIn />;
    } else if (url.includes('twitter')) {
      return <FaTwitter />;
    }

    // default external link icon
    return <FiExternalLink />;
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

          <ul className={css.PersonCardBase}>
            {/* Link to email address, if available */}
            {person.email_address && (
              <li><a href={`mailto:${person.email_address}`}><FiMail /></a></li>
            )}

            {/* Link to external links, if available */}
            {person.external_links && person.external_links.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">{this.getLinkIcon(link.url)}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

PersonCard.propTypes = {
  person: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PersonCard;
