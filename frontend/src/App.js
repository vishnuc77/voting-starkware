import React from "react";
import { getStarknet } from "@argent/get-starknet"
import { useState } from "react";

import { stark, compileCalldata } from 'starknet';


const VOTER_ADDRESS ="0x02048f29f9b97e9526077478925f569da4215daa6dd9329c033f29df08f65228";
const RESULT_ADDRESS ="0x05ff5e16caf8a8be54655be16f4560d37a6986451376dcea236888cb7d0f3e32";

  function App() {
    const [ pollId, setPollId ] = useState(0);
    const [ voteIndex, setVoteIndex ] = useState(0);
    const [ tx, setTx ] = useState(0);
    const [ voterAddress, setVoterAddress ] = useState(0);

    async function initiate () {
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      const initSelector = stark.getSelectorFromName("init_poll");

      const initPollResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        initSelector,
        callDataHash,
      )
      console.log(initPollResponse);
      console.log(initPollResponse.transaction_hash);
    }

    async function registerVoter () {
      if (!pollId) return
      if (!voterAddress) return
      const voteDataHash = compileCalldata({"poll_id":pollId, "vote": voterAddress});

      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      const registerVoterSelector = stark.getSelectorFromName("register_voter");

      const registerVoterResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        registerVoterResponse,
        voteDataHash,
      )
      console.log(registerVoterResponse);
      console.log(registerVoterResponse.transaction_hash);
    }

    async function vote () {
      if (!pollId) return
      if (!voteIndex) return
      const voteDataHash = compileCalldata({"poll_id":pollId, "vote": voteIndex});

      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      const initSelector = stark.getSelectorFromName("vote");

      const voteResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        initSelector,
        voteDataHash,
      )
      console.log(voteResponse);
      console.log(voteResponse.transaction_hash);
    }

    async function getVotingState () {
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      const getVotingStateSelector = stark.getSelectorFromName("get_voting_state");

      const getVotingStateResponse = await starknet.provider.callContract({
        contract_address: VOTER_ADDRESS,
        entry_point_selector: getVotingStateSelector,
        calldata: callDataHash,
      });
      console.log(getVotingStateResponse.result[0]);
      console.log(getVotingStateResponse.result[1]);
    }

    async function finalize () {
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      const finalizeSelector = stark.getSelectorFromName("finalize_poll");

      const initPollResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        finalizeSelector,
        callDataHash,
      )
      console.log(initPollResponse);
      console.log(initPollResponse.transaction_hash);
    }

    async function getResult () {
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      const getResultSelector = stark.getSelectorFromName("get_poll_result");

      const getResultResponse = await starknet.provider.callContract({
        contract_address: RESULT_ADDRESS,
        entry_point_selector: getResultSelector,
        calldata: callDataHash,
      });
      console.log(getResultResponse);
    }

    async function getTransactionStatus () {
      if (!tx) return
      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      const status = await starknet.provider.getTransactionStatus(tx);
      console.log(status.tx_status);
    }
    
    return (
      <div>
        <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />
        <button onClick={initiate}>Initiate Poll</button><br/>
        <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />
        <input type="text" onChange={e => setVoterAddress(e.target.value)} placeholder="Voter address" />
        <button onClick={registerVoter}>Register voter</button><br/>
        <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />
        <input type="text" onChange={e => setVoteIndex(e.target.value)} placeholder="0 or 1" />
        <button onClick={vote}>Vote</button><br/>
        <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />
        <button onClick={getVotingState}>Get Voting State</button><br/>
        <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />
        <button onClick={finalize}>Finalize poll</button><br/>
        <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />
        <button onClick={getResult}>Get result</button><br/><br/>
        <input type="text" onChange={e => setTx(e.target.value)} placeholder="TX hash" />
        <button onClick={getTransactionStatus}>Get transaction status</button>
      </div>
    );
  }

  export default App;
