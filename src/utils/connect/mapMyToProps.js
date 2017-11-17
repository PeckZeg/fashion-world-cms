export default ({ reducers }) => ({
  token: reducers.my.token,
  my: reducers.my || {}
});
