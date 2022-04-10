import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Insure: Close Policy: price rises, provider wins", function () {
  let evmBeforeExpiration;
  let expirationTimes: number[] = [];

  let Insure: ContractFactory;
  let insureContract: Contract;
  let insureAddress: String;

  let Dai: ContractFactory;
  let daiContract: Contract;
  let daiAddress: String;

  let CustomOracle: ContractFactory;
  let oracleContract: Contract;
  let oracleAddress: String;

  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress,
    other: SignerWithAddress[];

  // Addr1 first/second expiry defined in beforeEach
  let normalFirstLevel = 201;
  let normalFirstPrice = 2.22;

  let firstExpiry: any;
  let firstLots = 1;
  let firstLevel = ethers.utils.parseEther(normalFirstLevel.toString());
  let firstPrice = ethers.utils.parseEther(normalFirstPrice.toString());

  // Addr1 + Owner
  let normalSecondLevel = 201;
  let normalSecondPrice = 2.22;
  let normalSecondBetterPrice = 2.09;

  let secondExpiry: any;
  let secondLots = 3;
  let secondLevel = ethers.utils.parseEther(normalSecondLevel.toString());
  let secondPrice = ethers.utils.parseEther(normalSecondPrice.toString());
  let secondBetterPrice = ethers.utils.parseEther(
    normalSecondBetterPrice.toString()
  );

  before(async function () {
    // Set Expiration Times in the future
    for (let expiration of [16000, 17000, 18000]) {
      expirationTimes.push(
        (await ethers.provider.getBlock(await ethers.provider.getBlockNumber()))
          .timestamp + expiration
      );
    }

    firstExpiry = expirationTimes[1];
    secondExpiry = expirationTimes[0];

    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();

    Dai = await ethers.getContractFactory("DAI");
    daiContract = await Dai.deploy();
    daiAddress = daiContract.address;

    Insure = await ethers.getContractFactory("Insure");
    insureContract = await Insure.deploy(expirationTimes, daiAddress);
    insureAddress = insureContract.address;

    CustomOracle = await ethers.getContractFactory("CustomOracle");
    oracleContract = await CustomOracle.deploy(expirationTimes);
    oracleAddress = oracleContract.address;

    await daiContract.mint(owner.address, ethers.utils.parseEther("1000"));
    await daiContract.mint(addr1.address, ethers.utils.parseEther("1000"));
    await daiContract.mint(addr2.address, ethers.utils.parseEther("1000"));

    await daiContract.approve(insureAddress, ethers.utils.parseEther("1000"));
    await daiContract
      .connect(addr1)
      .approve(insureAddress, ethers.utils.parseEther("1000"));
    await daiContract
      .connect(addr2)
      .approve(insureAddress, ethers.utils.parseEther("1000"));

    await insureContract.deposit(ethers.utils.parseEther("1000"));
    await insureContract
      .connect(addr1)
      .deposit(ethers.utils.parseEther("1000"));
    await insureContract
      .connect(addr2)
      .deposit(ethers.utils.parseEther("1000"));

    // Addr1 provides fist and second insurance
    await insureContract
      .connect(addr1)
      .setProviderInfo(firstExpiry, firstLots, firstLevel, firstPrice);
    await insureContract
      .connect(addr1)
      .setProviderInfo(secondExpiry, secondLots, secondLevel, secondPrice);

    // Owner provides second at better price
    await insureContract.setProviderInfo(
      secondExpiry,
      secondLots,
      secondLevel,
      secondBetterPrice
    );
  });

  it("Set InsureContract Oracle address", async function () {
    await insureContract.setOracle(oracleAddress);

    expect(await insureContract.oracleAddress()).to.equal(oracleAddress);
  });

  it("Addr2 opens policy from addr1", async function () {
    await insureContract
      .connect(addr2)
      .openPolicy(
        addr1.address,
        secondExpiry,
        secondLots,
        secondLevel,
        secondPrice
      );

    let policies = await insureContract.getActiveTakersPolicies(addr2.address);
    let [provider, lots, level, expiry] = policies[0];
    lots = parseFloat(ethers.utils.formatEther(lots));
    expiry = expiry.toNumber();

    expect(provider).to.equal(provider);
    expect(lots).to.equal(secondLots);
    expect(level).to.equal(secondLevel);
    expect(expiry).to.equal(secondExpiry);
  });

  it("Set oracle price (provider wins)", async function () {
    // Blockchain time to endtime for all policies
    await ethers.provider.send("evm_setNextBlockTimestamp", [
      expirationTimes[2] + 1,
    ]);

    let aboveSecondLevel = ethers.utils.parseEther("201.5");
    await oracleContract.setExpiryPrice(secondExpiry, aboveSecondLevel);

    expect(await oracleContract.getExpiryPriceLevel(secondExpiry)).to.equal(
      aboveSecondLevel
    );
  });

  it("CHECK POLICIES: Revert on false address taker", async function () {
    await expect(
      insureContract.connect(addr1).checkPolicies(addr3.address)
    ).to.be.revertedWith("No such taker address");
  });

  it("CHECK POLICIES: Close taker policy", async function () {
    await insureContract.connect(addr1).checkPolicies(addr2.address);

    let policies = await insureContract.getActiveTakersPolicies(addr2.address);
    // No taker policies left
    expect(policies.length).to.equal(0);

    /* let [provider, lots, level, expiry] = policies[0];

    lots = parseFloat(ethers.utils.formatEther(lots));
    level = parseFloat(ethers.utils.formatEther(level));
    expiry = expiry.toNumber();

    expect(provider).to.equal(ethers.constants.AddressZero);
    expect(lots).to.equal(0);
    expect(level).to.equal(0);
    expect(expiry).to.equal(0); */
  });

  it("Right balance provider", async function () {
    let expectedBalance = 1000 + normalSecondPrice * secondLots;
    let actualBalance = parseFloat(
      ethers.utils.formatEther(await insureContract.balance(addr1.address))
    );

    expect(actualBalance).to.equal(expectedBalance);
  });

  it("Right balance taker", async function () {
    let expectedBalance = 1000 - normalSecondPrice * secondLots;
    let actualBalance = parseFloat(
      ethers.utils.formatEther(await insureContract.balance(addr2.address))
    );

    expect(actualBalance).to.equal(expectedBalance);
  });

  it("CHECK POLICIES: Try closing policy again (double settlement abuse)", async function () {
    await expect(
      insureContract.connect(addr1).checkPolicies(addr2.address)
    ).to.be.revertedWith("No such taker address");
  });

  it("Unchanged balance provider", async function () {
    let expectedBalance = 1000 + normalSecondPrice * secondLots;
    let actualBalance = parseFloat(
      ethers.utils.formatEther(await insureContract.balance(addr1.address))
    );

    expect(actualBalance).to.equal(expectedBalance);
  });

  it("Unchanged balance taker", async function () {
    let expectedBalance = 1000 - normalSecondPrice * secondLots;
    let actualBalance = parseFloat(
      ethers.utils.formatEther(await insureContract.balance(addr2.address))
    );

    expect(actualBalance).to.equal(expectedBalance);
  });
});
