const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

let acc_config = require('./config.json');

const provider = new HDWalletProvider(
  //account mneumonic
  acc_config.acc_mneumonic,
  //url to network
  'https://rinkeby.infura.io/v3/4d0b9cd556474cad9ee598c42cb44317'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();


  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to", result.options.address);
};

deploy();

