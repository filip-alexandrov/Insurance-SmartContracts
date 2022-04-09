import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

/* it("Addr1 has all policies deleted", async function () {
    // Old Policy data
    let firstExpiry = expirationTimes[0];

    let secondExpiry = expirationTimes[0];
    let secondLots = 3;
    let secondLevel = ethers.utils.parseEther("201");
    let secondPrice = ethers.utils.parseEther("2.22");

    // Create new policy form owner
    await insureContract.setProviderInfo(
      secondExpiry,
      secondLots,
      secondLevel,
      secondPrice
    );

    // Delete all policies of addr1
    await insureContract.connect(addr1).deleteProviderPolicy(firstExpiry);

    // All policies of addr1 should be 0
    let [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(addr1.address, firstExpiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(0);
    expect(levelReturned).to.equal(0);
    expect(priceReturned).to.equal(0);

    [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(addr1.address, secondExpiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(0);
    expect(levelReturned).to.equal(0);
    expect(priceReturned).to.equal(0);

    // Owner policy still present
    [lotsReturned, levelReturned, priceReturned] =
      await insureContract.providers(owner.address, secondExpiry);

    expect(parseFloat(ethers.utils.formatEther(lotsReturned))).to.equal(
      secondLots
    );
    expect(levelReturned).to.equal(secondLevel);
    expect(priceReturned).to.equal(secondPrice);
  }); */

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
