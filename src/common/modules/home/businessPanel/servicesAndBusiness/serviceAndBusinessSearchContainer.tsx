import React from "react";
import { ServiceAndBusinessSearch } from "./serviceAndBusniessSearch";
import BusinessPanel from "../businessPanel";
import { connect } from "react-redux";
import {
  getSearchResults,
  SearchForLocationAndBusiness,
  getBusinessLocation,
} from "../../action/businessDetailAction";
import TicketBooking from "../../../businessModule/ticketBooking/ticketBooking";
import ChooseBookingCritera from "../../../view/chooseBookingCriteria/chooseBookingCriteria";
// @ts-ignore
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import styled from "styled-components";
import SalonLogo from "TARGET_BUILD/images/uploads/logo.jpg";
import FooterComponent from "./../../../../components/footerComponent";
import BUSINESS_APP from "./../../../../../apiConfig";
const Wrapper = styled.section`
background-position-y: 0px;
padding-top: 10px;
background-image: url(${HeaderLogo});
background-repeat: repeat;
min-height: 81vh;
`;
export class ServiceAndBusinessContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      defaultValue: this.props.location.state,
      serviceDetails: null,
      closeTicketModel: true,
      search: this.props.location.state && this.props.location.state.id,
    };
  }
  componentDidMount() {
    this.props.getBusinessLocation();
    this.props.getSearchResults();
    const type = this.state.defaultValue && this.state.defaultValue.type;
    const request = {
      serviceCategory: type === "service" ? this.state.defaultValue.id : null,
      location: null,
      businessName: type === "business" ? this.state.defaultValue.id : null,
    };
    if (type) {
      this.props.location.state = "";
      let state = { ...this.props.history.location.state };
      delete state.id;
      delete state.type;
      delete state.value;
      this.props.history.replace({ ...this.props.history.location, state });
    }
    if (type) {
      this.props.SearchForLocationAndBusiness(request);
    }
  }
  searchClick = (value: any) => {
    if (value.selectedService == null) {
      value.selectedService = { id: null, type: "business"}
    }
    this.setState({ search: value.selectedService.id });
    const request = {
      serviceCategory:
        value.selectedService.type === "service"
          ? value.selectedService.id
          : null,
      location: value.selectedLocations ? value.selectedLocations.value : null,
      businessName:
        value.selectedService.type === "business"
          ? value.selectedService.id
          : null,
    };
    this.props.SearchForLocationAndBusiness(request);
  };
  bookTicktsDetails = (row: any, id: any) => {
    row.id = id;
    this.setState({ serviceDetails: row, closeTicketModel: false });
  };
  closeTicketBooking = (close: any) => {
    this.setState({ serviceDetails: null, closeTicketModel: close });
  };
  render() {
    const { searchList } = this.props;
    console.log(searchList)
    if (searchList && searchList.length == 1) {
      const path = {
        pathname:
          "/business/" +
          searchList[0].businessName.replace(" ", "+") +
          "/" +
          searchList[0].businessId,
      };
      this.props.history.push(path);
      // this.props.history.push(
      //   "/business/" + searchList[0].businessId + "/details"
      // );
      return <></>;
    }
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
                <p className="logoname">lettuce</p>
                <p className="logoname2">book</p>
                <h3 className="screen-reader-text">LettuceBook</h3>
                {/* <p className="page-banner__title_p1">Easy Online</p>&nbsp; */}
              </div>
              <br>
              </br>
            </div>
            <div className="d-lg-flex align-items-lg-center">
              <div className="user-action" style={{ right: "4px" }}>
              <a href={`${BUSINESS_APP.HOME_URL}`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}> 
                  {/* target="_blank" */} {/* <i className="fa fa-user" /> */}
                  {/* <i className="fa fa-home" /> */}
                  <span style={{ marginLeft: "5px" }}>Home</span> </a>
              <a href={`${BUSINESS_APP.HOME_URL}about`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}> 
                  {/* target="_blank" */} {/* <i className="fa fa-user" /> */}
                  {/* <i className="fa fa-list-alt" /> */}
                  <span style={{ marginLeft: "5px" }}>About</span> </a>
              {/* <a href={`${BUSINESS_APP.BUSINESS_URL}login`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                  <i className="fa fa-user" />
                  <span style={{ marginLeft: "5px" }}>Sign in</span>
                </a>
              <a href={`${BUSINESS_APP.BUSINESS_URL}business-registration`} rel="noopener noreferrer" className="signIn" style={{ marginRight: "4px" }}>
                  <i className="fa fa-building-o" />
                  <span style={{ marginLeft: "5px" }}>Business sign up</span></a> */}

                {/* <a
                  href={`${BUSINESS_APP.BUSINESS_URL}login`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="signIn"
                  style={{ marginRight: "4px" }}
                >
                  <i className="fa fa-user" />
                  <span style={{ marginLeft: "5px" }}>Sign in</span>
                </a> */}
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
                {/* <a
                  href={`${BUSINESS_APP.BUSINESS_URL}business-registration`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="signIn"
                  style={{ marginRight: "4px" }}
                >
                  <i className="fa fa-user" />
                  <span style={{ marginLeft: "5px" }}>Business sign up</span>
                </a> */}
              </div>
            </div>
          </div>
        </header>
        {!this.state.serviceDetails && (
          <Wrapper className="create-listing">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="create-listing__wrapper">
                    <ServiceAndBusinessSearch
                      serviceCategoriessAndBusinesses={
                        this.props.serviceCategoriessAndBusinesses
                      }
                      locationList={this.props.locationsList}
                      searchClick={this.searchClick}
                      defaultValue={this.state.defaultValue}
                      {...this.props}
                    />
                    {/* {searchList && searchList.length > 0 && (
                      <h2 className="page-title t-center">
                        Showing results for{" "}
                        <span className="c-white">{this.state.search}</span>
                      </h2>
                    )} */}
                    <div className="row">
                      {searchList &&
                        searchList.map((row: any, index: any) => (
                          <BusinessPanel
                            className="col-md-12"
                            data={row}
                            index={index}
                            key={row.businessId}
                            showBooking={true}
                            service={row.services}
                            bookTickets={this.bookTicktsDetails}
                            {...this.props}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper>
        )}
        {this.state.serviceDetails &&
          this.state.serviceDetails.ifTicket !== "N" &&
          !this.state.closeTicketModel && (
            <TicketBooking
              serviceDetails={this.state.serviceDetails}
              businessId={this.state.serviceDetails.id}
              closeTicketBooking={this.closeTicketBooking}
            />
          )}
        {this.state.serviceDetails &&
          this.state.serviceDetails.ifTicket === "N" &&
          !this.state.closeTicketModel && (
            <ChooseBookingCritera
              serviceDetails={this.state.serviceDetails}
              businessId={this.state.serviceDetails.id}
              closeTicketBooking={this.closeTicketBooking}
            />
          )}
          <FooterComponent fbLink="https://www.google.co.in"/>
      </>
   );
  }
}

const mapStateToProps = (state: any) => ({
  serviceCategoriessAndBusinesses:
    state.businessDetails &&
    state.businessDetails.serviceCategoriessAndBusinesses,
  locationsList: state.businessDetails && state.businessDetails.locationsList,
  searchList: state.businessDetails && state.businessDetails.searchList,
});
const mapDispatchToProps = (dispatch: any) => ({
  getSearchResults: () => dispatch(getSearchResults()),
  SearchForLocationAndBusiness: (data: any) =>
    dispatch(SearchForLocationAndBusiness(data)),
  getBusinessLocation: () => dispatch(getBusinessLocation()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceAndBusinessContainer);
