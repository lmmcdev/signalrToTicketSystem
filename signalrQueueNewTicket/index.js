// signalrQueueConsumer/index.js

module.exports = async function (context, ticket) {
  if (!ticket) {
    context.log('❌ No ticket payload received from queue');
    return;
  }

  context.log(`📣 Enviando ticket a SignalR desde cola: ${ticket.id || 'sin ID'}`);

  context.bindings.signalRMessages = [
    {
      target: 'ticketCreated',
      arguments: [ticket],
    },
    {
      target: 'statsUpdated',
      arguments: [],
    },
  ];
};
