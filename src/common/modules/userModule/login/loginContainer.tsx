import React from "react";
import loginModule from "../loginUtils";
import LoginForm from "../../businessModule/registration/registrationForm";
import styled from "styled-components";
import { connect } from "react-redux";
import { submit } from "redux-form";
import { userLogin } from "../action/userAction";
import { Link } from "react-router-dom";
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
const ButtonLink = styled.a`
  cursor: pointer;
  position: relative;
  right: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: row-reverse;
  margin: 11px;
  color: #01aa11;
`;
class LoginContainer extends React.Component<any> {
  handleSubmit = (value: any) => {
    this.props.userLogin(value);
  };
  handleSubmitForm = () => {
    this.props.submitForm("login");
  };
  render() {
    const loginStyle = {
      minHeight: "0px",
      top: "150px"
    };
    return (
      <LoginWrapper>
        <div className="wizard clearfix" style={loginStyle}>
          <LoginForm
            initialValue={{}}
            handleSubmit={this.handleSubmit}
            formname="login"
            sectionTitle="User Login"
            formContent={loginModule.Login}
          />
          <Button primary={true} onClick={this.handleSubmitForm}>
            Login
          </Button>
          <Link to="/reset-password">
            <ButtonLink> forgot password ?</ButtonLink>
          </Link>
        </div>
      </LoginWrapper>
    );
  }
}
const mapStateToProps = (state: any) => ({
  loginResponse: state.user && state.user.loginResponse
});
const mapDispatchToProps = (dispatch: any) => ({
  submitForm: (formname: string) => dispatch(submit(formname)),
  userLogin: (data: Object) => dispatch(userLogin(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
