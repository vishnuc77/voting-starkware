## Interacting with voting contract deployed in goerli

## Does NOT use r and s values

## Prerequisites

1. node

## Get it running

1. Install the required npm packages and compile Cairo contracts
   `npm install`

2. Compile and Deploy the contracts

```
npx hardhat starknet-compile
npx hardhat starknet-deploy starknet-artifacts/contracts/Result.cairo --starknet-network alpha
npx hardhat starknet-deploy starknet-artifacts/contracts/Voter.cairo --inputs "<address-of-result-contract-here>" --starknet-network alpha
```

3. Front-end

```
cd frontend
npm install

Also change VOTER_ADDRESS and RESULT_ADDRESS in app.js

npm start
```

4. Get Argent X

```
https://github.com/argentlabs/argent-x#-install-from-sources
```
