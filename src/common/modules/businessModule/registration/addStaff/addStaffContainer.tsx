import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ModalComponent from "../../../../components/modelComponent";
import List from "../../../../components/List/list";
import AddServiceStaffForm from "../../../../components/Form/generalForm";
import AddStaffUtil from "./addStaffUtils";
import { submit } from "redux-form";
import {
  addBusinessStaff,
  deleteBusinessStaff,
  getBusinessStaff,
} from "../../action/addBusinessAction";
import NoResultFound from "../../../../components/List/noResultFound";

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

class AddStaffContainer extends React.Component<any> {
  state = {
    step: this.props.step,
    modelShow: false,
    listTemplates: {
      thead: ["S.NO.", "NAME", "ROLE"],
      tbody: ["userId", "name", "role"],
      actionItems: {
        edit: true,
        delete: true,
      },
    },
  };
  componentDidMount() {
    this.props.getBusinessStaff(this.props.businessId);
  }
  editHandler = () => {};
  deleteHandler = (row: any) => {
    this.props.deleteBusinessStaff(
      { staffUserId: row.userId, userRole: "OWNER" },
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
    this.props.submitForm("addStaff");
  };
  handleFormSubmit = (value: any) => {
    // console.log(value);
    this.props.addBusinessStaff(this.props.businessId, {
      ...value,
      userRole: "OWNER",
    });
  };

  render() {
    return (
      <>
        <h3 className="stitle">STAFF INFORMATION</h3>
        <List
          listTemplates={this.state.listTemplates}
          listData={this.props.staffList}
          editHandler={this.editHandler}
          deleteHandler={this.deleteHandler}
        />
        <NoResultFound list={this.props.staffList} />
        <button
          type="button"
          className="button button--medium button--square button--search"
          data-toggle="modal"
          onClick={this.handleModelShow}
        >
          Add Staff
        </button>
        <Hr />
        {this.state.modelShow && (
          <ModalComponent
            title={"Staff Details"}
            showModel={this.state.modelShow}
            handleSubmit={this.handleSubmit}
            handleClose={this.handleClose}
          >
            <AddServiceStaffForm
              initialValue={{}}
              handleSubmit={this.handleFormSubmit}
              formname="addStaff"
              formContent={AddStaffUtil}
            />
          </ModalComponent>
        )}
      </>
    );
  }
}
const mapStateToProps = (state: any) => ({
  assetInfo: state && state.assetInfo,
  businessId: state.addBusiness && state.addBusiness.businessId,
  staffList: state.addBusiness && state.addBusiness.staffList,
  addBusinessResponse:
    state.addBusiness && state.addBusiness.addBusinessResponse,
});
const mapDispatchToprops = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  getBusinessStaff: (id: number) => dispatch(getBusinessStaff(id)),
  addBusinessStaff: (id: number, data: object) =>
    dispatch(addBusinessStaff(id, data)),
  deleteBusinessStaff: (id: number, data: object) =>
    dispatch(deleteBusinessStaff(id, data)),
});
export default connect(mapStateToProps, mapDispatchToprops)(AddStaffContainer);
