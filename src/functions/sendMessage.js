const { app, output } = require('@azure/functions');

const signalROutput = output.generic({
  type: 'signalR',
  name: 'signalR',
  hubName: 'default',
  connectionStringSetting: 'AzureSignalRConnectionString',
});

app.post('sendMessage', {
  authLevel: 'anonymous',
  handler: async (request, context) => {
    const message = await request.json();
    context.extraOutputs.set(signalROutput, {
      target: 'newMessage',
      arguments: [message],
    });
    return { status: 200, body: 'Message sent.' };
  },
  route: 'sendMessage',
  extraOutputs: [signalROutput],
});