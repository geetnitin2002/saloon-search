import React from "react";
import styled from "styled-components";
import ServiceDetails from "../../businessModule/businessDetails/serviceDetails";
import ApiConfig from "../../../../apiConfig";
const StarInner = styled.span`
  width: 100px;
`;

export class BusinessPanel extends React.Component<any> {
  detailClick = (id: any, name: any) => {
    const path = {
      pathname: "/business/" + name + "/" + id,
    };
    this.props.history.push(path);
    // this.props.history.push("/business/" + id + "/details");
  };
  render() {
    const { data, showBooking, className, service, bookTickets } = this.props;
    return (
      <div
        className={className ? className : "col-md-6"}
        id={`${data.id}-${this.props.index}`}
      >
        <div className="list-view__item">
          <div className="listing hover-effect">
            <div className="d-sm-flex align-items-sm-center listing__wrapper">
              <div className="listing__thumbnail">
                <a
                  // href={`${ApiConfig.IMAGE_URL}Bid_${data.businessId}_Image_Main.png`}
                >
                  <img
                    src={`${ApiConfig.IMAGE_URL}Bid_${data.businessId}_Image_Main.png`}
                    alt="Hair Stylists"
                  
                      onClick={() =>
                        this.detailClick(data.businessId, data.businessName)
                      }
                    />
                </a>
              </div>
              <div className="d-flex justify-content-between align-items-center listing__detail">
                <div className="listing__detail-left">
                  <p className="t-small">
                    <span className="c-dove-gray">{data.distance}</span>
                  </p>
                  <h3 className="listing__title">
                    <a
                      href={""}
                      onClick={() =>
                        this.detailClick(data.businessId, data.businessName)
                      }
                    >
                      {data.businessName}
                    </a>
                  </h3>
                  {/* <p className="listing__review c-dusty-gray">
                    <span className="stars-outer" data-rating="5">
                      <StarInner className="stars-inner" />
                    </span>
                    <span>({data.reviewsCount} Reviews)</span>
                  </p> */}
                  <p className="listing__location c-dusty-gray no-b-margin">
                    <i className="fa fa-map-marker" />
                    <a
                      href={
                        data.address && data.address[1] ? data.address[1] : null
                      }
                      target={data.address && data.address[1] ? "_blank" : ""}
                    >
                      {data.address ? data.address[0] : ""}
                    </a>
                    <a>{data.address ? data.address[2] : ""}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showBooking && (
            <ServiceDetails
              services={service}
              bookTicket={(row: any) => bookTickets(row, data.businessId)}
              hideTitle={true}
              serviceListClass="list-item"
            />
          )}
        </div>
      </div>
    );
  }
}
export default BusinessPanel;
