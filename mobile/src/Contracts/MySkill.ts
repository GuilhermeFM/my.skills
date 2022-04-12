import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";

import MySkills from "../../abi/MySkills.json";

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/0bu9Z86InQwXiTDHoEgY87jQYBdAchEW"
);

const contractAddress = "0x5F917138032d09D27D0310818a7abFeF737F4f66";

export const mySkillContract = new ethers.Contract(
  contractAddress,
  MySkills.abi,
  provider
);

export async function addSkillToAddress(
  address: string,
  skill: string | null,
  addIn: number
) {
  const signer = new ethers.Wallet(
    "ce95c27538a119a4774825614088c67dd60816347f074cf63bf6dd8073c199d1",
    provider
  );
  const mySkillContractWithSigner = mySkillContract.connect(signer);
  return await mySkillContractWithSigner.addSkill(address, skill, addIn);
}
