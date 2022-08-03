import React from "react";
import RegistrationFromFields from "./registrationUtils";
import styled from "styled-components";
import { submit } from "redux-form";
import { connect } from "react-redux";
import RegistrationForm from "./registrationForm";
import AddServiceContainer from "./addServices/addServiceContainer";
import AddStaffContainer from "./addStaff/addStaffContainer";
import {
  addBusiness,
  addBusinessAddress,
  addBusinessHour,
  addBusinessExtraInfo,
  businessResetResponse,
  addBusinessSettings,
  addBusinessHolidays,
} from "../action/addBusinessAction";
import lodash from "lodash";
import moment from "moment";
import Errorhandler from "../../../components/errorHandlerComponent";
import ModalComponent from "../../../components/modelComponent";
import Loader from "../../../components/loader";
const defaultValueHours = {
  openingHourmon: "0000",
  openingHourtue: "0000",
  openingHourwed: "0000",
  openingHourthu: "0000",
  openingHourfri: "0000",
  openingHoursat: "0000",
  openingHoursun: "0000",
  closingHourmon: "0000",
  closingHourtue: "0000",
  closingHourwed: "0000",
  closingHourthu: "0000",
  closingHourfri: "0000",
  closingHoursat: "0000",
  closingHoursun: "0000",
};
const defaultBusinessSettings = {
  ifPhoneShownOnBookingEmail: "N",
  ifStaffNotifiedFutureBookings: "N",
  preBookingInterval: "30",
  advanceBookingPeriod: "20",
  ifNotifyNoShowToBooker: "N",
};
const TableDiv = styled.div`
  height: 600px;
  padding-top: 40px;
`;
const WizardDiv = styled.div`
  position: relative;
  background: #fff;
  padding: 64px 58px 50px;
  min-height: 720px;
  height: auto;
`;
const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  background-color: #eee;
`;
const LoaderBox = styled.div`
  top: 46px;
  left: 165px;
  margin: auto;
