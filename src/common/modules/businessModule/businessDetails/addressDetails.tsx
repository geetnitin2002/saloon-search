import React from "react";
import styled from "styled-components";
import "./../../../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./../../../../styles/style.css";
const HourSpan = styled.span`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  margin: auto;
  align-items: self-start;
  align-content: space-between;
  .whTitle {
    // font-family:"Cabin", sans-serif;
    font-family:"Nunito";
  }
  .mondayspacing {
    width:76%
  }
  .aligncolon {
    text-align: center;
  }
`;
const replaceValue = (value: string) => {
  const str = value.replace(/:|-/gi, "");
  if (str === "00000000") {
    return "Closed";
  } else {
    return value;
  }
};
const BusinessAddressInfo = (props: any) => {
  const { addressInfo } = props;
  console.log(addressInfo)
  return (
    <div className="col-lg-4">
      <div className="listing-widget bg-white hover-effect">
        {/* <h3 className="listing-widget__title">Business Address</h3> */}
        <ul className="min-list listing-contact-list">
          <li className="d-flex align-items-center c-silver-charlice listing-contact">
            {/* <i className="fa fa-compass listing-contact__icon"></i> */}
            <i className="icons fa fa-map-marker listing-contact__icon"></i>
            <span className="c-primary">
              <a href={addressInfo.addressUrl} target="_blank">
                {addressInfo.address + addressInfo.postalCode  ? addressInfo.address : "-"}
              </a>
            </span>
          </li>
          {addressInfo.contact && (
            <li className="d-flex align-items-center c-silver-charlice listing-contact">
              {/* <i className="fa fa-phone listing-contact__icon"></i> */}
              <i className="icons fa fa-phone listing-contact__icon"></i>
              {/* <a href="tel:+442077391628">{addressInfo.contact}</a> */}
              <a href={"tel:+27" + addressInfo.contact}>{addressInfo.contact.substring(0,3) + " " + addressInfo.contact.substring(3,6) + " " + addressInfo.contact.substring(6,10)}</a>
            </li>
          )}
          <li className="d-flex align-items-center c-silver-charlice listing-contact">
            {/* <i className="fa fa-phone listing-contact__icon"></i> */}
            <i className="icons fa fa-globe listing-contact__icon"></i>
            &nbsp;
            <a href={addressInfo.websiteUrl} target="_blank">
              {addressInfo.websiteUrl ? addressInfo.websiteUrl : "-"}
            </a>
          </li>
        </ul>
      </div>
      <div className="listing-widget bg-white hover-effect">
        {/* <h3 className="listing-widget__title">Business Working Hours</h3> */}
        <ul className="min-list listing-contact-list">
        <table className="mondayspacing">
                <tr>
                  <td>Monday</td>
                  <td className="aligncolon">:</td>
                  <td>
                      {addressInfo.workingHours
                    ? replaceValue(addressInfo.workingHours.mondayHours)
                    : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td className="aligncolon">:</td>
                  <td>
                      {addressInfo.workingHours
                    ? replaceValue(addressInfo.workingHours.tuesdayHours)
                    : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td className="aligncolon">:</td>
                  <td>
                      {addressInfo.workingHours
                    ? replaceValue(addressInfo.workingHours.wednesdayHours)
                    : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td className="aligncolon">:</td>
                  <td>
                      {addressInfo.workingHours
                    ? replaceValue(addressInfo.workingHours.thursdayHours)
                    : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td className="aligncolon">:</td>
                  <td>
                      {addressInfo.workingHours
                    ? replaceValue(addressInfo.workingHours.fridayHours)
                    : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td className="aligncolon">:</td>
                  <td>
                      {addressInfo.workingHours
                    ? replaceValue(addressInfo.workingHours.saturdayHours)
                    : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td className="aligncolon">:</td>
                  <td>
                      {addressInfo.workingHours
                    ? replaceValue(addressInfo.workingHours.sundayHours)
                    : "-"}
                  </td>
                </tr>
              </table>
          {/* <li className="align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <HourSpan className="c-primary">
              <span className="whTitle">Monday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
              {addressInfo.workingHours
                ? replaceValue(addressInfo.workingHours.mondayHours)
                : "-"}
            </HourSpan>
          </li>
          <li className="align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <HourSpan className="c-primary">
              <span className="whTitle">Tuesday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
              {addressInfo.workingHours
                ? replaceValue(addressInfo.workingHours.tuesdayHours)
                : "-"}
            </HourSpan>
          </li>
          <li className="align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <HourSpan className="c-primary">
              <span className="whTitle">Wednesday &nbsp;:&nbsp;</span>
              {addressInfo.workingHours
                ? replaceValue(addressInfo.workingHours.wednesdayHours)
                : "-"}
            </HourSpan>
          </li>
          <li className="align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <HourSpan className="c-primary">
              <span className="whTitle">Thursday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
              {addressInfo.workingHours
                ? replaceValue(addressInfo.workingHours.thursdayHours)
                : "-"}
            </HourSpan>
          </li>
          <li className="align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <HourSpan className="c-primary">
              <span className="whTitle">Friday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
              {addressInfo.workingHours
                ? replaceValue(addressInfo.workingHours.fridayHours)
                : "-"}
            </HourSpan>
          </li>
          <li className="align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <HourSpan className="c-primary">
              <span className="whTitle">Saturday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
              {addressInfo.workingHours
                ? replaceValue(addressInfo.workingHours.saturdayHours)
                : "-"}
            </HourSpan>
          </li>
          <li className="align-items-center c-silver-charlice listing-contact">
            <i className="fa fa-compass listing-contact__icon"></i>
            <HourSpan className="c-primary">
              <span className="whTitle">Sunday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</span>
              {addressInfo.workingHours
                ? replaceValue(addressInfo.workingHours.sundayHours)
                : "-"}
            </HourSpan>
          </li> */}
        </ul>
      </div>
    </div>
  );
};
export default BusinessAddressInfo;
