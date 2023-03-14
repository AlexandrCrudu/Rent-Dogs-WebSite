const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-title footer-section">
          <h4>Contact Us</h4>
        </div>
        <div className="footer-contact footer-section">
          <span>puppy-share@gmail.com</span>
          <span>+51 798878854</span>
        </div>
        <div className="footer-social footer-section">
          <span>
            <a href="">
              <img src="../img/icons8-facebook.svg" alt="" />
            </a>
          </span>
          <span>
            <a href="">
              <img src="../img/icons8-twitter.svg" alt="" />
            </a>
          </span>
          <span>
            <a href="">
              <img src="../img/icons8-instagram.svg" alt="" />
            </a>
          </span>
          <span>
            <a href="">
              <img src="../img/icons8-linkedin.svg" alt="" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
