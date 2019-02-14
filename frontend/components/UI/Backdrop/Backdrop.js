import PropTypes from 'prop-types';
import css from './Backdrop.scss';

const Backdrop = props => {
  if (props.show) {
    return (
      <div
        role="presentation"
        className={css.Backdrop}
        onClick={props.clicked}
      />
    );
  }

  return null;
};

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

export default Backdrop;
