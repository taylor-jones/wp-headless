import PropTypes from 'prop-types';
import { FiMenu } from 'react-icons/fi';
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
        <FiMenu />
      </button>
    </div>
  );
};

DrawerToggler.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggler;
