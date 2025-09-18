const Tree = require("./Tree");
const {
	getRandomNumbersArr,
	prettyPrint,
	bstLevelOrder,
	bstPreOrder,
	bstPostOrder,
	bstInOrder,
} = require("./util");

const randomNumbersArr = getRandomNumbersArr(15, 100, 0);
console.log({ randomNumbersArr });

const bst = new Tree(randomNumbersArr);
prettyPrint(bst.root);

console.log({ isBalanced: bst.isBalanced() });

console.log({ lvlOrder: bstLevelOrder(bst) });
console.log({ preOrder: bstPreOrder(bst) });
console.log({ postOrder: bstPostOrder(bst) });
console.log({ inOrder: bstInOrder(bst) });

const newRandomNumbersArr = getRandomNumbersArr(15, 100, 100);
console.log({ newRandomNumbersArr });

newRandomNumbersArr.forEach(value => bst.insert(value));
prettyPrint(bst.root);
console.log({ isBalanced: bst.isBalanced() });
console.log({ height: bst.height(bst.root.data) });

bst.rebalance();
prettyPrint(bst.root);
console.log({ isBalanced: bst.isBalanced() });
console.log({ height: bst.height(bst.root.data) });

console.log({ lvlOrder: bstLevelOrder(bst) });
console.log({ preOrder: bstPreOrder(bst) });
console.log({ postOrder: bstPostOrder(bst) });
console.log({ inOrder: bstInOrder(bst) });
