import React from "react";
// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/logo.png";
import AddRegistrationContainer from "./registration/addRegistrationContainer";
import { Link } from "react-router-dom";
import FooterComponent from "../../components/footerComponent";

class BusinessSetupContainer extends React.Component<any, any> {
  redirectLink = (url: any) => {
    return {
      pathname: url
    };
  };
  render() {
    return (
      <>
        <header id="masthead" className="site-header site-header--fluid">
          <div className="d-lg-flex justify-content-lg-between align-items-lg-center site-header__container">
            <div className="d-lg-flex align-items-lg-center">
              <div className="site-header__logo">
                <a href={this.props.imageUrl}>
                  <h1 className="screen-reader-text">The Salon</h1>
                  <img src={SalonLogo} alt="Salon" />
                </a>
              </div>
            </div>
            <div className="d-lg-flex align-items-lg-center">
              <ul className="min-list main-navigation">
                <li>
                  <Link to={() => this.redirectLink("/home")}>Home</Link>
                </li>
                <li>
                  <Link to={() => this.redirectLink("/about")}>About</Link>
                </li>
                <li>
                  <Link to={() => this.redirectLink("/Services")}>
                    Services
                  </Link>
                </li>
                <li>
                  <Link to={() => this.redirectLink("/Contact")}>Contact</Link>
                </li>
              </ul>
            </div>

            <div className="d-lg-none nav-mobile">
              {/* <a
                href="#"
                className="nav-toggle js-nav-toggle nav-toggle--white"
              >
                <span></span>
              </a> */}
            </div>
          </div>
        </header>
        <section className="create-listing">
          <div className="wrapper">
            <AddRegistrationContainer />
          </div>
        </section>
        <FooterComponent />
      </>
    );
  }
}
export default BusinessSetupContainer;
