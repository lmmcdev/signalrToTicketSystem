// signalr-send-broadcast/index.js
module.exports = async function (context, req) {
  try {
    const body = req.body || {};
    const target = (body.target || 'notify').toString();
    const payload = body.payload ?? {};

    // ⚡ Binding especial para broadcast
    context.bindings.signalRMessages = [
      {
        target,
        arguments: [payload], // SIEMPRE array
      },
    ];

    context.res = {
      status: 200,
      body: { ok: true, target },
    };
  } catch (err) {
    context.log('❌ signalr-send-broadcast error:', err);
    context.res = { status: 500, body: { error: err.message || 'Internal error' } };
  }
};
