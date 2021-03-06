
function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

async function run(fn, options) {
  if (!fn.default) return;

  const start = new Date();
  console.log(`[${format(start)}] Starting '${fn.default.name}'...`);
  await fn.default(options);
  const end = new Date();
  const time = end.getTime() - start.getTime();
  const timeStr = time < 1000 ? `${time} ms` : `${Math.floor(time / 1000)} seconds`;
  console.log(`[${format(end)}] Finished '${fn.default.name}' after ${timeStr}`);
}

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
  delete require.cache[__filename];
  const module = process.argv[2];
  run(require(`./${module}.js`).default()).catch(err => console.error(err.stack));
}

export default run;
