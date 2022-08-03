import React from "react";
import styled from "styled-components";
const P = styled.p`
  text-align: center;
  margin: 40px;
  color: gray;
`;
const NoResultFound = (props: any) => {
  return (
    <>{props.list && props.list.length === 0 && <P>No Result Found!</P>}</>
  );
};
export default NoResultFound;
