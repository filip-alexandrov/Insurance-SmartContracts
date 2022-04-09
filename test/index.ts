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
