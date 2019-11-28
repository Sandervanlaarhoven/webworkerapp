// block for `time` ms, then return the number of loops we could run in that time:
self.onmessage = (event) => {
  const time = event.data
  let start = Date.now(),
    count = 0;
  while (Date.now() - start < time) count++;
  self.postMessage(count)
}
