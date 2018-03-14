#!/usr/bin/env node

const Canvas = require('canvas');
const moment = require('moment');

function print(ctx, when) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  ctx.font = Math.max(12, 3*height/4).toFixed(1) + 'px sans-serif';
  const text = moment(when).format('h:mm');
  const metrics = ctx.measureText(text);
  const x = Math.random() * (width - metrics.width);
  const y = Math.random() *
      (height - metrics.actualBoundingBoxDescent - metrics.actualBoundingBoxAscent) +
      metrics.actualBoundingBoxAscent;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y);
  const data = ctx.getImageData(0, 0, width, height);
  let offset = 0;
  const chars = [];
  for (let row = 0; row < height; row++) {
    chars.length = 0;
    for (let col = 0; col < width; col++) {
      chars.push(data.data[offset] ? '.' : ' ');
      offset += 4;
    }
    console.log(chars.join(''));
  }
}

function loop(ctx) {
  const now = new Date();
  print(ctx, now);
  setTimeout(() => loop(ctx), 60000 - (now.getTime() % 60000));
}

function quit() {
  if (process.stdout.isTTY) console.log('\u001B[?25h');
  process.exit();
}

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  require('readline').emitKeypressEvents(process.stdin);
  process.stdin.on('keypress', quit);
}

if (process.stdout.isTTY) {
  process.on('SIGINT', quit);
  console.log('\u001B[?25l');
}

const width = Math.max(60, process.stdout.columns || 0);
const height = Math.max(12, process.stdout.rows || 0);
const ctx = new Canvas(width, height).getContext('2d');
loop(ctx);
