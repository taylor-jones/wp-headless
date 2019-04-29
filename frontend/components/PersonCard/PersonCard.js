import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Picture } from 'react-responsive-picture';
import { FiMail, FiExternalLink } from 'react-icons/fi';
import { FaLinkedinIn, FaPen, FaUser, FaTwitter } from 'react-icons/fa';
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
    const { acf } = person;

    const href = `/${person.type}?slug=${person.slug}&apiRoute=${person.type}`;
    const as = `/${person.type}/${person.slug}/`;

    return (
      <div className={css.PersonCardWrapper}>
        <div className={css.PersonCard}>
          <Link prefetch href={href} as={as}>
            <a>
              <div className={css.PersonCardHead}>
                <Picture
                  className={css.PersonCardImage}
                  alt={person.featured_image.alt}
                  sources={[{ srcSet: person.featured_image.sizes['hero-sm-portrait'].source_url }]}
                />
              </div>

              <div className={css.PersonCardBody}>
                <div className={css.PersonName}>{person.title.rendered}</div>
                <div className={css.PersonTitle}>{acf.role}</div>
              </div>
            </a>
          </Link>

          <ul className={css.PersonCardBase}>
            {/* Link to email address, if available */}
            {acf.email_address && (
              <li><a href={`mailto:${acf.email_address}`}><FiMail /></a></li>
            )}

            {/* Link to external links, if available */}
            {acf.external_links && acf.external_links.map((link, index) => {
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
