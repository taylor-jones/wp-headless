import { Component } from 'react';
import css from './Header.scss';

class Header extends Component {
  render() {
    return (
      <div>
        <div className={css.Header}>
          Header
        </div>
      </div>
    );
  }
}

export default Header;
