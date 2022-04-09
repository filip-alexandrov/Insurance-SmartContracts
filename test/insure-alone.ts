import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

/* describe("Insure: Constructor, Oracle, Withdraw, Deposit, SetProvider", function () {
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

  before(async function () {
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

    await daiContract.approve(insureAddress, ethers.utils.parseEther("10"));
    await daiContract
      .connect(addr1)
      .approve(insureAddress, ethers.utils.parseEther("10"));

    await insureContract.deposit(ethers.utils.parseEther("5"));
    await insureContract.connect(addr1).deposit(ethers.utils.parseEther("10"));
  });

  it("CONSTRUCTOR: Set owner and expiry dates.", async function () {
    for (let expiration of expirationTimes) {
      expect(await insureContract.expiryDates(expiration)).to.equal(true);
      expect(await insureContract.expiryDates(expiration * 3)).to.equal(false);
    }
    expect(await insureContract.owner()).to.equal(owner.address);
  });

  it("SET ORACLE: By owner", async function () {
    await insureContract.setOracle(oracleAddress);
    expect(await insureContract.oracle()).to.equal(oracleAddress);
  });

  it("SET ORACLE: By other address", async function () {
    await expect(
      insureContract.connect(addr1).setOracle(oracleAddress)
    ).to.be.revertedWith("Only owner can do this");
  });

  it("DEPOSIT: By owner address", async function () {
    await insureContract.deposit(ethers.utils.parseEther("5"));

    expect(await insureContract.balance(owner.address)).to.equal(
      ethers.utils.parseEther("10")
    );
  });

  it("WITHDRAW: Half by owner address", async function () {
    await insureContract.withdraw(ethers.utils.parseEther("5"));

    expect(await insureContract.balance(owner.address)).to.equal(
      ethers.utils.parseEther("5")
    );
  });

  it("WITHDRAW: By owner to zero", async function () {
    await insureContract.withdraw(ethers.utils.parseEther("5"));

    expect(await insureContract.balance(owner.address)).to.equal(
      ethers.utils.parseEther("0")
    );
  });

  it("DEPOSIT: Increase addr1 balance to 1000", async function () {
    await daiContract
      .connect(addr1)
      .approve(insureAddress, ethers.utils.parseEther("990"));
    await insureContract.connect(addr1).deposit(ethers.utils.parseEther("990"));

    expect(await insureContract.connect(addr1).balance(addr1.address)).to.equal(
      ethers.utils.parseEther("1000")
    );
  });

  it("SET PROVIDER INFO: From no owner", async function () {
    let expiry = expirationTimes[0];
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("2.22");

    await insureContract
      .connect(addr1)
      .setProviderInfo(expiry, lots, level, price);

    let [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(addr1.address, expiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(lots);
    expect(levelReturned).to.equal(level);
    expect(priceReturned).to.equal(price);
  });

  it("SET PROVIDER INFO: Balance not enough", async function () {
    let expiry = expirationTimes[0];
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("0.01");

    await expect(
      insureContract.setProviderInfo(expiry, lots, level, price)
    ).to.be.revertedWith("Balance too low");
  });

  it("SET PROVIDER INFO: False expiry date", async function () {
    let expiry = 3333;
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("0.01");

    await expect(
      insureContract.connect(addr1).setProviderInfo(expiry, lots, level, price)
    ).to.be.revertedWith("No such expiry available");
  });

  it("SET PROVIDER INFO: Expiry exceeds current date", async function () {
    let expiry = expirationTimes[2];
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("0.01");

    await expect(
      insureContract.connect(addr1).setProviderInfo(expiry, lots, level, price)
    ).to.be.revertedWith("Expiry in the past.");
  });

  it("SET PROVIDER INFO: Under $0.01 price", async function () {
    let expiry = expirationTimes[0];
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("0.001");

    await expect(
      insureContract.connect(addr1).setProviderInfo(expiry, lots, level, price)
    ).to.be.revertedWith("Price and Lot Data not compatible");
  });

  it("SET PROVIDER INFO: Over $1000 price", async function () {
    let expiry = expirationTimes[0];
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("1000");

    await expect(
      insureContract.connect(addr1).setProviderInfo(expiry, lots, level, price)
    ).to.be.revertedWith("Price and Lot Data not compatible");
  });

  it("SET PROVIDER INFO: Lots over 1000", async function () {
    let expiry = expirationTimes[0];
    let lots = 1001;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("0.22");

    await expect(
      insureContract.connect(addr1).setProviderInfo(expiry, lots, level, price)
    ).to.be.revertedWith("Price and Lot Data not compatible");
  });

  it("SET PROVIDER INFO: Change only 1 policy", async function () {
    // Create new policy
    let expiry = expirationTimes[1];
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("2.22");

    await insureContract
      .connect(addr1)
      .setProviderInfo(expiry, lots, level, price);

    // Change parameter lots of old policy
    let oldExpiry = expirationTimes[0];
    let oldLots = 3;
    let oldLevel = ethers.utils.parseEther("201");
    let oldPrice = ethers.utils.parseEther("2.22");

    await insureContract
      .connect(addr1)
      .setProviderInfo(oldExpiry, oldLots, oldLevel, oldPrice);

    // Retrieve new expiry data
    let [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(addr1.address, expiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(lots);
    expect(levelReturned).to.equal(level);
    expect(priceReturned).to.equal(price);

    [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(addr1.address, oldExpiry);

    // Retrieve chnged old expiry data
    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(
      oldLots
    );
    expect(levelReturned).to.equal(oldLevel);
    expect(priceReturned).to.equal(oldPrice);
  });
});

describe("Insure: Delete Policy", function () {
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

  before(async function () {
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

    await daiContract.approve(insureAddress, ethers.utils.parseEther("1000"));
    await daiContract
      .connect(addr1)
      .approve(insureAddress, ethers.utils.parseEther("1000"));

    await insureContract.deposit(ethers.utils.parseEther("1000"));
    await insureContract
      .connect(addr1)
      .deposit(ethers.utils.parseEther("1000"));
  });

  it("Addr1 and Owner create Policy", async function () {
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

    await insureContract
      .connect(addr1)
      .setProviderInfo(firstExpiry, firstLots, firstLevel, firstPrice);
    await insureContract
      .connect(addr1)
      .setProviderInfo(secondExpiry, secondLots, secondLevel, secondPrice);

    await insureContract.setProviderInfo(
      secondExpiry,
      secondLots,
      secondLevel,
      secondPrice
    );
  });

  it("Addr1 delete a Policy", async function () {
    let firstExpiry = expirationTimes[1];
    let firstLots = 1;
    let firstLevel = ethers.utils.parseEther("201");
    let firstPrice = ethers.utils.parseEther("2.22");

    let secondExpiry = expirationTimes[0];
    let secondLots = 3;
    let secondLevel = ethers.utils.parseEther("201");
    let secondPrice = ethers.utils.parseEther("2.22");

    await insureContract.connect(addr1).deleteProviderPolicies([firstExpiry]);

    let [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(addr1.address, firstExpiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(0);
    expect(levelReturned).to.equal(0);
    expect(priceReturned).to.equal(0);

    [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(addr1.address, secondExpiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(
      secondLots
    );
    expect(levelReturned).to.equal(secondLevel);
    expect(priceReturned).to.equal(secondPrice);
  });

  it("Owner has still policies", async function () {
    let secondExpiry = expirationTimes[0];
    let secondLots = 3;
    let secondLevel = ethers.utils.parseEther("201");
    let secondPrice = ethers.utils.parseEther("2.22");

    let [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(owner.address, secondExpiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(
      secondLots
    );
    expect(levelReturned).to.equal(secondLevel);
    expect(priceReturned).to.equal(secondPrice);
  });
}); */

