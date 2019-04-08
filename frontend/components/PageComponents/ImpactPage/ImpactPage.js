import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container, Row, Col } from 'react-grid-system';
import { Picture } from 'react-responsive-picture';
import { getSlug } from '../../../lib/commonUtils';
import css from './ImpactPage.scss';

class ImpactPage extends PureComponent {
  render() {
    const { post } = this.props;
    const { stories } = post;

    // console.log(stories);

    return (
      <div className={css.PageContainer}>

        <Container className={css.CardContainer}>
          <div className={css.CardWrapper}>
            <Row>

              {stories.map(story => {
                const href = getSlug(story.link, 3, true);

                return (
                  <Col sm={12} md={6} lg={4} key={story.id}>
                    <div className={css.CardImageContainer}>
                      <Link href={href}>
                        <a rel="noopener noreferrer">
                          <div className={css.CardImageWrapper}>
                            <Picture
                              className={css.CardImage}
                              alt={story.acf.image.alt}
                              sources={[
                                { srcSet: story.acf.image.sizes.large, media: '(max-width: 1127px)' },
                                { srcSet: story.acf.image.sizes.medium },
                              ]}
                            />
                          </div>
                        </a>
                      </Link>

                      <div className={css.CardBodyWrapper}>
                        <div className={css.CardHeadingWrapper}>
                          <Link href={href}>
                            <a rel="noopener noreferrer">
                              <div className={css.CardHeading}>{story.acf.heading}</div>
                            </a>
                          </Link>
                        </div>
                        <div className={css.CardExcerptWrapper}>
                          <div className={css.CardExcerpt}>
                            <div dangerouslySetInnerHTML={{ __html: story.excerpt.rendered }} />
                          </div>
                        </div>

                        <Link href={href}>
                          <a rel="noopener noreferrer">Read More</a>
                        </Link>
                      </div>

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

ImpactPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ImpactPage;
