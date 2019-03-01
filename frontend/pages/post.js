import { PureComponent } from 'react';
import fetch from 'isomorphic-unfetch';
import Error from 'next/error';
import PropTypes from 'prop-types';
import withPageWrapper from '../hoc/withPageWrapper';
import Layout from '../components/UI/Layout/Layout';
import HeroImage from '../components/UI/HeroImage/HeroImage';
import { Config } from '../config';
import PageLoader from '../components/PageLoader';

class Post extends PureComponent {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;
    const postRes = await fetch(`${Config.apiUrl}/wp-json/postlight/v1/${apiRoute}?slug=${slug}`);
    const post = await postRes.json();
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
        baseMenu={this.props.baseMenu}
        title={post.title}
      >

        <HeroImage
          featuredImage={post.featured_image}
          title={post.title.rendered}
          dotted
        />

        <PageLoader post={post} />
      </Layout>
    );
  }
}


Post.propTypes = {
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
  post: PropTypes.instanceOf(Object).isRequired,
};

export default withPageWrapper(Post);
