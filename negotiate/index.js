module.exports = async function (context, req) {
  
  const userId = req.query.userId || (req.body && req.body.userId);
  if (!userId) {
    context.log('❌ Missing userId in negotiation request');
    return {
      status: 400,
      body: 'userId is required for negotiation'
    };
  }

  context.log(`🔐 Negotiating SignalR connection for userId: ${userId}`);

  const connectionInfo = await context.signalRConnectionInfo.get({
    userId: userId  // ← Esto se propaga al token
  });
  
  try {

    context.log('✅ Negotiation success');
    return {
      status: 200,
      body: connectionInfo
    };
  } catch (err) {
    context.log('❌ Error in negotiate function:', err);
    return {
      status: 500,
      body: { error: 'Failed to negotiate SignalR connection', message: err.message }
    };
  }
};