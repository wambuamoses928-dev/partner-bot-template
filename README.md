# partner bot template

Copy this repo, put your bot in `index.js`, and it hosts on Moses's server.

Deploy (this is the only call you make):

    curl -s -X POST https://80-240-20-28.sslip.io/api/host/deploy \
      -H "x-partner-key: $PARTNER_KEY" -H 'content-type: application/json' \
      -d '{"name":"mybot","repo":"https://github.com/YOU/mybot","branch":"main","start":"node index.js","port":3100}'

Call the same thing again after every push: it pulls, installs, restarts.

Read it back:

    curl -s "https://80-240-20-28.sslip.io/api/host/app?name=mybot" -H "x-partner-key: $PARTNER_KEY"

Rules of the house: your process gets its own directory, its own log, a
memory cap, and an environment with nothing of Moses's in it. Listen on the
port you're given, answer SIGTERM, and don't expect root, Docker or systemd.
