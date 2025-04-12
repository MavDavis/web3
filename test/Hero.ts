import _ from "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hero", function () {
  let hero;

  before(async function () {
    const Hero = await ethers.getContractFactory("Hero");
    hero = await Hero.deploy();
  });

  it("should fail at creating hero because of insufficient payment", async () => {
    await expect(
      hero.createHero(0, {
        value: ethers.utils.parseEther("0.049") // less than 0.05
      })
    ).to.be.revertedWith("Oga, add money");
  });
});
