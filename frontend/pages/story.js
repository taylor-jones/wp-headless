import { Component, Fragment } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PropTypes from 'prop-types';
import Layout from '../components/UI/Layout/Layout';
import withPageWrapper from '../hoc/withPageWrapper';
import { Config } from '../config';

class Story extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    const storiesRes = await fetch(`${Config.apiUrl}/wp-json/wp/v2/stories?slug=${slug}`);
    const stories = await storiesRes.json();

    if (stories.length === 0) {
      return {};
    }

    const story = stories[0];
    return { story };
  }

  render() {
    console.log(this.props);
    const { story } = this.props;

    if (!story.title) { return <Error statusCode={404} />; }

    // const posts = this.props.posts.map((post, index) => {
    //   return (
    //     <ul key={index}>
    //       <li>
    //         <Link
    //           as={`/post/${post.slug}`}
    //           href={`/post?slug=${post.slug}&apiRoute=post`}
    //         >
    //           <a>{post.title.rendered}</a>
    //         </Link>
    //       </li>
    //     </ul>
    //   );
    // });

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        baseMenu={this.props.baseMenu}
        title={story.title}
      >
        <h2>{story.title.rendered}</h2>
      </Layout>
    );
  }
}


Story.propTypes = {
  // posts: PropTypes.instanceOf(Object).isRequired,
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
  story: PropTypes.instanceOf(Object).isRequired,
};


export default withPageWrapper(Story);
