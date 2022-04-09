import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("DAI Mock (alone)", function () {
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
});
