require('dotenv').config();
const Coin = require('../src/class/Coin');
const { transactionModel, responseModel } = require('./models/CoinModel');
const { genesisBlock } = require('../src/params');

describe('Coin before mine', () => {
  const fakeCoin = new Coin();

  describe('After Initialize fakeCoin', () => {
    test('contains blockchain with genesis block', () => {
      const chain = fakeCoin.getChain();
      expect(chain).toEqual(expect.any(Array));
      expect(chain).toHaveLength(1);
      expect(chain).toContainEqual({
        index: 1,
        previousHash: genesisBlock.previousHash,
        proof: genesisBlock.proof,
        timeStamp: expect.any(Date),
        transactions: [],
      });
    });
  });

  const transactionResponse = fakeCoin.setNewTransaction(transactionModel);

  describe('After one fakeCoin transaction', () => {
    test('transaction wad added', () => {
      expect(transactionResponse).toEqual({ message: responseModel });
    });

    test('last current transaction are equal to the last transaction added', () => {
      expect(fakeCoin.blockchain.getCurrentTransaction()[0]).toEqual(transactionModel);
    });
  });
});

describe('After mine', () => {
  const fakeCoin = new Coin();

  beforeAll(() => fakeCoin.setNewTransaction(transactionModel));

  test('Block was mined', () => {
    const mineResponses = fakeCoin.mine();
    expect(mineResponses).toEqual({ message: 'New Block Mined !' });
  });

  // Test previousHash, proof and transactions
  test('Block was added to the blockchain', () => {
    const chain = fakeCoin.getChain();
    expect(chain).toEqual(expect.any(Array));
    expect(chain).toHaveLength(2);
    expect(chain).toContainEqual({
      index: 2,
      previousHash: expect.any(String),
      proof: expect.any(Number),
      timeStamp: expect.any(Date),
      transactions: expect.any(Array),
    });
  });
});

