// v3 - CommonJS
module.exports = async function (context, req) {
  try {
    const body = req.body || {};

    console.log('body request:', body);
    // Puede venir userId (string) o userIds (array)
    const singleUser = typeof body.userId === 'string' && body.userId.trim();
    const manyUsers = Array.isArray(body.userIds) ? body.userIds.filter(Boolean) : [];

    const target = (body.target || 'notify').toString();
    const payload = body.payload ?? {}; // objeto o array, lo enviamos como único argumento

    // Normaliza la lista de usuarios destino
    const users = singleUser ? [singleUser] : manyUsers;

    if (!users.length) {
      return (context.res = { status: 400, body: 'userId or userIds is required' });
    }

    // Construye mensajes: uno por userId
    context.bindings.signalRMessages = users.map((u) => ({
      userId: u,
      target,
      arguments: [payload], // SIEMPRE array de argumentos
    }));

    context.res = {
      status: 200,
      body: { ok: true, users, target }
    };
  } catch (err) {
    context.log('❌ signalr-send-users error:', err);
    context.res = { status: 500, body: { error: err.message || 'Internal error' } };
  }
};
