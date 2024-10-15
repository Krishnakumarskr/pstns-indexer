# Consumer

This package consumes the events from the Kafka topic, which were previously produced and filtered in the Transformer layer. The Consumer then performs two primary functions:

1. **Data Storage**: The package saves the consumed data into the database. It efficiently stores the relevant events, ensuring seamless access to the data for further processing.

2. **Endpoint Exposition**: The Consumer exposes endpoints to clients, enabling them to retrieve the stored data from the database. These endpoints provide a convenient and structured way for clients to access the indexed blockchain data related to MATIC token transfers.

## How to Use

Note: Make sure you are inside the examples/matic_transfer/consumer folder.

### 1. Set Configuration

Begin by configuring your environment variables. Copy the `.env.example` file and rename it to `.env`. Then, provide appropriate values for the keys mentioned in the `.env` file.

### 2. Install Packages

Install the required packages by running the following command:

```
npm i
```

### 3. Build the Package

Build the package by executing the following command:

```
npm run build
```

### 4. Run the Package

Run the producer service using the following command:

```
npm run start
```

This documentation clarifies the setup and usage of the Consumer package in the Chain Indexer Framework project, making it easier for developers to integrate the package into their applications or utilize it for debugging and testing purposes.
