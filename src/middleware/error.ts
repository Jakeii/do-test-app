import { Context, Next } from 'koa';

/* eslint-disable no-console */
export default async function (ctx: Context, next: Next): Promise<void>{
  let err;
  try {
    await next();
  } catch (error) {
    err = error;
    if (typeof error === 'function') {
      err = error();
    }

    let status = err.status || 500;
    let message = err.message && status < 500
      ? err.message
      : 'Sorry, an error has occurred.';
    
    if (err.message === 'Unable to acquire a connection') {
      status = 503;
      message = 'Service unavailable';
    }

    ctx.status = status;

    // for validation errors
    if (err.errors) {
      ctx.body = { errors: err.errors };
    } else {
      ctx.body = {
        status: status,
        message: message
      };
    }

    ctx.app.emit('error', err, ctx);
  }
}
