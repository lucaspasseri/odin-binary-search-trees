function getRandomNumbersArr(size, magnitude, start) {
	return Array.from(
		{ length: size },
		() => start + Math.floor(Math.random() * magnitude)
	);
}

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

function bstLevelOrder(tree) {
	let bst = "LevelOrder: ";
	tree.levelOrderForEach(node => {
		bst += `${node.data},`;
	});
	return bst;
}

function bstPreOrder(tree) {
	let bst = "PreOrder: ";
	tree.preOrderForEach(node => {
		bst += `${node.data},`;
	});
	return bst;
}

function bstPostOrder(tree) {
	let bst = "PostOrder: ";
	tree.postOrderForEach(node => {
		bst += `${node.data},`;
	});
	return bst;
}

function bstInOrder(tree) {
	let bst = "InOrder: ";
	tree.inOrderForEach(node => {
		bst += `${node.data},`;
	});
	return bst;
}

module.exports = {
	getRandomNumbersArr,
	prettyPrint,
	bstLevelOrder,
	bstPreOrder,
	bstPostOrder,
	bstInOrder,
};
