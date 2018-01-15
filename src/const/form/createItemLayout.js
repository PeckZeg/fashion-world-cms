export const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export const formSubmitItemLayout = {
  wrapperCol: {
    span: formItemLayout.wrapperCol.span,
    offset: formItemLayout.labelCol.span
  }
};
