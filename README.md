📅 Rota Notification Bot

A lightweight backend service that automatically checks rota schedules and sends notifications. Designed to run reliably in cloud environments like Railway.

🚀 Features
Automated rota checking
Scheduled background execution
Multi-user architecture (Planned)
Cloud deployment support (Railway)
Headless browser automation using Puppeteer
Error logging and monitoring

🛠️ Tech Stack
Node.js
Puppeteer / puppeteer-core
Express (optional API layer)
Cron jobs (node-cron / custom scheduler)
Deployment: Railway

📂 Project Structure
backend/
├── src/
│   ├── services/       # Rota scraping logic
│   ├── jobs/           # Scheduled tasks
│   ├── utils/          # Helper functions
│   └── index.js        # Entry point
├── .env
├── package.json
└── README.md
