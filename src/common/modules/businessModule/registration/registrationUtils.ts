import InputField from "../../../components/Form/inputField";
import ErrorUtils from "../../../components/Form/errorUtils";
import InputSelect from "../../../components/Form/inputSelect";
import styled from "styled-components";
import InputDateField from "../../../components/Form/inputDate";

const formClass = {
  width: "50%"
};
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
 * @constant RegistrationFormStep1
 * step1 form creation
 */
const RegistrationFormStep1 = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Owner First Name",
          "text",
          "firstName",
          "zmdi zmdi-account-o",
          [ErrorUtils.Required]
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Owner Last Name",
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
          "Owner Email",
          "text",
          "email",
          "zmdi zmdi-email",
          [ErrorUtils.Required, ErrorUtils.Email]
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Owner Phone",
          "text",
          "phone",
          "zmdi zmdi-smartphone-android",
          [ErrorUtils.Required, ErrorUtils.phoneNumber]
        )
      }
    ]
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Name",
          "text",
          "businessName",
          "zmdi zmdi-spellcheck",
          [ErrorUtils.Required]
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Password",
          "password",
          "password",
          "zmdi zmdi-password",
          [ErrorUtils.Required]
        )
      }
    ]
  }
];
/**
 * @constant RegistrationFormStep2
 * step2 form creation
 */
const RegistrationFormStep2 = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Address Line 1",
          "text",
          "addressLine1",
          "zmdi zmdi-home",
          [ErrorUtils.Required]
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Address Line 2",
          "text",
          "addressLine2",
          "zmdi zmdi-home"
        )
      }
    ]
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps("Area", "text", "area", "zmdi zmdi-pin")
      },
      {
        component: InputField,
        props: getDefaultFieldProps("City", "text", "city", "zmdi zmdi-pin", [
          ErrorUtils.Required
        ])
      }
    ]
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Province",
          "text",
          "province",
          "zmdi zmdi-pin"
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Postal Code/Zip",
          "number",
          "postalCode",
          "zmdi zmdi-pin",
          [ErrorUtils.Required]
        )
      }
    ]
  }
];

/**
 * @constant RegistrationFormStep3
 * step3 form creation
 */
const OpeningHourOptions = [
  { label: "Closed", value: "0000" },
  { label: "9:00 AM", value: "0900" },
  { label: "10:00 AM", value: "1000" },
  { label: "11:00 AM", value: "1100" },
  { label: "12:00 AM", value: "1200" },
  { label: "1:00 PM", value: "1300" },
  { label: "2:00 PM", value: "1400" },
  { label: "3:00 PM", value: "1500" },
  { label: "4:00 PM", value: "1600" },
  { label: "5:00 PM", value: "1700" },
  { label: "6:00 PM", value: "1800" },
  { label: "7:00 PM", value: "1900" },
  { label: "8:00 PM", value: "2000" },
  { label: "9:00 PM", value: "2100" },
  { label: "10:00 PM", value: "2200" },
  { label: "11:00 PM", value: "2300" },
  { label: "12:00 PM", value: "2400" }
];
const ClosingHourOptions = [
  { label: "Closed", value: "0000" },
  { label: "9:00 AM", value: "0900" },
  { label: "10:00 AM", value: "1000" },
  { label: "11:00 AM", value: "1100" },
  { label: "12:00 AM", value: "1200" },
  { label: "1:00 PM", value: "1300" },
  { label: "2:00 PM", value: "1400" },
  { label: "3:00 PM", value: "1500" },
  { label: "4:00 PM", value: "1600" },
  { label: "5:00 PM", value: "1700" },
  { label: "6:00 PM", value: "1800" },
  { label: "7:00 PM", value: "1900" },
  { label: "8:00 PM", value: "2000" },
  { label: "9:00 PM", value: "2100" },
  { label: "10:00 PM", value: "2200" },
  { label: "11:00 PM", value: "2300" },
  { label: "12:00 PM", value: "2400" }
];
const getFields = (data: any) => {
  return [
    {
      component: InputSelect,
      props: {
        name: "startTime" + data,
        id: "openingHour" + data,
        placeholder: "Choose opening hour...",
        value: "0000",
        options: OpeningHourOptions
      }
    },
    {
      component: InputSelect,
      props: {
        name: "endTime" + data,
        id: "ClosingHourOptions" + data,
        placeholder: "Choose opening hour...",
        value: "0000",
        options: ClosingHourOptions
      }
    }
  ];
};
const RegistrationFormStep3 = [
  {
    classname: "row",
    title: "Monday",
    field: getFields("Mon")
  },
  {
    classname: "row",
    title: "Tuesday",
    field: getFields("Tue")
  },
  {
    classname: "row",
    title: "Wednesday",
    field: getFields("Wed")
  },
  {
    classname: "row",
    title: "Thursday",
    field: getFields("Thu")
  },
  {
    classname: "row",
    title: "Friday",
    field: getFields("Fri")
  },
  {
    classname: "row",
    title: "Saturday",
    field: getFields("Sat")
  },
  {
    classname: "row",
    title: "Sunday",
    field: getFields("Sun")
  }
];
/**
 * @constant RegistrationFormStep4
 * step4 form creation
 */

