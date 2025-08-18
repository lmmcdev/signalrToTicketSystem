// v3 - CommonJS
module.exports = async function (context, req) {
  const body = req.body || {};
  const userId = body.userId;
  const groupName = body.groupName;
  const action = (body.action || 'add').toLowerCase(); // 'add' | 'remove'

  if (!userId || !groupName) {
    return { status: 400, body: 'userId and groupName are required' };
  }
  if (!['add', 'remove'].includes(action)) {
    return { status: 400, body: "action must be 'add' or 'remove'" };
  }

  context.bindings.signalRGroupActions = [
    { action, userId, groupName }
  ];

  return {
    status: 200,
    body: { ok: true, action, userId, groupName }
  };
};
