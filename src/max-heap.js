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
		if(this.root !== null){
			var detachedRoot = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
		}
	}

	detachRoot() {
		var detachedRoot = this.parentNodes[0];
		this.root = null;
		this.parentNodes.shift();
		this.heapSize --;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		
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
		if(node.parent && node.priority > node.parent.priority) {
			if(node.parent === this.root) {
				this.root = node;
			}
			var fatherPos = this.parentNodes.indexOf(node.parent);
			var nodePos = this.parentNodes.indexOf(node);
			if (fatherPos != -1){
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
		
	}
}

module.exports = MaxHeap;
