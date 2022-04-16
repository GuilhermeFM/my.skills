import "react-native-get-random-values";
import "@ethersproject/shims";
import { BigNumber, Contract, EventFilter, Wallet } from "ethers";

import MySkills from "../../abi/MySkills.json";
import { WebSocketProvider } from "@ethersproject/providers";

interface AddSkill {
  skill: string;
  timestamp: number;
}

interface DeleteContract {
  skill: string;
  timestamp: number;
}

export interface Skill {
  name: string;
  timestamp: number;
  pending: boolean;
}

type onSkillAddedHandler = (
  address: string,
  skill: string,
  timestamp: number
) => void;

type onSkillDeletedHandler = (
  address: string,
  skill: string,
  timestamp: number
) => void;

class MySkillContract {
  private walletPublicKey: string;
  private walletPrivateKey: string;
  private jsonRpcInterface: any;
  private webSocketProvider: WebSocketProvider;
  private contract: Contract;
  private contractAddress: string;

  private skillAddedFilter: EventFilter;
  private skillDeletedFilter: EventFilter;

  constructor() {
    this.jsonRpcInterface = MySkills.abi;
    this.webSocketProvider = new WebSocketProvider(
      "wss://polygon-mumbai.g.alchemy.com/v2/0bu9Z86InQwXiTDHoEgY87jQYBdAchEW"
    );

    this.contractAddress = "0x4398486516c38330BEfD6FB1cC32BD1D7Da80c8D";
    this.walletPublicKey = "0x034dfDFE5A9259931ed68fA03C7448F74C105586";
    this.walletPrivateKey =
      "ce95c27538a119a4774825614088c67dd60816347f074cf63bf6dd8073c199d1";

    this.contract = new Contract(
      this.contractAddress,
      this.jsonRpcInterface,
      this.webSocketProvider
    );

    this.contract = this.contract.connect(
      new Wallet(this.walletPrivateKey, this.webSocketProvider)
    );

    this.skillAddedFilter = this.contract.filters.SkillAdded(
      this.walletPublicKey
    );

    this.skillDeletedFilter = this.contract.filters.SkillDeleted(
      this.walletPublicKey
    );
  }

  public async addSkill(params: AddSkill): Promise<void> {
    const { skill, timestamp } = params;

    try {
      const tx = await this.contract.addSkill(skill, timestamp);
      console.log(tx);
    } catch (err) {
      console.log(err);
    }
  }

  public async removeSkill(params: DeleteContract): Promise<void> {
    const { skill, timestamp } = params;
    await this.contract.removeSkill(skill, timestamp);
  }

  public async getAllSkill(): Promise<Skill[]> {
    const skills = await this.contract.getAll();

    return skills.map((skill: any) => {
      const [name, timestamp] = skill;
      return { name, timestamp: timestamp.toNumber() };
    });
  }

  public onSkillAdded(handler: onSkillAddedHandler) {
    this.contract.on(
      this.skillAddedFilter,
      (address: string, skill: string, timestamp: BigNumber) => {
        handler(address, skill, timestamp.toNumber());
      }
    );
  }

  public onSkillDeleted(handler: onSkillDeletedHandler) {
    this.contract.on(
      this.skillDeletedFilter,
      (address: string, skill: string, timestamp: BigNumber) => {
        handler(address, skill, timestamp.toNumber());
      }
    );
  }

  public dettacheOnSkillAdded() {
    this.contract.removeAllListeners(this.skillAddedFilter);
  }

  public dettacheOnSkillDeleted() {
    this.contract.removeAllListeners(this.skillDeletedFilter);
  }
}

export default new MySkillContract();
