require("dotenv").config();
const puppeteer = require("puppeteer");

async function getShifts() {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-save-password-bubble",
      "--disable-infobars",
      "--disable-autofill-keyboard-accessory-view",
    ],
  });
  const page = await browser.newPage();

  // 1️⃣ Go to login page
  await page.goto("https://secure.fourth.com/fmplogin", {
    waitUntil: "networkidle2",
  });

  // 2️⃣ Wait for inputs and fill credentials via direct injection (most reliable)
  await page.waitForSelector("input[type='email']", { visible: true });
  await new Promise((r) => setTimeout(r, 1000)); // wait for JS to settle

  await page.evaluate(
    (email, password) => {
      const emailInput = document.querySelector("input[type='email']");
      const passwordInput = document.querySelector("input[type='password']");

      emailInput.value = "";
      passwordInput.value = "";

      emailInput.value = email;
      passwordInput.value = password;
    },
    process.env.FOURTH_USERNAME,
    process.env.PASSWORD,
  );

  // 3️⃣ Submit login
  await page.click("input[type='submit']");

  // 4️⃣ Wait for navigation to finish
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // 5️⃣ Go to rota page
  await page.goto(process.env.ROTA_URL, { waitUntil: "networkidle2" });

  // 6️⃣ Wait for shifts to load
  await page.waitForSelector(".shift-item", { timeout: 20000 });

  // Extra delay to allow Ember rendering
  await new Promise((r) => setTimeout(r, 2000));

  // 7️⃣ Extract shifts
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
      const fullDate = `${day} ${date} ${month}`;

      const role = card.querySelector(".shift-item__role")?.innerText.trim();
      const times = card.querySelectorAll(".time__hours");
      const start = times[0]?.innerText.trim();
      const end = times[1]?.innerText.trim();
      const location = card.querySelector(".location__name")?.innerText.trim();

      return { date: fullDate, start, end, role, location };
    });
  });

  await browser.close();
  return shifts;
}

module.exports = { getShifts };
