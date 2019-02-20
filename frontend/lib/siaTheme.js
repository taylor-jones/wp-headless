/**
 * Synergy In Action site theme color palette
 * definition for use with Material-UI
 */

import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
import breakpoints from '../styles/_breakpoints.scss';
// import colors from '../styles/_colors.scss';


/**
 * Iterate over the breakpoint object and convert each of the string
 * values to an integer (which removes the 'px' suffix).
 */
Object.keys(breakpoints).forEach(key => {
  breakpoints[key] = parseInt(breakpoints[key], 10);
});


const theme = createMuiTheme({
  breakpoints: {
    values: {
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
  palette: {
    primary: indigo,
    secondary: green,
    // primary: {
    //   // 50: '#e4e8e5',
    //   // 100: '#bcc6bf',
    //   // 200: '#90a095',
    //   // 300: '#647a6a',
    //   // 400: '#425e4a',
    //   // 500: '#21412a',
    //   // 600: '#1d3b25',
    //   // 700: '#18321f',
    //   // 800: '#142a19',
    //   // 900: '#0b1c0f',
    //   // A100: '#5dff78',
    //   // A200: '#2aff4e',
    //   // A400: '#00f629',
    //   // A700: '#00dd25',
    //   light: colors['primary-light'],
    //   main: colors['primary-main'],
    //   dark: colors['primary-dark'],
    //   contrastDefaultColor: 'dark',
    // },
    // secondary: {
    //   // 50: '#f7f7f7',
    //   // 100: '#ebebeb',
    //   // 200: '#dedede',
    //   // 300: '#d1d1d1',
    //   // 400: '#c7c7c7',
    //   // 500: '#bdbdbd',
    //   // 600: '#b7b7b7',
    //   // 700: '#aeaeae',
    //   // 800: '#a6a6a6',
    //   // 900: '#989898',
    //   // A100: '#ffffff',
    //   // A200: '#ffd4d4',
    //   // A400: '#998643',
    //   // A700: '#ffbbbb',
    //   // light: colors['secondary-light'],
    //   // main: colors['secondary-main'],
    //   // dark: colors['secondary-dark'],
    //   contrastDefaultColor: 'dark',
    // },
  },
  typography: {
    useNextVariants: true,
  },
});

export default theme;
