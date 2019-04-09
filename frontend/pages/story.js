import { Component } from 'react';
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

    if (stories.length === 0) return {};

    const story = stories[0];
    return { story };
  }

  render() {
    const { story } = this.props;
    if (!story.title) { return <Error statusCode={404} />; }

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        baseMenu={this.props.baseMenu}
        title={story.title}
      >
        <h2>{story.title.rendered}</h2>
        <h3>This is story.js</h3>
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