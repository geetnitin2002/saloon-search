import React from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

interface IModel {
  readonly showModel: boolean;
  readonly handleSubmit: any;
  readonly title: string;
  readonly children: any;
  readonly handleClose: any;
  readonly isErrorHandler?: boolean;
  readonly NoButton?: string;
  readonly yesButton?: string;
}

const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  background-color: #eee;
`;
const ButtonStye = styled.button`
  border: none;
  display: inline-flex;
  height: 42px;
  width: 90px;
  align-items: center;
  color: #fff;
  cursor: pointer;
  background: #123145;
  justify-content: center;
  letter-spacing: 1px;
`;

const ModalComponent = (props: IModel) => {
  return (
    <>
      <Modal
        show={props.showModel}
        size={props.isErrorHandler ? "sm" : "lg"}
        onHide={props.handleClose}
      >
        {props.isErrorHandler ? null : (
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          <>
            {props.isErrorHandler && (
              <button
                type="button"
                className="close"
                onClick={props.handleClose}
              >
                <span aria-hidden="true">×</span>
                <span className="sr-only">Close</span>
              </button>
            )}
            {props.children}
          </>
        </Modal.Body>
        {props.isErrorHandler ? null : (
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              {props.NoButton || "Close"}
            </Button>
            <ButtonStye onClick={props.handleSubmit}>
              {props.yesButton || "Save Changes"}
            </ButtonStye>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};
export default ModalComponent;
