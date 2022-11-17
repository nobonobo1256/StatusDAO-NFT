const main = async () => {
    StatusDaoNFT = await ethers.getContractFactory("StatusDaoNFT");
    statusDaoNFT = await StatusDaoNFT.deploy();
    await statusDaoNFT.deployed();
    console.log(`Contract deployed to: ${statusDaoNFT.address}`);
};

const deploy = async () => {
    try{
        await main();
        process.exit(0);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

deploy()