Web3 = require('web3')
web3 = new Web3("http://localhost:7545")
web3.eth.getAccounts(console.log)
bytecode = fs.readFileSync('Voting_sol_Voting.bin').toString()
abi = JSON.parse(fs.readFileSync('Voting_sol_Voting.abi').toString())
deployedContract = new web3.eth.Contract(abi)
listOfCandidates = ['BJP', 'Congress', 'NOTA']
//Replace "from address" to anyone of the 10 given in your ganache
 deployedContract.deploy({
 data: bytecode,
 arguments: [listOfCandidates.map(name => web3.utils.asciiToHex(name))]
}).send({
 from: '0x1CBCd86FaCCb6069f768f681F33D578b9032F601',
 gas: 1500000,
 gasPrice: web3.utils.toWei('0.00003', 'ether')
}).then((newContractInstance) => {
 deployedContract.options.address = newContractInstance.options.address;
 console.log(newContractInstance.options.address)
});