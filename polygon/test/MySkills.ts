import "@nomiclabs/hardhat-ethers";

import { expect } from "chai";
import { ethers } from "hardhat";
import { getUnixTime } from "date-fns";
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("MySkill contract", () => {
  let owner: SignerWithAddress;
  let mySkills: ContractFactory;
  let mySkillsContract: Contract;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    mySkills = await ethers.getContractFactory("MySkills");
    mySkillsContract = await mySkills.deploy();
  });

  describe("Skill insert", () => {
    it("Should add skill to owner", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);
      await mySkillsContract.addSkill("React Native", unixTime);
      await mySkillsContract.addSkill("Javascript", unixTime);
      await mySkillsContract.addSkill("Ubuntu 20.04", unixTime);
    });

    it("Should not add skill twice", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);

      await expect(
        mySkillsContract.addSkill("React", unixTime)
      ).to.be.revertedWith("Skill already added");
    });

    it("Should emit SkillAdded event", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await expect(mySkillsContract.addSkill("React", unixTime))
        .to.emit(mySkillsContract, "SkillAdded")
        .withArgs(owner.address, "React", unixTime);
    });
  });

  describe("Skill update", () => {
    it("Should update skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);
      await mySkillsContract.updateSkill("React", "Javascript", unixTime);
    });

    it("Should not update a non existing skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);
      await expect(
        mySkillsContract.updateSkill("Non existing", "Javascript", unixTime)
      ).to.be.revertedWith("Skill does not exists");
    });

    it("Should not duplicate skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);
      await mySkillsContract.addSkill("Javascript", unixTime);

      await expect(
        mySkillsContract.updateSkill("React", "Javascript", unixTime)
      ).to.be.revertedWith("Skill already exists.");
    });

    it("Should emit SkillUpdated event", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);

      await expect(
        mySkillsContract.updateSkill("React", "Javascript", unixTime)
      )
        .to.emit(mySkillsContract, "SkillUpdated")
        .withArgs(owner.address, "React", "Javascript", unixTime);
    });
  });

  describe("Skill delete", () => {
    it("Should delete skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);
      await mySkillsContract.deleteSkill("React", unixTime);
    });

    it("Should not delete a non existing skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);
      await mySkillsContract.deleteSkill("React", unixTime);

      await expect(
        mySkillsContract.deleteSkill("React", unixTime)
      ).to.be.revertedWith("Skill does not exists");
    });

    it("Should emit SkillDeleted event", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await mySkillsContract.addSkill("React", unixTime);
      await expect(mySkillsContract.deleteSkill("React", unixTime))
        .to.emit(mySkillsContract, "SkillDeleted")
        .withArgs(owner.address, "React", unixTime);
    });
  });
});
