# Insurance Smart Contract for EVM-Compatible Blockchains

Key Features:

- Premiums range $0.01 - $1000 (one-time payment)
- Settlement is always $100
- Expiry is predefined (weekly or yearly)
- Everyone can be insurance provider or taker
- Insured asset can be binary or continously priced (stocks, )

Technical Features:

- Front-running is prevented by specifying premium when calling the contract
- Historical prices are updated to a custom oracle contract
- Calling the contract with taker's address settles all his expired positions
- One Ticker per Insurance + Oracle Contract pair (with multiple expiration dates)
- One Lot is a single policy
- Up to 1000 lots (=$10000 max settlement value) can be provided at single Insurance Level (2 digit precision) and Expiration combination

### TODO's for this Contract Template:

- [ ] Make possible to provide at multiple prices and levels within single expiration
- [ ] Smart contract transaction bundler (multiple interactions at the same time to save gas)
- [ ] Ability to close policy before settlement (for provider, taker)
- [ ] Provide with zero risk (open in both directions together)
- [ ] Add uptrend protection (this contract is only for downtrend protection)
- [ ] Allow takers to post quotes
- [ ] Allow different stablecoins as deposit/withdraw
- [ ] Allow oracle data verification period (people can raise issue to be hand-validated)

### Roadmap for the project

- Insure entire defi protocols (ex. fail/not fail in a year; confirmed with vote?)
- Insure a token, by provider adding the contract address
- Multichain: Ethereum providers can be accessed on Solana, etc

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