/* describe("Insure: Open Policy ", function () {
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
}); */

describe.only("Insure: Close Policy ", function () {
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
  let firstExpiry: any;
  let firstLots = 1;
  let firstLevel = ethers.utils.parseEther("201");
  let firstPrice = ethers.utils.parseEther("2.22");

  // Addr1 + Owner
  let secondExpiry: any;
  let secondLots = 3;
  let secondLevel = ethers.utils.parseEther("201");
  let secondPrice = ethers.utils.parseEther("2.22");
  let secondBetterPrice = ethers.utils.parseEther("2.09");

  beforeEach(async function () {
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

    // Addr2 opens policy with addr1
    await insureContract
      .connect(addr2)
      .openPolicy(
        addr1.address,
        secondExpiry,
        secondLots,
        secondLevel,
        secondPrice
      );
  });

  it("Set oracle price", async function () {
    // Blockchain time to endtime for all policies
    await ethers.provider.send("evm_setNextBlockTimestamp", [
      expirationTimes[2],
    ]);

    let aboveSecondLevel = ethers.utils.parseEther("201");
    await oracleContract.setExpiryPrice(secondExpiry, aboveSecondLevel);

    expect(await oracleContract.getExpiryPriceLevel(secondExpiry)).to.equal(
      aboveSecondLevel
    );
  });
});
