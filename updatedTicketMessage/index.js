module.exports = async function (context, req) {
  const ticket = req.body;

  if (!ticket) {
    context.log('❌ No ticket payload received');
    context.res = {
      status: 400,
      body: 'Missing ticket data in request body',
    };
    return;
  }

  context.log(`📣 Updating ticket a SignalR: ${ticket.id || 'sin ID'}`);

  context.bindings.signalRMessages = [
    {
      target: 'ticketUpdated',
      arguments: [ticket],
    },
    {
      target: 'statsUpdated',
      arguments: [],
    },
  ];

  context.res = {
    status: 200,
    body: 'SignalR message sent successfully',
  };
};
