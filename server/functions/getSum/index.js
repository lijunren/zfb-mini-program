'use strict';

module.exports = async function (ctx) {
  const { x = 0, y = 0 } = ctx.args;

  return x + y;
};
