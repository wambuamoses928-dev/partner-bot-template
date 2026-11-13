/**
 * Minimal partner bot template.
 *
 * Runs on the port the host gives it (process.env.PORT) and answers
 * /health so the host can tell it is alive. Replace the body with your bot:
 * a Telegram poller, a WhatsApp socket, a webhook receiver, anything that
 * runs as a Node process on the port you were given.
 */
const http = require("http");

const PORT = Number(process.env.PORT || 3000);
const started = Date.now();

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ ok: true, uptime: Math.round((Date.now() - started) / 1000) }));
    return;
  }
  res.writeHead(404, { "content-type": "application/json" });
  res.end(JSON.stringify({ error: "not_found" }));
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`partner bot listening on 127.0.0.1:${PORT}`);
});

process.on("SIGTERM", () => server.close(() => process.exit(0)));
