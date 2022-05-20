import "@nomiclabs/hardhat-ethers";

import { expect } from "chai";
import { ethers } from "hardhat";
import { add, getUnixTime } from "date-fns";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("my.skill contract", () => {
  let addressOne: SignerWithAddress;
  let addressTwo: SignerWithAddress;
  let contract: Contract;

  beforeEach(async () => {
    contract = await (await ethers.getContractFactory("MySkills")).deploy();
    [addressOne, addressTwo] = await ethers.getSigners();
  });

  describe("Skill insert", () => {
    it("Should add skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.connect(addressOne).addSkill("React", unixTime);
      await contract.connect(addressTwo).addSkill("React", unixTime);
    });

    it("Should add skill to signer", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.connect(addressOne).addSkill("React", unixTime);
      await contract.connect(addressOne).addSkill("React Native", unixTime);

      await contract.connect(addressTwo).addSkill("Javascript", unixTime);
      await contract.connect(addressTwo).addSkill("Ubuntu 20.04", unixTime);

      expect(
        (await contract.connect(addressOne).getAll()).map((skill: any) => {
          const [name, timestamp] = skill;
          return { name, timestamp: timestamp.toNumber() };
        })
      ).to.have.deep.members([
        { name: "React", timestamp: unixTime },
        { name: "React Native", timestamp: unixTime },
      ]);

      expect(
        (await contract.connect(addressTwo).getAll()).map((skill: any) => {
          const [name, timestamp] = skill;
          return { name, timestamp: timestamp.toNumber() };
        })
      ).to.have.deep.members([
        { name: "Javascript", timestamp: unixTime },
        { name: "Ubuntu 20.04", timestamp: unixTime },
      ]);
    });

    it("Should not add skill twice", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.connect(addressOne).addSkill("React", unixTime);

      await expect(
        contract.connect(addressOne).addSkill("React", unixTime)
      ).to.be.revertedWith("Skill already added");
    });

    it("Should emit SkillAdded event", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await expect(contract.connect(addressOne).addSkill("React", unixTime))
        .to.emit(contract, "SkillAdded")
        .withArgs(addressOne.address, "React", unixTime);
    });
  });

  describe("Skill delete", () => {
    it("Should delete skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.connect(addressOne).addSkill("React", unixTime);
      await contract.connect(addressOne).deleteSkill("React", unixTime);
    });

    it("Should not delete a non existing skill", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.connect(addressOne).addSkill("React", unixTime);
      await contract.connect(addressOne).deleteSkill("React", unixTime);

      await expect(
        contract.connect(addressOne).deleteSkill("React", unixTime)
      ).to.be.revertedWith("Skill does not exists");
    });

    it("Should emit SkillDeleted event", async () => {
      const date = new Date();
      const unixTime = getUnixTime(date);

      await contract.connect(addressOne).addSkill("React", unixTime);

      await expect(contract.connect(addressOne).deleteSkill("React", unixTime))
        .to.emit(contract, "SkillDeleted")
        .withArgs(addressOne.address, "React", unixTime);
    });
  });
});
