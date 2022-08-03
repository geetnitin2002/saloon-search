import React from "react";
import ChooseBookingCriteraForm from "../../../components/Form/generalForm";
import { BookingForm } from "./chooseBookingCriteraUtils";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { bookAppointment, resetbookAppointment, getStaffAvailability} from "./BookingActions";
import styled from "styled-components";
import moment from "moment";
import Crossicon from "TARGET_BUILD/images/uploads/cross.png";
import AlertSuccess from "../../../components/alertSuccessComponent";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import lodash from "lodash";
const mystyle = {
  backgroundColor: "white"
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SpanTime = styled.span`
  // color: #01aa11;  
  color: #123145;    
  font-weight: bold;
  margin-bottom: 8px;
  // font-family: monospace;
  /* font-family: "Cabin", sans-serif; */
  font-family: "Nunito";
  font-size: 16px;
`;
const LoaderBox = styled.div`
  top: 12px;
  left: 165px;
  margin: auto;
`;
const Button = styled.button`
  position: fixed;
  display: flex;
  /* flex-direction: row-reverse; */
  top: 15px;
  right: 232px;
  float: left;
  img {
    vertical-align: middle;
    background: no-repeat green;
    width: 10px;
  }
`;
class BookService extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      success: null,
      loader: false,
      modelShow: true,
      confirmationBooking: false,
      permitedServiceKind: props.permitedServiceKind,
    };
  }
  closeWarning = () => {
    this.setState({ confirmationBooking: false });
  };
  acceptWarning = () => {
    this.props.submitForm("serviceBooking");
    this.setState({ confirmationBooking: false });
  };
  // backButton = (close: any) => {
  //   //alert("Back");
  //   console.log(close);
  //   this.props.closeTicketBooking(close);
  //   // this.setstate.confirmationBooking = true;
  // };
  componentDidUpdate(PrevProps: any) {
    if (
      this.props.serviceBookingRes &&
      this.props.serviceBookingRes !== PrevProps.serviceBookingRes
    ) {
      this.setState({ loader: false });
      if (this.props.serviceBookingRes.responseType === "success") {
        this.setState({
          success: this.props.serviceBookingRes.success[0].message,
        });
      } else {
        // console.log(this.props.serviceBookingRes);
      }
    }
  }
  handleModelClose = () => {
    this.props.resetbookAppointment();
  };
  handleSubmit = (value: any) => {
    //  console.log(value);
    const request = {
      userIdOfStaff: this.props.selectedRecord.staff,
      services:
        this.props.selectedRecord.serviceServiceName1 &&
        this.props.selectedRecord.serviceName !==
          this.props.selectedRecord.serviceServiceName1
          ? [
              this.props.selectedRecord.serviceName,
              this.props.selectedRecord.serviceServiceName1,
            ]
          : [this.props.selectedRecord.serviceName],
      ifPartnerService:
        this.props.selectedRecord.serviceserviceFor === "Y" ? "Y" : "N",
      appointmentDate: this.props.selectedRecord.date,
      clockTimeRange:
        this.props.selectedRecord.time +
        ";" +
        this.props.staffAvailablityRes.serviceDuration,
      customerName: value.name,
      customerEmail: value.email,
      partnerEmail:
        this.props.selectedRecord.serviceserviceFor === "Y"
          ? value.friendEmail
          : null,
      bookerComment: value.comment ? value.comment : null,
      businessName:
        this.props.staffAvailablityRes &&
        this.props.staffAvailablityRes.businessName,
    };
    this.props.bookAppointment(this.props.businessId, request);
    this.setState({ loader: true });
  };

  submitFrom = () => {
    // this.props.submitForm("serviceBooking");
    this.setState({ confirmationBooking: true });
  };
  closeTicket = (close: any) => {
    this.setState({ success: null });
    this.props.closeTicketBooking(close);
    this.props.resetbookAppointment();
  };
  backButton = (value: any) => {
    // this.props.resetbookAppointment();
    this.props.resetSelection(this.props.selectedRecord.email);
  };
  render() {
    const form: any = lodash.cloneDeep(BookingForm);
    if (this.props.selectedRecord.serviceserviceFor !== "y") {
      form.splice(1, 1);
    }
    return (
      <>
        <section className="create-listing">
          {/* <Button
            className="dismiss-button"
            aria-label="Dismiss"
            onClick={this.closeTicket}
          >
            <img src={Crossicon} alt="Salon" />
          </Button> */}
          <div className="wrapper" id="mview" style={mystyle}>
            {this.state.success && (
              <AlertSuccess 
                messages={this.state.success}
                close={this.closeTicket}
                style={{"textAlign": "center"}}
              />
            )}
            {/* <h3>Your Information for Booking</h3> */}
            <h3>Booking Confirmation</h3>
            <br />
            <br />
            <div
              className="row"
              style={{ margin: "auto", justifyContent: "space-evenly" }}
            >
              <ContentWrapper>
                <SpanTime>Service</SpanTime>
                <span>{this.props.selectedRecord.serviceName}</span>
                {this.props.selectedRecord.serviceServiceName1 && (
                  <span>
                    {this.props.selectedRecord.serviceServiceName1.split("(")[0] || ""}
                  </span>
                )}
              </ContentWrapper>
              <ContentWrapper>
                <SpanTime>Appointment date</SpanTime>
                <span>{this.props.selectedRecord.date}</span>
              </ContentWrapper>
              <ContentWrapper>
                <SpanTime>Time</SpanTime>
                <span>{this.props.selectedRecord.time}</span>
              </ContentWrapper>
              <ContentWrapper>
                <SpanTime>Duration</SpanTime>
                <span>{this.props.staffAvailablityRes.serviceDuration}</span>
              </ContentWrapper>
              <ContentWrapper>
                <SpanTime>Staff</SpanTime>
                <span>{this.props.selectedRecord.staffname}</span>
              </ContentWrapper>
            </div>
            <br />
            <br />
            <ChooseBookingCriteraForm
              initialValue={{ email: this.props.selectedRecord.email }}
              handleSubmit={this.handleSubmit}
              formname="serviceBooking"
              formContent={form}
            />
            <div className="form-row">
          
            <div className="form-col">
                <label>
                  <br />
                </label>
                <div className="form-holder">
                  <button
                    type="submit"
                    className="button button--medium button--square button--search"
                    onClick={this.closeTicket}
                    style={{ width: "130px" }}
                  >
                    Return
                  </button>
                </div>
              </div>
              <div className="form-col">
                <label>
                  <br />
                </label>
                <div className="form-holder">
                  <button
                    type="submit"
                    className="button button--medium button--square button--search"
                    onClick={this.backButton}
                    style={{ width: "130px" }}
                    // onClick={ function() {...this.setState({selectedRecord: null}) } }
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="form-col">
                <label>
                  <br />
                </label>
                <div className="form-holder">
                  <button
                    type="submit"
                    className="button button--medium button--square button--search"
                    onClick={this.submitFrom}
                    style={{ width: "130px" }}
                  >
                    Book
                  </button>
                </div>
              </div>

              {/* <div className="form-col"></div> */}
            </div>
          </div>
        </section>
    
        {this.state.confirmationBooking &&
          (
            <ModalComponent
            showModel={true}
            handleSubmit={this.acceptWarning}
            isErrorHandler={false}
            title={"Confirm Booking ? "}
            handleClose={this.closeWarning}
            NoButton={"Cancel"}
            yesButton={"Yes"}
          >
            {/* <p>{this.state.warning}</p> */}
          </ModalComponent>
          )}

        {this.props.serviceBookingRes &&
          (this.props.serviceBookingRes.responseType === "errors" ||
            this.props.serviceBookingRes.errors) && (
            <ModalComponent 
              title={"Error Details"}
              showModel={this.state.modelShow}
              handleSubmit={null}
              handleClose={this.handleModelClose}
              isErrorHandler={true}
            >
              <Errorhandler error={this.props.serviceBookingRes} />
            </ModalComponent>
          )}
      </>
    );
  }
}
const mapStateToProps = (state: any) => ({
  serviceBookingRes:
    state.businessDetails && state.businessDetails.serviceBookingRes,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  bookAppointment: (id: any, body: any) => dispatch(bookAppointment(id, body)),
  // getStaffAvailability: (id: any, body: any) => dispatch(getStaffAvailability(id, body)),
  resetbookAppointment: () => dispatch(resetbookAppointment()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BookService);
