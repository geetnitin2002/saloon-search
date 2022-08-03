import React from "react";
import ChooseBookingCriteraForm from "../../../components/Form/generalForm";
import DatewiseAvailSingleday from "./datewiseAvailSingleday";
import searchForm from "./chooseBookingCriteraUtils";
import { connect } from "react-redux";
import { submit, formValueSelector } from "redux-form";
import {
  getWeekDetails,
  getStaffDetails,
  getServiceDetails,
  getBusinessWorkingRange,
  getStaffAvailability,
  resetbookAppointment,
  getSkillStaff,
} from "./BookingActions";
import { UserProvider } from "../../businessModule/registration/addServices/contextApi";
import styled from "styled-components";
import Crossicon from "TARGET_BUILD/images/uploads/cross.png";
import { permittedServiceKinds, staffName } from "../../../api/businessApi";
import ModalComponent from "../../../components/modelComponent";
import Errorhandler from "../../../components/errorHandlerComponent";
import HeaderLogo from "TARGET_BUILD/images/uploads/background-image.png";
import SalonLogo from "TARGET_BUILD/images/uploads/logo.jpg";
import BUSINESS_APP from "./../../../../apiConfig";
const mystyle = {
  backgroundColor: "white",
  width: "450px",
};
const Wrapper = styled.section`
  background-position-y: 0px;
  padding-top: 100px;
  background-image: url(${HeaderLogo});
  background-repeat: repeat;
  min-height: 81vh;
  padding-bottom: 22px;
`;
const Button = styled.button`
  position: fixed;
  display: flex;
  /* flex-direction: row-reverse; */
  top: 15px;
  right: 270px;
  // float: left;
  img {
    vertical-align: middle;
    background: no-repeat green;
    width: 10px;
  }
`;
class ChooseBookingCritera extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      formValue: {
        serviceDipalyName:
          this.props.serviceDetails.name +
          " ( " +
          this.props.serviceDetails.priceAndDuration +
          " ) ",
        serviceName: this.props.serviceDetails.name,
        staff: 0,

