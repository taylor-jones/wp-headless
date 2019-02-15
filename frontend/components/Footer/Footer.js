import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import css from './Footer.scss';


const Footer = props => (
  <div className={css.Footer}>
    <Menu menu={props.menu} />
  </div>
);


Footer.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
  // base: PropTypes.instanceOf(Object),
};

export default Footer;
