# Bitcore Lib Value

// TO-DO

[![NPM Package](https://img.shields.io/npm/v/@sotatek-anhdao/bitcore-lib-value.svg?style=flat-square)](https://www.npmjs.com/package/@sotatek-anhdao/bitcore-lib-value)

**A pure and powerful JavaScript Bitcoin *Value* library.**

## Principles

Bitcoin Value is another powerful peer-to-peer platform for the next generation of financial technology. The decentralized nature of the Bitcoin network allows for highly resilient bitcoin infrastructure, and the developer community needs reliable, open-source tools to implement bitcoin apps and services.

## Bitcoin Value changes

!!!TO-DO

## Get Started

```sh
npm install bitcore-lib-value
```

Adding Bitcore Value to your app's `package.json`:

```json
"dependencies": {
  "bitcore-lib-value": "^8.22.10",
  ...
}
```

## Documentation

The complete docs are hosted here: [bitcore documentation](). There's also a [bitcore API reference]() available generated from the JSDocs of the project, where you'll find low-level details on each bitcore utility.

## Examples

- [Generate a random address](docs/examples.md#generate-a-random-address)
- [Generate a address from a SHA256 hash](docs/examples.md#generate-a-address-from-a-sha256-hash)
- [Import an address via WIF](docs/examples.md#import-an-address-via-wif)
- [Create a Transaction](docs/examples.md#create-a-transaction)
- [Sign a Bitcoin message](docs/examples.md#sign-a-bitcoin-message)
- [Verify a Bitcoin message](docs/examples.md#verify-a-bitcoin-message)
- [Create an OP RETURN transaction](docs/examples.md#create-an-op-return-transaction)
- [Create a 2-of-3 multisig P2SH address](docs/examples.md#create-a-2-of-3-multisig-p2sh-address)
- [Spend from a 2-of-2 multisig P2SH address](docs/examples.md#spend-from-a-2-of-2-multisig-p2sh-address)

## Building the Browser Bundle

To build a bitcore-lib full bundle for the browser:

```sh
gulp browser
```

This will generate files named `bitcore-lib.js` and `bitcore-lib.min.js`.

// TO-DO

You can also use our pre-generated files, provided for each release along with a PGP signature by one of the project's maintainers. To get them, checkout the [releases]().

## Development & Tests

// TO-DO

```sh
git clone #link_here
cd bitcore-lib
npm install
```

Run all the tests:

```sh
gulp test
```

You can also run just the Node.js tests with `gulp test:node`, just the browser tests with `gulp test:browser` or create a test coverage report (you can open `coverage/lcov-report/index.html` to visualize it) with `gulp coverage`.

## Security

We're using Bivcore in production, as are many others, but please use common sense when doing anything related to finances! We take no responsibility for your implementation decisions.

// TO-DO

If you find a security issue, please email #email_here.

## Contributing

// TO-DO

See [CONTRIBUTING.md]() on the main bivcore repo for information about how to contribute.

## License

// TO-DO