import { PureComponent } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Link from 'next/link';
import { Picture } from 'react-responsive-picture';
import PropTypes from 'prop-types';
import { FiMail, FiExternalLink } from 'react-icons/fi';
import { FaLinkedinIn, FaPen, FaUser, FaTwitter } from 'react-icons/fa';
import Layout from '../../components/UI/Layout/Layout';
import withPageWrapper from '../../hoc/withPageWrapper';
import { Config } from '../../config';
import css from './index.scss';


class Leadership extends PureComponent {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const leadershipRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/leadership?slug=${slug}`);
    const leadership = await leadershipRes.json();

    if (leadership.length === 0) return {};

    const person = leadership[0];
    return { person };
  }


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


  /**
   * Removes the protocol and www from the url to
   * make it a bit easier on the eyes.
   *
   * @param {string} url - the url of the link
   * @returns {string} the prettified url
   */
  getPrettyeUrl = url => url.replace(/^(https?:\/\/)?(www.)?/, '');


  render() {
    const { person } = this.props;
    const { acf } = person;

    if (!person.title) { return <Error statusCode={404} />; }

    console.log(person);

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        baseMenu={this.props.baseMenu}
        title={person.title}
      >

        <div className={css.PersonContainer}>
          <div className={css.Person}>
            <div className={css.PersonContentWrapper}>
              <div className={css.PersonHeadings}>
                <div className={css.PersonName}>{person.title.rendered}</div>
                <div className={css.PersonRole}>{acf.role}</div>
              </div>

              <div className={css.PersonContent} dangerouslySetInnerHTML={{ __html: person.content.rendered }} />

              <div className={css.PersonLinksWrapper}>
                <ul className={css.PersonLinks}>
                  {/* Link to email address, if available */}
                  {acf.email_address && (
                    <li>
                      <a href={`mailto:${acf.email_address}`}>
                        <span><FiMail /></span>
                        <span>{acf.email_address}</span>
                      </a>
                    </li>
                  )}

                  {/* Link to external links, if available */}
                  {acf.external_links && acf.external_links.map((link, index) => {
                    return (
                      <li key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <span>{this.getLinkIcon(link.url)}</span>
                          <span>{this.getPrettyeUrl(link.url)}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>
            <div className={css.PersonImageWrapper}>
              <div
                className={css.PersonImage}
                style={{ backgroundImage: `url(${person.featured_image.sizes['hero-sm-portrait'].source_url}` }}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}


Leadership.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
  person: PropTypes.instanceOf(Object).isRequired,
};


export default withPageWrapper(Leadership);
