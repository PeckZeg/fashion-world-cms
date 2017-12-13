/* global __CHANGELOG__: true */
import DocumentTitle from 'react-document-title';
import React, { PureComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import CardLayout from '~/src/components/layouts/CardLayout';

import 'github-markdown-css/github-markdown.css';

export default class ChangeLog extends PureComponent {
  render() {
    return (
      <DocumentTitle title="更新文档">
        <CardLayout>
          <ReactMarkdown
            className="markdown-body"
            source={__CHANGELOG__}
          />
        </CardLayout>
      </DocumentTitle>
    )
  }
}
