import { PureComponent } from 'react';
import { Container } from 'react-grid-system';
import PropTypes from 'prop-types';
import css from './PageLead.scss';
import { capitalized } from '../../lib/commonUtils';

class PageLead extends PureComponent {
  /**
   * Checks if the text has a specified alignment. If so,
   * the function adds the css class that will apply that alignment.
   */
  getAlignment = () => {
    let { align, alignHeadings, alignContent } = this.props;
    const alignment = {
      wrapper: css.PageLeadWrapper,
      headings: css.HeadingWrapper,
      content: css.LeadContentWrapper,
    };

    align = capitalized(align);
    alignHeadings = capitalized(alignHeadings);
    alignContent = capitalized(alignContent);

    // checks if a particular alignment property has been specified.
    const hasAlignment = str => str === 'Right' || str === 'Left' || str === 'Center';

    if (hasAlignment(align)) {
      alignment.wrapper = [css.PageLeadWrapper, css[align]].join(' ');
    }

    if (hasAlignment(alignHeadings)) {
      alignment.headings = [css.HeadingWrapper, css[alignHeadings]].join(' ');
    }

    if (hasAlignment(alignContent)) {
      alignment.content = [css.LeadContentWrapper, css[alignContent]].join(' ');
    }

    return alignment;
  }


  render() {
    const { heading, subheading, children } = this.props;
    const alignment = this.getAlignment();

    return (
      <div className={css.PageLeadContainer}>
        <Container>
          <div className={alignment.wrapper}>
            <div className={css.PageLead}>
              <div className={alignment.headings}>
                {heading && <h2 className={css.Heading}>{heading}</h2>}
                {subheading && <h5 className={css.Subheading}>{subheading}</h5>}
              </div>

              {children && (
                <div className={alignment.content}>
                  <div className={css.LeadContent} dangerouslySetInnerHTML={{ __html: children }} />
                </div>
              )}

            </div>
          </div>
        </Container>
      </div>
    );
  }
}

PageLead.defaultProps = {
  align: '',
  alignHeadings: '',
  alignContent: '',
  heading: null,
  subheading: null,
};

PageLead.propTypes = {
  align: PropTypes.string,
  alignHeadings: PropTypes.string,
  alignContent: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default PageLead;
