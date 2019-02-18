import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import PageHead from './PageHead';
import Header from './Header/Header';
import Drawer from './Drawer/Drawer';
import Footer from './Footer/Footer';


class Layout extends PureComponent {
  state = {
    showSideDrawer: false,
  };

  /**
   * Sets the state of the showSideDrawer attribute to
   * false whenever the side drawer should be closed.
   */
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  /**
   * Toggles the state of the side drawer
   */
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }


  render() {
    const { headerMenu, drawerMenu, footerMenu, baseMenu, title } = this.props;

    return (
      <Fragment>
        <PageHead title={title.rendered} />

        <Header
          menu={headerMenu}
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isInverse={title === 'Synergy In Action'}
        />

        <Drawer
          menu={drawerMenu}
          isOpen={this.state.showSideDrawer}
          close={this.sideDrawerClosedHandler}
        />

        <main className="content">
          {this.props.children}
        </main>

        <Footer menu={footerMenu} base={baseMenu} />
      </Fragment>
    );
  }
}



Layout.propTypes = {
  title: PropTypes.objectOf(PropTypes.string).isRequired,
  headerMenu: PropTypes.instanceOf(Object).isRequired,
  drawerMenu: PropTypes.instanceOf(Object).isRequired,
  footerMenu: PropTypes.instanceOf(Object).isRequired,
  baseMenu: PropTypes.instanceOf(Object).isRequired,
};


export default Layout;
