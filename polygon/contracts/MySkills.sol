// SPDX-License-Identifier: UNLICENSE

pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

/*
  MySkills Contract
*/

contract MySkills {
    struct Skill {
        string name;
        uint256 timestamp;
    }

    address private owner;

    mapping(address => Skill[]) private skills;
    mapping(address => mapping(string => bool)) skillExists;
    mapping(address => mapping(string => uint256)) skillIndex;

    constructor() {
        owner = msg.sender;
    }

    event SkillAdded(
        address indexed addr,
        string skill,
        uint256 insertTimestamp
    );

    event SkillDeleted(
        address indexed addr,
        string skill,
        uint256 deleteTimestamp
    );

    function addSkill(string memory name, uint256 timestamp) external {
        require(!skillExists[msg.sender][name], "Skill already added");

        skills[msg.sender].push(Skill(name, timestamp));
        skillIndex[msg.sender][name] = skills[msg.sender].length - 1;
        skillExists[msg.sender][name] = true;

        emit SkillAdded(msg.sender, name, timestamp);
    }

    function deleteSkill(string memory name, uint256 timestamp) external {
        require(skillExists[msg.sender][name], "Skill does not exists.");

        uint256 index = skillIndex[msg.sender][name];

        delete skills[msg.sender][index];
        delete skillIndex[msg.sender][name];
        delete skillExists[msg.sender][name];

        emit SkillDeleted(msg.sender, name, timestamp);
    }

    function getAll() public view returns (Skill[] memory) {
        return skills[msg.sender];
    }
}
