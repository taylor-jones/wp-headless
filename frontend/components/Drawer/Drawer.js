import { PureComponent, Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FaFacebookSquare } from 'react-icons/fa';
import Menu from '../Menu/Menu';
import Backdrop from '../UI/Backdrop/Backdrop';
import css from './Drawer.scss';


class Drawer extends PureComponent {
  render() {
    const { isOpen, close, menu, id } = this.props;
    const drawerClasses = isOpen ? `${css.Drawer} ${css.Opened}` : `${css.Drawer} ${css.Closed}`;

    return (
      <Fragment>
        <Backdrop show={isOpen} clicked={close} />

        <div className={drawerClasses} id={id}>
          <div className={css.Search}>
            <input type="search" className={css.SearchInput} placeholder="Search..." />
            <button type="submit" className={css.SearchSubmit}>Go</button>
          </div>

          <nav role="navigation" className={css.DrawerNav}>
            <Menu
              menu={menu}
              menuClass={css.DrawerMenu}
              submenuParentClass={css.SubmenuParent}
              submenuClass={css.Submenu}
              clicked={close}
              childrenFirst
            />
          </nav>

          <footer className={css.DrawerFooter}>
            <Link href="https://www.facebook.com/synergyinaction">
              <a target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
            </Link>
          </footer>
        </div>

      </Fragment>
    );
  }
}

Drawer.defaultProps = {
  id: null,
};

Drawer.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  id: PropTypes.string,
};


export default Drawer;
