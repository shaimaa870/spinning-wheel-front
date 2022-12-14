export default function delay(ms) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, ms);
  });
}
