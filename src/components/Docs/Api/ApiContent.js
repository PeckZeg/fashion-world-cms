import { Layout, Table, Icon, Tag } from 'antd';
import DocumentTitle from 'react-document-title';
import React, { PureComponent } from 'react';

import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';

import MethodTag from './MethodTag';

import styles from '~/src/components/Docs/styles.css';

export default class ApiContent extends PureComponent {
  state = {
    paramColumns: [
      {
        dataIndex: 'param',
        title: '参数',
        render: param => <code>{param}</code>
      },
      {
        dataIndex: 'required',
        title: '必需',
        render: required => required && <Icon type="check" />
      },
      {
        dataIndex: 'type',
        title: '类型',
        render: type => <code>{type}</code>
      },
      {
        dataIndex: 'default',
        title: '默认值',
        render: defaults => <code>{isUndefined(defaults) ? '-' : defaults}</code>
      },
      {
        dataIndex: 'note',
        title: '备注'
      }
    ],

    headersColumns: [
      {
        dataIndex: 'key',
        title: '键',
        render: key => <code>{key}</code>
      },
      {
        dataIndex: 'value',
        title: '值',
        render: value => <code>{value}</code>
      },
      {
        dataIndex: 'required',
        title: '必需',
        render: required => required && <Icon type="check" />
      },
      {
        dataIndex: 'note',
        title: '备注',
      }
    ],

    responseBodyColumns: [
      {
        dataIndex: 'key',
        title: '属性',
        render: key => <code>{key}</code>
      },
      {
        dataIndex: 'type',
        title: '类型',
        render: type => <code>{type}</code>
      },
      {
        dataIndex: 'note',
        title: '说明'
      }
    ],

    errorCodeColumns: [
      {
        dataIndex: 'code',
        title: '错误码',
        render: code => <code>{code}</code>
      },
      {
        dataIndex: 'message',
        title: '消息',
        render: message => <code>{message}</code>
      },
      {
        dataIndex: 'note',
        title: '说明'
      }
    ]
  };

  renderParamsTitle(title, params, opts = {}) {
    if (!isEmpty(params)) {
      return (
        <h2>{opts.code ? <code>{title}</code> : title} 参数</h2>
      );
    }
  }

  renderParams(params) {
    const { paramColumns } = this.state;

    if (!isEmpty(params)) {
      return (
        <Table
          className={styles.docModule}
          columns={paramColumns}
          dataSource={params}
          rowKey="param"
          pagination={false}
        />
      );
    }
  }

  render() {
    const {
      label, title, method, desc, pathname, headers, pathParams, queryParams,
      bodyParams, responseBody, errorCodes, example, action
    } = this.props;
    const { headersColumns, errorCodeColumns, responseBodyColumns } = this.state;

    return (
      <DocumentTitle title={`[${method}] ${title} - ${label} - 接口文档`}>
        <Layout.Content>
          <h1 className={styles.docTitle}>
            <MethodTag value={method} />
            <span>
              {title}
            </span>
          </h1>

          <p>
            {desc}
          </p>

          <h2>地址</h2>

          <div className={styles.docModule}>
            <MethodTag value={method} />
            <code>
              {pathname}
            </code>
          </div>

          {this.renderParamsTitle('地址栏', pathParams)}
          {this.renderParams(pathParams)}

          {!isEmpty(headers) && (<h2><code>headers</code></h2>)}
          <Table
            className={styles.docModule}
            dataSource={headers}
            columns={headersColumns}
            rowKey="key"
            pagination={false}
          />

          {action && (
            <div className={styles.docModule}>
              <Tag>接口动作</Tag>
              <code>{action}</code>
            </div>
          )}

          {this.renderParamsTitle('query', queryParams, { code: true })}
          {this.renderParams(queryParams)}

          {this.renderParamsTitle('body', bodyParams, { code: true })}
          {this.renderParams(bodyParams)}

          <h2>响应内容</h2>
          <Table
            className={styles.docModule}
            columns={responseBodyColumns}
            dataSource={responseBody}
            rowKey="key"
            pagination={false}
          />

          <h2>错误状态码</h2>
          <Table
            className={styles.docModule}
            columns={errorCodeColumns}
            dataSource={errorCodes}
            rowKey="note"
            pagination={false}
          />

          <h2>示例</h2>
          <h3>请求</h3>
          <pre>{example.request}</pre>
          <h3>响应</h3>
          <pre>{JSON.stringify(example.response, null, 2)}</pre>
        </Layout.Content>
      </DocumentTitle>
    );
  }
}
