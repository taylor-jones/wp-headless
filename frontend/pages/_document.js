/* eslint-disable max-len */

import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import HtmlComment from '../components/HtmlComment';
import getPageContext from '../lib/getPageContext';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});


class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Resolution order
    //
    // On the server:
    // 1. page.getInitialProps
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the server with error:
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. page.getInitialProps
    // 3. page.render

    let pageContext;
    let sheetsRegistry;

    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext ? props.pageContext : null;
        sheetsRegistry = pageContext ? pageContext.sheetsRegistry : null;

        return (
          <JssProvider jss={jss} generateClassName={generateClassName} registry={sheetsRegistry}>
            <Component {...props} />
          </JssProvider>
        );
      };

      return WrappedComponent;
    });

    return {
      ...page,
      pageContext,
      styles: (
        <style
          id="jss-server-side"
          dangerouslySetInnerHTML={{
            __html: sheetsRegistry ? sheetsRegistry.toString() : null,
          }}
        />
      ),
    };
  }

  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta
            name="theme-color"
            content={pageContext ? pageContext.theme.palette.primary[500] : null}
          />

          {/* Inject the JSS styles here, before the rest of the styles */}
          <HtmlComment text="jss-insertion-point" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;



// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     // Resolution order
//     //
//     // On the server:
//     // 1. page.getInitialProps
//     // 2. document.getInitialProps
//     // 3. page.render
//     // 4. document.render
//     //
//     // On the server with error:
//     // 2. document.getInitialProps
//     // 3. page.render
//     // 4. document.render
//     //
//     // On the client
//     // 1. page.getInitialProps
//     // 3. page.render

//     const pageContext = getPageContext();
//     const initialProps = await Document.getInitialProps(ctx);
//     return { ...initialProps, pageContext };
//   }

//   render() {
//     const { pageContext } = this.props;
//     const { sheetsRegistry } = pageContext;

//     return (
//       <JssProvider jss={jss} generateClassName={generateClassName} registry={sheetsRegistry}>
//         <html lang="en" dir="ltr">
//           <Head>
//             <meta charSet="utf-8" />
//             <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
//             <meta name="theme-color" content={pageContext.theme.palette.primary[500]} />
//             {/* Inject the JSS styles here, before the rest of the styles */}
//             <HtmlComment text="jss-insertion-point" />
//           </Head>

//           <body>
//             <Main />
//             <NextScript />
//           </body>
//         </html>
//       </JssProvider>
//     );
//   }
// }

// export default MyDocument;
