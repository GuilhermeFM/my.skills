// SPDX-License-Identifier: UNLICENSE

pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

/*
  MySkills Contract
*/

contract MySkills {
    mapping(address => string[]) private skills;
    mapping(address => mapping(string => bool)) private skillExists;

    event UpdatedSkills(address addr, string skill);

    function addSkill(address addr, string memory skill) external {
        require(!skillExists[addr][skill], "Skill already added");

        skills[addr].push(skill);
        skillExists[addr][skill] = true;

        emit UpdatedSkills(addr, skill);
    }

    function getSkills(address addr) external view returns (string[] memory) {
        return skills[addr];
    }
}
