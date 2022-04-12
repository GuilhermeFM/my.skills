import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";
import { getUnixTime } from "date-fns";

describe("MySkill contract", () => {
  it("Should add skill to owner", async () => {
    const [owner] = await ethers.getSigners();

    const mySkills = await ethers.getContractFactory("MySkills");
    const mySkillsContract = await mySkills.deploy();

    const date = new Date();
    const unixTime = getUnixTime(date);

    await mySkillsContract.addSkill(owner.address, "React", unixTime);
    await mySkillsContract.addSkill(owner.address, "React Native", unixTime);
    await mySkillsContract.addSkill(owner.address, "Javascript", unixTime);
    await mySkillsContract.addSkill(owner.address, "Ubuntu 20.04", unixTime);
  });

  it("Should not add skill twice", async () => {
    const [owner] = await ethers.getSigners();

    const mySkills = await ethers.getContractFactory("MySkills");
    const mySkillsContract = await mySkills.deploy();

    const date = new Date();
    const unixTime = getUnixTime(date);

    await mySkillsContract.addSkill(owner.address, "React", unixTime);

    await expect(
      mySkillsContract.addSkill(owner.address, "React", unixTime)
    ).to.be.revertedWith("Skill already added");
  });
});
