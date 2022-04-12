// SPDX-License-Identifier: UNLICENSE

pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

/*
  MySkills Contract
*/

contract MySkills {
    address private owner;
    mapping(address => mapping(string => uint256)) private skills;
    mapping(address => mapping(string => bool)) private exists;

    constructor() {
        owner = msg.sender;
    }

    event UpdatedSkills(address addr, string skill, uint256 addIn);

    function addSkill(
        address addr,
        string memory skill,
        uint256 addIn
    ) external {
        require(!exists[addr][skill], "Skill already added");

        skills[addr][skill] = addIn;
        exists[addr][skill] = true;

        emit UpdatedSkills(addr, skill, addIn);
    }
}
