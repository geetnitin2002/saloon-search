import React from "react";

// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/logo.png";

class FooterComponent extends React.Component<any> {
  render() {
    return (
      <footer id="colophone" className="site-footer">
        <div className="t-center site-footer__primary">
          <div className="container">
            <div className="site-footer__logo">
                <img src={SalonLogo} alt="Salon" />
            </div>
            <ul className="min-list inline-list site-footer__links site-footer__social">
              <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              {/* <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-twitter"></i>
                </a>
              </li> */}
              {/* <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-pinterest"></i>
                </a>
              </li> */}
              {/* <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-google-plus"></i>
                </a>
              </li> */}
              <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-youtube"></i>
                </a>
              </li>
              <li>
                <a href={this.props.fbLink}>
                  <i className="fa fa-envelope-o"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__secondary">
          <div className="container">
            <div className="site-footer__secondary-wrapper">
              {/* <p className="site-footer__copyright">
                &copy; 2019
                <span className="c-secondary">Salon</span>. All Rights Reserved.
              </p> */}
              <p className="site-footer__copyright">
                &copy; 
                <span className="c-secondary">Lettuce</span>Book 2020
              </p>
{/* 
              <ul className="min-list inline-list site-footer__links site-footer__details">
                <li>
                  <a href={this.props.homeUrl}>Home</a>
                </li>
                <li>
                  <a href={this.props.aboutUrl}>About</a>
                </li>
                <li>
                  <a href={this.props.contactUrl}>Contact</a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default FooterComponent;
