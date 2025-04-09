import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function deploy() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter =  Counter.deploy();
    return counter;
}
//@ts-ignore
async function count(counter) {
    await counter.count();
    console.log("Counter",await counter.getCounter());
}
deploy().then(count);