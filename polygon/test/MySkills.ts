import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("MySkill contract", () => {
  it("Should add skill to owner", async () => {
    const [owner] = await ethers.getSigners();

    const mySkills = await ethers.getContractFactory("MySkills");
    const mySkillsContract = await mySkills.deploy();

    await mySkillsContract.addSkill(owner.address, "React");
    await mySkillsContract.addSkill(owner.address, "React Native");
    await mySkillsContract.addSkill(owner.address, "Javascript");
    await mySkillsContract.addSkill(owner.address, "Ubuntu 20.04");
  });

  it("Should not add skill twice", async () => {
    const [owner] = await ethers.getSigners();

    const mySkills = await ethers.getContractFactory("MySkills");
    const mySkillsContract = await mySkills.deploy();

    await mySkillsContract.addSkill(owner.address, "React");

    await expect(
      mySkillsContract.addSkill(owner.address, "React")
    ).to.be.revertedWith("Skill already added");
  });

  it("Should return owner skill list", async () => {
    const [owner] = await ethers.getSigners();

    const mySkills = await ethers.getContractFactory("MySkills");
    const mySkillsContract = await mySkills.deploy();

    await mySkillsContract.addSkill(owner.address, "React");
    await mySkillsContract.addSkill(owner.address, "React Native");
    await mySkillsContract.addSkill(owner.address, "Javascript");
    await mySkillsContract.addSkill(owner.address, "Ubuntu 20.04");

    const skills = await mySkillsContract.getSkills(owner.address);
    expect(skills).to.have.all.members([
      "React",
      "React Native",
      "Javascript",
      "Ubuntu 20.04",
    ]);
  });
});
