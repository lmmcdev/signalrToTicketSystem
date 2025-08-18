// index.js — estilo $return
module.exports = async function (context, req) {
  const userId = req.body?.userId ?? req.body?.body?.userId;
  if (!userId) {
    return { status: 400, body: 'userId is required for negotiation' };
  }

  const connectionInfo = context.bindings.signalRConnectionInfo;
  return { status: 200, body: connectionInfo };
};
