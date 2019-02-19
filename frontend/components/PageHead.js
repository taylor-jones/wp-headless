import { PureComponent } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import stylesheet from '../styles/style.scss';

class PageHead extends PureComponent {
  /**
   * Dynamically get the current page title
   */
  getPageTitle = () => {
    let { title } = this.props;
    if (title !== 'Synergy In Action') title += ' | SIA';
    return title;
  }

  render() {
    return (
      <Head>
        <title>{this.getPageTitle()}</title>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      </Head>
    );
  }
}


PageHead.defaultProps = {
  title: 'Synergy In Action',
};

PageHead.propTypes = {
  title: PropTypes.string,
};


export default PageHead;
