app.http('createTicket', {
  methods: ['POST'],
  authLevel: 'function',
  handler: async (request, context) => {
    const ticket = await request.json();

    // lógica para guardar el ticket...

    context.extraOutputs.signalROutput = [{
      target: 'ticketCreated',
      arguments: [ticket],
    }];

    return {
      status: 201,
      body: ticket,
    };
  },
  extraOutputs: [
    {
      type: 'signalR',
      name: 'signalROutput',
      hubName: 'ticketsHub',
    },
  ],
});
