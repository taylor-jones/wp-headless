import { Component } from 'react';
import Link from 'next/link';
import { HideAt } from 'react-with-breakpoints';
import { MdSearch, MdClose } from 'react-icons/md';
import Menu from '../Menu/Menu';
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
