require("dotenv").config();
const puppeteer = require("puppeteer");

async function getShifts() {
  const browser = await puppeteer.launch({
    headless: true, // no browser window on server
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.goto("https://secure.fourth.com/fmplogin", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("input[type='email']", { visible: true });
  await new Promise((r) => setTimeout(r, 1000));

  // Type into fields properly so JS frameworks detect the change
  await page.click("input[type='email']", { clickCount: 3 });
  await page.type("input[type='email']", process.env.FOURTH_USERNAME);
  await page.click("input[type='password']", { clickCount: 3 });
  await page.type("input[type='password']", process.env.PASSWORD);

  await page.click("input[type='submit']");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  await page.goto(process.env.ROTA_URL, { waitUntil: "networkidle2" });
  await page.waitForSelector(".shift-item", { timeout: 20000 });
  await new Promise((r) => setTimeout(r, 2000));

  const shifts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".shift-item")).map((card) => {
      const dateContainer = card.querySelector(".shift-item__date");
      const day = dateContainer
        ?.querySelector("span:nth-child(1)")
        ?.innerText.trim();
      const date = dateContainer
        ?.querySelector(".date__dateLabel")
        ?.innerText.trim();
      const month = dateContainer
        ?.querySelector(".date__monthLabel")
        ?.innerText.trim();

      const times = card.querySelectorAll(".time__hours");

      return {
        date: `${day} ${date} ${month}`,
        start: times[0]?.innerText.trim(),
        end: times[1]?.innerText.trim(),
        role: card.querySelector(".shift-item__role")?.innerText.trim(),
        location: card.querySelector(".location__name")?.innerText.trim(),
      };
    });
  });

  await browser.close();
  return shifts;
}

module.exports = { getShifts };
