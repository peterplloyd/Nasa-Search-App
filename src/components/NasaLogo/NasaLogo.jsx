import PropTypes from 'prop-types'
import React from 'react'
import IconLogo from '../../images/svg/logo.svg'
import styles from './NasaLogo.scss'

const NasaLogo = ({ href, title, alt }) => {
  const { header, logoContainer, logo } = styles
  let headerElm

  if (href) {
    headerElm = (
      <a href={href}>
        <div className={logoContainer}>
          <title>{title}</title>
          <IconLogo className={logo} alt={alt}/>
        </div>
      </a>
    )
  } else {
    headerElm = (
      <div className={logoContainer}>
        <title>{title}</title>
        <IconLogo className={logo} alt={alt}/>
      </div>
    )
  }

  return (
    <header title={title} href={href} className={header}>
      {headerElm}
    </header>
  )
}

NasaLogo.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string
}

export default NasaLogo
