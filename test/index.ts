import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Insure contract(alone)", function () {
  let expirationTimes = [1625097600, 9218390, 999999999999];

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
    let expiry = 999999999999999;
    let lots = 1;
    let level = ethers.utils.parseEther("201");
    let price = ethers.utils.parseEther("0.01");

    await expect(
      insureContract.connect(addr1).setProviderInfo(expiry, lots, level, price)
    ).to.be.revertedWith("No such expiry available");
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

  // Test opening policy
});

/* describe("DAI Mock (alone)", function () {
  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress,
    other: SignerWithAddress[];

  let Dai: ContractFactory;
  let daiContract: Contract;
  let daiAddress: String;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();

    Dai = await ethers.getContractFactory("DAI");
    daiContract = await Dai.deploy();
    daiAddress = daiContract.address;
  });

  it("CONSTRUCTOR: Set owner", async function () {
    expect(await daiContract.owner()).to.equal(owner.address);
  });

  it("CONSTRUCTOR: Set symbol", async function () {
    expect(await daiContract.symbol()).to.equal("DAI");
  });

  it("CONSTRUCTOR: Set name", async function () {
    expect(await daiContract.name()).to.equal("DAI");
  });

  it("CONSTRUCTOR: Set decimals", async function () {
    expect(await daiContract.decimals()).to.equal(18);
  });

  it("CONSTRUCTOR: Set totalSupply", async function () {
    expect(await daiContract.totalSupply()).to.equal(0);
  });

  it("MINT: Mint from owner", async function () {
    await daiContract.mint(owner.address, ethers.utils.parseEther("1000"));

    expect(await daiContract.balanceOf(owner.address)).to.equal(
      ethers.utils.parseEther("1000")
    );
  });

  it("MINT: Mint to others", async function () {
    await daiContract.mint(addr1.address, ethers.utils.parseEther("1000"));

    expect(await daiContract.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther("1000")
    );
  });

  it("MINT: Mint to others", async function () {
    await expect(
      daiContract
        .connect(addr1)
        .mint(addr1.address, ethers.utils.parseEther("1000"))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("ALLOWANCE: Allow others to spend", async function () {
    await daiContract.approve(addr1.address, ethers.utils.parseEther("10"));

    expect(await daiContract.allowance(owner.address, addr1.address)).to.equal(
      ethers.utils.parseEther("10")
    );
  });
}); */

/* describe("Oracle Contract", function () {
  let expirationTimes = [1625097600, 9218390, 999999999999];

  let CustomOracle: ContractFactory;
  let customOracleContract: Contract;

  let owner: SignerWithAddress,
    addr1: SignerWithAddress,
    addr2: SignerWithAddress,
    addr3: SignerWithAddress,
    other: SignerWithAddress[];

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...other] = await ethers.getSigners();

    CustomOracle = await ethers.getContractFactory("CustomOracle");
    customOracleContract = await CustomOracle.deploy(expirationTimes);
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
 */
