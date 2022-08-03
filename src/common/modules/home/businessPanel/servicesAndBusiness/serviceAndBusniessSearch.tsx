import React from "react";
import Select from "react-select";
import SalonLogo from "TARGET_BUILD/images/uploads/logo.jpg";
import FooterComponent from "./../../../../components/footerComponent";
import BUSINESS_APP from "./../../../../../apiConfig";

import CreatableSelect from 'react-select/creatable';
import { any } from "prop-types";
interface IServiceAndBusinessSearchProps {
  readonly serviceCategoriessAndBusinesses: {
    id: any;
    value: any;
    type?: "service";
  }[];
  readonly locationList: { label?: any; value?: any }[];
  readonly searchClick: any;
  readonly defaultValue: any;
  readonly location?: any;
}
export class ServiceAndBusinessSearch extends React.Component<
  IServiceAndBusinessSearchProps,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedService: this.props.location && this.props.location.state,
      selectedLocations: null,
    };
  }
  handleServiceChange = (value: any) => {
    if (value != null) {
      value.id = value.value;
      value.type = value.type ? value.type : "business"
    }
    this.setState({ selectedService: value });
    this.props.searchClick({selectedService:  value, selectedLocations: this.state.selectedLocations});
  };
  handleLocationChange = (value: any) => {
    console.log(value);
    console.log(this.state.selectedService);
    this.setState({ selectedLocations: value });
    this.props.searchClick({selectedService:  this.state.selectedService, selectedLocations: value});
    
  };
  componentWillUnmount() {
    this.props.location.state = null;
  }
  render() {
    return (
      <>
      <br></br>
      <br></br>
      <br></br>
      <div className="main-search main-search--layout-1 bg-mirage">
          <div className="col-md-9 main-search__group main-search__group--primary">
            <div className="row">
              <div className="col-md-6">
                {/* <Select
                  Searchable={true}
                  defaultValue={this.state.selectedService}
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.id}
                  options={this.props.serviceCategoriessAndBusinesses}
                  placeholder={"Choose a service"}
                  minLength={5}
                  pageSize={5}
                  name="name"
                  onChange={this.handleServiceChange}
                /> */}

                <CreatableSelect
                  Searchable={true}
                  defaultValue={this.state.selectedService}
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.id}
                  options={this.props.serviceCategoriessAndBusinesses}
                  noOptionsMessage={() => null}
                  //placeholder={"Choose a Service Category / Search"}
                  placeholder={"Choose a service"}
                  minLength={5}
                  isClearable={true}
                  pageSize={5}
                  name="name"
                  onChange={this.handleServiceChange}
                />

              </div>
              <div className="col-md-6">
                <CreatableSelect
                  Searchable={true}
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value}
                  options={this.props.locationList}
                  noOptionsMessage={() => null}
                  placeholder={"Where"}
                  minLength={5}
                  isClearable={true}
                  pageSize={5}
                  name="location"
                  onChange={this.handleLocationChange}
                  formatCreateLabel= {(val) => {return val}}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3 main-search__group main-search__group--tertiary">
            <button
              className="button button--medium button--square button--search"
              onClick={() => this.props.searchClick(this.state)}
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        {/* <FooterComponent fbLink="https://www.google.co.in"/> */}
      </>
      
    );
  }
}
