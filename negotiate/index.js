module.exports = async function (context, req) {
  const connectionInfo = context.bindings.signalRConnectionInfo;
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