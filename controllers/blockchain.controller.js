const SHA256 = require("crypto-js/sha256");
let index = 0;

// Create Block
class Block {
	constructor(index, data ,previousHash = ''){
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = new Date();
		this.data = data;
		this.hash = this.calculateHash();
	}

	// Create Hash
	calculateHash() {
		return SHA256(this.index + this.previousHash + JSON.stringify(this.data)).toString();
	}
}

// BlockChain
class chain {
	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	// Begining of chain index 0
  createGenesisBlock() {
      return new Block(0, "Genesis block", "0");
  }

  // Get Lastest Block
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }


  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

 	// Check if chain is valid or not.
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];

        if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
        }

        if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
        }
    }
    return true;
  }
}

// Create Coin
let myCoin = new chain();


exports.home = function(req,res) {
	const myBlock = new Block(index++, req.body);

	myCoin.addBlock(myBlock);

	console.log('Blockchain valid? ' + myCoin.isChainValid());

	return res.render('block', {
    block: myBlock,
  });

	// Trying to chang in chain
	// myCoin.chain[1].data = { pwd: "a" };
	// console.log(myCoin.chain)
	// console.log('Blockchain valid? ' + myCoin.isChainValid());
}

