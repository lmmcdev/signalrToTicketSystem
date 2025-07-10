module.exports = async function (context, req) {
  const data = req.body;

  if (!data) {
    context.log('❌ No payload received');
    context.res = {
      status: 400,
      body: 'Missing data in request body',
    };
    return;
  }

  context.log(`📣 Updating data SignalR: ${data}`);

  context.bindings.signalRMessages = [
    {
      target: 'dailyStats',
      arguments: [data],
    },
  ];

  context.res = {
    status: 200,
    body: 'SignalR message sent successfully',
  };
};
