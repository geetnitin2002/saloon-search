import React from "react";
import DatewiseAvailSingledayForm from "../../../components/Form/generalForm";
import {
  datewiseFormSearch,
  datewiseFormSearch1,
  emailForm,
} from "./chooseBookingCriteraUtils";
import { connect } from "react-redux";
import { submit, formValueSelector } from "redux-form";
import styled from "styled-components";
import WeekSelector from "./weekSelector";
import { UserProvider } from "../../businessModule/registration/addServices/contextApi";
import BookService from "./bookService";
import Crossicon from "TARGET_BUILD/images/uploads/cross.png";
import { resetbookAppointment } from "./BookingActions";
import { checkBookingForPotentialClash } from "../../../api/businessApi";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import { BusinessSetup } from "../../../actionConstants";
import BUSINESS_APP from "./../../../../apiConfig";
import SalonLogo from "TARGET_BUILD/images/uploads/logo.jpg";
import { getSearchResults } from "../actionView";
import lodash from "lodash";
const mystyle = {
  backgroundColor: "white",
  width: "1100px !important",
};

const DivRow = styled.div`
  form {
    display: flex;
  }
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

const LoaderBox = styled.div`
  top: -41px;
  left: 165px;
  margin: auto;
`;

class DatewiseAvailSingleday extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      formValue: this.getstateValue(),
      formValue1: this.props.dataWiseSingleDayRecord,
      selectedRecord: null,
      selectedTime: null,
      warning: null,
      error: null,
      loader: false,
      warningInfo: null,
    };
  }

  componentDidUpdate = (PrevProps: any) => {
    if (
      this.props.staffAvailablityRes &&
      this.props.staffAvailablityRes !== PrevProps.staffAvailablityRes
    ) {
      this.setState({
        loader: false,
        formValue1: this.props.dataWiseSingleDayRecord,
      });
    }
  };

  getstateValue = () => {
    const value = this.props.dataWiseSingleDayRecord;
    if (this.props.dataWiseSingleDayRecord) {
      const index = this.props.staffList.findIndex(
        (row: any) => row.userId == this.props.dataWiseSingleDayRecord.staff
      );
      let staff = "";
      if (index != -1) {
        staff = this.props.staffList[index].staffName;
      }
      value.staffname = staff;
    }
    return value;
  };

  handleSubmit = (value: any) => {
    //  console.log(value);
    // console.log(this.props.dataWiseSingleDayRecord);
    this.setState({ loader: true });
    this.props.submitData(value);
  };
  submitFrom = () => {
    this.props.submitForm("emailForm");
    // console.log(this.state.selectedRecord);
  };
  closeTicket = (close: any) => {
    this.props.closeTicketBooking(close);
    this.props.resetbookAppointment();
  };
  modifySearch = () => {
    this.props.submitForm("DatewiseAvailSingledayForm");
  };
  choosenTime = (row: any) => {
    // console.log(row);
    this.setState({ selectedTime: row });
  };
  buttonComponent = () => {
    return (
      <div className="col-md-2" style={{ display: "flex" }}>
        <button type="button" className="next2 btn">
          <a href={void 0} onClick={this.modifySearch}> Modify </a>
        </button>

        {/* <button type="button" className="next2 btn">
          <a href={void 0} onClick={this.closeTicket}> Return </a>
          </button> */}
      </div>
    );
  };
  getDropdownList = (list: any = [], params: any, id: any) => {
    let options = [];
    if (list) {
      for (let i = 0; i < list.length; i++) {
        if (typeof params == "string") {
          options.push({ label: list[i][params], value: list[i][id] });
        } else if (params) {
          options.push({
            label: list[i][params[0]] + "  " + list[i][params[1]],
            value: list[i][id],
          });
        } else {
          options.push({ label: list[i], value: list[i] });
        }
      }
    }

    return options;
  };
  handleSubmitEmail = (value: any) => {
    this.setState({ error: null });
    if (this.state.selectedTime) {
      const record = {
        ...this.props.dataWiseSingleDayRecord,
        ...this.state.selectedTime,
        email: value.email,
      };
      const request = {
        email: value.email,
        appointmentDate: this.state.selectedTime.date,
        clockTimeRange:
          this.state.selectedTime.time +
          ";" +
          this.props.staffAvailablityRes.serviceDuration,
      };
      const selectedTime: any = this.state.selectedTime;
      selectedTime.email = value.email;
      this.setState({ selectedTime });
      checkBookingForPotentialClash(this.props.businessId, request)
        .then((res) => {
          if (res.success) {
            this.setState({ selectedRecord: record });
          } else if (res.warning) {
            this.setState({
              warning: res.warning.message,
              warningInfo: res.warning.warningData,
            });
          } else {
            this.setState({ error: res.error || res.errors });
          }
        })
        .catch((error) => {
          this.setState({ error });
        });
    } else {
      this.setState({ error: "Please Select Time" });
    }
  };
  closeWarning = () => {
    this.setState({ warning: null });
  };
  acceptWarning = () => {
    const record = {
      ...this.props.dataWiseSingleDayRecord,
      ...this.state.selectedTime,
    };
    const request = {
      cancelReason: null,
      bookingNumber: this.state.warningInfo.bookingNumber,
    };
    // this.props.cancel(this.props.businessId, request);
    this.setState({ selectedRecord: record, warning: null });
  };
  handleModelClose = () => {
    this.setState({ error: null });
  };
  backButton = () => {
    this.props.backButtonClick(false);
  };
  resetSelection = (email: any) => {
    this.setState({selectedRecord: null, email: email});
  }
  storeDateAndTime = (selectedSlot: any) => {
    if (selectedSlot.week != null) {
      this.setState({week: selectedSlot.week});
    }
    if (selectedSlot.date != null) {
      this.setState({date: selectedSlot.date});
    }
    if (selectedSlot.time != null) {
      this.setState({time: selectedSlot.time})
    }
  }
  render() {
    const datewiseFormSearchBelow: any = lodash.cloneDeep(datewiseFormSearch1);
    console.log(this.state.formValue1.serviceServiceName1);
    if (this.state.formValue1 && !this.state.formValue1.serviceServiceName1) {
      datewiseFormSearchBelow[0].field.splice(1, 1);
    }
    return (
      <>
        {!this.state.selectedRecord && (
          <section className="create-listing">

            <div className="wrapper" //style={{ width: "1100px !important"}} 
              id="mview"
              style={mystyle} >
              <div className="row" style={{ justifyContent: "center"}} >
                  {/* <Button
                  className="dismiss-button"
                  aria-label="Dismiss"
                  onClick={this.closeTicket}
                >
                  <img src={Crossicon} alt="Salon" />
                </Button> */}
                
                <DivRow>
                  <UserProvider
                    value={{
                      staff: this.getDropdownList(
                        this.props.staffList,
                        ["firstname", "lastname"],
                        "userId"
                      ),
                      week: this.getDropdownList(
                        this.props.weekList,
                        null,
                        null
                      ),
                      from: this.getDropdownList(
                        this.props.businessWorkingHourSlots,
                        null,
                        null
                      ),
                      to: this.getDropdownList(
                        this.props.businessWorkingHourSlots,
                        null,
                        null
                      ),
                    }}
                  >
                    <DatewiseAvailSingledayForm
                      initialValue={this.state.formValue}
                      handleSubmit={this.handleSubmit}
                      formname="DatewiseAvailSingledayForm"
                      formContent={datewiseFormSearch}
                      buttonComponent={this.buttonComponent()}
                    />
                  </UserProvider>
                </DivRow>
                {this.state.loader && <LoaderBox className="loader" />}
              </div>
              {/* <h3>Datewise Availiability</h3> */}
              <div className="row">
                <DatewiseAvailSingledayForm
                  initialValue={this.state.formValue1}
                  handleSubmit={this.handleSubmit}
                  formname="DatewiseAvailSingledayForm1"
                  formContent={datewiseFormSearchBelow}
                />
              </div>
              {this.props.dataWiseSingleDayRecord &&
                this.props.staffAvailablityRes &&
                this.props.staffAvailablityRes.weeks && (
                  <WeekSelector
                    dataWiseSingleDayRecord={this.props.dataWiseSingleDayRecord}
                    week={
                      this.props.staffAvailablityRes &&
                      this.props.staffAvailablityRes.weeks
                    }
                    staffAvailablityRes={this.props.staffAvailablityRes}
                    choosenTime={this.choosenTime}
                    storeDateAndTime={this.storeDateAndTime}
                    selectedDateAndTime={{week: this.state.week, date: this.state.date, time: this.state.time}}
                  />
                )}
              <div className="row" style={{ flexDirection: "column" }}>
                <DatewiseAvailSingledayForm
                  initialValue={{email: this.state.email}}
                  handleSubmit={this.handleSubmitEmail}
                  formname="emailForm"
                  formContent={emailForm}
                />
              </div>
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
                    >
                      Proceed
                    </button>
                  </div>
                </div>
                <div className="form-col"></div>
              </div>
            </div>
          </section>
        )}
        {this.state.selectedRecord && (
          <BookService
            selectedRecord={this.state.selectedRecord}
            businessId={this.props.businessId}
            businessDetails={this.props.serviceDetails}
            closeTicketBooking={this.props.closeTicketBooking}
            staffAvailablityRes={this.props.staffAvailablityRes}
            staffList={this.props.staffList}
            permitedServiceKind={this.props.permitedServiceKind}
            resetSelection = {this.resetSelection}
          />
        )}
        {this.state.warning && (
          <ModalComponent
            showModel={true}
            handleSubmit={this.acceptWarning}
            isErrorHandler={false}
            title={"Caution"}
            handleClose={this.closeWarning}
            NoButton={"Cancel"}
            yesButton={"Proceed"}
          >
            <p>{this.state.warning}</p>
          </ModalComponent>
        )}
        {this.state.error && (
          <ModalComponent
            title={"Error Details"}
            showModel={true}
            handleSubmit={null}
            handleClose={this.handleModelClose}
            isErrorHandler={true}
          >
            <Errorhandler error={this.state.error} />
          </ModalComponent>
        )}
      </>
    );
  }
}

const selector = formValueSelector("emailForm");
// const mapStateToProps = (state: any) => ({
//   staffList: state.addBusiness && state.addBusiness.staffList
// });
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  resetbookAppointment: () => dispatch(resetbookAppointment()),
  cancel: (id: any, data: any) =>
    dispatch(
      getSearchResults(id, data, BusinessSetup.MANAGER_USER_BOOKING_CANCEl_REQ)
    ),
});

export default connect(null, mapDispatchToProps)(DatewiseAvailSingleday);