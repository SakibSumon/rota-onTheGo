const { getShifts } = require("./scraper");

(async () => {
  const shifts = await getShifts();
  console.log(shifts);
})();
