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

  context.log(`📣 Closing ticket a SignalR: ${ticket.id || 'sin ID'}`);

  context.bindings.signalRMessages = [
    {
      target: 'ticketClosed',
      arguments: [ticket],
    },
  ];

  context.res = {
    status: 200,
    body: 'SignalR message sent successfully',
  };
};
