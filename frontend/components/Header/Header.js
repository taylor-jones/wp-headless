import { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { MdSearch, MdClose } from 'react-icons/md';
import Menu from '../Menu/Menu';
import DrawerToggler from '../Drawer/DrawerToggler/DrawerToggler';
import css from './Header.scss';

class Header extends Component {
  SCROLL_THRESHOLD = {
    down: 100,
    up: 10,
  };

  prevScroll = 0;   // tracks the previous scroll offset

  state = {
    showSearch: false,
    isScrolled: false,
  };

  componentDidMount() {
    console.log('Header: component did mount');
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    console.log('Header: will unmount');
    window.removeEventListener('scroll', this.onScroll, false);
  }


  /**
   * Handles the scroll event for the header.
   *
   * If the current scroll offset is greater than the previous,
   * the the user is scrolling down. In that case, if the current
   * offset is greater than the SCROLL_THRESHOLD.down, then consider
   * the header scrolled. Otherwise, if the current offset is less
   * than the previous, the user is scrolling up. In that case, if
   * the current offset is greater than the SCROLL_THRESHOLD.up, then
   * consider the header scrolled.
   */
  onScroll = () => {
    const currScroll = window.scrollY;
    let isScrolled = false;

    if (currScroll >= this.prevScroll) {
      isScrolled = currScroll > this.SCROLL_THRESHOLD.down;
    } else {
      isScrolled = currScroll > this.SCROLL_THRESHOLD.up;
    }

    this.setState({ isScrolled });
    this.prevScroll = currScroll;
  }


  searchKeyDownHandler = (event) => {
    const k = event.which;
    if (k === 13) {
      console.log('Perform Search');
    } else if (k === 27) {
      if (this.searchInput.value === '') {
        console.log('Escaped');
      }
    }
  }


  focusSearch = () => {
    setTimeout(() => {
      this.searchInput.value = '';
      this.searchInput.focus();
    }, 0);
  }


  searchToggleHandler = () => {
    this.setState((prevState) => {
      const newState = !prevState.showSearch;

      if (newState) {
        this.focusSearch();
      }

      return { showSearch: newState };
    });
  }


  render() {
    // determine whether or not to show the search bar
    let headerClass = css.Header;
    let searchClass = css.HeaderSearch;
    let searchIcon = <MdSearch />;

    if (this.state.showSearch) {
      headerClass = `${headerClass} ${css.SearchOpen}`;
      searchClass = `${searchClass} ${css.open}`;
      searchIcon = <MdClose />;
    }

    if (this.state.isScrolled) {
      headerClass = `${headerClass} ${css.scrolled}`;
    }

    if (this.props.isInverse) {
      headerClass = `${headerClass} ${css.inverse}`;
    }


    return (
      <header className={headerClass}>
        <DrawerToggler clicked={this.props.drawerToggleClicked} />

        <div className={css.HeaderLogo}>
          <Link href="/">
            <a><img className={css.HeaderLogoImage} src="/static/images/logo.svg" alt="Synergy In Action Logo" /></a>
          </Link>
        </div>

        <nav role="navigation" className={css.HeaderNav}>
          <Menu
            menu={this.props.menu}
            menuClass={css.HeaderMenu}
            submenuParentClass={css.SubmenuParent}
            submenuClass={css.Submenu}
          />

          <div className={searchClass}>
            <input
              type="search"
              className={css.SearchInput}
              placeholder="Type and press enter..."
              ref={(inp) => { this.searchInput = inp; }}
              onBlur={this.searchToggleHandler}
              onKeyDown={this.searchKeyDownHandler}
            />
          </div>

          <div className={css.HeaderSearchToggle}>
            <button
              aria-label="Search toggle button"
              type="button"
              className={css.SearchToggle}
              onClick={this.searchToggleHandler}
            >
              {searchIcon}
            </button>
          </div>
        </nav>
      </header>
    );
  }
}


Header.defaultProps = {
  isInverse: false,
};

Header.propTypes = {
  isInverse: PropTypes.bool,
  drawerToggleClicked: PropTypes.func.isRequired,
  menu: PropTypes.instanceOf(Object).isRequired,
};


export default Header;
