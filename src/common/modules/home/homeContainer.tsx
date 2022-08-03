import React from "react";
// @ts-ignore
import SalonLogo from "TARGET_BUILD/images/uploads/logo.jpg";
// @ts-ignore
import Listing from "TARGET_BUILD/images/uploads/listing-1.jpg";
import Listing2 from "TARGET_BUILD/images/uploads/listing-2.jpg";
import Listing3 from "TARGET_BUILD/images/uploads/listing-3.jpg";
import Listing4 from "TARGET_BUILD/images/uploads/listing-4.jpg";
import BannerpanelComponent from "./bannerPanel/bannerPanel";
import BusinessPanel from "./businessPanel/businessPanel";
import FooterComponent from "../../components/footerComponent";
import FeedbackComponent from "../../components/feedbackComponent";
import BUSINESS_APP from "../../../apiConfig";
interface IlistView {
  readonly id: number;
  readonly image: any;
  readonly imageUrl: any;
  readonly distance: string;
  readonly title: string;
  readonly titileUrl: any;
  readonly reviewsCount: any;
  readonly location: any;
}

const serviceListArray: IlistView[] = [];
class HomeContainer extends React.Component<any, any> {
  handleButtonClick = () => {
    this.props.history.push("/business-registearion");
  };
  handleSignUpClick = () => {
    this.props.history.push("/login");
  };
  // myname = {
  //   firstName: "Bob",
  //   lastName: "Dylan"
  // };
  render() {
    return (
      <>
        <header
          id="masthead"
          className="site-header site-header--layout-1 site-header--fluid site-header--absolute"
        >
          <div className="d-lg-flex justify-content-lg-between align-items-lg-center site-header__container">
            <div className="d-lg-flex align-items-lg-center">
              <div className="d-flex align-items-center site-header__logo">
                <h1 className="screen-reader-text">The Salon</h1>
                <p className="page-banner__title_p1">
                  <a href={`${BUSINESS_APP.HOME_URL}`}>
                <img
                  src={SalonLogo}
                  alt="Salon"
                  style={{ height: "75%", width: "63%", marginBottom: "11px"  }}
                 />
                </a>
                </p>
                <a href={`${BUSINESS_APP.HOME_URL}`}>
                <p className="logoname">lettuce</p>
                <p className="logoname2">book</p>
                </a>
                {/* <p className="page-banner__title_p1">Easy Online</p>&nbsp; */}
              </div>
                <br>
                </br>
            </div>
            <div className="d-lg-flex align-items-lg-center">
              <div className="user-action" style={{ right: "4px" }}>
              <a href={`${BUSINESS_APP.HOME_URL}`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}> 
                  {/* target="_blank" */} 
                  {/* <i className="fa fa-home" /> */}
                  <span style={{ marginLeft: "5px" }}>Home</span> </a>
              <a href={`${BUSINESS_APP.HOME_URL}about`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}> 
                  {/* target="_blank" */} 
                  {/* <i className="fa fa-list-alt" /> */}
                  <span style={{ marginLeft: "5px" }}>About</span> </a>
              <a href={`${BUSINESS_APP.BUSINESS_URL}login`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                  <i className="fa fa-user" />
                  <span style={{ marginLeft: "5px" }}>Sign in</span>
                </a>
              <a href={`${BUSINESS_APP.BUSINESS_URL}business-registration`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                  <i className="fa fa-building-o" />
                  <span style={{ marginLeft: "5px" }}>Business sign up</span></a>
                {/* <button className="button button--small button--pill button--primary">
                  <span>&#43;</span>{" "}
                  <a
                    href={`${BUSINESS_APP.BUSINESS_URL}business-registration`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    For Businesses
                  </a>
                </button> */}
              </div>
            </div>
          </div>
        </header>
        {/* <ChooseBookingCritera /> */}
        <BannerpanelComponent history={this.props.history} />
        {/* <section className="listing-list page-section bg-wild-sand listing-list--layout-1">
          <div className="container">
            <h2 className="page-section__title t-left">
              Recently Viewed Businesses
            </h2>
            <div className="row">
              {serviceListArray.map((row, index) => (
                <BusinessPanel data={row} index={index} key={row.id} />
              ))}
            </div>
          </div>
        </section> */}
        {/* <FeedbackComponent /> */}
        <FooterComponent fbLink="https://www.google.co.in"/>
      </>
    );
  }
}

export default HomeContainer;
