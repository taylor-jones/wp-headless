import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import css from './Footer.scss';


const Footer = props => (
  <footer className={css.Footer}>
    <Menu
      menu={props.menu}
      menuClass={css.FooterMenu}
      headingClass={css.FooterHeading}
      submenuParentClass={css.FooterSection}
    />
  </footer>
);


Footer.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
  // base: PropTypes.instanceOf(Object),
};

export default Footer;
