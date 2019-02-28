import { Component } from 'react';
import PropTypes from 'prop-types';
import { setConfiguration } from 'react-grid-system';
import PageHead from '../../PageHead';
import Header from '../../Header/Header';
import Drawer from '../../Drawer/Drawer';
import Footer from '../../Footer/Footer';
import css from './Layout.scss';


// Grid breakpoint configurations
setConfiguration({
  breakpoints: [
    0,
    744,
    1128,
    1440,
  ],
  containerWidths: [
    // 696,
    // 696,
    // 744,
    // 1080,
    1680,
    1680,
    1680,
    1680,
  ],
  gutterWidth: 16,
});


class Layout extends Component {
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
      <div className={css.Wrapper}>
        <PageHead title={title.rendered} />

        <Header
          menu={headerMenu}
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isInverse={title.rendered === 'Synergy In Action'}
        />

        <Drawer
          menu={drawerMenu}
          isOpen={this.state.showSideDrawer}
          close={this.sideDrawerClosedHandler}
        />

        <main className={css.Layout}>
          {this.props.children}
        </main>

        <Footer menu={footerMenu} base={baseMenu} />
      </div>
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
