export default ({ total, offset, limit }) => ({
  total,
  current: offset,
  defaultPageSize: limit,
  showSizeChanger: true,
  pageSizeOptions: ['2', '10', '20', '50', '100'],
  showQuickJumper: true,
  showTotal: (total, range) => `${range[0]}-${range[1]}, 共计 ${total} 项`
});
