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
		let prevNode = null;

		while (currNode !== null && currNode.data !== value) {
			prevNode = currNode;
			currNode = value < currNode.data ? currNode.left : currNode.right;
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

	find(value) {
		let currNode = this.root;

		while (currNode !== null) {
			if (currNode.data === value) return currNode;

			if (currNode.data > value) {
				currNode = currNode.left;
			} else {
				currNode = currNode.right;
			}
		}

		return null;
	}

	levelOrderForEach(cb) {
		if (cb === undefined) throw new Error();

		if (this.root === null) return null;

		let currNode = this.root;
		const q = [];

		q.push(currNode);

		while (q.length > 0) {
			currNode = q.shift();
			cb(currNode);
			if (currNode.left !== null) {
				q.push(currNode.left);
			}
			if (currNode.right !== null) {
				q.push(currNode.right);
			}
		}
	}

	levelOrderForEachRec(cb) {
		if (cb === undefined) throw new Error();

		if (this.root === null) return null;
		const q = [];

		q.push(this.root);

		function rec(q) {
			if (q.length === 0) return;

			const currNode = q.shift();
			cb(currNode);

			if (currNode.left !== null) {
				q.push(currNode.left);
			}

			if (currNode.right !== null) {
				q.push(currNode.right);
			}

			rec(q);
		}

		rec(q);
	}

	inOrderForEach(cb) {
		if (cb === undefined) throw new Error();

		if (this.root === null) return null;
		const s = [];
		const visited = {};

		s.push(this.root);
		let currNode = this.root;

		while (s.length > 0) {
			if (currNode.left === null || visited[currNode.left.data]) {
				visited[currNode.data] = true;
				cb(currNode);
				if (currNode.right === null) {
					currNode = s.pop();
				} else {
					currNode = currNode.right;
				}
			} else {
				s.push(currNode);
				currNode = currNode.left;
			}
		}
	}

	inOrderForEachRec(cb) {
		function rec(node) {
			if (node === null) return;
			rec(node.left);
			cb(node);
			rec(node.right);
		}
		rec(this.root);
	}
}

module.exports = Tree;
