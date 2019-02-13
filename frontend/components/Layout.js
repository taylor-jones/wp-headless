import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import PageHead from './PageHead';
import Header from './Header/Header';
import Footer from './Footer';
import Menu from './Menu/Menu';


class Layout extends Component {
  render() {
    return (
      <Fragment>
        <PageHead title={this.props.title.rendered} />
        <Menu menu={this.props.headerMenu} />
        <Header />
        {this.props.children}
        <Footer />
      </Fragment>
    );
  }
}


Layout.defaultProps = {
  headerMenu: null,
  drawerMenu: null,
  footerMenu: null,
};

Layout.propTypes = {
  title: PropTypes.objectOf(PropTypes.string).isRequired,
  headerMenu: PropTypes.instanceOf(Object),
  footerMenu: PropTypes.instanceOf(Object),
  drawerMenu: PropTypes.instanceOf(Object),
};


export default Layout;