        serviceServiceDisplayName1: "",
        //  serviceServiceName1:
        //  this.props.serviceDetails.name +
        //  " ( " +
        //  this.props.serviceDetails.priceAndDuration +
        //  " ) ",
        //  serviceServiceName_1: this.props.serviceDetails.name,
        //  staff2: 1,
      },
      dataWiseSingleDayRecord: null,
      permitedServiceKind: null,
      error: null,
      showDataWiseScreen: false,
      currentStaff: "0",
      serviceList: [],
    };
  }

  componentDidMount() {
    permittedServiceKinds(this.props.businessId, {
      service: this.props.serviceDetails.name,
    }).then((res: any) => {
      if (!res.error && !res.errors) {
        this.setState({ permitedServiceKind: res.data });
      }
    });
    this.props.getWeekDetails(this.props.businessId);
    this.props.getStaffDetails(this.props.businessId, {
      services: [this.props.serviceDetails.name],
    });
    this.props.getServiceDetails(this.props.businessId);
    this.props.getBusinessWorkingRange(this.props.businessId);
  }
  componentDidUpdate(PrevProps: any) {
    if (
      this.props.staffAvailablityRes &&
      !this.props.staffAvailablityRes.errors &&
      this.props.staffAvailablityRes !== PrevProps.staffAvailablityRes
    ) {
    }
  }
  closeTicket = (close: any) => {
    this.props.closeTicketBooking(close);
    this.props.resetbookAppointment();
  };


  buttonComponent = () => {
    return (
      <div className="col-md-2" style={{ display: "flex" }}>
        <button type="button" className="next2 btn">
          <a href={void 0} onClick={this.closeTicket}>Return</a>
          </button>
      </div>
    );
  };



  componentWillUnmount() {}
  handleSubmit = (value: any) => {
      // console.log(value);    

     var service2DisplayName = [...this.props.serviceList].find((val: any, index: any) => { return val.name === value.serviceServiceName1 });
      console.log("service2DisplayName : "+service2DisplayName);
      if(service2DisplayName != null )
      {
        service2DisplayName = service2DisplayName.name +
            " ( " +
            service2DisplayName.priceAndDuration +
            " ) ";
      }

    console.log(service2DisplayName);
    //value.serviceServiceName1 = service2DisplayName;

    const obj = Object.assign({}, value);
    const request = {
      userIdOfStaff: Number(value.staff),
      services:
        value.serviceName &&
        value.serviceServiceName1 &&
        value.serviceName !== value.serviceServiceName1.split("(")[0]
          ? [value.serviceName, value.serviceServiceName1]
          : [value.serviceName],
      ifPartnerService: value.serviceserviceFor === "Y" ? "Y" : "N",
      uiDateString: value.week,
      clockTimeFrom: value.from,
      clockTimeTo: value.to,
    };
    if (
      value.serviceServiceName1 &&
      value.serviceServiceName1 == value.serviceName &&
      value.serviceserviceFor === "N"
    ) {
      this.setState({ error: "Service can't be same for self" });
    } else {
      if (!this.state.showDataWiseScreen) {
        this.setState({ showDataWiseScreen: true });
      }
      this.props.getStaffAvailability(this.props.businessId, request);
      if (
        value.serviceName &&
        value.serviceServiceName1 &&
        value.serviceName === value.serviceServiceName1.split("(")[0]
      ) {
        obj.serviceServiceName1 = "";
      }
      if (!this.showAddServiceButton()) {
        obj.serviceServiceName1 = "";
      }

      if (obj.serviceServiceName1 != "") {
        obj.serviceServiceName1 = service2DisplayName;
      }
      this.setState({ dataWiseSingleDayRecord: obj });
    }
  };

  getDropdownList = (
    list: any = [],
    params: any,
    id: any,
    field: any,
    state: any = true
  ) => {
    let options = [];
    const fileds = this.state.formValue;
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (typeof params == "string") {
          options.push({ label: list[i][params], value: list[i][id] });
        } else if (params) {
          options.push({
            label: list[i][params[0]] + " ( " + list[i][params[1]] + " ) ",
            value: list[i][id],
          });
        } else {
          options.push({ label: list[i], value: list[i] });
        }
      }
      if (typeof params == "string") {
        fileds[field] = list[0][id];
      } else if (params) {
        fileds[field] = list[0][id];
      } else {
        fileds[field] = field == "to" ? list[list.length - 1] : list[0];
      }
      if (state) {
        this.setState({ formValue: fileds });
      } else {
        fileds[field] = "";
        this.setState({ formValue: fileds });
      }
    }

    return options;
  };

  submitFrom = () => {
    this.props.submitForm("ChooseBookingCriteraForm");
  };
  getServiceForList = (list: any) => {
    if (
      this.state.permitedServiceKind &&
      this.state.permitedServiceKind.PSSPermitted
    ) {
      return [
        // { value: "N", label: "For Self" },
        // { value: "Y", label: "For Friend" },
        { value: "N", label: "For Booker" },
        { value: "Y", label: "Partner / Friend (Concurrent)" },
      ];
    } else {
      // return [{ value: "N", label: "For Self" }];
      return [{ value: "N", label: "For Booker" }];
    }
  };
  showAddServiceButton = () => {
    return (
      this.state.permitedServiceKind &&
      this.state.permitedServiceKind.TRSPermitted
    );
  };
  handleModelClose = () => {
    this.setState({ error: null });
  };
  backButton = () => {
    this.setState({ showDataWiseScreen: false });
  };
  saffRealatedService = (id: any) => {
    staffName(id).then((res: any) => {
      if (res.data) {
        const serviceList: any = [];
        (res.data.services || []).forEach((element: any) => {
          serviceList.push({ label: element, value: element });
        });
        this.setState({ serviceList });
      }
    });
  };
  formChange = (value: any) => {
    if (value.staff !== this.state.currentStaff) {
      this.setState({ currentStaff: value.staff });
      if (value.staff !== "0") {
        this.saffRealatedService(value.staff);
      }
    }
  };
  getServiceServiceName1 = () => {
    const value =
      // this.state.currentStaff == "0" || this.props.serviceFor === "Y"
      //   ? 
        this.getDropdownList(
            [...this.props.serviceList],
            ["name", "priceAndDuration"],
            "name",
            "serviceServiceName",
            false
          )
        //: this.state.serviceList;
    return [...[{ label: "", vlaue: "" }], ...value];
  };

  render() {
    const form: any = searchForm;
    form[1].field[0].props.options = this.getServiceForList(
      this.props.staffList
    );
    form[1].disableAdd = !this.showAddServiceButton();
    return (
      <>
      <Wrapper className="create-listing">
        <section className="create-listing" 
          hidden={this.props.staffAvailablityRes && this.state.showDataWiseScreen}
        >
          {/* <Button
            className="dismiss-button"
            aria-label="Dismiss"
            onClick={this.closeTicket}
          >
            <img src={Crossicon} alt="Salon" />
          </Button> */}
          
          <div className="wrapper" id="mview" style={mystyle}>
            <br />
            <br />
            {/* <h3>SELECT STAFFER</h3> */}
            <UserProvider
              value={{
                serviceServiceName1: this.getServiceServiceName1(),
                staff: this.getDropdownList(
                  [
                    ...[{ userId: "0", staffName
                    // : "Any Staff" }],
                    : "With Any Staff Member" }],
                    ...(this.props.staffList ? this.props.staffList : []),
                  ],
                  "staffName",
                  "userId",
                  "staff"
                ),
                week: this.getDropdownList(
                  this.props.weekList,
                  null,
                  null,
                  "week"
                ),
                from: this.getDropdownList(
                 this.props.businessWorkingHourSlots,
                  null,
                  null,
                  "from"
                ),
                to: this.getDropdownList(
                  this.props.businessWorkingHourSlots,
                  null,
                  null,
                  "to"
                ),
              }}
            >
              { this.props.businessWorkingHourSlots && 
              <ChooseBookingCriteraForm
                initialValue={this.state.formValue}
                handleOnChange={this.formChange}
                handleSubmit={this.handleSubmit}
                formname="ChooseBookingCriteraForm"
                formContent={form}
              />}
            </UserProvider><div className="form-row">
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
        {this.props.staffAvailablityRes && this.state.showDataWiseScreen && (
          <DatewiseAvailSingleday
            dataWiseSingleDayRecord={this.state.dataWiseSingleDayRecord}
            staffList={this.props.staffList}
            weekList={this.props.weekList}
            serviceList={this.props.serviceList}
            staffAvailablityRes={this.props.staffAvailablityRes}
            getStaffAvailability={this.props.getStaffAvailability}
            businessWorkingHourSlots={this.props.businessWorkingHourSlots}
            submitData={this.handleSubmit}
            businessId={this.props.businessId}
            serviceDetails={this.props.serviceDetails}
            closeTicketBooking={this.props.closeTicketBooking}
            permitedServiceKind={this.state.permitedServiceKind}
            backButtonClick={this.backButton}
          />
        )}
        {this.props.staffAvailablityRes &&
          this.props.staffAvailablityRes.errors && (
            <p className="error">{this.props.staffAvailablityRes.errors}</p>
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
      </Wrapper>
      </>
    );
  }
}
const selector = formValueSelector("ChooseBookingCriteraForm");
const mapStateToProps = (state: any) => ({
  staffList: state.addBusiness && state.businessDetails.skillStaffList,
  serviceList: state.addBusiness && state.addBusiness.serviceList,
  weekList: state.addBusiness && state.addBusiness.weekRangeList,
  businessWorkingHourSlots:
    state.addBusiness && state.addBusiness.businessWorkingHourSlots,
  staffAvailablityRes:
    state.businessDetails && state.businessDetails.staffAvailablityRes,
  currentStaff: selector(state, "staff"),
  serviceFor: selector(state, "serviceserviceFor"),
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  getWeekDetails: (id: any) => dispatch(getWeekDetails(id)),
  getBusinessWorkingRange: (id: any) => dispatch(getBusinessWorkingRange(id)),
  getStaffDetails: (id: any, body: any) => dispatch(getSkillStaff(id, body)),
  getServiceDetails: (id: any) => dispatch(getServiceDetails(id)),
  getStaffAvailability: (id: any, data: any) =>
    dispatch(getStaffAvailability(id, data)),
  resetbookAppointment: () => dispatch(resetbookAppointment()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseBookingCritera);
