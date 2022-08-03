import ErrorUtils from "../../../components/Form/errorUtils";
import InputSelect from "../../../components/Form/inputSelect";
import InputDateField from "../../../components/Form/inputDate";
import InputField from "../../../components/Form/inputField";

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
/**
 * @constant searchForm
 * LoginForm form creation
 */
            //"Service Name",
const searchForm = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Service",
            "text",
            "serviceDipalyName",
            "zmdi zmdi-settings",
            [ErrorUtils.Required],
            null
          ),
          FormClass: "col-md-6",
          disable: true,
        },
      },
      {
        component: InputSelect,
        props: {
          // label: "Select Staffer",
          label: "Staff Member",
          name: "staff",
          id: "staff",
          placeholder: "Choose staff",
          value: "",
          options: [],
          FormClass: "col-md-6",
          validate: [ErrorUtils.Required],
        },
      },
    ],
  },
  {
    // addButtonText: "Add Service",
    addButtonText: "Add Another Service",
    removeButtonText: "Remove",
    fieldsName: "service",
    defaultHide: true,
    disableAdd: 1,
    dynamicField: true,
    field: [
      {
        component: InputSelect,
        props: {
          // label: "Is this for",
          label: "2nd Service for",
          name: "serviceFor",
          id: "serviceFor",
          placeholder: "Choose For",
          value: "",
          options: [],
          FormClass: "col-md-6",
        },
      },
      {
        component: InputSelect,
        props: {
          label: "2nd Service",
          name: "ServiceName1",
          id: "ServiceName1",
          placeholder: "Choose ServiceName",
          value: "",
          options: [],
          FormClass: "col-md-6",
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputSelect,
        props: {
          ...getDefaultFieldProps(
            "From",
            "text",
            "from",
            null,
            [ErrorUtils.Required],
            "YYY-MM-DD"
          ),
          FormClass: "col-md-3",
        },
      },
      {
        component: InputSelect,
        props: {
          ...getDefaultFieldProps(
            "To",
            "text",
            "to",
            null,
            [ErrorUtils.Required],
            "YYY-MM-DD"
          ),
          FormClass: "col-md-3",
        },
      },
      {
        component: InputSelect,
        props: {
          // label: "Select Week",
          label: "Week",
          name: "week",
          id: "SelectWeek",
          placeholder: "Choose Week",
          value: "",
          options: [],
          FormClass: "col-md-6",
          validate: [ErrorUtils.Required],
        },
      },
    ],
  },
];
export const datewiseFormSearch = [
  {
    field: [
      // {
      //   component: InputField,
      //   props: {
      //     ...getDefaultFieldProps(
      //       "Staffer",
      //       "text",
      //       "staffname",
      //       "zmdi zmdi-settings",
      //       [ErrorUtils.alphaNumeric],
      //       null
      //     ),
      //     FormClass: "col-md-3",
      //     disable: true,
      //   },
      // },
      // {
      //   component: InputSelect,
      //   props: {
      //     label: "Date",
      //     name: "week",
      //     id: "SelectWeek",
      //     placeholder: "Choose Week",
      //     value: "",
      //     options: [],
      //     FormClass: "col-md-3",
      //   },
      // },
      {
        component: InputSelect,
        props: {
          ...getDefaultFieldProps(
            "From",
            "text",
            "from",
            null,
            [ErrorUtils.Required],
            "YYY-MM-DD"
          ),
          FormClass: "col-md-6 mr-5",
        },
      },
      {
        component: InputSelect,
        props: {
          ...getDefaultFieldProps(
            "To",
            "text",
            "to",
            null,
            [ErrorUtils.Required],
            "YYY-MM-DD"
          ),
          FormClass: "col-md-6",
        },
      },
    ],
  },
];
export const datewiseFormSearch1 = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            // "Service 1",
            "Service",
            "text",
            "serviceDipalyName",
            "zmdi zmdi-settings",
            [ErrorUtils.Required],
            null
          ),
          style: { width: "300px" },
          disable: true,
        },
      },
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            // "Service 2",
            "2nd Service",
            "text",
            "serviceServiceName1",
            "zmdi zmdi-settings",
            [ErrorUtils.Required],
            null
          ),
          style: { width: "300px" },
          disable: true,
        },
      },
    ],
  },
];
export const emailForm = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            // "Your Email",
            "Enter Email",
            "email",
            "email",
            "zmdi zmdi-email",
            [ErrorUtils.Required, ErrorUtils.maxLength(100), ErrorUtils.Email],
            null
          ),
          FormClass: "col-md-6",
        },
      },
    ],
  },
];

export const BookingForm = [
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            // "Your Name",
            "Name",
            "text",
            "name",
            "zmdi zmdi-account-o",
            [
              ErrorUtils.Required,
              ErrorUtils.maxLength(50),
              ErrorUtils.alphaNumeric,
            ],
            null
          ),
          FormClass: "col-md-6",
        },
      },
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            " ",
            "Email",
            "email",
            "zmdi zmdi-email",
            [ErrorUtils.Required, ErrorUtils.maxLength(100), ErrorUtils.Email],
            null
          ),
          FormClass: "col-md-6",
          style: { top: "21px"},
          disable: true,
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Friend's Name",
            "text",
            "friendsName",
            "zmdi zmdi-account-o",
            [ErrorUtils.maxLength(100), ErrorUtils.alphaNumeric]
          ),
          FormClass: "col-md-6",
        },
      },
      {
        component: InputField,
        props: {
          ...getDefaultFieldProps(
            "Friend's Email",
            "email",
            "friendEmail",
            "zmdi zmdi-email",
            [ErrorUtils.maxLength(100), ErrorUtils.Email]
          ),
          FormClass: "col-md-6",
        },
      },
    ],
  },
  {
    field: [
      {
        component: InputField,
        props: {
          // ...getDefaultFieldProps("Your Comment", "text", "comment", "", [
          ...getDefaultFieldProps("Comment", "text", "comment", "", [
            ErrorUtils.maxLength(400),
            //ErrorUtils.alphaNumeric,
          ]),
          FormClass: "col-md-12",
        },
      },
    ],
  },
];
export default searchForm;
