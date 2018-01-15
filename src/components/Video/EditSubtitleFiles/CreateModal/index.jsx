import React, { PureComponent } from 'react';
import { Modal, Form } from 'antd';

import UploadButtonItem from '@qiniu/UploadButton';
import SelectItem from '@form-item/Select';

import genFields from './genFields';

const { Item: FormItem } = Form;

/**
 *  创建字幕模态
 *  @class
 */
@Form.create()
export default class CreateModal extends PureComponent {
  static defaultProps = {
    okText: '修改',
    title: '添加字幕',
    width: 800
  };

  state = {
    visible: true,
    confirmLoading: false
  };

  render() {
    const { okText, title, width, form } = this.props;
    const { visible, confirmLoading } = this.state;
    const fields = genFields(this);

    return (
      <Modal
        okText={okText}
        title={title}
        width={width}
        visible={visible}
      >
        <Form>
          <SelectItem {...fields.lang} />
          <UploadButtonItem {...fields.key} />
        </Form>
      </Modal>
    );
  }
};
