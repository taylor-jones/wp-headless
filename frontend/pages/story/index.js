import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import Link from 'next/link';
import { Picture } from 'react-responsive-picture';
import PropTypes from 'prop-types';
import { FiChevronsLeft } from 'react-icons/fi';
import Layout from '../../components/UI/Layout/Layout';
import withPageWrapper from '../../hoc/withPageWrapper';
import { Config } from '../../config';
import { decode } from '../../lib/clientUtils';
import { toBreakpoint } from '../../lib/breakpoints';
import css from './index.scss';


class Story extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const storiesRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/stories?slug=${slug}`);
    const stories = await storiesRes.json();

    if (stories.length === 0) return {};

    const story = stories[0];
    return { story };
  }


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
    const { story } = this.props;
    if (!story.title) { return <Error statusCode={404} />; }

    console.log(story);

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        baseMenu={this.props.baseMenu}
        title={story.title}
      >

        <div className={css.StoryContainer}>
          <div className={css.Story}>
            <div className={css.StoryMediaWrapper}>
              <Picture
                className={css.StoryMedia}
                alt={story.acf.image.alt}
                sources={[
                  { srcSet: story.acf.image.sizes['hero-sm-portrait'], media: `(${toBreakpoint('sm')})` },
                  { srcSet: story.acf.image.sizes.medium_large },
                ]}
              />
            </div>

            <div className="separator" />

            <div className={css.StoryBody}>
              <h2 className={css.StoryHeading}>{this.getStoryTitle(story)}</h2>
            </div>

            <div className={css.StoryExcerpt} dangerouslySetInnerHTML={{ __html: story.excerpt.rendered }} />
            <div className={css.StoryContent} dangerouslySetInnerHTML={{ __html: story.content.rendered }} />

            <Link href="/post?slug=impact&apiRoute=page" as="/impact/">
              <a className={css.StoryLink}><FiChevronsLeft /> Back to All Stories</a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}


Story.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
  story: PropTypes.instanceOf(Object).isRequired,
};


export default withPageWrapper(Story);
