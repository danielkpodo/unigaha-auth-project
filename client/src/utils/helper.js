// Promisify setTimeout
const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000 * seconds);
  });
};

export default wait;
