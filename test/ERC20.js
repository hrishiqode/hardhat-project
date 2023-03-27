const { expect } = require("chai");

describe("ERC20 contract",async function () {
  it("Should return 1000 coins for owner", async function () {
    const [owner] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(1000);
  });
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
  it("Should set allowance for user", async function () {
    const [owner,otherAccount] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();

    await hardhatToken.approve(otherAccount.address,100);
    expect(await hardhatToken.allowance(owner.address,otherAccount.address)).to.equal(100);
  });
  it("Should set allowance for user", async function () {
    const [owner,otherAccount] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();

    await hardhatToken.approve(otherAccount.address,100);
    expect(await hardhatToken.allowance(owner.address,otherAccount.address)).to.equal(100);
  });
  it("Should transfer if msg.sender is coins owner", async function () {
    const [owner,otherAccount] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();

    const balanceOther = await hardhatToken.balanceOf(otherAccount.address);
    await hardhatToken.connect(owner).transfer(otherAccount.address,100);
    expect(await hardhatToken.balanceOf(otherAccount.address)).to.equal(balanceOther + 100);
  });
  it("Should transfer if msg.sender is approved", async function () {
    const [owner,otherAccount] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();
    await hardhatToken.connect(owner).approve(otherAccount.address,100);
    const balanceOther = await hardhatToken.balanceOf(otherAccount.address);
    await hardhatToken.connect(otherAccount).transferFrom(owner.address,otherAccount.address,100);
    expect(await hardhatToken.balanceOf(otherAccount.address)).to.equal(balanceOther + 100);
  });
  it("Should work on swapping NFT's", async function () {
    const [owner,otherAccount] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();
    await hardhatToken.connect(owner).approve(otherAccount.address,100);
    const balanceOther = await hardhatToken.balanceOf(otherAccount.address);
    await hardhatToken.connect(otherAccount).transferFrom(owner.address,otherAccount.address,100);
    expect(await hardhatToken.balanceOf(otherAccount.address)).to.equal(balanceOther + 100);
  });
  it("Owner should be able to mint coin for other addresses", async function () {
    const [owner,otherAccount] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20");

    const hardhatToken = await ERC20.deploy();

    const balanceOther = await hardhatToken.balanceOf(otherAccount.address);
    await hardhatToken.connect(owner).mint(otherAccount.address,100);
    expect(await hardhatToken.balanceOf(otherAccount.address)).to.equal(balanceOther + 100);
  });
});