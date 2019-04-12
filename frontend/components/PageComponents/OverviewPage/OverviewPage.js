import { PureComponent } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-grid-system';
import { Picture } from 'react-responsive-picture';
import PropTypes from 'prop-types';
import { toBreakpoint } from '../../../lib/breakpoints';
import css from './OverviewPage.scss';

//
// Page component for a general overview page
//

class OverviewPage extends PureComponent {
  render() {
    const { post } = this.props;
    const { subnav } = post;
    const { count } = subnav;

    const isEvenItemCount = count % 2 === 0;
    const itemCountClass = isEvenItemCount ? css.ItemCountEven : '';

    /**
     * Determine the number of columns that an overview item will occupy
     * based on the number of items in the subnav. The goal is to display
     * an evenly-balanced (visually) list of items. This won't handle every
     * edge case, but it will handle simple cases of 2-4 items.
     */
    const columnCounts = {
      md: isEvenItemCount ? 6 : 4,
      xl: isEvenItemCount ? 3 : 4,
    };

    // console.log(post);

    return (
      <div className={css.PageWrapper}>
        <Container>
          <div className={[css.OverviewWrapper, itemCountClass].join(' ').trim('')}>
            <Row>

              {subnav.items.map(item => {
                return (
                  <Col md={columnCounts.md} xl={columnCounts.xl} key={item.ID}>
                    <div className={css.OverviewItemWrapper}>
                      <Link href={`/post?slug=${item.slug}&apiRoute=${item.post_type}`} as={item.slug}>
                        <a role="link" className={css.OverviewItem}>
                          <div className={css.OverviewImageWrapper}>
                            <Picture
                              className={css.OverviewImage}
                              alt={item.featured_image.alt}
                              sources={[
                                { srcSet: item.featured_image.sizes['hero-sm'].source_url, media: `(${toBreakpoint('md')})` },
                                { srcSet: item.featured_image.sizes['hero-sm-portrait'].source_url },
                              ]}
                            />
                          </div>

                          <div className={css.OverviewLabelWrapper}>
                            <h3 className={css.OverviewLabel}>{item.post_title}</h3>

                            {item.post_excerpt && (
                              <p className={css.OverviewExcerpt}>{item.post_excerpt}</p>
                            )}
                          </div>
                        </a>
                      </Link>

                    </div>
                  </Col>
                );
              })}

            </Row>
          </div>

        </Container>
      </div>
    );
  }
}

OverviewPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default OverviewPage;
