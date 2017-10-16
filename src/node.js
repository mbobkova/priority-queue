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
			if (grandfather) {
				if (this.parent === grandfather.left) {
					grandfather.left = this;

				} else if (this.parent === grandfather.right) {
					grandfather.right = this;
				}
			}
			if (this === father.left){
				this.left = father;
				this.right = this.parent.right
				
			} else if (this === father.right){
				this.right = father;
				this.left = this.parent.left;
				 
			}
			if (father.left && father.right) {
				if (this === father.left) {
					this.right.parent = this;
					
				} else if (this === father.right) {
					this.left.parent = this;
				} 
			}
			this.parent = grandfather;			
			father.parent = this;
			father.left = leftChild;
			father.right = rightChild
			if (leftChild) {
				leftChild.parent = father;
			} 
			if (rightChild) {
				rightChild.parent = father;
			} 	
		}
	}
}  

module.exports = Node;
