import React from "react";
import { Field } from "redux-form";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorUtils from "../Form/errorUtils";
const DatePickerStyle = styled(DatePicker)``;
const Error = styled.div`
  color: #ff0000;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  min-height: 14px;
`;
const TextField = (props: any) => {
  const { hideValidation, touched, error, name } = props;
  const checkValidation = (
    hideValidation: boolean,
    touched: string,
    error: any,
    name: string
  ) => {
    if (hideValidation) {
      return " ";
    }
    return touched && error ? <Error id={`${name}Err`}>{error}</Error> : null;
  };
  return (
    <>
      {props.children}
      {checkValidation(hideValidation, touched, error, name)}
    </>
  );
};
export const Input = ({
  input,
  label,
  required,
  selected,
  dateFormat,
  placeholder,
  meta: { touched, error, warning },
  isClearable,
  onChange,
  minDate,
  maxDate,
}: {
  input: any;
  label: any;
  required: any;
  type: string;
  selected: any;
  dateFormat: any;
  placeholder: any;
  meta: { touched: any; error: any; warning: any };
  isClearable: any;
  onChange: any;
  minDate: any;
  maxDate: any;
}) => (
  <TextField
    name={input.name}
    htmlFor={input.name}
    label={label}
    error={error}
    touched={touched}
    warning={warning}
    required={required}
  >
    <DatePickerStyle
      {...input}
      className="form-control"
      name={input.name}
      id={input.name}
      selected={selected}
      dateFormat={dateFormat}
      placeholderText={placeholder}
      isClearable={isClearable}
      onChange={input.onChange}
      minDate={minDate}
      maxDate={maxDate}
      def
    />
  </TextField>
);
/*const isRequired = (props: any) => {
  return (
    props.validate &&
    props.validate.filter((row: any) => row == ErrorUtils.Required).length > 0
  );
};*/
class InputDateField extends React.Component<any> {
  state = {
    startDate: "",
  };
  handleChange = (date: any) => {
    this.setState({
      startDate: date,
    });
  };//{isRequired(this.props) && "*"}
  render() {
    return (
      <div
        className={this.props.FormClass ? this.props.FormClass : "form-col"}
        id={this.props.name}
      >
        <label htmlFor="">
          {this.props.label} 
        </label>
        <div
          className={
            this.props.formHolder ? this.props.formHolder : "form-holder"
          }
        >
          <i className={"zmdi zmdi-calendar"} />
          <Field
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            validate={this.props.validate}
            component={Input}
            selected={this.state.startDate}
            onChange={this.handleChange}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
          />
        </div>
      </div>
    );
  }
}

export default InputDateField;
