import React from "react";
import styled from "styled-components";
interface ILIST {
  readonly listTemplates: IListType;
  readonly listData: any;
  readonly editHandler?: any;
  readonly deleteHandler?: any;
}
interface IListType {
  readonly thead: any;
  readonly tbody: any;
  readonly actionItems: any;
}
const A = styled.a`
  color: #337ab7;
  cursor: pointer;
`;

class List extends React.Component<ILIST, any> {
  getTableHead = () => {
    const { thead, actionItems } = this.props.listTemplates;
    return (
      <>
        {thead.map((row: any, index: any) => (
          <th scope="col" key={index}>
            {row}
          </th>
        ))}
        {actionItems && actionItems.edit ? <th scope="col"></th> : null}
        {actionItems && actionItems.delete ? <th scope="col"></th> : null}
      </>
    );
  };
  getTableBody = () => {
    const { tbody, actionItems } = this.props.listTemplates;
    const { listData } = this.props;
    return (
      <>
        {listData.map((list: any, index: any) => (
          <tr key={index}>
            {tbody.map((row: any, index: any) => (
              <>
                <td scope="col" key={index}>
                  {list[row]}
                </td>
              </>
            ))}
            {actionItems && actionItems.edit && this.props.editHandler ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.editHandler(list)}>
                  <i className="zmdi zmdi-edit"></i>
                </A>
              </td>
            ) : null}
            {actionItems && actionItems.delete && this.props.deleteHandler ? (
              <td scope="col">
                <A href={void 0} onClick={() => this.props.deleteHandler(list)}>
                  <i className="zmdi zmdi-delete"></i>
                </A>
              </td>
            ) : null}
          </tr>
        ))}
      </>
    );
  };
  render() {
    return (
      <table id="tstaff" className="table">
        <thead>
          <tr>{this.getTableHead()}</tr>
        </thead>
        <tbody>{this.getTableBody()}</tbody>
      </table>
    );
  }
}
export default List;
