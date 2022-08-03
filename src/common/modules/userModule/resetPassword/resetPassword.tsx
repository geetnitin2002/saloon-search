import React from "react";
import loginModule from "../loginUtils";
import ResetPasswordFlow from "../../businessModule/registration/registrationForm";
import styled from "styled-components";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { withRouter } from "react-router-dom";
import lodash from "lodash";
import {
  verifyEmail,
  verifySecurityQuestion,
  resetPassword
} from "../action/userAction";
const LoginWrapper = styled.div`
  width: 500px;
  margin: auto;
  padding: 7px;
`;
interface Ibuttonprimary {
  readonly primary: boolean;
}

const Button = styled.button`
  background: ${(props: Ibuttonprimary) =>
    props.primary ? "#01aa11" : "white"};
  color: ${(props: Ibuttonprimary) => (props.primary ? "white" : "#01aa11")};
  background: #123145;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #01aa11;
  border-radius: 3px;
  padding: 10px;
  float: -1px;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  cursor: pointer;
`;
class ResetPassword extends React.Component<any> {
  state = {
    currentStep: 1
  };
  componentDidUpdate(prevProps: any) {
    if (
      this.props.resetPasswordResponse &&
      this.props.resetPasswordResponse !== prevProps.resetPasswordResponse &&
      !lodash.isEqual(
        this.props.resetPasswordResponse,
        prevProps.resetPasswordResponse
      )
    ) {
      this.setState({ currentStep: this.props.resetPasswordResponse.step });
    }
    if (
      this.props.passwordResetSuccess &&
      this.props.passwordResetSuccess !== prevProps.passwordResetSuccess
    ) {
      this.props.history.push("/login");
    }
  }
  handleSubmit = (value: any) => {
    if (this.state.currentStep === 1) {
      this.props.verifyEmail(value, this.state.currentStep);
    } else if (this.state.currentStep === 2) {
      let req =
        value.securityQuestion1 +
        ":" +
        value.answer1 +
        "," +
        value.securityQuestion2 +
        ":" +
        value.answer2 +
        "," +
        value.securityQuestion3 +
        ":" +
        value.answer3;

      this.props.verifySecurityQuestion(
        req,
        this.state.currentStep,
        this.props.resetPasswordResponse.id
      );
    } else {
      if (this.state.currentStep === 3) {
        this.props.resetPassword(value, this.state.currentStep);
      }
    }
  };
  handleSubmitForm = () => {
    this.props.submitForm(this.getFormName(this.state.currentStep));
  };
  getButtonText = (step: number) => {
    if (step === 1) {
      return "Verify email";
    } else if (step === 2) {
      return "Verify security question";
    } else {
      return "Reset password";
    }
  };
  getFormName = (step: number) => {
    if (step === 1) {
      return "VerifyEmail";
    } else if (step === 2) {
      return "verifySecurityQuestion";
    } else {
      return "resetPassword";
    }
  };
  render() {
    const loginStyle = {
      minHeight: "0px",
      top: "150px"
    };
    return (
      <LoginWrapper>
        <div
          className="wizard clearfix"
          style={this.state.currentStep !== 2 ? loginStyle : {}}
        >
          {this.state.currentStep === 1 && (
            <ResetPasswordFlow
              initialValue={{}}
              handleSubmit={this.handleSubmit}
              formname="VerifyEmail"
              sectionTitle="Verify Email"
              formContent={loginModule.verifyEmail}
            />
          )}
          {this.state.currentStep === 2 && (
            <ResetPasswordFlow
              initialValue={{
                securityQuestion2: "1",
                securityQuestion1: "1",
                securityQuestion3: "1"
              }}
              handleSubmit={this.handleSubmit}
              formname="verifySecurityQuestion"
              sectionTitle="Verify Security Question"
              formContent={loginModule.verifySecurityQuestion}
            />
          )}
          {this.state.currentStep === 3 && (
            <ResetPasswordFlow
              initialValue={{}}
              handleSubmit={this.handleSubmit}
              formname="resetPassword"
              sectionTitle="Reset password"
              formContent={loginModule.resetPassword}
            />
          )}
          <Button primary={true} onClick={this.handleSubmitForm}>
            {this.getButtonText(this.state.currentStep)}
          </Button>
        </div>
      </LoginWrapper>
    );
  }
}
const mapStateToProps = (state: any) => ({
  resetPasswordResponse: state.user && state.user.resetPasswordResponse,
  passwordResetSuccess: state.user && state.user.passwordResetSuccess
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  verifyEmail: (data: Object, step: number) =>
    dispatch(verifyEmail(data, step)),
  verifySecurityQuestion: (data: Object, step: number, id: number) =>
    dispatch(verifySecurityQuestion(data, step, id)),
  resetPassword: (data: object, step: number) =>
    dispatch(resetPassword(data, step))
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
);
