import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import css from './Wrapper.scss';

class Wrapper extends PureComponent {
  render() {
    const { fluid, wide, narrow } = this.props;

    return (
      <div className={css.WrapperOuter}>
        <div className={[css.Wrapper, fluid ? css.Fluid : '', wide ? css.Wide : '', narrow ? css.Narrow : ''].join(' ')}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Wrapper.defaultProps = {
  fluid: false,
  wide: false,
  narrow: false,
};

Wrapper.propTypes = {
  fluid: PropTypes.bool,
  wide: PropTypes.bool,
  narrow: PropTypes.bool,
};

export default Wrapper;
