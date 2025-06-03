const { app, input } = require('@azure/functions');

const inputSignalR = input.generic({
  type: 'signalRConnectionInfo',
  name: 'connectionInfo',
  hubName: 'default',
  connectionStringSetting: 'AzureSignalRConnectionString',
});

app.post('negotiate', {
  authLevel: 'anonymous',
  handler: (request, context) => {
    return { body: JSON.stringify(context.extraInputs.get(inputSignalR)) }
  },
  route: 'negotiate',
  extraInputs: [inputSignalR],
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
