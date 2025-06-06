const { app } = require('@azure/functions');

app.http('negotiate', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    return {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: context.bindings.signalRConnectionInfo,
    };
  },
  extraInputs: [
    {
      type: 'signalRConnectionInfo',
      name: 'signalRConnectionInfo',
      hubName: 'ticketsHub', // Debe coincidir con el hub que usas en el frontend
    },
  ],
});

/*const { app } = require('@azure/functions');

app.http('negotiate', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});*/
