export default function(...args) {
  return new Promise(resolve => {
    this.setState(...args, () => resolve(this.state));
  });
}
