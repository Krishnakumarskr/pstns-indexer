# Examples

Token-transfer is an exemplary project that showcases the usage of Chain Indexer Framework to index a particular ERC-20 token transfers occurring on the Ethereum blockchain.

## Overview

The folder consists of a high level example consisting of three distinct packages, each serving a specific function:

1. **Producers**: This package acts as the initial entry point for the indexer service. It collects all blockchain data from a particular chain and streams it into Kafka without any discrimination.

2. **Transformers**: The Transformers package consumes the blockchain data from the Kafka stream generated by the producers. It then filters out the token transfers and reproduces these events to a dedicated topic within the Kafka stream.

3. **Consumers**: Consumers are responsible for subscribing to the event-specific Kafka stream and persisting the data into a database. Additionally, they expose endpoints that allow clients to retrieve the data according to their specific requirements.

This example serves as a useful reference for understanding how Chain Indexer Framework can be effectively utilized to manage and process blockchain data efficiently.

## How to Build and Run

This project can be built and run on Windows, MacOS, and Linux. To get started, follow these steps:

**Step 1: Install Kafka**

You have two options for running Kafka, either inside a Docker container or locally without Docker.

Option 1: **Inside Docker**

- Install Docker and verify the installation:

  - ```bash
    docker --version
    ```

- Run Docker Compose from the "dev-env" directory. Make sure that the Docker daemon is running:
  - ```bash
    cd dev-env
    docker compose up -d
    ```

Option 2: **Run Locally without Docker**

- Download kafka from [here](https://www.apache.org/dyn/closer.cgi?path=/kafka/3.6.0/kafka_2.13-3.6.0.tgz)

- Move to the Kafka folder you downloaded:

  - ```bash
    cd kafka_2.13-3.6.0
    ```

- Run Zookeeper:

  - ```bash
    bin/zookeeper-server-start.sh config/zookeeper.properties
    ```

- Run Kafka:
  - ```bash
    bin/kafka-server-start.sh config/server.properties
    ```

**Step 2: Install and Run MongoDB**

Ensure that MongoDB is installed and its service is running. Follow these steps to install MongoDB:

- ```bash
  curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
  apt-key list
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
  sudo apt update
  sudo apt install mongodb-org
  sudo systemctl start mongod.service
  sudo systemctl status mongod
  ```

**Step 3: Build and Run Services**

- Run [TOKEN_TRANSFER](./token_transfer/README.md)
