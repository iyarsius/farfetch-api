# Farfetch Api

## Description

The Farfetch api is a TypeScript module designed to scrape products data from the Farfetch website. It provides structured types and classes to represent the scraped data, making it easy to integrate into other applications.

## Installation

To install the Farfetch Api module, run the following command:

```bash
npm install farfetch-api
```

## Usage

Here is an example of how to use the Farfetch Api module:

### Search for products

```ts
import { Farfetch } from 'farfetch-api';

// Create a new client
const farfetch = new Farfetch({
    countryCode: "fr",
    currencyCode: "EUR"
});

// Connect to the Farfetch API
await farfetch.connect();

// Search for products
const products = await farfetch.search("nike", {
    page: "1",
    sort: "rankings",
    imagesSizes: "1920",
    pageSize: "10"
});

// Fetch details for the first product
const product = await products[0];
await product.fetchDetails();
```
### Get products by ID
```ts
// Works only with farfetch internal ID
const product = await farfetch.get(12345678)

// Doesn't need to fetch details
product.isFetched() // true
```

## Reuse Auth Token

You can reuse the auth token to avoid reconnecting to the API every time.

```ts
import { Farfetch } from 'farfetch-api';

// Create a new client
const farfetch = new Farfetch({
    countryCode: "fr",
    currencyCode: "EUR",
    authToken: {
        access_token: "your_access_token",
        expires_in: 3600,
        token_type: "Bearer",
        scope: "api"
    }
});
```

## Contributing

This module is far from providing full api coverage, i just made it for my own use case. Feel free to expand it's features and submit a pull request so it could be useful for more use cases.