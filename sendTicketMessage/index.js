module.exports = async function (context, req) {
  const ticket = req.body;

  context.bindings.signalRMessages = [{
    target: 'ticketCreated',
    arguments: [ticket]
  }];

  context.res = {
    status: 200,
    body: { message: 'SignalR message sent.' }
  };
};
