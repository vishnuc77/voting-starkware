import { expect } from "chai";
import { starknet } from "hardhat";
const starkwareCrypto = require('../cryptofns');
require('dotenv').config()
const { encode, hash, compileCalldata} = require("starknet");


const findPubKey = (key: any) => {
  let keyPair = starkwareCrypto.ec.keyFromPrivate(key);
  let pubKey = keyPair.getPublic().getX().toString();
  return BigInt(pubKey);
}

// // const signatureForVoting = (pollId: any, voteValue: any, privateKey: any) => {
// //   const pedersenHash = starkwareCrypto.pedersen([pollId, voteValue]);
// //   const signature = starkwareCrypto.sign(pedersenHash, privateKeys);
// // }

describe("My Test", function () {
//   //this.timeout(300_000); // 5 min - recommended if used with Alpha testnet
//   // this.timeout(30_000); // 30 seconds - recommended if used with starknet-devnet

//   this.timeout(600_000); // 10 min
//   let preservedAddress;

//   let voterContract: any;
//   let resultContract: any;
//   let alice: any, bob: any, charlie: any, dave: any;
//   let aliceP: any, bobP: any, charlieP: any, daveP: any;

  before(async function() {
    // const voter = await starknet.getContractFactory("Voter");
    // const record = await starknet.getContractFactory("Result");
    // console.log("Started deployment");

    // resultContract = await record.deploy();
    // console.log("Result contract deployed at:", resultContract.address);

    // voterContract = await voter.deploy({result_recorder_address: BigInt(resultContract.address)});
    // console.log("Voting contract deployed at:", voterContract.address);

    // let privateKeys = [process.env.PRIVATE_KEY1, process.env.PRIVATE_KEY2, process.env.PRIVATE_KEY3, process.env.PRIVATE_KEY4];
    // [alice, bob, charlie, dave] = privateKeys;
    // [aliceP, bobP, charlieP, daveP] = privateKeys.map(findPubKey);
    // console.log(aliceP);
    
  });

  it("should initialize poll", async function () {
    // const initResult = await voterContract.invoke("init_poll", {poll_id: 1, public_key: aliceP});
    const account = "0x05e5c0d15ce2545aeb32ae4823608ea7bde8cd86fa8b94ee83a207b965245e8";
    const to = "0x04cd166762b711f8ae1680164db695406b9f4453c4c9a0691f71d46d077bcdc";
    const selector = "vote";
    const nonce = "1";

    const callDatahash = compileCalldata({"poll_id":1, "vote":"1", "public_key":account});
    console.log(callDatahash);

    const messageHash = encode.addHexPrefix(
        hash.hashCalldata(callDatahash),
    );

    // console.log(messageHash);

  });
});