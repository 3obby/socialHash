// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Message {
    mapping(address => string[]) public posts;

    function postMessage(string calldata _data) public {
        posts[msg.sender].push(_data);
    }

    function readMessages(address _user) public view returns (string[] memory) {
        uint len = posts[_user].length;
        string[] memory allPosts = new string[](len);
        for (uint i; i < len; i++) {
            allPosts[len - i - 1] = posts[_user][i];
        }
        return allPosts;
    }
}
