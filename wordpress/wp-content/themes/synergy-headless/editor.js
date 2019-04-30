/* eslint-disable no-undef */

/**
 * Gutenberg Editor Block Styles
 */


/**
 * Style additions to existing Gutenberg blocks that
 * can allow for mapping the WP styles to the NextJS stylesheets.
 *
 * Example: If a heading block is used, at the style is set to 'Subheading',
 * then WP will add the 'is-style-subheading' class to the heading. Because of
 * this, we can define a '.is-style-subheading' selector in the NextJS stylesheets
 * to appropriately handle this class.
 *
 * The goal is to eliminate the need for a user to make css decisions from
 * the WP admin area.
 */

wp.domReady(() => {
  //
  // headings
  //
  wp.blocks.registerBlockStyle('core/heading', {
    name: 'heading',
    label: 'Heading',
    isDefault: true,
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'subheading',
    label: 'Subheading',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'normal',
    label: 'Normal',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'light',
    label: 'Light',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'strong',
    label: 'Strong',
  });

  wp.blocks.registerBlockStyle('core/heading', {
    name: 'stronger',
    label: 'Stronger',
  });


  //
  // paragraphs
  //
  wp.blocks.registerBlockStyle('core/paragraph', {
    name: 'p',
    label: 'Default',
    isDefault: true,
  });

  wp.blocks.registerBlockStyle('core/paragraph', {
    name: 'lead',
    label: 'Lead',
  });

  wp.blocks.registerBlockStyle('core/paragraph', {
    name: 'strong-lead',
    label: 'Strong Lead',
  });
});
