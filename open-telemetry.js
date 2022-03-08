// Import required symbols
const { HttpInstrumentation } = require ('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require ('@opentelemetry/instrumentation-express');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { NodeTracerProvider } = require("@opentelemetry/node");
const { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } = require ("@opentelemetry/tracing");
const { Resource } = require('@opentelemetry/resources');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger')
const { MongoDBInstrumentation } = require('@opentelemetry/instrumentation-mongodb');
const { GraphQLInstrumentation } = require('@opentelemetry/instrumentation-graphql');


// Register server-related instrumentation
registerInstrumentations({
  instrumentations: [
    new GraphQLInstrumentation(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new MongoDBInstrumentation()
  ]
});

// Initialize provider and identify this particular service
// (in this case, we're implementing a federated gateway)


const provider = new NodeTracerProvider({
  resource: Resource.default().merge(new Resource({
    // Replace with any string to identify this service in your system
    "service.name": "gateway",
  })),
});



const jaegerExporter = new JaegerExporter({
  tags: [],
  endpoint: `http://localhost:14268/api/traces`,
});

provider.addSpanProcessor(
  new BatchSpanProcessor(jaegerExporter)
);

//added
// const consoleExporter = new ConsoleSpanExporter();
// provider.addSpanProcessor(
//   new SimpleSpanProcessor(consoleExporter)
// );

// Register the provider to begin tracing
provider.register();
