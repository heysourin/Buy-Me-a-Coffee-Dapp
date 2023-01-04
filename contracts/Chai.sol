// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.17;

contract chai{
    address payable public owner;

    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo[] public memos;

    constructor(){
        owner = payable(msg.sender);
    }

    function buyChai(string memory _name, string memory _message) public payable{
        require(msg.value > 0 ether, "Pay more than zero");
        owner.transfer(msg.value);
        memos.push(Memo(_name, _message, block.timestamp, msg.sender));        
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    }
}