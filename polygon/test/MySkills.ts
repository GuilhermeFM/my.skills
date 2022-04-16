import "@nomiclabs/hardhat-ethers";

import { expect } from "chai";
import { ethers } from "hardhat";
import { getUnixTime } from "date-fns";
import { BigNumber, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MySkill contract", () => {
  let owner: SignerWithAddress;
  let contract: Contract;

  beforeEach(async () => {
    contract = await (await ethers.getContractFactory("MySkills")).deploy();
    [owner] = await ethers.getSigners();
  });

  describe("Skill insert", () => {
    it("Should add skill to owner", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.addSkill("React", unixTime);
      await contract.addSkill("React Native", unixTime);
      await contract.addSkill("Javascript", unixTime);
      await contract.addSkill("Ubuntu 20.04", unixTime);
    });

    it("Should not add skill twice", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.addSkill("React", unixTime);

      await expect(contract.addSkill("React", unixTime)).to.be.revertedWith(
        "Skill already added"
      );
    });

    it("Should emit SkillAdded event", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await expect(contract.addSkill("React", unixTime))
        .to.emit(contract, "SkillAdded")
        .withArgs(owner.address, "React", unixTime);
    });
  });

  describe("Skill delete", () => {
    it("Should delete skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.addSkill("React", unixTime);
      await contract.deleteSkill("React", unixTime);
    });

    it("Should not delete a non existing skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.addSkill("React", unixTime);
      await contract.deleteSkill("React", unixTime);

      await expect(contract.deleteSkill("React", unixTime)).to.be.revertedWith(
        "Skill does not exists"
      );
    });

    it("Should emit SkillDeleted event", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.addSkill("React", unixTime);
      await expect(contract.deleteSkill("React", unixTime))
        .to.emit(contract, "SkillDeleted")
        .withArgs(owner.address, "React", unixTime);
    });
  });
});
