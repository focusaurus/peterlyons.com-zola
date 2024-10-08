import { promisify } from "./util.js";
import handler from "serve-handler";
import http from "http";

async function start(port) {
  process.chdir(`${__dirname}/../public`);
  const server = http.createServer(handler);
  const listen = promisify(server.listen.bind(server));
  await listen(port);
  console.log("HTTP server running on port", port);
  return server;
}

// if (require.main === module) {
  start(Number(process.env.PORT));
// }
