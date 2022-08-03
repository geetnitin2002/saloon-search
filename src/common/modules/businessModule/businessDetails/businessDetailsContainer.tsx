import React from "react";
import BusinessAddressInfo from "./addressDetails";
import ServiceDetails from "./serviceDetails";
import BusinessDescription from "./businessDesciption";
import TicketBooking from "../ticketBooking/ticketBooking";
import { connect } from "react-redux";
import {
  getBusinessAddress,
  getBusiness,
  getBusinessByBehavior,
  getBusinessServices,
  getBusinessExtraInfo,
} from "../action/addBusinessAction";
import { getImages } from "../../../api/businessApi";
import ApiConfig from "../../../../apiConfig";
import styled from "styled-components";
import ChooseBookingCritera from "../../view/chooseBookingCriteria/chooseBookingCriteria";
import LazyImage from "../../../components/loadImage";
// @ts-ignore
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import SalonLogo from "TARGET_BUILD/images/uploads/logo.jpg";
import BUSINESS_APP from "./../../../../apiConfig";
import FooterComponent from "./../../../components/footerComponent";

const ThumbSwiperSlide = styled.div`
  width: 130px;
  margin-right: 10px;
`;
const SwiperSlide = styled.div`
  // width: 710px;
  margin-right: 10px;
`;
const Wrapper = styled.section`
  background-position-y: 0px;
  background-image: url(${HeaderLogo});
  background-repeat: repeat;
  min-height: 81vh;
`;
const images = [
  { width: 800, height: 400 },
  { width: 800, height: 500 },
  { width: 800, height: 1000 },
  { width: 800, height: 450 },
  { width: 800, height: 800 },
  { width: 800, height: 700 },
  { width: 800, height: 550 },
  { width: 800, height: 650 },
  { width: 800, height: 550 },
  { width: 800, height: 650 },
];
class BusniessDetailsContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    let data = [
      `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image_Main.png`,
      `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image1.png`,
      `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image2.png`,
      `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image3.png`,
      `${ApiConfig.IMAGE_URL}Bid_${this.props.id}_Image4.png`,
    ];

    this.state = {
      serviceDetails: null,
      closeTicketModel: true,
      currentImage: 0,
      businessId: this.props.match.params.id,
      data: null,
    };
  }

  changeImage = (count: any) => {
    if (count < this.state.data.length && count >= 0) {
      this.setState({ currentImage: count });

      console.log(count);
    }
  };

  componentDidMount() {
    //   this.props.getAddressDetails(this.state.businessId);
    const request = {
      behavior: "System",
    };
    this.props.getBusinessDetails(this.state.businessId, request);
    // this.props.getBusinessDetails(this.state.businessId);
    this.props.getBusinessServices(this.state.businessId);
    this.props.getBusinessExtraInfo(this.state.businessId);
    // this.props.getBusinessWorkingHours(this.state.businessId);
    //  window.addEventListener("load", this.checkUpload);
    getImages(this.state.businessId).then((res) => {
      if (res.data && res.data.Main) {
        var data: any = [];
        data.push(res.data.Main.url);
        // data.push(res.data.Child.filter(item => item.url));
        res.data.Child.forEach((value) => {
          value.url != "" && data.push(value.url);
        });
        // this.setState({fileUpload: {
        //   myFileMain: res.data.Main,
        //   myFile: res.data.Child.filter(item => item.url)
        // }})
        console.log(data);
        this.setState({ data: data });
      }
    });
  }
  // checkUpload = () => {
  //   var image: any = document.querySelector("img");
  //   var isLoaded = image.complete && image.naturalHeight !== 0;
  //   console.log(isLoaded);
  //   // alert(isLoaded);
  // };
  componentWillUnmount() {
    // window.removeEventListener("load", this.checkUpload);
  }
  bookTicket = (row: any) => {
    this.setState({ serviceDetails: row, closeTicketModel: false });
  };
  closeTicketBooking = (close: any) => {
    this.setState({ serviceDetails: null, closeTicketModel: close });
  };
  getAddress = () => {
    const { addressDetails } = this.props;
    let address = "";
    if (addressDetails) {
      if (addressDetails.addressLine1) {
        address += addressDetails.addressLine1 + ",";
      }
      if (addressDetails.addressLine2) {
        address += addressDetails.addressLine2 + ",";
      }
      if (addressDetails.province) {
        address += addressDetails.province + ",";
      }
      if (addressDetails.cityLocation) {
        address += addressDetails.cityLocation + ",";
      }
      if (addressDetails.city) {
        address += addressDetails.city + ",";
      }
      if (addressDetails.postalCode) {
        address += addressDetails.postalCode;
      }
      if (addressDetails.latitude) {
        address += addressDetails.latitude;
      }
      if (addressDetails.longitude) {
        address += addressDetails.longitude;
      }
    }
    return address;
  };
  getImageStyle = () => {
    return {
      width: "120px",
      height: "90px",
      background: "#b3b3b3",
      margin: "auto",
    };
  };
  getImageStyle1 = () => {
    return {
      width: "400px",
      height: "300px",
      margin: "auto",
    };
  };
  getImageURL(image: any) {
    if (typeof image === "string") {
      return `data:image/jpeg;base64,${image}`;
    }
    // return URL.createObjectURL(image);
  }
  render() {
    const { businessInfo, businessExtraInfo, handleClick } = this.props;
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
                      style={{
                        height: "75%",
                        width: "63%",
                        marginBottom: "11px",
                      }}
                    />
                  </a>
                </p>
                <a href={`${BUSINESS_APP.HOME_URL}`}>
                  <p className="logoname">lettuce</p>
                  <p className="logoname2">book</p>
                </a>
                {/* <p className="page-banner__title_p1">Easy Online</p>&nbsp; */}
              </div>
              <br></br>
            </div>
            <div className="d-lg-flex align-items-lg-center">
              <div className="user-action" style={{ right: "4px" }}>
                <a
                  href={`${BUSINESS_APP.HOME_URL}`}
                  rel="noopener noreferrer"
                  className="signIn"
                  style={{ marginRight: "4px" }}
                >
                  {/* target="_blank" */} {/* <i className="fa fa-user" /> */}
                  {/* <i className="fa fa-home" /> */}
                  <span style={{ marginLeft: "5px" }}>Home</span>{" "}
                </a>
                <a
                  href={`${BUSINESS_APP.HOME_URL}about`}
                  rel="noopener noreferrer"
                  className="signIn"
                  style={{ marginRight: "4px" }}
                >
                  {/* target="_blank" */} {/* <i className="fa fa-user" /> */}
                  {/* <i className="fa fa-list-alt" /> */}
                  <span style={{ marginLeft: "5px" }}>About</span>{" "}
                </a>
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
          <Wrapper className="single-listing single-listing--layout-2">
            <div className="listing-main">
              <div className="container">
                <div className="row">
                  <div className="col-lg-8">
                    <div
                      id="gallery"
                      className="listing-section bg-white hover-effect"
                      data-matching-link="#gallery-link"
                    >
                      <div className="listing-section__header">
                        <h3 className="listing-section__title">
                          {businessInfo &&
                            businessInfo.main &&
                            businessInfo.main.businessName}
                        </h3>
                      </div>

                      <div className="swiper-container listing-gallery-top">
                        <div className="swiper-wrapper">
                          {/* {this.state.currentImage == 1 && (
                          <SwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 1
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="1"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image_Main.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle1()} 
                              id="1UP"
                            
                            />
                          </SwiperSlide>
                          )}
                          {this.state.currentImage == 2 && (
                          <SwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 2
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="2"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image1.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle1()}
                              id="2UP"
                            />
                          </SwiperSlide>
                          )}

                          {this.state.currentImage == 3 && (
                          <SwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 3
                                ? " is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="3"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image2.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle1()}
                              id="3UP"
                            />
                          </SwiperSlide>
                          )}

                          {this.state.currentImage == 4 && (
                          <SwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 4
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="4"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image3.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle1()}
                              id="4UP"
                            />
                          </SwiperSlide>
                          )}
                          
                          {this.state.currentImage == 5 && (
                          <SwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 5
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="5"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image4.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle1()}
                              id="5UP"
                            />
                          </SwiperSlide>
                          )} */}
                          {this.state.data &&
                            this.state.data.length > 0 &&
                            this.state.data.map((file: any, index: any) => (
                              <>
                                {this.state.currentImage == index && (
                                  <SwiperSlide
                                    className={`swiper-slide ${
                                      this.state.currentImage == index
                                        ? " is-selected swiper-slide-active"
                                        : ""
                                    }`}
                                    id={index}
                                  >
                                    <LazyImage
                                      src={this.getImageURL(file)}
                                      alt="Listing Image"
                                      style={this.getImageStyle1()}
                                      id={index + "up"}
                                    />
                                  </SwiperSlide>
                                )}
                              </>
                            ))}
                        </div>
                        <span
                          className="ion-chevron-left c-white listing-button listing-button-prev"
                          onClick={() =>
                            this.changeImage(this.state.currentImage - 1)
                          }
                        ></span>
                        <span
                          className="ion-chevron-right c-white listing-button listing-button-next"
                          onClick={
                            () => this.changeImage(this.state.currentImage + 1)
                            //this.changeImage(this.handelClick)
                          }
                        ></span>
                      </div>

                      <div className="swiper-container listing-gallery-thumb">
                        {/* // Commented lines from 396 to  417 to hid Thumbnails*/}
                        <div className="swiper-wrapper">
                          {/* {this.state.data && this.state.data.length > 0 && this.state.data.map((file: any, index: any) => (
                            <>
                              <ThumbSwiperSlide
                                className={`swiper-slide is-selected swiper-slide-active`}
                                //  ${
                                //   this.state.currentImage == index
                                //     ? "is-selected swiper-slide-active"
                                //     : ""
                                // }`}
                                id={index}
                              > */}
                          {/* added onClick method on 13/10/2020 */}
                          {/* <LazyImage
                                  onClick={() => this.changeImage(index)}
                                  src={this.getImageURL(file)}
                                  alt="Listing Image"
                                  style={this.getImageStyle()}
                                  id={index + 'd'}
                                />
                              </ThumbSwiperSlide>
                            </>
                          ))} */}
                        </div>
                        {/* // add the bottom code to add hard coded thumb nails */}
                        {/* <ThumbSwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 1
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}    
                            id="1"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image_Main.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle()}
                              onClick={() =>
                              this.changeImage(1)
                              }
                              id="1d"
                            />
                            
                          </ThumbSwiperSlide>
                          
                          <ThumbSwiperSlide
                          
                            className={`swiper-slide ${
                              this.state.currentImage == 2
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="2"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image1.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle()}
                              onClick={() =>
                              this.changeImage(2)
                              }
                              id="2d"
                            />
                          </ThumbSwiperSlide>
                          <ThumbSwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 3
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="3"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image2.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle()}
                              onClick={() =>
                              this.changeImage(3)
                              }
                              id="3d"
                            />
                          </ThumbSwiperSlide>
                          <ThumbSwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 4
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="4"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image3.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle()}
                              onClick={() =>
                              this.changeImage(4)
                              }
                              id="4d"
                            />
                          </ThumbSwiperSlide>
                          <ThumbSwiperSlide
                            className={`swiper-slide ${
                              this.state.currentImage == 5
                                ? "is-selected swiper-slide-active"
                                : ""
                            }`}
                            id="5"
                          >
                            <LazyImage
                              src={`${ApiConfig.IMAGE_URL}Bid_${this.state.businessId}_Image4.png`}
                              loading={"lazy"}
                              alt="Listing Image"
                              style={this.getImageStyle()}
                              onClick={() =>
                              this.changeImage(5)
                              }
                              id="5d"
                            />
                          </ThumbSwiperSlide> */}
                      </div>
                    </div>

                    <BusinessDescription
                      {...{
                        description:
                          businessExtraInfo && businessExtraInfo.writeup,
                      }}
                    />
                    <ServiceDetails
                      services={this.props.serviceList || []}
                      bookTicket={this.bookTicket}
                      showDescription={true}
                    />
                  </div>
                  <BusinessAddressInfo
                    addressInfo={{
                      address: this.getAddress(),
                      contact:
                        businessInfo &&
                        businessInfo.extraInfo &&
                        businessInfo.extraInfo.contactPhone,
                      websiteUrl:
                        businessExtraInfo && businessExtraInfo.websiteUrl,
                      workingHours: businessInfo && businessInfo.workingHours,
                      addressUrl:
                        businessInfo && businessInfo.address.googleMapsUrl,
                    }}
                  />
                  {/* <div style={{ maxWidth: 800 }}>
                    {images.map((size: any, index: any) => (
                      <LazyImage
                        key={index.toString()}
                        width={size.width}
                        height={size.height}
                        src={`https://placekitten.com/${size.width}/${size.height}`}
                      />
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </Wrapper>
        )}

        {/* {this.state.serviceDetails && !this.state.closeTicketModel && (
          <TicketBooking
            serviceDetails={this.state.serviceDetails}
            businessId={this.state.businessId}
            closeTicketBooking={this.closeTicketBooking}
          />
        )}
        ifTicketBasedService */}
        {this.state.serviceDetails &&
          this.state.serviceDetails.ifTicketBasedService !== "N" &&
          !this.state.closeTicketModel && (
            <Wrapper>
              <TicketBooking
                serviceDetails={this.state.serviceDetails}
                businessId={this.state.businessId}
                closeTicketBooking={this.closeTicketBooking}
              />
            </Wrapper>
          )}
        {this.state.serviceDetails &&
          this.state.serviceDetails.ifTicketBasedService === "N" &&
          !this.state.closeTicketModel && (
            <ChooseBookingCritera
              serviceDetails={this.state.serviceDetails}
              businessId={this.state.businessId}
              closeTicketBooking={this.closeTicketBooking}
            />
          )}
        <FooterComponent fbLink="https://www.google.co.in" />
      </>
    );
  }
}
export const mapStateToProps = (state: any) => ({
  addressDetails:
    state.businessDetails &&
    state.businessDetails.businessInfo &&
    state.businessDetails.businessInfo.address,
  businessInfo: state.businessDetails && state.businessDetails.businessInfo,
  businessExtraInfo:
    state.businessDetails &&
    state.businessDetails.businessInfo &&
    state.businessDetails.businessInfo.extraInfo,
  //serviceList: state.addBusiness && state.addBusiness.serviceList,
  serviceList:
    state.businessDetails &&
    state.businessDetails.businessInfo &&
    state.businessDetails.businessInfo.services,
});
export const mapDispatchToProps = (dispatch: any) => ({
  //getAddressDetails: (id: any) => dispatch(getBusinessAddress(id)),
  getBusinessDetails: (id: any, request: any) =>
    dispatch(getBusinessByBehavior(id, request)),
  //getBusinessDetails: (id: any) => dispatch(getBusiness(id)),
  getBusinessServices: (id: any) => dispatch(getBusinessServices(id)),
  getBusinessExtraInfo: (id: any) => dispatch(getBusinessExtraInfo(id)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusniessDetailsContainer);
