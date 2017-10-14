class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.right === null) {
			this.right = node;
			node.parent = this;
		} 
	}

	removeChild(node) {
		if (node === this.left) {
			this.left = null;
			node.parent = null;
		} else if (node === this.right) {
			this.right = null;
			node.parent = null;
		} else throw new Error('Not a child of this node');
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent) {			
			var father = this.parent;
			var grandfather = this.parent.parent;
			var leftChild = this.left;
			var rightChild = this.right;
			var temporaryNode;

			if (this === father.left){
				this.left = father;
				
			} else if (this === father.right){
				this.right = father;
				 
			}
			father.parent = this;

			if (grandfather) {
				if (father === grandfather.left) {
					grandfather.left = this;

				}else if (father === grandfather.right) {
					grandfather.right = this;
				}
			}
			this.parent = grandfather;

			if (father.left && father.right) {
				if (this === father.left) {
					father.right.parent = this;
					this.left = father;
					this.right = father.right;
				} else if (this === father.right) {
					father.left.parent = this;
					this.right = father;
					this.left = father.right;
				} 
			}

			if (leftChild && rightChild) {
				leftChild.parent = father;
				rightChild.parent = father;
				father.left = leftChild;
				father.right = rightChild;
			} else if (leftChild) {
				leftChild.parent = father;
				father.left = leftChild; 
			} else if (rightChild) {
				rightChild.parent = father;
				father.right = rightChild;
			} 		
		}

	}
}  

module.exports = Node;
