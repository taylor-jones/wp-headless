import { PureComponent } from 'react';
import { Picture } from 'react-responsive-picture';
import PropTypes from 'prop-types';
import css from './HeroImage.scss';


class HeroImage extends PureComponent {
  render() {
    const { featuredImage, dotted, absolute, title, subtitle } = this.props;
    let wrapperClass = css.HeroWrapper;
    let imgWrapperClass = css.HeroImageWrapper;

    /* Update the wrapper class name based on whether or not the image
     * should have a dotted overlay and/or be absolute. */
    if (dotted) imgWrapperClass += ' img-dotted';
    if (absolute) wrapperClass = `${wrapperClass} ${css.AbsoluteTop}`;

    /* If a featured image was provided, it will be rendered,
     * otherwise no image will be rendered. */
    return (
      <div className={wrapperClass}>
        {featuredImage && (
          <div className={imgWrapperClass}>
            <Picture
              className={css.HeroImage}
              role="presentation"
              sizes="100vw"
              alt={featuredImage.alt}
              sources={[
                {
                  srcSet: featuredImage.sizes['hero-sm-portrait'].source_url,
                  media: '(max-width: 743px)',
                },
                {
                  srcSet: featuredImage.sizes['hero-md'].source_url,
                  media: '(max-width: 1127px)',
                },
                {
                  srcSet: featuredImage.sizes['hero-lg'].source_url,
                },
              ]}
            />
          </div>
        )}

        <div className={css.HeroTextWrapper}>
          <div className={css.HeroTitle}>{title}</div>
          <div className={css.HeroSubtitle}>{subtitle}</div>
        </div>

        <div className={css.HeroOverlay} />
      </div>
    );
  }
}


HeroImage.defaultProps = {
  featuredImage: null,
  dotted: false,
  absolute: false,
  title: null,
  subtitle: null,
};

HeroImage.propTypes = {
  featuredImage: PropTypes.objectOf(PropTypes.any),
  dotted: PropTypes.bool,
  absolute: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default HeroImage;
