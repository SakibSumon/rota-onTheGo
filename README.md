# 📅 Rota Notification Bot

A lightweight backend service that automatically checks rota schedules and sends notifications. Built for reliability in cloud environments like Railway.

---

## 🚀 Features

- Automated rota checking  
- Scheduled background execution  
- Cloud-ready deployment (Railway)  
- Headless browser automation (Puppeteer)  
- Error logging and monitoring  
- Scalable architecture (multi-user ready)

---

## 🛠️ Tech Stack

- Node.js  
- Puppeteer / puppeteer-core  
- Express (optional)  
- node-cron (or custom scheduler)  

---

## 📂 Project Structure

backend/
├── src/
│   ├── services/       # Rota scraping logic
│   ├── jobs/           # Scheduled tasks
│   ├── utils/          # Helper functions
│   └── index.js        # Entry point
├── .env
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rota-bot.git
cd rota-bot/backend
