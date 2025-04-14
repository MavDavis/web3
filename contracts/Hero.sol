// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class { Mage, Healer, Barbarian }
    mapping (address => uint[])addressToHeroes;
    function getHeroes() view public returns(uint[] memory){
        return addressToHeroes[msg.sender];
    }
    function generateRandom() public view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
}
    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Oga, add money");
         uint[] stats = new uint[](5)
         stats[0] = 2;
         stats[1] = 5;
         stats[2] = 12;
         stats[3] = 17;
         stats[4] = 22;
    }
}
