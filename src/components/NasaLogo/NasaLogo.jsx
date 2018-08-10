import PropTypes from "prop-types";
import React from "react";
import IconLogo from "../../images/svg/logo.svg";
import styles from "./NasaLogo.scss";

const NasaLogo = ({ href, title, alt }) => {
  const {
    logoHeader,
    logoHeader__link,
    logoHeader__container,
    logoHeader__container__logo
  } = styles;
  
  let headerElm;

  if (href) {
    headerElm = (
      <a className={logoHeader__link} href={href}>
        <div className={logoHeader__container}>
          <title>{title}</title>
          <IconLogo className={logoHeader__container__logo} alt={alt} />
        </div>
      </a>
    );
  } else {
    headerElm = (
      <div className={logoHeader__container}>
        <title>{title}</title>
        <IconLogo className={logoHeader__container__logo} alt={alt} />
      </div>
    );
  }

  return (
    <header title={title} href={href} className={logoHeader}>
      {headerElm}
    </header>
  );
};

NasaLogo.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string
};

export default NasaLogo;
