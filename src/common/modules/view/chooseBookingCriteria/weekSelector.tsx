import React from "react";
import styled from "styled-components";
import moment from "moment";
const Button = styled.button`
  padding: 4px;
  a {
    // background-color: #4caf50;
    background-color: #123145;
    color: white;
    padding: 10px 10px;
    /* margin-top: 40px; */
    cursor: pointer;
    width: 70px;
    text-align: center;
  }
  .selected {
    background: white;
    // color: #01aa11;
    // border: 1px solid #01aa11;
    color: #123145;
    border: 1px solid #123145;
  }
`;
const Li = styled.li`
   {
    minwidth: "10%";
  }
`;
const Table = styled.table`
  .tavail-info {
    background-color: #123145;
    color: white;
  }
`;
const NoTime = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  align-content: center;
  justify-content: center; /* space-between */
  width: 100%;
  background: none;
  font-size: 21px;
  padding-left: 46px;
  color: #999;
  /* font-family: "Montserrat-Medium"; */
  font-family: "Nunito";
`;
class WeekSelector extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      availableTimeSlots: "",
      selectedIndex: null,
      week: this.props.dataWiseSingleDayRecord.week,
    };
  }
  componentDidMount() {
    console.log(this.props.selectedDateAndTime);
    this.props.selectedDateAndTime.week && this.setState({ week: this.props.selectedDateAndTime.week});
    this.props.selectedDateAndTime.date && this.setState({ availableTimeSlots: this.props.selectedDateAndTime.date});
    this.props.selectedDateAndTime.time && this.setState({ selectedIndex: this.props.selectedDateAndTime.time.item + this.props.selectedDateAndTime.time.index});
  }

  componentDidUpdate(PrevProps: any) {
    if (
      this.props.dataWiseSingleDayRecord &&
      this.props.dataWiseSingleDayRecord !== PrevProps.dataWiseSingleDayRecord
    ) {
      this.setState({ week: this.props.dataWiseSingleDayRecord.week });
    }
  }

  handleSubmit = (value: any) => {
    //  console.log(value);
  };
  handleInputChange = () => {
    this.props.submitForm("ChooseBookingCriteraForm");
  };
  getWeekDetails = (value: any) => {
    const row: any =
      this.props.staffAvailablityRes &&
      this.props.staffAvailablityRes.weeks.filter(
        (row: any) => row.weekString === value
      );
    return row.length > 0 ? row[0] : null;
  };
  getAvailableTimeSlots = (value: any) => {
    const data =
      this.props.staffAvailablityRes &&
      this.props.staffAvailablityRes.availableTimeslots[value];
    return data;
  };
  dateSelector = (e: any) => {
     console.log(e.target.id);
    this.props.storeDateAndTime({week: this.state.week, date: e.target.id });
    this.setState({ availableTimeSlots: e.target.id });
    e.stopPropagation();
  };
  timeChoosen = (item: any, index: any) => { 
    console.log("item",item);
    this.props.storeDateAndTime({week: this.state.week, date: this.state.availableTimeSlots, time: {item: item, index: index} });
    const record = this.getWeekDetails(this.state.week);
    this.setState({
      selectedIndex: item + index,
    });
      console.log(index);
    this.props.choosenTime({
      time: item,
      date: this.state.availableTimeSlots
        ? this.state.availableTimeSlots
        : record.weekDays[0],
    });
  };
  changeWeek = (e: any) => {
    console.log("targeted values " , e.target.value);
    this.setState({ week: e.target.value });
    this.props.storeDateAndTime({week: e.target.value, date: null });
    const record = this.getWeekDetails(e.target.value);
    console.log("Json", JSON.stringify(record));
    this.setState({ availableTimeSlots: record.weekDays[0] });
  };
  nextPrevWeek = (record: any, order: any) => {
    let index = -1;
    if (record) {
      index = this.props.week.findIndex(
        (row: any) =>
          row.weekString.replace(/\s/g, "") ===
          record.weekString.replace(/\s/g, "")
      );
    }

    if (index !== -1 && order == "+") {
      this.setState({
        week: this.props.week[index + 1].weekString,
        availableTimeSlots: this.props.week[index + 1].weekDays[0],
      });
    }
    if (index !== -1 && order == "-") {
      this.setState({
        week: this.props.week[index - 1].weekString,
        availableTimeSlots: this.props.week[index - 1].weekDays[0],
      });
    }
  };
  isSelected = (date: any, index: any) => {
    if (
      this.state.availableTimeSlots &&
      this.state.availableTimeSlots === date
    ) {
      return true;
    } else if (!this.state.availableTimeSlots && index === 0) {
      return true;
    }
    return false;
  };

  getDisabledButtonStyle = () => {
    return {
      borderRadius: "6px", 
      padding: "8px 3px",
      pointerEvents: "none",
      cursor: "default",
      backgroundColor: "grey",
      color: "white"
    };
  };

  getEnabledButtonStyle = () => {
    return {
      borderRadius: "6px", 
      padding: "8px 3px"
    };
  }
  
  render() {
    const record = this.getWeekDetails(this.state.week);
    const availableTimeslots = this.state.availableTimeSlots
      ? this.getAvailableTimeSlots(this.state.availableTimeSlots)
      : record
      ? this.getAvailableTimeSlots(record.weekDays[0])
      : [];
    return (
      <>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-2">
                <br />
                <br />
                {record && record.weekOrder === 0 ? null : (
                  <button type="button" className="next btn">
                    <a href="#" onClick={() => this.nextPrevWeek(record, "-")}>
                      &nbsp;&lt;&nbsp;Prev
                    </a>
                  </button>
                )}
              </div>
              <div className="col-md-6">
                {/* <label>Select Week</label> */}
                <div className="form-holder">
                  <i className="zmdi zmdi-time"></i>
                  <select
                    name="selectdata"
                    id=""
                    className="form-control"
                    data-placeholder="Choose Week"
                    value={this.state.week}
                    onChange={this.changeWeek}
                  >
                    {this.props.week.map((row: any, index: any) => (
                      <option
                        className="option"
                        value={row.weekString}
                        key={index}
                      >
                        {row.weekString}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <br />
                <br />
                {record &&
                this.props.week.length - 1 === record.weekOrder &&
                this.state.week ? null : (
                  <button type="button" className="next btn">
                    <a href="#" onClick={() => this.nextPrevWeek(record, "+")}>
                      Next&nbsp;&gt;&nbsp;
                    </a>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-12">
            <div>
              <ul
                style={{
                  display: "flex",
                  margin: "15px",
                  width: "100%",
                  justifyContent: "start",
                  flexWrap: "wrap",
                }}
              >
                {record &&
                  record.weekDays.map((row: any, index: any) => (
                    <Li
                      key={index}
                      onClick={(e) => this.dateSelector(e)}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        minWidth: "109px",
                        flexWrap: "wrap",
                        marginBottom: "10px",
                      }}
                    >
                      <Button type="button"
                      disabled={this.getAvailableTimeSlots(row) || (this.getAvailableTimeSlots(row) && this.getAvailableTimeSlots(row).length == 0)}
                      >
                        <a
                          href="#"
                          id={row}
                          style={this.getAvailableTimeSlots(row) && this.getAvailableTimeSlots(row).length == 0 ? this.getDisabledButtonStyle() : this.getEnabledButtonStyle()}
                          className={
                            this.isSelected(row, index) ? "btn selected" : "btn"
                          }
                        >
                          {moment(row, "DD/MM/YYYY").format("DD MMM ddd")}
                        </a>
                      </Button>
                    </Li>
                  ))}
              </ul>
              <div>
                <Table className="tavail">
                  {availableTimeslots &&
                    availableTimeslots.map((row: any, index: any) => (
                      <tr key={index}>
                        {row &&
                          row.slots.map((item: any, index: any) => (
                            <td
                              key={index}
                              onClick={() => this.timeChoosen(item, index)}
                              className={
                                this.state.selectedIndex === item + index
                                  ? "tavail-info"
                                  : "plain"
                              }
                            >
                              {item}
                            </td>
                          ))}
                      </tr>
                    ))}
                  {!availableTimeslots ||
                    (availableTimeslots.length === 0 && (
                      <NoTime>No time available</NoTime>
                    ))}
                </Table>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </>
    );
  }
}
export default WeekSelector;
