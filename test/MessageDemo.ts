import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Message", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployMessage() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Message = await ethers.getContractFactory("Message");
    const MSG = await Message.deploy();

    return { MSG, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy MSG", async function () {
      const { MSG, owner, otherAccount } = await loadFixture(deployMessage);

      expect(await MSG.signer.getAddress()).to.equal(owner.address);
    });
  });

  describe("Write Message", function () {
    it("Should deploy the Message", async function () {
      const { MSG, owner, otherAccount } = await loadFixture(deployMessage);

      expect(await MSG.postMessage("ok")).to.not.be.reverted;
    });
  });

  describe("Read Message", function () {
    it("Should deploy the Message", async function () {
      const { MSG, owner, otherAccount } = await loadFixture(deployMessage);

      await MSG.postMessage("ok");
      const data = await MSG.readMessages(owner.address);

      console.log(data);

      expect(data[0]).to.equal("ok");
    });
  });

  describe("Should Read Messages in order new->old", function () {
    it("Should deploy the Message", async function () {
      const { MSG, owner, otherAccount } = await loadFixture(deployMessage);

      await MSG.postMessage("1");
      await MSG.postMessage("2");
      await MSG.postMessage("3");

      const data = await MSG.readMessages(owner.address);

      console.log(data);

      expect(data[0]).to.equal("3");
    });
  });
});
