import React, { useContext } from "react";
import UserContext from "../../modules/businessModule/registration/addServices/contextApi";
import { FieldArray } from "redux-form";
import DynamicFormBuilder from "./dynamicFormBuilder";

const getDependentField = (fields: any, value: any, index: any) => {
  return fields.dependent.map((row: any) => {
    if (value[row.name] && row.value.includes(value[row.name])) {
      return <fields.component key={index} {...fields.props} />;
    }
  });
};
const dynamicField = (
  formContent: any,
  addButtonText: any,
  _disableAdd: any
) => {
  return (
    <FieldArray
      name="members"
      component={DynamicFormBuilder}
      formFild={formContent}
      addButtonText={addButtonText}
      removeButtonText={"Remove"}
    />
  );
};

const FormBuilder = (props: any) => {
  const user = useContext(UserContext);
  //  console.log(user);
  return (
    <>
      {props.formFild.map((row: any, key: any) => (
        <div className={row.classname ? row.classname : "form-row"} key={key}>
          {row.title && (
            <div className="col-md-2">
              <h4 className="form-group__title">{row.title}</h4>
            </div>
          )}
          {!!row.dynamicField
            ? dynamicField([row], row.addButtonText, row.disableAdd)
            : row.field.map((fieldsInfo: any, key: any) => (
                <>
                  {fieldsInfo.isDependent ? (
                    getDependentField(fieldsInfo, user, key)
                  ) : (
                    <fieldsInfo.component key={key} {...fieldsInfo.props} />
                  )}
                </>
              ))}
          {}
        </div>
      ))}
    </>
  );
};
export default FormBuilder;
