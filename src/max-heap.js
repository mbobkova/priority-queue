const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority)
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.isEmpty()) {
			var detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			return detachedRoot.data;
		}
	}

	detachRoot() {
		if (this.root) {
			var detachedRoot = this.root;
			if (this.parentNodes[0]=== this.root) {
				this.parentNodes.shift();
			}
			this.root = null;
			this.heapSize --;
			return detachedRoot;
		}
	}

	restoreRootFromLastInsertedNode(detached) {	
		if (this.parentNodes.length > 1) {
			var lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
			this.parentNodes.pop();
			this.root = lastInsertedNode;
			if (lastInsertedNode.parent === detached) {
				this.parentNodes.unshift(lastInsertedNode);
			}
			if (detached.left !== lastInsertedNode) {
				lastInsertedNode.appendChild(detached.left);
			}
			if (detached.right !== lastInsertedNode) {
				lastInsertedNode.appendChild(detached.right);
			}			
		}
		if (this.parentNodes.length === 1) {
			var lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
			this.root = lastInsertedNode;
			this.parentNodes.pop();
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if (this.root) {
			return false;
		} else return true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.root) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if(this.parentNodes[0].right){
				this.parentNodes.shift();
			}			
		} else {
			this.root = node;
			this.parentNodes.push(node);
		}
		this.heapSize ++;
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			if (node.parent === this.root) {
				this.root = node;
			}
			var fatherPos = this.parentNodes.indexOf(node.parent);
			var nodePos = this.parentNodes.indexOf(node);
			if (fatherPos != -1) {
				this.parentNodes[fatherPos] = node;
			}
			if (nodePos != -1) {
				this.parentNodes[nodePos] = node.parent;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		} else if (node.parent === null) {
			this.root = node;
		}	
	}

	shiftNodeDown(node) {
		if (node) {
			if ((node.left && node.left.priority > node.priority) || (node.right && node.right.priority > node.priority)) {
				var maxChild;
				var maxChildPos;
				var nodePos = this.parentNodes.indexOf(node);			
				if (node.left && node.right) {
					if (node.left.priority > node.right.priority) {
						maxChild = node.left;
					} else if (node.right.priority > node.left.priority) {
						maxChild = node.right;
					}
				} else {			
					if (node.left) {
						maxChild = node.left;
					}
					if (node.right) {
						maxChild = node.right;
					}
				}
				maxChildPos = this.parentNodes.indexOf(maxChild);
				if (maxChildPos != -1) {
					this.parentNodes[maxChildPos] = node;
				}
				if (nodePos != -1) {
					this.parentNodes[nodePos] = maxChild;
				}
				if (node === this.root) {
					this.root = maxChild;
				}
				maxChild.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
