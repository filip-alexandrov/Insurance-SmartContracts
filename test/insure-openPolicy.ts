import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Insure: Open Policy", function () {
  let expirationTimes = [162509760078, 999999999999, 9218390];

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

  // Addr1
  let firstExpiry = expirationTimes[1];
  let firstLots = 1;
  let firstLevel = ethers.utils.parseEther("201");
  let firstPrice = ethers.utils.parseEther("2.22");

  // Addr1 + Owner
  let secondExpiry = expirationTimes[0];
  let secondLots = 3;
  let secondLevel = ethers.utils.parseEther("201");
  let secondPrice = ethers.utils.parseEther("2.22");
  let secondBetterPrice = ethers.utils.parseEther("2.09");

  beforeEach(async function () {
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

  it("Revert Addr1 opens his policy", async function () {
    await expect(
      insureContract
        .connect(addr1)
        .openPolicy(
          addr1.address,
          secondExpiry,
          secondLots,
          secondLevel,
          secondPrice
        )
    ).to.be.revertedWith("Provider and taker must be different");
  });

  it("Revert Addr2 opens non existing expiry", async function () {
    await expect(
      insureContract
        .connect(addr2)
        .openPolicy(
          owner.address,
          firstExpiry,
          secondLots,
          secondLevel,
          secondPrice
        )
    ).to.be.revertedWith("Provider has no such offer.");
  });

  it("Revert Addr2 exceeds provided", async function () {
    let newLots = secondLots + 20;
    await expect(
      insureContract
        .connect(addr2)
        .openPolicy(
          addr1.address,
          secondExpiry,
          newLots,
          secondLevel,
          secondPrice
        )
    ).to.be.revertedWith("Not enough lots");
  });

  it("Revert Addr2 false insurande level provided", async function () {
    let newLevel = "20";
    await expect(
      insureContract
        .connect(addr2)
        .openPolicy(
          addr1.address,
          secondExpiry,
          secondLots,
          ethers.utils.parseEther(newLevel),
          secondPrice
        )
    ).to.be.revertedWith("Wrong insurance level");
  });

  it("Revert Addr2 false insurande price provided", async function () {
    let newPrice = "20";
    await expect(
      insureContract
        .connect(addr2)
        .openPolicy(
          addr1.address,
          secondExpiry,
          secondLots,
          secondLevel,
          ethers.utils.parseEther(newPrice)
        )
    ).to.be.revertedWith("Wrong cost of insurance");
  });

  it("Revert Addr2 false insurande price provided", async function () {
    let newPrice = "20";
    await expect(
      insureContract
        .connect(addr2)
        .openPolicy(
          addr1.address,
          secondExpiry,
          secondLots,
          secondLevel,
          ethers.utils.parseEther(newPrice)
        )
    ).to.be.revertedWith("Wrong cost of insurance");
  });

  it("Revert Addr1 balance cannot provide full lots", async function () {
    await insureContract
      .connect(addr1)
      .withdraw(ethers.utils.parseEther("850"));

    await expect(
      insureContract
        .connect(addr2)
        .openPolicy(
          addr1.address,
          secondExpiry,
          secondLots,
          secondLevel,
          secondPrice
        )
    ).to.be.revertedWith("Provider has not enough funds.");
  });

  it("Revert Addr2 balance not enough", async function () {
    await insureContract
      .connect(addr2)
      .withdraw(ethers.utils.parseEther("994"));

    await expect(
      insureContract
        .connect(addr2)
        .openPolicy(
          addr1.address,
          secondExpiry,
          secondLots,
          secondLevel,
          secondPrice
        )
    ).to.be.revertedWith("Taker has not enough funds.");
  });

  it("Subtract from provider and taker balance", async function () {
    await insureContract
      .connect(addr2)
      .openPolicy(
        addr1.address,
        secondExpiry,
        secondLots,
        secondLevel,
        secondPrice
      );

    let providerBalance = parseFloat(
      ethers.utils.formatEther(await insureContract.balance(addr1.address))
    );
    let takerBalance = parseFloat(
      ethers.utils.formatEther(await insureContract.balance(addr2.address))
    );

    let providerMinus = 100 * secondLots;
    let takerMinus =
      parseFloat(ethers.utils.formatEther(secondPrice)) * secondLots;

    expect(providerBalance == 1000 - providerMinus + takerMinus).to.equal(true);
    expect(takerBalance == 1000 - takerMinus).to.equal(true);
  });

  it("activeTakersPolicies appended", async function () {
    await insureContract
      .connect(addr2)
      .openPolicy(
        addr1.address,
        secondExpiry,
        secondLots,
        secondLevel,
        secondPrice
      );

    let [provider, lots, level, expiry] =
      await insureContract.activeTakersPolicies(addr2.address, 0);

    lots = parseFloat(ethers.utils.formatEther(lots));
    expiry = expiry.toNumber();

    expect(provider).to.equal(addr1.address);
    expect(lots).to.equal(secondLots);
    expect(level).to.equal(secondLevel);
    expect(expiry).to.equal(secondExpiry);
  });

  it("activeProviderTakers appended", async function () {
    await insureContract
      .connect(addr2)
      .openPolicy(
        addr1.address,
        secondExpiry,
        secondLots,
        secondLevel,
        secondPrice
      );

    let takers = await insureContract.getActiveProviderTakers(addr1.address);
    expect(takers[0]).to.equal(addr2.address);
  });

  it("activeProviderTakers appended", async function () {
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
    level = parseFloat(ethers.utils.formatEther(level));
    expiry = expiry.toNumber();

    expect(provider).to.equal(provider);
    expect(lots).to.equal(secondLots);
    expect(expiry).to.equal(secondExpiry);
  });
});
