import { parentPort } from "worker_threads";

parentPort!.on("message", (n: number) => {
  parentPort!.postMessage(n * 2);
});