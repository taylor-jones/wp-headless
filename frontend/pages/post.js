import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PropTypes from 'prop-types';
import { ShowAt, HideAt } from 'react-with-breakpoints';
import withPageWrapper from '../hoc/withPageWrapper';
import Layout from '../components/Layout';
import { Config } from '../config';

class Post extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const res = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`);
    const post = await res.json();
    return { post };
  }

  render() {
    // console.log(this.props);
    const { post } = this.props;
    if (!post.title) return <Error statusCode={404} />;
    // Use post.slug to dynamically render different components where necessary.

    return (
      <Layout
        headerMenu={this.props.headerMenu}
        drawerMenu={this.props.drawerMenu}
        footerMenu={this.props.footerMenu}
        title={post.title}
      >
        <ShowAt breakpoint="small">SMALL</ShowAt>
        <ShowAt breakpoint="medium">MEDIUM</ShowAt>
        <ShowAt breakpoint="large">LARGE</ShowAt>
        <ShowAt breakpoint="xlarge">XLARGE</ShowAt>

        <h1>{post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </Layout>
    );
  }
}


Post.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object).isRequired,
};

export default withPageWrapper(Post);
