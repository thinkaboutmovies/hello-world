const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("hardhat");

const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network = "goerli", API_KEY);

// signer - me
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
	// place new message you want to put in the update here

	const message = await helloWorldContract.message();
	console.log(`This message says: ${message}`);

    console.log("Updating the message...");
    tx = await helloWorldContract.update('gobble gobble');
    await tx.wait();

    const newMessage = await helloWorldContract.message();
	console.log(`This new message says: ${newMessage}`);

}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});