const OptionsYesNo = [
  { label: "Yes", value: "Y" },
  { label: "No", value: "N" }
];
const RegistrationFormStep4 = [
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Website",
          "text",
          "weburl",
          "zmdi zmdi-laptop",
          [ErrorUtils.websiteValidation],
          "Website url"
        )
      },
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Contcat",
          "text",
          "contactPhone",
          "zmdi zmdi-smartphone-android",
          [ErrorUtils.phoneNumber]
        )
      }
    ]
  },
  {
    field: [
      {
        component: InputField,
        props: getDefaultFieldProps(
          "Business Description",
          "text",
          "writeup",
          "zmdi zmdi-spellcheck"
        )
      }
    ]
  }
];
const RegistrationFormStep5 = [
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label:
            "Would you like to display the phone number on the Booking email",
          name: "ifPhoneShownOnBookingEmail",
          id: "ifPhoneShownOnBookingEmail",
          placeholder: "Choose",
          options: OptionsYesNo
        }
      },
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Do you want to notify the booker for missing the appointment",
          name: "ifStaffNotifiedFutureBookings",
          id: "ifStaffNotifiedFutureBookings",
          placeholder: "Choose",
          options: OptionsYesNo
        }
      }
    ]
  },
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Minimum time after which the bookings can be taken",
          name: "preBookingInterval",
          id: "preBookingInterval",
          placeholder: "Choose",
          options: [
            { label: "15 Min", value: "15" },
            { label: "30 Min", value: "30" },
            { label: "45 Min", value: "45" },
            { label: "60 Min", value: "60" }
          ]
        }
      },
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Advance window until when Bookings are open",
          name: "advanceBookingPeriod",
          id: "advanceBookingPeriod",
          placeholder: "Choose",
          options: [
            { label: "1", value: "10" },
            { label: "2", value: "20" },
            { label: "3", value: "30" },
            { label: "4", value: "40" }
          ]
        }
      }
    ]
  },
  {
    field: [
      {
        component: InputSelect,
        props: {
          FormClass: "form-col",
          label: "Does the staff receive emails for bookings later than today?",
          name: "ifNotifyNoShowToBooker",
          id: "ifNotifyNoShowToBooker",
          placeholder: "Choose",
          options: OptionsYesNo
        }
      }
    ]
  }
];

const RegistrationFormStep6 = [
  {
    addButtonText: "Add Hoildays",
    removeButtonText: "Remove",
    fieldsName: "holiday",
    field: [
      {
        component: InputDateField,
        props: {
          ...getDefaultFieldProps(
            "Mark holidays",
            "text",
            "date",
            "zmdi zmdi-laptop",
            [ErrorUtils.Required],
            "Pick the holiday dates"
          ),
          FormClass: "form-col-1"
        }
      },
      {
        component: InputDateField,
        props: {
          ...getDefaultFieldProps(
            "Mark holidays",
            "text",
            "date1",
            "zmdi zmdi-laptop",
            [ErrorUtils.Required],
            "Pick the holiday dates"
          ),
          FormClass: "form-col-1"
        }
      }
    ]
  }
];

export default {
  formFieldsStep1: RegistrationFormStep1,
  formFieldsStep2: RegistrationFormStep2,
  formFieldsStep3: RegistrationFormStep3,
  formFieldsStep4: RegistrationFormStep4,
  formFieldsStep5: RegistrationFormStep5,
  formFieldsStep6: RegistrationFormStep6
};

/**
 * 
 *       
        
 */
