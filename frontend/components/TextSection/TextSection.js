import { PureComponent } from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import css from './TextSection.scss';
import { capitalized, getSlug } from '../../lib/commonUtils';

class TextSection extends PureComponent {
  /**
   * Checks if the text has a specified alignment. If so,
   * the function adds the css class that will apply that alignment.
   */
  getAlignment = () => {
    let { align, alignHeadings, alignContent } = this.props;
    const alignment = {
      wrapper: css.TextSectionWrapper,
      headings: css.TextHeadingWrapper,
      content: css.TextContentWrapper,
    };

    align = capitalized(align);
    alignHeadings = capitalized(alignHeadings);
    alignContent = capitalized(alignContent);


    const hasAlignment = str => {
      return str === 'Right' || str === 'Left' || str === 'Center';
    };

    if (hasAlignment(align)) {
      alignment.wrapper = [css.TextSectionWrapper, css[align]].join(' ');
    }

    if (hasAlignment(alignHeadings)) {
      alignment.headings = [css.TextHeadingWrapper, css[alignHeadings]].join(' ');
    }

    if (hasAlignment(alignContent)) {
      alignment.content = [css.TextContentWrapper, css[alignContent]].join(' ');
    }

    return alignment;
  }


  render() {
    const { heading, subheading, bulletPoints, link, button, children } = this.props;
    const alignment = this.getAlignment();

    return (
      <div className={alignment.wrapper}>
        <div className={css.TextSection}>
          <div className={alignment.headings}>
            {heading && <div className={css.Heading}>{heading}</div>}
            {subheading && <div className={css.Subheading}>{subheading}</div>}
          </div>

          <div className={alignment.content}>
            {children && <div className={css.TextContent}>{children}</div>}

            {bulletPoints && (
              <div className={css.BulletPointsWrapper}>
                {bulletPoints.map(point => (
                  <div className={css.BulletPointText}>{point.text}</div>
                ))}
              </div>
            )}

            {link && (
              <div className={css.TextLinkWrapper}>
                <div className={css.TextLink}>
                  <Link href={getSlug(link.url)}>
                    <a>{link.text} <FaChevronRight /></a>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }
}

TextSection.defaultProps = {
  align: '',
  alignHeadings: '',
  alignContent: '',
  heading: null,
  subheading: null,
  bulletPoints: null,
  link: null,
  button: null,
};

TextSection.propTypes = {
  align: PropTypes.string,
  alignHeadings: PropTypes.string,
  alignContent: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  bulletPoints: PropTypes.arrayOf(PropTypes.object),
  link: PropTypes.objectOf(PropTypes.string),
  button: PropTypes.objectOf(PropTypes.string),
};

export default TextSection;
