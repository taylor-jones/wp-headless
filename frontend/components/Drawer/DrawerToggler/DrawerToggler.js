import PropTypes from 'prop-types';
import { MdMenu } from 'react-icons/md';
import css from './DrawerToggler.scss';

const DrawerToggler = (props) => {
  return (
    <div className={css.DrawerToggle}>
      <button
        aria-label="Navigation menu button"
        type="button"
        className={css.DrawerToggleButton}
        onClick={props.clicked}
      >
        <MdMenu />
      </button>
    </div>
  );
};

DrawerToggler.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggler;
