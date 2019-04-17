import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container, Row, Col } from 'react-grid-system';
import { Picture } from 'react-responsive-picture';
import { decode } from '../../../lib/clientUtils';
import { toBreakpoint } from '../../../lib/breakpoints';
import css from './ImpactPage.scss';

class ImpactPage extends PureComponent {
  /**
   * Determines the heading to display for the story by looking for
   * a specified heading (and using that, if it exists). If a heading
   * does not exist, this funtion returns the story title.
   */
  getStoryTitle = story => {
    if (story.acf.heading) return decode(story.acf.heading);
    return decode(story.title.rendered);
  }

  render() {
    const { post } = this.props;
    const { stories } = post;

    console.log(post);

    return (
      <div className={css.PageContainer}>
        <Container className={css.CardsContainer}>
          <Row>

            {stories.map(story => {
              const href = `/${story.type}?slug=${story.slug}&apiRoute=${story.type}`;
              const as = `/${story.type}/${story.slug}/`;

              return (
                <Col sm={12} md={6} lg={4} key={story.id}>
                  <div className={css.CardWrapper}>
                    <div className={css.CardImageContainer}>
                      <Link href={href} as={as}>
                        <a>
                          <div className={css.CardImageWrapper}>
                            <Picture
                              className={css.CardImage}
                              alt={story.acf.image.alt}
                              sources={[
                                { srcSet: story.acf.image.sizes.large, media: `(${toBreakpoint('md')})` },
                                { srcSet: story.acf.image.sizes.medium_large },
                              ]}
                            />
                          </div>
                        </a>
                      </Link>

                      <div className={css.CardBodyWrapper}>
                        <div className={css.CardHeadingWrapper}>
                          <Link href={href} as={as}>
                            <a>
                              <h3 className={css.CardHeading}>{this.getStoryTitle(story)}</h3>
                            </a>
                          </Link>
                        </div>
                        <div className={css.CardExcerptWrapper}>
                          <div className={css.CardExcerpt} dangerouslySetInnerHTML={{ __html: story.excerpt.rendered }} />
                        </div>

                        <div className={css.CardLink}>
                          <Link href={href} as={as}>
                            <a>Read More</a>
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                </Col>
              );
            })}

          </Row>
        </Container>
      </div>
    );
  }
}


ImpactPage.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};


export default ImpactPage;
