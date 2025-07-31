module.exports = async function (context, req) {
  const userId = req.body && req.body.userId;
  
  if (!userId) {
    context.log('❌ Missing userId in negotiation request');
    context.res = {
      status: 400,
      body: 'userId is required for negotiation'
    };
    return;
  }

  context.log(`🔐 Negotiating SignalR connection for userId: ${userId}`);

  try {
    const connectionInfo = context.bindings.signalRConnectionInfo;

    context.res = {
      status: 200,
      body: connectionInfo
    };

    context.log('✅ Negotiation success');
  } catch (err) {
    context.log('❌ Error in negotiate function:', err);
    context.res = {
      status: 500,
      body: { error: 'Failed to negotiate SignalR connection', message: err.message }
    };
  }
};
