#!/bin/bash
output1=$(starknet deploy --contract ../starknet-artifacts/contracts/Result.cairo/Result.json --network alpha)
echo $output1
deploy_tx_id1=$(echo $output1 | sed 's/.*Transaction hash: //')
address1=$(echo $output1 | sed 's/Transaction.*//' | sed 's/.*Contract address: //')
echo "Result Address: $address1"
echo "tx_id: $deploy_tx_id1"

output=$(starknet deploy --contract ../starknet-artifacts/contracts/Voter.cairo/Voter.json -- inputs [result_recorder_address: $address1] --network alpha)
echo $output
deploy_tx_id=$(echo $output | sed 's/.*Transaction hash: //')
address=$(echo $output | sed 's/Transaction.*//' | sed 's/.*Contract address: //')
echo "Voter Address: $address"
echo "tx_id: $deploy_tx_id"
# sleep 300
# starknet invoke --function increase_balance --inputs 10 20 --network alpha --address $address --abi starknet-artifacts/contracts/contract.cairo/contract_abi.json
# #starknet tx_status --id $deploy_tx_id --network alpha
# starknet call --function get_balance --network alpha --address $address --abi starknet-artifacts/contracts/contract.cairo/contract_abi.json
