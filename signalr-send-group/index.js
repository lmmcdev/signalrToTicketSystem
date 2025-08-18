// v3 - CommonJS
module.exports = async function (context, req) {
  try {
    const body = req.body || {};

    // Puede venir groupName (string) o groupNames (array)
    const singleGroup = typeof body.groupName === 'string' && body.groupName.trim();
    const manyGroups = Array.isArray(body.groupNames) ? body.groupNames.filter(Boolean) : [];

    const target = (body.target || 'notify').toString();
    const payload = body.payload ?? {}; // objeto o array, lo enviamos como único argumento

    // Normaliza la lista de grupos destino
    const groups = singleGroup ? [singleGroup] : manyGroups;

    if (!groups.length) {
      return (context.res = { status: 400, body: 'groupName or groupNames is required' });
    }

    // Construye mensajes: uno por grupo
    context.bindings.signalRMessages = groups.map((g) => ({
      groupName: g,
      target,
      arguments: [payload], // SIEMPRE array de argumentos
    }));

    context.res = {
      status: 200,
      body: { ok: true, groups, target }
    };
  } catch (err) {
    context.log('❌ signalr-send-group error:', err);
    context.res = { status: 500, body: { error: err.message || 'Internal error' } };
  }
};


/*

curl -X POST "https://<tu-func-app>.azurewebsites.net/api/signalr/send-group?code=<FUNCTION_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "groupNames": ["department:Referrals","department:Switchboard"],
    "target": "dailyStats",
    "payload": { "id":"2025-08-18", "date":"2025-08-18" }
  }'

  */