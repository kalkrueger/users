// Import required symbols
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { NodeTracerProvider } from "@opentelemetry/node";
import { SimpleSpanProcessor, ConsoleSpanExporter, BatchSpanProcessor } from "@opentelemetry/tracing";
import { Resource } from '@opentelemetry/resources';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import  opentelemetry  from '@opentelemetry/sdk-node'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'


// Register server-related instrumentation
registerInstrumentations({
  instrumentations: [
    new GraphQLInstrumentation(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new MongoDBInstrumentation(),
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


// Register the provider to begin tracing
export default provider.register();
