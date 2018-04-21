const Blockchain = require('../src/class/Blockchain');
const { genesisBlock } = require('../src/params');

describe('Initialize Blockchain', () => {
  const blockchain = new Blockchain();
  test('returns chain with genesis block', () => {
    const chain = blockchain.getChain();
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
  test('returns empty current transaction', () => {
    expect(blockchain.getCurrentTransaction()).toEqual([]);
  });
});
