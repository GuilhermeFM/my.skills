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
        require(!skillExists[owner][name], "Skill already added");

        skills[owner].push(Skill(name, timestamp));
        skillIndex[owner][name] = skills[owner].length - 1;
        skillExists[owner][name] = true;

        emit SkillAdded(owner, name, timestamp);
    }

    function deleteSkill(string memory name, uint256 timestamp) external {
        require(skillExists[owner][name], "Skill does not exists.");

        uint256 index = skillIndex[owner][name];

        delete skills[owner][index];
        delete skillIndex[owner][name];
        delete skillExists[owner][name];

        emit SkillDeleted(owner, name, timestamp);
    }

    function getAll() public view returns (Skill[] memory) {
        return skills[owner];
    }
}
