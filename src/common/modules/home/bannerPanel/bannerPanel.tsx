import React from "react";
import styled from "styled-components";
// @ts-ignore
import HeaderLogo from "TARGET_BUILD/images/uploads/header.jpg";
import { connect } from "react-redux";
import { getSearchResults } from "../action/businessDetailAction";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import { optionCSS } from "react-select/src/components/Option";
import { any } from "prop-types";
import { Option } from "react-select/src/filters";
import { type } from "os";
const Wrapper = styled.section`
  background-position-y: 0px;
  background-image: url(${HeaderLogo});
  background-repeat: no-repeat;
  min-height: 81vh;
`;
const items: { id: any; name: any }[] = [
  { id: 1, name: "dropdown1" },
  { id: 2, name: "dropdown2" },
];
interface IBannerpanelProps {
  readonly serviceCategoriessAndBusinesses?: {
    value: any;
    id: any;
    type?: any;
  }[];
  readonly getSearchResults?: any;
  history?: any;
}
export class BannerpanelComponent extends React.Component<
  IBannerpanelProps,
  any
> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchDetails: null,
    };
  }
  componentDidMount() {
    this.props.getSearchResults();
  }
  handleInputChange = (value: any) => {
    console.log(value.type);  
    value.id = value.value;
    value.type = value.type ? value.type : "business"
    //this.setState({ searchDetails: value });
    //if (this.state.searchDetails) {
      const path = {
        pathname: "/search-results",
        state: value,
      };
      this.props.history.push(path);
    //}
  };
  submitSearch = () => {
    if (this.state.searchDetails) {
      const path = {
        pathname: "/search-results",
        state: this.state.searchDetails,
      };
      this.props.history.push(path);
    }
  };

  render() {
    return (
      <Wrapper className="page-banner page-banner--layout-1 parallax">
        <div className="container">
          <div className="page-banner__container animated fadeInUp">
            <div className="page-banner__textcontent t-center">
              <h2 className="page-banner__title c-white">
                <p className="page-banner__title_p1"><strong>easy online</strong></p>&nbsp;
                <p className="page-banner__title_p2"> booking</p>                
              </h2>
              <p className="page-banner__subtitle c-white">
                discover and book services near you
              </p>
            </div>
            <div className="main-search-container">
              <div className="main-search main-search--layout-1 bg-mirage">
                <div className="main-search__group main-search__group--primary">
                  {/* <label htmlFor="main-search-name" className="c-white">
                    Book Your Service
                  </label> */}
                  
                  {/* <Select
                  Searchable={true}
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.id}
                  options={this.props.serviceCategoriessAndBusinesses}
                  noOptionsMessage={() => null}
                  placeholder={"Choose a service"}
                  onChange={this.handleInputChange}
                  minLength={5}
                  //isClearable={true}
                  pageSize={5}
                  name="name"
                /> */}

                <CreatableSelect
                  Searchable={true}
                  getOptionLabel={(option) => option.value}
                  getOptionValue={(option) => option.id}
                  options={this.props.serviceCategoriessAndBusinesses}
                  noOptionsMessage={() => null}
                  // placeholder={"Choose a service"}
                  placeholder={"Choose a Service Category / Search"}
                  onChange={this.handleInputChange}
                  minLength={5}
                  isClearable={true}
                  pageSize={5}
                  name="name"
                />
                    
                </div>
                <div className="main-search__group main-search__group--tertiary">
                  <button
                    type="submit"
                    className="button button--medium button--square button--search"
                    onClick={() => this.submitSearch()}
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
const mapStateToProps = (state: any) => ({
  serviceCategoriessAndBusinesses:
    state.businessDetails &&
    state.businessDetails.serviceCategoriessAndBusinesses,
});
const mapDispatchToProps = (dispatch: any) => ({
  getSearchResults: () => dispatch(getSearchResults()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BannerpanelComponent);
