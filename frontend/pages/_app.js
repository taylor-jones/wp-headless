import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';


// Example of using a Layout wrapper.
class MyLayout extends React.Component {
  render() {
    // console.log(this.props);
    const { children } = this.props;
    return <div className="MyLayout">{children}</div>;
  }
}


export default class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    const { pageContext } = this;

    return (
      <Container>
        <MyLayout>
          {/* Wrap every page in Jss and Theme providers */}
          <JssProvider
            registry={pageContext.sheetsRegistry}
            generateClassName={pageContext.generateClassName}
          >

            {/* MuiThemeProvider makes the theme available
            down the React tree thanks to React context. */}
            <MuiThemeProvider
              theme={pageContext.theme}
              sheetsManager={pageContext.sheetsManager}
            >

              {/* CssBaseline kickstart an elegant, consistent,
              and simple baseline to build upon. */}
              <CssBaseline />

              {/* Pass pageContext to the _document though the renderPage
              enhancer to render collected styles on server-side. */}
              <Component pageContext={pageContext} {...pageProps} />

            </MuiThemeProvider>
          </JssProvider>
        </MyLayout>
      </Container>
    );
  }
}

// export default MyApp;
