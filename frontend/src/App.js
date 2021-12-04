import React from "react";
import { getStarknet } from "@argent/get-starknet"
import { useState } from "react";
import './App.css';

import { stark, compileCalldata } from 'starknet';


const VOTER_ADDRESS ="0x00e5bf6520f82336d78f1082550f58cf037efa6e01fa6e8b66384af68720b083";
const RESULT_ADDRESS ="0x022ac0cd7c8c00d0202c3f2bc7e209421b253d963bca7d451ba5d63b80313a50";

  function App() {
    const [ pollId, setPollId ] = useState(0);
    const [ voteIndex, setVoteIndex ] = useState(0);
    const [ voterAddress, setVoterAddress ] = useState(0);
    const [ txHash, setTxHash ] = useState(0);
    const [ visibility, setVisibility ] = useState(false);
    const [ txStatus, setTxStatus ] = useState('');
    const [ txStatusVisibility, setTxStatusVisibility ] = useState(false);
    const [ votingState, setVotingState ] = useState();
    const [ votingStateVisibility, setVotingStateVisibility] = useState(false);
    const [ result, setResult ] = useState('');
    const [ resultVisibility, setResultVisibility ] = useState(false);

    async function initiate () {
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      try {
        await starknet.enable()  
      } catch (error) {
        window.alert("Please install Argent X wallet browser extension");
        return
      }
      
      const initSelector = stark.getSelectorFromName("init_poll");

      const initPollResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        initSelector,
        callDataHash,
      )
      console.log(initPollResponse);
      console.log(initPollResponse.transaction_hash);
      setVisibility(true);
      setTxHash(initPollResponse.transaction_hash);
      setResultVisibility(false);
      getTransactionStatus(initPollResponse.transaction_hash);
    }

    async function registerVoter () {
      if (!pollId) return
      if (!voterAddress) return
      const voteDataHash = compileCalldata({"poll_id":pollId, "vote": voterAddress});

      const starknet = getStarknet();
      try {
        await starknet.enable()  
      } catch (error) {
        window.alert("Please install Argent X wallet browser extension");
        return
      }

      const registerVoterSelector = stark.getSelectorFromName("register_voter");

      const registerVoterResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        registerVoterSelector,
        voteDataHash,
      )
      console.log(registerVoterResponse);
      console.log(registerVoterResponse.transaction_hash);
      setVisibility(true);
      setTxHash(registerVoterResponse.transaction_hash);
      getTransactionStatus(registerVoterResponse.transaction_hash);
    }

    async function vote () {
      if (!pollId) return
      if (!voteIndex) return
      const voteDataHash = compileCalldata({"poll_id":pollId, "vote": voteIndex});

      const starknet = getStarknet();
      try {
        await starknet.enable()  
      } catch (error) {
        window.alert("Please install Argent X wallet browser extension");
        return
      }

      const initSelector = stark.getSelectorFromName("vote");

      const voteResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        initSelector,
        voteDataHash,
      )
      console.log(voteResponse);
      console.log(voteResponse.transaction_hash);
      setVisibility(true);
      setTxHash(voteResponse.transaction_hash);
      getTransactionStatus(voteResponse.transaction_hash);
    }

    async function getVotingState () {
      setVisibility(false);
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      try {
        await starknet.enable()  
      } catch (error) {
        window.alert("Please install Argent X wallet browser extension");
        return
      }

      const getVotingStateSelector = stark.getSelectorFromName("get_voting_state");

      const getVotingStateResponse = await starknet.provider.callContract({
        contract_address: VOTER_ADDRESS,
        entry_point_selector: getVotingStateSelector,
        calldata: callDataHash,
      });
      console.log(getVotingStateResponse.result[0]);
      console.log(getVotingStateResponse.result[1]);
      setVotingState(getVotingStateResponse.result);
      setVotingStateVisibility(true);
    }

    async function finalize () {
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      try {
        await starknet.enable()  
      } catch (error) {
        window.alert("Please install Argent X wallet browser extension");
        return
      }

      const finalizeSelector = stark.getSelectorFromName("finalize_poll");

      const finalizeResponse = await starknet.signer.invokeFunction (
        VOTER_ADDRESS,
        finalizeSelector,
        callDataHash,
      )
      console.log(finalizeResponse);
      console.log(finalizeResponse.transaction_hash);
      setVisibility(true);
      setTxHash(finalizeResponse.transaction_hash);
      getTransactionStatus(finalizeResponse.transaction_hash);
    }

    async function getResult () {
      setVisibility(false);
      if (!pollId) return
      const callDataHash = compileCalldata({"poll_id":pollId});

      const starknet = getStarknet();
      try {
        await starknet.enable()  
      } catch (error) {
        window.alert("Please install Argent X wallet browser extension");
        return
      }

      const getResultSelector = stark.getSelectorFromName("get_poll_result");

      const getResultResponse = await starknet.provider.callContract({
        contract_address: RESULT_ADDRESS,
        entry_point_selector: getResultSelector,
        calldata: callDataHash,
      });
      console.log(parseInt(getResultResponse.result[0])); 
      if(parseInt(parseInt(getResultResponse.result[0])) === 1)
        setResult('Yes');
      else
        setResult('No');
      setResultVisibility(true);
    }

    async function getTransactionStatus (tx) {
      //setVisibility(false);
      //if (!tx) return
      const starknet = getStarknet();
      await starknet.enable()
      if (starknet.isConnected === false)
        throw Error("starknet wallet not connected")

      while(txStatus !== 'ACCEPTED_ONCHAIN' || txStatus !== 'REJECTED') {
        const status = await starknet.provider.getTransactionStatus(tx);
        console.log(status.tx_status);
        setTxStatusVisibility(true);
        setTxStatus(status.tx_status);
        if(status.tx_status === "ACCEPTED_ONCHAIN" || status.tx_status === "REJECTED")
          break;
      }
    }
    
    return (
      <div className="App">
        <div className="topnav">
            <a><strong>VOTING DAPP - STARKWARE</strong></a>
            <div className="right">
              <a><em>Argent X wallet extension is required for this app to work</em></a>
            </div>
        </div>
        <header className="App-header"> <br />
          <center>* Please don't send new transactions until last transaction status becomes ACCEPTED_ONCHAIN</center><br />
          <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />&nbsp;
          <button className="button" onClick={initiate}>Initiate Poll</button><br/>
          <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />&nbsp;
          <input type="text" onChange={e => setVoterAddress(e.target.value)} placeholder="Voter address" />&nbsp;
          <button className="button" onClick={registerVoter}>Register voter</button><br/>
          <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />&nbsp;
          <input type="text" onChange={e => setVoteIndex(e.target.value)} placeholder="0 or 1" />&nbsp;
          <button className="button" onClick={vote}>Vote</button><br/>
          <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />&nbsp;
          <button className="button" onClick={getVotingState}>Get Voting State</button><br/>
          { votingStateVisibility && <p>No votes: {parseInt(votingState[0])} &nbsp;&nbsp;&nbsp; Yes Votes: {parseInt(votingState[1])}</p> }
          <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />&nbsp;
          <button className="button" onClick={finalize}>Finalize poll</button><br/>
          <input type="text" onChange={e => setPollId(e.target.value)} placeholder="Poll ID" />&nbsp;
          <button className="button" onClick={getResult}>Get result</button><br/><br/>
          { resultVisibility && <p>Result of pollID {pollId}: {result}</p> }
          { visibility && <p>Transaction hash: {txHash}</p> }
          { txStatusVisibility && <p>Transaction status: <b>{txStatus}</b></p> }
          <br/>
          <p className="p1">
              Transactions will be rejected if:<br/>
              * Poll ID already exists for 'Initiate Poll'<br/>
              * Voter is not registered for 'Vote'
          </p>
        </header>
      </div>
    );
  }

  export default App;
