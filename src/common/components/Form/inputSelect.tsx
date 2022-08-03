import React, { useContext } from "react";
import { Field } from "redux-form";
import styled from "styled-components";
import UserContext from "../../modules/businessModule/registration/addServices/contextApi";
import ErrorUtils from "../Form/errorUtils";
const InputStyle = styled.select``;
const Error = styled.div`
  color: #ff0000;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  min-height: 14px;
`;
const Select = (props: any) => {
  const user: any = useContext(UserContext);
  const checkValue = user && user[props.input.name];
  const options = checkValue ? checkValue : props.options;
  return (
    <InputStyle className="form-control" {...props.input}>
      {options.map((row: any, key: any) => (
        <option key={key} className="option" value={row.value || row.timeslot}>
          {row.label || row.timeslot}
        </option>
      ))}
    </InputStyle>
  );
};

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

export const TextComponent = (props: any) => {
  const {
    input,
    label,
    required,
    meta: { touched, error, warning },
  } = props;

  return (
    <TextField
      name={input.name}
      htmlFor={input.name}
      label={label}
      error={error}
      touched={touched}
      warning={warning}
      required={required}
      showSuccess={props.showSuccess}
      successMessage={props.successMessage}
    >
      <Select {...props} />
    </TextField>
  );
};
/*const isRequired = (props: any) => {
  return (
    props.validate &&
    props.validate.filter((row: any) => row == ErrorUtils.Required).length > 0
  );
}; *///{isRequired(props) && "*"}
const InputSelect = (props: any) => {
  return (
    <div
      className={props.FormClass ? props.FormClass : "col-md-5"}
      id={props.name}
    >
      {props.label && (
        <label htmlFor="">
          {props.label} 
        </label>
      )}
      <div className={props.formHolder ? props.formHolder : "form-holder"}>
        {props.iClass && (
          <i className={props.iClass ? props.iClass : "zmdi zmdi-dns"} />
        )}
        <Field
          type={"select"}
          name={props.name}
          defaultValue={props.value}
          placeholder={props.placeholder}
          validate={props.validate}
          component={TextComponent}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputSelect;
