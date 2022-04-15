// SPDX-License-Identifier: UNLICENSE

pragma solidity >=0.6.0 <0.9.0;
pragma experimental ABIEncoderV2;

/*
  MySkills Contract
*/

contract MySkills {
    address private owner;

    mapping(address => mapping(string => string)) private skills;
    mapping(address => mapping(string => uint256)) private skillsAddedIn;
    mapping(address => mapping(string => bool)) private exists;

    constructor() {
        owner = msg.sender;
    }

    event SkillAdded(
        address indexed addr,
        string skill,
        uint256 insertTimestamp
    );

    event SkillUpdated(
        address indexed addr,
        string oldSkill,
        string newSkill,
        uint256 updateTimestamp
    );

    event SkillDeleted(
        address indexed addr,
        string skill,
        uint256 deleteTimestamp
    );

    function addSkill(string memory skill, uint256 insertTimestamp) external {
        require(!exists[owner][skill], "Skill already added");

        exists[owner][skill] = true;
        skills[owner][skill] = skill;
        skillsAddedIn[owner][skill] = insertTimestamp;

        emit SkillAdded(owner, skill, insertTimestamp);
    }

    function updateSkill(
        string memory oldSkill,
        string memory newSkill,
        uint256 updateTimestamp
    ) external {
        require(exists[owner][oldSkill], "Skill does not exists.");
        require(!exists[owner][newSkill], "Skill already exists.");

        delete exists[owner][oldSkill];
        delete skills[owner][oldSkill];
        delete skillsAddedIn[owner][oldSkill];

        exists[owner][newSkill] = true;
        skills[owner][newSkill] = newSkill;
        skillsAddedIn[owner][newSkill] = updateTimestamp;

        emit SkillUpdated(owner, oldSkill, newSkill, updateTimestamp);
    }

    function deleteSkill(string memory skill, uint256 deleteTimestamp)
        external
    {
        require(exists[owner][skill], "Skill does not exists.");

        delete exists[owner][skill];
        delete skills[owner][skill];
        delete skillsAddedIn[owner][skill];

        emit SkillDeleted(owner, skill, deleteTimestamp);
    }
}
