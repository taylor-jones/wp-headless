import { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import StickyBox from 'react-sticky-box';
import Menu from '../Menu/Menu';
import css from './SideNav.scss';

class SideNav extends PureComponent {
  getMarkup = () => {
    const { menu, isSticky, stickyTopOffset, activeSlug } = this.props;

    const markup = (
      <div className={css.SideNavWrapper}>
        <div className={css.SideNav}>
          <Menu
            menu={menu}
            menuClass={css.Menu}
            submenuParentClass={css.SubmenuParent}
            submenuClass={css.Submenu}
            activeSlug={activeSlug}
          />
        </div>
      </div>
    );

    return isSticky
      ? <StickyBox offsetTop={stickyTopOffset}>{markup}</StickyBox>
      : markup;
  }

  render() {
    return (
      <Fragment>
        {this.getMarkup()}
      </Fragment>
    );
  }
}


SideNav.defaultProps = {
  isSticky: true,
  stickyTopOffset: 140,
  activeSlug: null,
};

SideNav.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
  isSticky: PropTypes.bool,
  stickyTopOffset: PropTypes.number,
  activeSlug: PropTypes.string,
};

export default SideNav;
