const Blockchain = require('./Blockchain');

class Coin {
  constructor() {
    this.blockchain = new Blockchain();
  }

  getChain() {
    return this.blockchain.getChain();
  }

  setNewTransaction(transaction) {
    const index = this.blockchain.setNewTransaction(transaction);
    return { message: `Transaction will be added to Block ${index}` };
  }

  mine() {
    const lastBlock = this.blockchain.getLastBlock();
    const { proof: lastProof } = lastBlock;
    const proof = this.blockchain.proofOfWork(lastProof);

    this.blockchain.setNewTransaction({
      sender: '0',
      recipient: process.env.NODE_NAME,
      amount: 1,
    });

    const previousHash = this.blockchain.hashBlock(lastProof);
    const newBlock = this.blockchain.setNewBlock(proof, previousHash);
    return Object.assign({}, { message: 'New Block Mined !' }, newBlock);
  }
}

module.exports = Coin;
