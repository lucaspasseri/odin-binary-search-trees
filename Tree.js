const Node = require("./Node");
class Tree {
	root;
	constructor(arr) {
		this.root = this.buildTree(arr);
	}

	buildTree(arr) {
		const sortArr = [...arr].sort((a, b) => a - b);
		const hashMap = {};

		const filteredArr = sortArr.filter(item => {
			if (hashMap[item] === undefined) {
				hashMap[item] = true;
				return true;
			}
			return false;
		});

		const tree = this.buildTreeRec(filteredArr, 0, filteredArr.length - 1);

		return tree;
	}

	buildTreeRec(arr, start, end) {
		if (end < start) return null;

		const mid = Math.floor((start + end) / 2);

		const node = new Node(arr[mid]);

		node.left = this.buildTreeRec(arr, start, mid - 1);
		node.right = this.buildTreeRec(arr, mid + 1, end);

		return node;
	}

	insert(value) {
		let currNode = this.root;
		let condition = true;
		while (condition) {
			if (value <= currNode.data) {
				if (currNode.left === null) {
					currNode.left = new Node(value);
					condition = false;
				} else {
					currNode = currNode.left;
				}
			} else {
				if (currNode.right === null) {
					currNode.right = new Node(value);
					condition = false;
				} else {
					currNode = currNode.right;
				}
			}
		}
	}

	deleteItem(value) {
		let currNode = this.root;
		let prevNode;

		while (currNode === null || currNode.data !== value) {
			if (value < currNode.data) {
				prevNode = currNode;
				currNode = currNode.left;
			} else {
				prevNode = currNode;
				currNode = currNode.right;
			}
		}

		if (currNode === null) return null;

		if (currNode.left === null && currNode.right === null) {
			if (prevNode.left?.data === currNode.data) {
				prevNode.left = null;
			} else {
				prevNode.right = null;
			}
			return currNode;
		}

		if (currNode.left === null) {
			if (prevNode.left?.data === currNode.data) {
				prevNode.left = currNode.right;
			} else {
				prevNode.right = currNode.right;
			}
			return currNode;
		}

		if (currNode.right === null) {
			if (prevNode.left?.data === currNode.data) {
				prevNode.left = currNode.left;
			} else {
				prevNode.right = currNode.left;
			}
			return currNode;
		}

		let leftChildMostRight = currNode.left;

		while (leftChildMostRight.right !== null) {
			leftChildMostRight = leftChildMostRight.right;
		}

		const newValue = leftChildMostRight.data;
		const innerReturn = this.deleteItem(leftChildMostRight.data);
		currNode.data = newValue;
		return innerReturn;
	}
}

const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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

const t = new Tree(test);

prettyPrint(t.root);

const t1 = new Tree([10, 20, 30]);
prettyPrint(t1.root);

const t2 = new Tree([1, 2, 3, 4, 5, 6, 7]);
prettyPrint(t2.root);

const t3 = new Tree([8, 9, 1, 2, 3, 4, 5, 6, 7]);
prettyPrint(t3.root);

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
