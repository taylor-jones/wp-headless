import Link from 'next/link';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import css from './Footer.scss';


const Footer = props => (
  <footer className={css.Footer}>
    <div className={css.FooterWrapper}>
      <Menu
        menu={props.menu}
        menuClass={css.FooterMenu}
        headingClass={css.FooterHeading}
        submenuParentClass={css.FooterSection}
      />
    </div>

    <div className={css.FooterWrapper}>
      <div className={css.FooterBase}>
        <div className={css.FooterCert}>
          <Link href="http://www.carf.org">
            <a target="_blank">
              <img src="/static/images/carf_seal.svg" alt="Carf Logo" />
            </a>
          </Link>
        </div>

        <Menu
          menu={props.base}
          menuClass={css.FooterBaseMenu}
        />

        <div className={css.FooterCopy}>
          <div>&copy; Synergy In Action, Inc. is a 501 (c)(3) | EIN: 26-2342342</div>
        </div>
      </div>
    </div>
  </footer>
);


Footer.propTypes = {
  menu: PropTypes.instanceOf(Object).isRequired,
  base: PropTypes.instanceOf(Object).isRequired,
};

export default Footer;
