const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("StatusDaoNFTコントラクト", function() {
    let StatusDaoNFT;
    let statusDaoNFT;
    const name = "StatusDaoNFT";
    const symbol = "SDN";
    const tokenURI1 = "hoge1";
    const tokenURI2 = "hoge2";
    let owner;
    let addr1;

    beforeEach(async function(){
         [owner, addr1] = await ethers.getSigners();
         StatusDaoNFT = await ethers.getContractFactory("StatusDaoNFT");
         statusDaoNFT = await StatusDaoNFT.deploy();
        await statusDaoNFT.deployed();
    });

    it("トークンの名前とシンボルがセットされるべき", async function() {
        expect(await statusDaoNFT.name()).to.equal(name);
        expect(await statusDaoNFT.symbol()).to.equal(symbol);
    });

    it("デプロイアドレスがオーナーに設定されるべき", async function() {
        expect(await statusDaoNFT.owner()).to.equal(owner.address);
    });

    it("ownerはNFT作成できるべき", async function(){
        await statusDaoNFT.nftMint(addr1.address, tokenURI1);
        expect(await statusDaoNFT.ownerOf(1)).to.equal(addr1.address);
    });

    it("NFT作成の度にtokenIdが増えるべき", async function(){
        await statusDaoNFT.nftMint(addr1.address, tokenURI1);
        await statusDaoNFT.nftMint(addr1.address, tokenURI2);
        expect(await statusDaoNFT.tokenURI(1)).to.equal(tokenURI1);
        expect(await statusDaoNFT.tokenURI(2)).to.equal(tokenURI2);
    });

    it("owner以外はNFT作成に失敗すべき", async function(){
        await expect(statusDaoNFT.connect(addr1).nftMint(addr1.address, tokenURI1))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("NFT作成後に'TokenURIChanged'イベントが発行されるべき", async function() {
        await expect(statusDaoNFT.nftMint(addr1.address, tokenURI1))
        .to.emit(statusDaoNFT, "TokenURIChanged").withArgs(addr1.address, 1, tokenURI1);
    });
})
