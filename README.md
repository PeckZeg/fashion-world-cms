# Fashion World 内容管理系统 v3

## 设置代理

将文件夹中的 `_proxy.json` 重命名为 `proxy.json`，修改其中的 `"http://localhost:3003"` 即可（其中两遍的 `"` 双引号是必需的）。

## 全局变量

Variable          | Note
:---------------- | :-----
`__VERSION__`     | 应用版本
`__UPDATE_TIME__` | 最后更新时间 / 打包时间

## 路径简写

Variable        | Shortcut                      | Note
:-------------- | :---------------------------- | :----
`~`             | ``                            | 根目录
`@qiniu`        | `src/components/Qiniu`        | 七牛
`@table`        | `src/components/Table`        | 表格
`@table-column` | `src/components/Table/Column` | 表格栏
`@form-item`    | `src/components/Form/Item`    | 表单项
`@layout`       | `src/components/layouts`      | 布局
`@docs`         | `src/components/Docs`         | 文档
`@api-docs`     | `src/components/Docs/Api`     | 接口文档