`;

class AddRegistrationContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1,
      step1: {},
      step2: {},
      step3: defaultValueHours,
      step4: {},
      step5: defaultBusinessSettings,
      step6: { members: [{ weburl: "" }] },
      modelShow: true,
      loader: false,
    };
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.addBusinessResponse &&
      !this.props.addBusinessErrorResponse &&
      prevProps.addBusinessResponse !== this.props.addBusinessResponse
    ) {
      if (this.state.page == 1) {
        this.setState({
          step1: this.props.addBusinessResponse,
        });
      }
      this.setState({ page: this.state.page + 1 });
      this.setState({ loader: false });
      this.props.businessResetResponse();
    }
    if (
      this.props.addBusinessErrorResponse &&
      prevProps.addBusinessErrorResponse !== this.props.addBusinessErrorResponse
    ) {
      this.setState({ loader: false });
    }
  }
  nextPage = (e: any) => {
    e.preventDefault();
    if (this.state.page == 7 || this.state.page == 8) {
      this.setState({ page: this.state.page + 1 });
    } else {
      this.props.submitForm("step" + this.state.page);
    }
  };
  handleSubmit = (value: any, _formName: string) => {
    this.setState({ loader: true });
    this.props.businessResetResponse();
    if (_formName === "step1") {
      this.props.addBusiness(value);
    } else if (_formName === "step2") {
      this.setState({
        step2: value,
      });
      const request = {
        weburl: value.weburl ? value.weburl : null,
        contactPhone: value.contactPhone ? value.contactPhone : null,
        writeup: value.writeup ? value.writeup : null,
        userRole: "OWNER",
      };
      this.props.addBusinessExtraInfo(this.props.businessId, request);
    } else if (_formName === "step3") {
      this.setState({
        step3: value,
      });
      const request = {
        addressLine1: value.addressLine1 ? value.addressLine1 : null,
        addressLine2: value.addressLine2 ? value.addressLine2 : null,
        area: value.area ? value.area : null,
        city: value.city ? value.city : null,
        province: value.province ? value.province : null,
        postalCode: value.postalCode ? value.postalCode : null,
        userRole: "OWNER",
      };
      this.props.addBusinessAddress(this.props.businessId, request);
    } else if (_formName === "step4") {
      this.setState({
        step4: value,
      });
      const data = lodash.cloneDeep(value);
      const request = {
        monHours: data["startTimeMon"] + "-" + data["endTimeMon"],
        tuesHours: data["startTimeTue"] + "-" + data["endTimeTue"],
        wedHours: data["startTimeWed"] + "-" + data["endTimeWed"],
        thursHours: data["startTimeThu"] + "-" + data["endTimeThu"],
        friHours: data["startTimeFri"] + "-" + data["endTimeFri"],
        satHours: data["startTimeSat"] + "-" + data["endTimeSat"],
        sunHours: data["startTimeSun"] + "-" + data["endTimeSun"],
        userRole: "OWNER",
      };
      this.props.addBusinessHour(this.props.businessId, request);
    } else if (_formName === "step5") {
      this.setState({
        step5: value,
      });
      this.props.addBusinessSettings(this.props.businessId, {
        ...value,
        userRole: "OWNER",
      });
    } else if (_formName === "step6") {
      this.setState({
        step5: value,
      });
      const data = lodash.cloneDeep(value);
      let holiday = "";
      data.members.forEach((element: any) => {
        holiday +=
          moment(element.date).format("DD/MM/YYYY") +
          "," +
          moment(element.date).format("DD/MM/YYYY");
      });
      const request = {
        holiday: holiday,
        userRole: "OWNER",
      };
      this.props.addBusinessHolidays(this.props.businessId, request);
    }
  };

  formFinished = (e: any) => {
    e.preventDefault();
    const formRequest = {
      ...this.state.step1,
      ...this.state.step2,
      ...this.state.step3,
      ...this.state.step4,
    };
  };

  previousPage = (e: any) => {
    e.preventDefault();
    if (this.state.page > 2) {
      this.setState({ page: this.state.page - 1 });
    }
  };
  currentStyle = (page: number, count: number) => {
    return page !== count
      ? {
          display: "none",
        }
      : {};
  };
  handleModelClose = () => {
    this.props.businessResetResponse();
  };
  render() {
    const { page } = this.state;
    return (
      <>
        {page !== 7 && page !== 8 && (
          <WizardDiv className="clearfix">
            {/* <RegistrationStep page={page} /> */}
            {page === 1 && !this.props.businessId && (
              <RegistrationForm
                initialValue={this.state.step1}
                handleSubmit={(value: any) => this.handleSubmit(value, "step1")}
                formname="step1"
                sectionTitle="Key Information"
                formContent={RegistrationFromFields.formFieldsStep1}
              />
            )}
            {page === 2 && (
              <RegistrationForm
                initialValue={this.state.step4}
                handleSubmit={(value: any) => this.handleSubmit(value, "step2")}
                formname="step2"
                sectionTitle="Business Information"
                formContent={RegistrationFromFields.formFieldsStep4}
              />
            )}
            {page === 3 && (
              <RegistrationForm
                initialValue={this.state.step2}
                handleSubmit={(value: any) => this.handleSubmit(value, "step3")}
                formname="step3"
                sectionTitle="Address Information"
                formContent={RegistrationFromFields.formFieldsStep2}
              />
            )}
            {page === 4 && (
              <RegistrationForm
                initialValue={this.state.step3}
                handleSubmit={(value: any) => this.handleSubmit(value, "step4")}
                formname="step4"
                sectionTitle="Business Working Hours"
                formContent={RegistrationFromFields.formFieldsStep3}
              />
            )}
            {page === 5 && (
              <RegistrationForm
                initialValue={this.state.step5}
                handleSubmit={(value: any) => this.handleSubmit(value, "step5")}
                formname="step5"
                sectionTitle="Business Settings"
                formContent={RegistrationFromFields.formFieldsStep5}
              />
            )}
            {page === 6 && (
              <RegistrationForm
                initialValue={this.state.step6}
                handleSubmit={(value: any) => this.handleSubmit(value, "step6")}
                formname="step6"
                sectionTitle="Business Holidays"
                formContent={RegistrationFromFields.formFieldsStep6}
                dynamicForm={true}
              />
            )}
            <Hr />
            {this.state.loader && <LoaderBox className="loader" />}
            <div className="actions clearfix">
              <ul role="menu" aria-label="Pagination">
                <li
                  className={page === 1 || page === 2 ? "disabled" : ""}
                  aria-disabled={page === 1 || page === 2 ? "true" : "false"}
                >
                  <a href={void 0} onClick={this.previousPage} role="menuitem">
                    Back
                  </a>
                </li>
                {page !== 8 && (
                  <li aria-hidden="false" aria-disabled="false">
                    <a href={void 0} onClick={this.nextPage} role="menuitem">
                      Next
                    </a>
                  </li>
                )}
                {page === 8 && (
                  <li>
                    <a href={void 0} onClick={this.nextPage} role="menuitem">
                      Finish
                    </a>
                  </li>
                )}
              </ul>
              {page === 1 &&
                this.props.addBusinessResponse &&
                this.props.addBusinessResponse.errors && (
                  <p className="error">
                    {this.props.addBusinessResponse.errors}
                  </p>
                )}
            </div>
          </WizardDiv>
        )}
        {(page === 7 || page === 8) && (
          <form>
            <TableDiv>
              {page === 7 && <AddServiceContainer step={page} />}
              {page === 8 && <AddStaffContainer />}
              {(page === 7 || page === 8) && (
                <div>
                  <div className="form-row">
                    <div className="form-col">
                      <a
                        href={void 0}
                        onClick={this.previousPage}
                        className="abtn"
                      >
                        Back
                      </a>
                    </div>
                    <div className="form-col"></div>
                    <div className="form-col"></div>

                    {page !== 8 && (
                      <div className="form-col">
                        <a
                          href={void 0}
                          onClick={this.nextPage}
                          className="abtn"
                        >
                          Next
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TableDiv>
          </form>
        )}
        {this.props.addBusinessErrorResponse !== null && (
          <ModalComponent
            title={"Error Details"}
            showModel={this.state.modelShow}
            handleSubmit={null}
            handleClose={this.handleModelClose}
            isErrorHandler={true}
          >
            <Errorhandler error={this.props.addBusinessErrorResponse} />
          </ModalComponent>
        )}
      </>
    );
  }
}
const mapStateToProps = (state: any) => ({
  assetInfo: state && state.assetInfo,
  businessId: state.addBusiness && state.addBusiness.businessId,
  addBusinessResponse:
    state.addBusiness && state.addBusiness.addBusinessResponse,
  addBusinessErrorResponse:
    state.addBusiness && state.addBusiness.addBusinessErrorResponse,
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  addBusiness: (data: any) => dispatch(addBusiness(data)),
  addBusinessAddress: (id: number, data: any) =>
    dispatch(addBusinessAddress(id, data)),
  addBusinessHour: (id: number, data: object) =>
    dispatch(addBusinessHour(id, data)),
  addBusinessExtraInfo: (id: number, data: object) =>
    dispatch(addBusinessExtraInfo(id, data)),
  businessResetResponse: () => dispatch(businessResetResponse()),
  addBusinessSettings: (id: number, data: object) =>
    dispatch(addBusinessSettings(id, data)),
  addBusinessHolidays: (id: number, data: object) =>
    dispatch(addBusinessHolidays(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRegistrationContainer);
