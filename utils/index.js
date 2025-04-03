const sendForNSeconds = (seconds, callback) => {
  let loop = 1;
  const interval = setInterval(() => {
    if (loop === seconds) {
      clearInterval(interval);
    }
    callback()
    loop = +loop + 1;
  }, 1000);
};

const generateUniqueNumbersArray = (n, min = 1, max = 100) => {
  if (max - min + 1 < n) {
    throw new Error("Range too small for unique numbers.");
  }

  const numbers = new Set();
  while (numbers.size < n) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return Array.from(numbers);
};

module.exports = { sendForNSeconds, generateUniqueNumbersArray };
