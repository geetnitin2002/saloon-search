import React from "react";

const ServiceDetails = (props: any) => {
  const bookTickets = (e: any, row: any) => {
    props.bookTicket(row);
    e.preventDefault();
  };
  return (
    <div
      id="menu"
      className="listing-section bg-white hover-effect"
      data-matching-link="#menu-link"
    >
      {!props.hideTitle && (
        <div className="listing-section__header">
        <h3 className="listing-widget__title">Service Menu</h3>
        {/* <h3 className="listing-section__title">Service Menu</h3> */}
        </div>
      )}
      <ul className={`min-list listing-menu ${props.serviceListClass}`}>
        {props.services && props.services.map((row: any, index: any) => (
          <li className="listing-menu__item" key={index}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="listing-menu__item-left">
                <h4 className="listing-menu__item-name">{row.name}</h4>
                <span
                  style={{
                    color: "gray",
                  }}
                >
                  ({row.priceAndDuration})
                </span>
              </div>

              <div className="listing-menu__item-right">
                <button className="button button--medium button--square button--search">
                  <a
                    id={index}
                    href={void 0}
                    onClick={(e) => bookTickets(e, row)}
                  >
                    BOOK
                  </a>
                </button>
              </div>
            </div>
            {props.showDescription &&
            <span
              style={{
                color: "gray",
                font: "normal normal normal 14px/1 FontAwesome",
              }}
            >
              {row.description}
            </span>
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ServiceDetails);
