import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <img className="main-footer__image" src={require('../assets/images/footer-image.png')} />
      <p className="flush">&copy;2017 Brains Tutors. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
