module.exports = async function (context, req) {
  const data = req.body;

  if (!data) {
    context.log('❌ No ticket payload received');
    context.res = {
      status: 400,
      body: 'Missing ticket data in request body',
    };
    return;
  }

  context.log(`📣 Updating ticket a SignalR: ${data}`);

  context.bindings.signalRMessages = [
    {
      target: 'dailyStats',
      arguments: [],
    },
  ];

  context.res = {
    status: 200,
    body: 'SignalR message sent successfully',
  };
};
