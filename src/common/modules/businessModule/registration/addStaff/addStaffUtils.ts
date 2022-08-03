import InputField from "../../../../components/Form/inputField";
import ErrorUtils from "../../../../components/Form/errorUtils";
import InputSelect from "../../../../components/Form/inputSelect";
import RegistrationStep from "../registrationUtils";
/**
 * @function getDefaultFieldProps
 * get initial value of form types
 */
const getDefaultFieldProps = (
  label: any,
  type: any,
  name: any,
  iClass: any = null,
  validate: any = null,
  placeholder: any = null
) => {
  return { label, type, name, iClass, validate, placeholder };
};

const addStaffForm = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "First Name",
          "text",
          "firstName",
          "zmdi zmdi-account-o",
          [ErrorUtils.Required]
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Last Name",
          "text",
          "lastName",
          "zmdi zmdi-account-o",
          [ErrorUtils.Required]
        )
      }
    ]
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Staffer Email Id",
          "email",
          "email",
          null,
          [ErrorUtils.Required, ErrorUtils.Email]
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Staffer Phone Number",
          "text",
          "phone",
          "zmdi-smartphone-android",
          [ErrorUtils.Required, ErrorUtils.phoneNumber]
        )
      }
    ]
  },
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Staffer Role",
          name: "staffRole",
          id: "serviceDuration",
          placeholder: "Choose",
          options: [
            { label: "Manager", value: "MANAGER" },
            { label: "Employee", value: "EMPLOYEE" }
          ]
        }
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Service Capabilities",
          "text",
          "serviceSkills",
          "zmdi"
        )
      }
    ]
  },
  ...RegistrationStep.formFieldsStep3
];

export default addStaffForm;
