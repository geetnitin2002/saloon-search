import InputField from "../../../../components/Form/inputField";
import ErrorUtils from "../../../../components/Form/errorUtils";
import InputSelect from "../../../../components/Form/inputSelect";

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
const OptionsforServiceCategory = [
  { label: "Regular", value: "1" },
  { label: "Double Time", value: "2" },
  { label: "Ticket Based", value: "3" }
];
const serviceDurationOptions = [
  { label: "15 Min", value: "15" },
  { label: "30 Min", value: "30" },
  { label: "45 Min", value: "45" },
  { label: "60 Min", value: "60" },
  { label: "75 Min", value: "75" },
  { label: "90 Min", value: "90" },
  { label: "105 Min", value: "105" }
];

const addServiceForm = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Service Name", "text", "name")
      },
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Service Category",
          name: "category",
          id: "serviceCategory",
          placeholder: "Choose",
          options: OptionsforServiceCategory
        }
      }
    ]
  },
  {
    field: [
      {
        dependent: [
          {
            name: "category",
            value: ["3"]
          }
        ],
        isDependent: true,
        component: InputField,
        props: getDefaultFieldProps(
          "No. Of Tickets",
          "number",
          "maxTicketCount",
          "zmdi"
        )
      },
      {
        dependent: [
          {
            name: "category",
            value: ["3"]
          }
        ],
        isDependent: true,
        component: InputField,
        props: getDefaultFieldProps(
          "Tickets Allowed in single time",
          "number",
          "maxTicketsAllowedPerBooking",
          "zmdi"
        )
      }
    ]
  },
  {
    field: [
      {
        dependent: [
          {
            name: "category",
            value: ["2"]
          }
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Initial Duration",
          name: "initialDuration",
          id: "initialDuration",
          placeholder: "Choose",
          options: serviceDurationOptions
        }
      },
      {
        dependent: [
          {
            name: "category",
            value: ["2"]
          }
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Rest Period",
          name: "restPeriod",
          id: "restPeriod",
          placeholder: "Choose",
          options: serviceDurationOptions
        }
      },
      {
        dependent: [
          {
            name: "category",
            value: ["2"]
          }
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Remianing Duration",
          name: "remianingDuration",
          id: "remianingDuration",
          placeholder: "Choose",
          options: serviceDurationOptions
        }
      }
    ]
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Price", "text", "price", "zmdi")
      },
      {
        dependent: [
          {
            name: "category",
            value: ["1", "3"]
          }
        ],
        isDependent: true,
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Service Duration",
          name: "slotsDefinition",
          id: "serviceDuration",
          placeholder: "Choose",
          options: serviceDurationOptions
        }
      }
    ]
  }
];

export default {
  addServiceForm: addServiceForm
};
