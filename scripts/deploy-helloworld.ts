import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"

async function deploy() {
    const HelloWorld = await ethers.getContractFactory("HelloWorld")
    const hello = await HelloWorld.deploy();
    await hello.deployed();
    return hello;

}