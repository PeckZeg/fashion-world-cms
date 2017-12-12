# Fashion World 内容管理系统 v3

## 项目配置

项目配置文件为 `fw.config.json`，内容为

```json
{
  "proxy": "<< 接口代理地址 >>",
  "copyTo": "<< 复制到的服务端路径 >>"
}
```

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
