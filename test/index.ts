import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Insure contract(alone)", function () {
  let expirationTimes = [1625097600, 9218390, 999999999999];

  let Insure: ContractFactory;
  let insureContract: Contract;
  let insureAddress: String;

  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress,
    other: SignerWithAddress[];

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();

    Insure = await ethers.getContractFactory("Insure");
    insureContract = await Insure.deploy(expirationTimes, addr1.address);

    insureAddress = insureContract.address;
  });

  it("Set constructor parameters of Insure", async function () {
    for (let expiration of expirationTimes) {
      expect(await insureContract.expiryDates(expiration)).to.equal(true);
      expect(await insureContract.expiryDates(expiration * 3)).to.equal(false);
    }
    expect(await insureContract.owner()).to.equal(owner.address);
  });
});

describe("Oracle Contract", function () {
  let expirationTimes = [1625097600, 9218390, 999999999999];

  let CustomOracle: ContractFactory;
  let customOracleContract: Contract;

  /*   let Dai: ContractFactory;
  let daiContract: Contract;
  let daiAddress: String; */

  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress,
    other: SignerWithAddress[];

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();

    /*     Insure = await ethers.getContractFactory("Insure");
    insureContract = await Insure.deploy(expirationTimes, addr1.address);

    Dai = await ethers.getContractFactory("DAI");
    daiContract = await Dai.deploy(); */

    CustomOracle = await ethers.getContractFactory("CustomOracle");
    customOracleContract = await CustomOracle.deploy(expirationTimes);

    /*     insureAddress = insureContract.address;
    daiAddress = daiContract.address; */
  });

  it("CONSTRUCTOR: Set owner right", async function () {
    expect(await customOracleContract.owner()).to.equal(owner.address);
  });

  it("CONSTRUCTOR: Check expiration times", async function () {
    for (let expiration of expirationTimes) {
      expect(await customOracleContract.expiryAvailable(expiration)).to.equal(
        true
      );
      expect(
        await customOracleContract.expiryAvailable(expiration * 3)
      ).to.equal(false);
    }
  });

  it("CONSTRUCTOR: Expiration price set to 0", async function () {
    for (let expiration of expirationTimes) {
      expect(await customOracleContract.expiryDatePrice(expiration)).to.equal(
        0
      );
    }
  });

  it("SET EXPIRY PRICE: Modify settlement prices", async function () {
    await customOracleContract.setExpiryPrice(expirationTimes[0], 100);
    expect(
      await customOracleContract.getExpiryPriceLevel(expirationTimes[0])
    ).to.equal(100);
  });

  it("SET EXPIRY PRICE: Time is before expiration", async function () {
    await expect(
      customOracleContract.setExpiryPrice(expirationTimes[2], 100)
    ).to.be.revertedWith("Expiry !< currentTime.");
  });

  it("SET EXPIRY PRICE: Modify not possible with address != owner", async function () {
    await expect(
      customOracleContract
        .connect(addr1)
        .setExpiryPrice(expirationTimes[1], 100)
    ).to.be.revertedWith("Only owner can do this");
  });

  it("SET EXPIRY PRICE: Modify not possible with undefined expiry", async function () {
    let randomTime = 48932;
    await expect(
      customOracleContract.setExpiryPrice(randomTime, 100)
    ).to.be.revertedWith("No contract with this expiry.");
  });

  it("GET EXPIRY PRICE LEVEL: Get not possible with undefined expiry", async function () {
    let randomTime = 48932;
    await expect(
      customOracleContract.getExpiryPriceLevel(randomTime)
    ).to.be.revertedWith("No contract with this expiry.");
  });

  it("GET EXPIRY PRICE LEVEL: Get not possible before setting it", async function () {
    await expect(
      customOracleContract.getExpiryPriceLevel(expirationTimes[0])
    ).to.be.revertedWith("No contract with this expiry.");
  });

  it("GET EXPIRY PRICE LEVEL: Get with every address", async function () {
    await customOracleContract.setExpiryPrice(expirationTimes[0], 100);

    expect(
      await customOracleContract
        .connect(addr1)
        .getExpiryPriceLevel(expirationTimes[0])
    ).to.equal(100);
  });

  it("MAKE CORRECTION: Revert if price still not initialized", async function () {
    await expect(
      customOracleContract.makeCorrection(expirationTimes[0], 300)
    ).to.be.revertedWith("Data is not set.");
  });

  it("MAKE CORRECTION: Revert if expiry undefined", async function () {
    let randomExpiry = 48932;
    await expect(
      customOracleContract.makeCorrection(randomExpiry, 300)
    ).to.be.revertedWith("No contract with this expiry.");
  });

  it("MAKE CORRECTION: Correct the price.", async function () {
    await customOracleContract.setExpiryPrice(expirationTimes[0], 100);
    await customOracleContract.makeCorrection(expirationTimes[0], 300);

    expect(
      await customOracleContract.getExpiryPriceLevel(expirationTimes[0])
    ).to.equal(300);
  });

  it("MAKE CORRECTION: Only owner can correct.", async function () {
    await customOracleContract.setExpiryPrice(expirationTimes[0], 100);

    await expect(
      customOracleContract
        .connect(addr1)
        .makeCorrection(expirationTimes[0], 300)
    ).to.be.revertedWith("Only owner can do this");
  });
});
