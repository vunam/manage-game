export const showApiResult = (ctx, data, meta = {}, status = 200) => {
  ctx.status = status;
  ctx.body = {
    data,
    meta,
  };
};
export const showApiError = (ctx, error, status) => {
  ctx.status = status;
  ctx.body = {
    error,
  };
};
