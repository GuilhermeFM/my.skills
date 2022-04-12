import { ethers } from "hardhat";

async function deployContract() {
  const contractName = "MySkills";
  const contractMySkills = await ethers.getContractFactory(contractName);
  const mySkills = await contractMySkills.deploy();

  await mySkills.deployed();

  console.log(`MySkills contract deployed to address: ${mySkills.address}`);
}

async function main() {
  try {
    await deployContract();
    process.exit(0);
  } catch (err) {
    console.log("Error:", err);
    process.exit(1);
  }
}

main();
