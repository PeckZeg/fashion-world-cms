/**
 *  创建时间线项目
 *  @param {object} props 扩展属性
 *  @param {React.Component} label 标签
 */
export default function(...args) {
  let props = args[0];
  let label = args[1];

  if (args.length === 1) {
    props = {};
    label = args[0];
  }

  return {
    createAt: new Date(),
    label,
    ...props
  };
};
