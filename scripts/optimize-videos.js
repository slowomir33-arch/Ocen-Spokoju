#!/usr/bin/env node
const { spawn } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

const root = process.cwd();
const pub = join(root, 'public');

const inputs = [
  { in: 'relaxing-forest.mp4', base: 'relaxing-forest' },
  { in: 'hero-video.mp4', base: 'hero-video' },
];

function run(cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd, stdio: 'inherit', shell: false });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`))));
  });
}

async function main() {
  // Check ffmpeg availability
  try {
    await run('ffmpeg', ['-version']);
  } catch (e) {
    console.error('\nError: ffmpeg is not installed or not in PATH.');
    console.error('Install ffmpeg and re-run: npm run optimize:videos');
    process.exit(1);
  }

  for (const { in: input, base } of inputs) {
    const inputPath = join(pub, input);
    if (!existsSync(inputPath)) {
      console.warn(`Skip: ${input} not found in public/`);
      continue;
    }

    const webmOut = join(pub, `${base}.webm`);
    const mp4Out = join(pub, `${base}.optimized.mp4`);

    console.log(`\nConverting ${input} -> ${base}.webm (VP9)`);
    await run('ffmpeg', [
      '-y',
      '-i', inputPath,
      '-c:v', 'libvpx-vp9',
      '-b:v', '0',
      '-crf', '36',
      '-row-mt', '1',
      '-an',
      webmOut,
    ], root);

    console.log(`\nCompressing ${input} -> ${base}.optimized.mp4 (H.264)`);
    await run('ffmpeg', [
      '-y',
      '-i', inputPath,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', '28',
      '-movflags', '+faststart',
      '-an',
      mp4Out,
    ], root);
  }

  console.log('\nDone. Add <source> tags for .webm first for best compatibility.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
