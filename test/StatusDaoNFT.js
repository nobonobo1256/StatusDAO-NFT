const { expect } = require("Chai");
const { ethers } = require("hardhat");


describe("StatusDaoNFTコントラクト", function() {
    it("トークンの名前とシンボルがセットされるべき", async function() {
        const name = "StatusDaoNFT";
        const symbol = "SDN";
        const StatusDaoNFT = await ethers.getContractFactory("StatusDaoNFT");
        const statusDaoNFT = await StatusDaoNFT.deploy();
        await statusDaoNFT.deployed();

        expect(await statusDaoNFT.name()).to.equal(name);
        expect(await statusDaoNFT.symbol()).to.equal(symbol);
    });

    it("デプロイアドレスがオーナーに設定されるべき", async function() {
        const [owner] = await ethers.getSigners();
        const StatusDaoNFT = await ethers.getContractFactory("StatusDaoNFT");
        const statusDaoNFT = await StatusDaoNFT.deploy();
        await statusDaoNFT.deployed();
        expect(await statusDaoNFT.owner()).to.equal(owner.address);
    });
})
