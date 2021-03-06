import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { setConfiguration } from 'react-grid-system';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import PageHead from '../../PageHead';
import Header from '../../Header/Header';
import Drawer from '../../Drawer/Drawer';
import Footer from '../../Footer/Footer';
import css from './Layout.scss';


/**
 * Breakpoint Sizes (for convenience)
 * xs: 0,
 * sm: 480px,
 * ms: 612 px,
 * md: 744px,
 * ml: 936px,
 * lg: 1128px,
 * xl: 1440px
 */

// Grid breakpoint configurations
setConfiguration({
  breakpoints: [
    480,
    612,
    744,
    936,
    1128,
    1440,
  ],
  containerWidths: [
    696,
    696,
    960,
    1280,
    1280,
    1600,
  ],
  gutterWidth: 16,
});


const drawerHtmlId = 'drawer';

class Layout extends PureComponent {
  state = {
    showSideDrawer: false,
  };

  // the side drawer element
  drawerElement = null;


  /**
   * Get a reference to the side drawer element, so we can use
   * it to enable/disable body scrolling when the drawer is toggled.
   */
  componentDidMount() {
    this.drawerElement = document.querySelector(`#${drawerHtmlId}`);
  }

  /**
   * Remove and scroll locks that exist
   */
  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  /**
   * Sets the state of the showSideDrawer attribute to
   * false whenever the side drawer should be closed.
   */
  closeSideDrawer = () => {
    this.setState({ showSideDrawer: false });
    enableBodyScroll(this.drawerElement);
  }

  /**
   * Sets the state of showSideDrawer to true, which updates
   * the visibility of the side drawer and sets a scroll lock on the
   * body while the side drawer is open.
   */
  openSideDrawer = () => {
    this.setState({ showSideDrawer: true });
    disableBodyScroll(this.drawerElement);
  }

  /**
   * Toggles the state of the side drawer and the body scroll lock
   */
  toggleSideDrawer = () => {
    if (this.state.showSideDrawer) {
      this.closeSideDrawer();
    } else {
      this.openSideDrawer();
    }
  }


  render() {
    const { headerMenu, drawerMenu, footerMenu, baseMenu, title } = this.props;

    return (
      <div className={css.Wrapper}>
        {/* FOR DEVELOPMENT PURPOSES ONLY */}
        <div className="visualizer-stripe" />

        <PageHead title={title.rendered} />

        <Header
          menu={headerMenu}
          drawerToggleClicked={this.toggleSideDrawer}
          isInverse={title.rendered === 'Synergy In Action'}
        />

        <Drawer
          id={drawerHtmlId}
          menu={drawerMenu}
          isOpen={this.state.showSideDrawer}
          close={this.closeSideDrawer}
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
