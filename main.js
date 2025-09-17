const Tree = require("./Tree");

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const arr1 = [10, 20, 30];

const t = new Tree(arr);

prettyPrint(t.root);

const t1 = new Tree(arr1);
prettyPrint(t1.root);

t1.insert(40);

prettyPrint(t1.root);
t1.insert(50);
prettyPrint(t1.root);

t1.insert(25);
t1.insert(28);
t1.insert(27);
t1.insert(29);
prettyPrint(t1.root);

t1.deleteItem(30);
prettyPrint(t1.root);

t1.deleteItem(29);
prettyPrint(t1.root);

console.log(t1.find(27));
console.log(t1.find(40));
console.log(t1.find(20));
console.log(t1.find(100));

let lvlOrder = "";
t1.levelOrderForEach(curr => {
	lvlOrder += `-${curr.data}`;
});
console.log(lvlOrder);

let lvlOrderRec = "";
t1.levelOrderForEachRec(curr => (lvlOrderRec += `-${curr.data}`));
console.log(lvlOrderRec);

let inOrder = "";
t1.inOrderForEach(node => (inOrder += `-${node.data}`));
console.log(inOrder);

let inOrderRec = "";
t1.inOrderForEachRec(node => (inOrderRec += `-${node.data}`));
console.log(inOrderRec);

t1.deleteItem(null);
