import React from "react";
import styled from "styled-components";

const AddButton = styled.button`
  cursor: pointer;
`;
const RemoveButton = styled.button`
  cursor: pointer;
`;
const GridUl = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Gridli = styled.li`
  display: flex;
`;
const DynamicFormBuilder = ({
  removeButtonText,
  addButtonText,
  formFild,
  fields,
  meta: { error },
}: {
  removeButtonText: string;
  addButtonText: string;
  formFild: any;
  fields: any;
  meta: any;
}) => (
  <>
    {formFild.length == 1 ? (
      <>
        {fields.map((member: any, index: any) =>
          formFild.map((row: any, key: any) =>
            row.field.map((fieldsInfo: any, key: any) => (
              <fieldsInfo.component
                key={key}
                {...fieldsInfo.props}
                name={`${row.fieldsName}${fieldsInfo.props.name}`}
                label={fieldsInfo.props.label}
                id={`${row.fieldsName}${fieldsInfo.props.id}`}
                validation={`${row}${fieldsInfo.props.id}`}
                placeHolder={fieldsInfo.props.placeHolder}
              />
            ))
          )
        )}
        <Gridli>
          {fields.length == 0 && !formFild[0].disableAdd && (
            <AddButton
              type="button"
              className="button button--medium button--square button--search"
              onClick={() => fields.push()}
            >
              {addButtonText}
            </AddButton>
          )}
        </Gridli>
      </>
    ) : (
      <GridUl>
        {fields.map((member: any, index: any) => (
          <Gridli key={index}>
            <>
              {formFild.map((row: any, key: any) =>
                !row.dynamicField ? (
                  <div
                    className={row.classname ? row.classname : "form-row"}
                    key={key}
                  >
                    {row.title && (
                      <div className="col-md-2">
                        <h4 className="form-group__title">{row.title}</h4>
                      </div>
                    )}
                    {row.field.map((fieldsInfo: any, key: any) => (
                      <fieldsInfo.component
                        key={key}
                        {...fieldsInfo.props}
                        name={`${member}${fieldsInfo.props.name}`}
                        label={fieldsInfo.props.label}
                        id={`${member}${fieldsInfo.props.id}`}
                        validation={`${member}${fieldsInfo.props.id}`}
                        placeHolder={fieldsInfo.props.placeHolder}
                      />
                    ))}
                  </div>
                ) : (
                  row.field.map((fieldsInfo: any, key: any) => (
                    <fieldsInfo.component
                      key={key}
                      {...fieldsInfo.props}
                      name={`${member}${fieldsInfo.props.name}`}
                      label={fieldsInfo.props.label}
                      id={`${member}${fieldsInfo.props.id}`}
                      validation={`${member}${fieldsInfo.props.id}`}
                      placeHolder={fieldsInfo.props.placeHolder}
                    />
                  ))
                )
              )}
              <RemoveButton
                type="button"
                title="Remove"
                onClick={() => fields.remove(index)}
              >
                {removeButtonText}
              </RemoveButton>
            </>
          </Gridli>
        ))}
        <Gridli>
          <AddButton type="button" onClick={() => fields.push()}>
            {addButtonText}
          </AddButton>
        </Gridli>
        {error && <li className="error">{error}</li>}
      </GridUl>
    )}
  </>
);
export default DynamicFormBuilder;
