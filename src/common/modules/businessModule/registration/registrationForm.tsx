import React from "react";
import Form from "../../../components/Form/form";
import FormBuilder from "../../../components/Form/formBuilder";
import DynamicFormBuilder from "../../../components/Form/dynamicFormBuilder";
import { FieldArray } from "redux-form";
interface IRegistrationForm {
  handleSubmit: (value: any) => void;
  initialValue: object;
  formContent: any[];
  formname: string;
  sectionTitle: string;
  dynamicForm?: boolean;
}
const RegistrationForm = (props: IRegistrationForm) => {
  const {
    handleSubmit,
    initialValue,
    formContent,
    formname,
    sectionTitle,
    dynamicForm
  } = props;
  return (
    <>
      <h4></h4>
      <section>
        <h3>{sectionTitle}</h3>
        <Form
          form={formname}
          initialValues={initialValue}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {!!dynamicForm ? (
            <FieldArray
              name="members"
              component={DynamicFormBuilder}
              formFild={formContent}
              addButtonText={"Add"}
              removeButtonText={"Remove"}
            />
          ) : (
            <FormBuilder formFild={formContent} />
          )}
        </Form>
      </section>
    </>
  );
};
export default RegistrationForm;
