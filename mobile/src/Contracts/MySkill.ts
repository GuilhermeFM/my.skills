import "react-native-get-random-values";
import "@ethersproject/shims";
import { BigNumber, ethers } from "ethers";

import MySkills from "../../abi/MySkills.json";

const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/0bu9Z86InQwXiTDHoEgY87jQYBdAchEW"
);

const jsonRpcInterface = MySkills.abi;
const contractAddress = "0x5F917138032d09D27D0310818a7abFeF737F4f66";

const mySkillContract = new ethers.Contract(
  contractAddress,
  jsonRpcInterface,
  provider
);

export interface MySkillEvent {
  name: string;
  address: string;
  addedSkill: string;
  addedTimestamp: number;
}

export interface Skill {
  skill: string;
  timestamp: number;
}

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

export async function removeSkillFromAddress(
  address: string,
  skill: string | null
) {
  const signer = new ethers.Wallet(
    "ce95c27538a119a4774825614088c67dd60816347f074cf63bf6dd8073c199d1",
    provider
  );
  const mySkillContractWithSigner = mySkillContract.connect(signer);
  return await mySkillContractWithSigner.removeSkill(address, skill);
}

export async function getAddedSkillsFromAddress(
  address: string
): Promise<Skill[]> {
  const updatedSkillsEventFilter = mySkillContract.filters.UpdatedSkills();
  const events = await mySkillContract.queryFilter(updatedSkillsEventFilter);

  return events.map((event) => {
    const [_, skill, timestamp] = event.decode?.(event.data, event.topics) as [
      string,
      string,
      BigNumber
    ];

    const retorno: Skill = {
      skill,
      timestamp: timestamp.toNumber(),
    };
    return retorno;
  });
}
