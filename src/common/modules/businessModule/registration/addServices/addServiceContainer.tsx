import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ModalComponent from "../../../../components/modelComponent";
import List from "../../../../components/List/list";
import AddServiceForm from "../../../../components/Form/generalForm";
import ServiceUtil from "./addServiceUtils";
import { formValueSelector, submit } from "redux-form";
import { UserProvider } from "./contextApi";
import {
  addBusinessServices,
  deleteBusinessServices,
  getBusinessServices,
} from "../../action/addBusinessAction";
import NoResultFound from "../../../../components/List/noResultFound";
interface IAddServiceProps {
  readonly step: number;
  readonly serviceCategory: any;
  readonly submitForm: any;
  readonly addBusinessServices: any;
  readonly businessId: any;
  readonly deleteBusinessServices: any;
  readonly getBusinessServices: any;
  readonly serviceList: any;
}

const TableDiv = styled.div`
  height: 600px;
  padding-top: 40px;
`;
const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  background-color: #eee;
`;
const A = styled.a`
  color: #337ab7;
  cursor: pointer;
`;

class AddServiceContainer extends React.Component<IAddServiceProps, any> {
  state = {
    step: this.props.step,
    modelShow: false,
    listTemplates: {
      thead: ["S.NO.", "NAME", "DURATION", "PRICE"],
      tbody: ["serialNumber", "serviceName", "duration", "price"],
      actionItems: {
        edit: true,
        delete: true,
      },
    },
  };

  componentDidMount() {
    this.props.getBusinessServices(this.props.businessId);
  }
  editHandler = () => {};
  deleteHandler = (row: any) => {
    this.props.deleteBusinessServices(
      { serviceName: row.serviceName, userRole: "OWNER" },
      this.props.businessId
    );
  };
  handleModelShow = () => {
    this.setState({ modelShow: true });
  };
  handleClose = () => {
    this.setState({ modelShow: false });
  };
  handleSubmit = () => {
    this.props.submitForm("addServices");
  };
  handleFormSubmit = (value: any) => {
    // console.log(value);
    const request = {
      name: value.name,
      slotsDefinition: value.slotsDefinition,
      price: value.price,
      currency: "Rupya",
      ifDoubleTime: "N",
      ifTicketBasedService: "N",
      maxTicketCount: "",
      maxTicketsAllowedPerBooking: "",
      category: value.category,
      topCategory: "",
    };
    if (value.category === 2) {
      request.ifDoubleTime =
        value.initialDuration +
        ";" +
        value.restPeriod +
        ";" +
        value.remianingDuration;
    }
    if (value.category === 3) {
      request.ifTicketBasedService = "Y";
      request.maxTicketCount = value.maxTicketCount;
      request.maxTicketsAllowedPerBooking = value.maxTicketsAllowedPerBooking;
    }
    this.props.addBusinessServices(this.props.businessId, {
      ...request,
      userRole: "OWNER",
    });
  };
  render() {
    return (
      <>
        <h3 className="stitle">Service OFFERED</h3>
        <List
          listTemplates={this.state.listTemplates}
          listData={this.props.serviceList}
          editHandler={this.editHandler}
          deleteHandler={this.deleteHandler}
        />

        <NoResultFound list={this.props.serviceList} />
        <button
          type="button"
          className="button button--medium button--square button--search"
          data-toggle="modal"
          onClick={this.handleModelShow}
        >
          Add Service
        </button>
        <Hr />
        {this.state.modelShow && (
          <ModalComponent
            title={"Service Details"}
            showModel={this.state.modelShow}
            handleSubmit={this.handleSubmit}
            handleClose={this.handleClose}
          >
            <UserProvider value={{ category: this.props.serviceCategory }}>
              <AddServiceForm
                initialValue={{ serviceCategory: "1" }}
                handleSubmit={this.handleFormSubmit}
                formname="addServices"
                formContent={ServiceUtil.addServiceForm}
                formValue={{ serviceCategory: this.props.serviceCategory }}
              />
            </UserProvider>
          </ModalComponent>
        )}
      </>
    );
  }
}
const selector = formValueSelector("addServices");

const mapStateToProps = (state: any) => ({
  assetInfo: state && state.assetInfo,
  businessId: state.addBusiness && state.addBusiness.businessId,
  serviceList: state.addBusiness && state.addBusiness.serviceList,
  serviceCategory: selector(state, "category"),
});
const mapDispatchToprops = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  getBusinessServices: (id: number) => dispatch(getBusinessServices(id)),
  addBusinessServices: (id: number, data: object) =>
    dispatch(addBusinessServices(id, data)),
  deleteBusinessServices: (id: number, data: object) =>
    dispatch(deleteBusinessServices(id, data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToprops
)(AddServiceContainer);
