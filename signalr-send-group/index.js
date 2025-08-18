// v3 - CommonJS
module.exports = async function (context, req) {
  const body = req.body || {};
  const groupName = body.groupName;
  const target = body.target || 'notify';   // nombre del método en el cliente
  const payload = body.payload ?? {};       // lo que quieras enviar

  if (!groupName) {
    return { status: 400, body: 'groupName is required' };
  }

  // Mensaje a un grupo: el cliente debe tener connection.on(target, handler)
  context.bindings.signalRMessages = [
    {
      groupName,
      target,
      arguments: [payload]  // siempre array
    }
  ];

  return {
    status: 200,
    body: { ok: true, groupName, target }
  };
};
