// JavaScript Document

var currentBST;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentBST = new BinarySearchTree(animationManager, drawing.width, drawing.height) ;
}

// 顺序表
var BinarySearchTree = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
BinarySearchTree.prototype = new Algorithm();
BinarySearchTree.prototype.constructor = BinarySearchTree;

// 初始化控件
BinarySearchTree.prototype.initControls = function() {
	addLabelToAlgorithmBar("节点数值");
	this.insertField = addInputToAlgorithmBar("text", "");
	this.insertButton =	addInputToAlgorithmBar("button", "插入节点");
	this.insertButton.onclick = this.insertCallBack.bind(this) ;
	this.searchButton = addInputToAlgorithmBar("button", "查找节点");
	this.searchButton.onclick = this.searchCallBack.bind(this) ;
	this.deleteButton = addInputToAlgorithmBar("button", "删除节点");
	this.deleteButton.onclick = this.deleteCallBack.bind(this) ;
	this.dfsButton = addInputToAlgorithmBar("button", "深度搜索");
	this.dfsButton.onclick = this.DFSCallBack.bind(this) ;
	this.bfsButton = addInputToAlgorithmBar("button", "广度搜索");
	this.bfsButton.onclick = this.BFSCallBack.bind(this) ;
}

// 初始化属性
BinarySearchTree.prototype.initAttributes = function() {
	// 逻辑部分
	this.root = null ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.radius = 25 ; // 圆的半径
	this.intervalX = 60 ; // x间隙
	this.intervalY = 60 ; // y间隙
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 100 ; // 新节点的x坐标
	this.startY = 150 ; // 新节点的y坐标
	this.startRootX = 500; // 根结点的x坐标
	this.array = [];
	// 初始化状态框
	// this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
BinarySearchTree.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
}

// 插入回调函数
BinarySearchTree.prototype.insertCallBack = function (value) {
	var lligle = true;
	if (value.length == 0) {
		lligle = false;
	}
	for (var i = 0; i < value.length; i++) {
		if (value.charAt(i) > '9' || value.charAt(i) < '0') {
			alert('必须输入整数');
			lligle = false;
		}
	}
	// alert(lligle);
	if (lligle == true) {
		var insertValue = parseInt(value);
		var isExist = false;
		for (var i=0; i < this.array.length; i++) {
			if (this.array[i] == insertValue) {
				isExist = true;
				break;
			}
		}
		// alert(isExist);
		if (isExist == true) {
			alert('该数字已经出现');
		}
		else {
			this.implementAction(this.insertNode.bind(this), insertValue);
			this.array.push(insertValue);
		}
	}
}

// 查找回调函数
BinarySearchTree.prototype.searchCallBack = function (value) {
	var lligle = true;
	if (value.length == 0) {
		lligle = false;
	}
	for (var i = 0; i < value.length; i++) {
		if (value.charAt(i) > '9' || value.charAt(i) < '0') {
			alert('必须输入整数');
			lligle = false;
		}
	}
	// alert(lligle);
	if (lligle == true) {
		var searchValue = parseInt(value);
		this.implementAction(this.searchNode.bind(this), searchValue);
	}
}

// 删除回调函数
BinarySearchTree.prototype.deleteCallBack = function(value) {
	var lligle = true;
	if (value.length == 0) {
		lligle = false;
	}
	for (var i = 0; i < value.length; i++) {
		if (value.charAt(i) > '9' || value.charAt(i) < '0') {
			alert('必须输入整数');
			lligle = false;
		}
	}
	// alert(lligle);
	if (lligle == true) {
		// alert(this.array);
		var deleteValue = parseInt(value);
		this.implementAction(this.deleteNode.bind(this), deleteValue);
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i] == deleteValue) {
				this.array.splice(i, 1);
				break;
			}
		}
		// alert(this.array);
	}
}

// 深搜回调函数
BinarySearchTree.prototype.DFSCallBack = function(event) {
	this.implementAction(this.DeepFirstSearch.bind(this), 2);	
}

// 广搜回调函数
BinarySearchTree.prototype.BFSCallBack = function(event) {
	this.implementAction(this.BroadFirstSearch.bind(this));	
}

// 插入
BinarySearchTree.prototype.insertNode = function(value) {
	// 如果根节点为空
	if(this.root == null || this.root == undefined) {
		// 创建根节点
		this.root = new TreeNode(this.objectID, value, this.startRootX, this.startY, null, null, null) ;
		this.objectID ++ ;
		// 创建根节点
		{
			this.cmd("SetState", "创建根节点"+value) ;
			this.cmd("Step") ;
			this.cmd("CreateCircle", this.root.objectID, this.root.value, this.root.x, this.root.y, this.radius) ;
			this.cmd("SetForegroundColor", this.root.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.root.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
	}
	else {
		var temp = this.root ;
		var newNode = new TreeNode(this.objectID, value, this.startX, this.startY, null, null, null) ;
		this.objectID ++ ;
		// 创建新节点
		{
			this.cmd("SetState", "创建新节点"+value) ;
			this.cmd("Step") ;
			this.cmd("CreateCircle", newNode.objectID, newNode.value, newNode.x, newNode.y, this.radius) ;
			this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
		// 开始查找
		while(true) {
			if(newNode.value >= temp.value && temp.rightChild != null) {
				// 找到节点
				{
					this.cmd("SetState", "节点比较"+newNode.value+">="+temp.value) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.rightChild ;
			}
			else if(newNode.value < temp.value && temp.leftChild != null){
				// 找到节点
				{
					this.cmd("SetState", "节点比较"+newNode.value+"<"+temp.value) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.leftChild ;
			}
			else {
				break ;
			}
		}
		// 找到节点
		if(newNode.value >= temp.value) {
			// 设置状态框
			{
				this.cmd("SetState", "节点比较"+newNode.value+">="+temp.value) ;
				this.cmd("Step") ;
			}
		}
		else {
			// 设置状态框
			{
				this.cmd("SetState", "节点比较"+newNode.value+"<"+temp.value) ;
				this.cmd("Step") ;
			}
		}
		// 设置高亮
		{
			this.cmd("SetHighlight", temp.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", temp.objectID, false) ;
			this.cmd("Step") ;
			this.cmd("Connect", temp.objectID, newNode.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		// 节点插入到相应位置
		if(parseInt(newNode.value) >= parseInt(temp.value)) {
			// 插入到右侧
			temp.rightChild = newNode ;
			newNode.parent = temp ;
			// 插入
			{
				this.cmd("SetState", "新节点"+newNode.value+"插入到父节点"+temp.value+"的右孩子") ;
				this.cmd("Step") ;
			}
		}
		else {
			// 插入到左侧
			temp.leftChild = newNode ;
			newNode.parent = temp ;
			// 插入
			{
				this.cmd("SetState", "新节点"+newNode.value+"插入到父节点"+temp.value+"的左孩子") ;
				this.cmd("Step") ;
			}
		}
		this.resizeTree() ;
	}
	return this.commands ;
}

// 查找
BinarySearchTree.prototype.searchNode = function(value) {
	// 如果根节点为空
	if(this.root == null || this.root == undefined) {
		this.cmd("SetState", "空树无法查找") ;
		this.cmd("Step") ;
	}
	else {
		var finded = false ;
		var temp = this.root ;
		// 开始查找
		while(temp != null) {
			if(value > temp.value) {
				// 找到节点
				{
					this.cmd("SetState", "节点比较: "+value+">"+temp.value+", 移动到右孩子") ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.rightChild ;
			}
			else if(value < temp.value){
				// 找到节点
				{
					this.cmd("SetState", "节点比较: "+value+"<"+temp.value+", 移动到右孩子") ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.leftChild ;
			}
			else {
				// 找到节点
				{
					this.cmd("SetState", "节点比较: "+value+"="+temp.value+", 找到节点") ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
					this.cmd("SetHighlightColor", temp.objectID, this.palegreen) ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
					this.cmd("SetHighlightColor", temp.objectID, this.tomato) ;
				}
				finded = true ;
				break ;
			}
		}
		if(!finded) {
			// 未找到节点
			{
				this.cmd("SetState", "未找到节点"+value) ;
				this.cmd("Step") ;
			}
		}
		else {
			// 找到节点
			{
				this.cmd("SetState", "找到节点"+value) ;
				this.cmd("Step") ;
			}
		}
	}
	return this.commands ;
}
	
// 删除
BinarySearchTree.prototype.deleteNode = function(value) {
	// 如果根节点为空
	if(this.root == null || this.root == undefined) {
		this.cmd("SetState", "空树无法删除") ;
		this.cmd("Step") ;
	}
	else {
		var finded = false ;
		var temp = this.root ;
		// 开始查找
		while(temp != null) {
			if(value > temp.value) {
				// 找到节点
				{
					this.cmd("SetState", "节点比较: "+value+">"+temp.value+", 移动到右孩子") ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.rightChild ;
			}
			else if(value < temp.value) {
				// 找到节点
				{
					this.cmd("SetState", "节点比较: "+value+"<"+temp.value+", 移动到右孩子") ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.leftChild ;
			}
			else {
				// 找到节点
				{
					this.cmd("SetState", "节点比较: "+value+"="+temp.value) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
					this.cmd("SetHighlightColor", temp.objectID, this.palegreen) ;
					this.cmd("SetState", "找到节点，准备删除") ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
					this.cmd("SetHighlightColor", temp.objectID, this.tomato) ;
				}
				if(temp.parent == null) { // 删除的是根节点
					// 如果只有根节点
					if(temp.leftChild == null && temp.rightChild == null) {
						// 直接删除
						{
							this.cmd("SetState", "该节点没有子节点，直接删除") ;
							this.cmd("Step") ;
							this.cmd("Delete", temp.objectID) ;
							this.cmd("Step") ;
						}
						this.root = null;
					}
					// 如果只有右孩子
					else if(temp.leftChild == null) {
						// 断开连线
						{
							this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID) ;
							this.cmd("Step") ;
						}
						var del = temp ;
						this.root = temp.rightChild;
						this.root.parent = null;
						// 删除节点
						{
							this.cmd("Delete", del.objectID) ;
							this.cmd("Step") ;
						}
						this.resizeTree() ;
					}
					// 如果只有左孩子
					else if(temp.rightChild == null) {
						// 断开连线
						{
							this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID) ;
							this.cmd("Step") ;
						}
						var del = temp ;
						this.root = temp.leftChild;
						this.root.parent = null;
						// 删除节点
						{
							this.cmd("Delete", del.objectID) ;
							this.cmd("Step") ;
						}
						this.resizeTree() ;
					}
					// 如果左右孩子均有
					else {
						// 先找到左孩子的最右节点
						var rightest = temp.leftChild ;
						while(rightest.rightChild != null) {
							// 找右孩子
							{
								this.cmd("Step") ;
								this.cmd("SetHighlight", rightest.objectID, true) ;
								this.cmd("Step") ;
								this.cmd("SetHighlight", rightest.objectID, false) ;
								this.cmd("Step") ;
							}
							rightest = rightest.rightChild ;
						}
						// 找到最右侧孩子
						{
							this.cmd("SetHighlightColor", rightest.objectID, this.palegreen) ;
							this.cmd("SetState", "找到左子树的最右侧孩子") ;
							this.cmd("Step") ;
							this.cmd("SetHighlight", rightest.objectID, true) ;
							this.cmd("Step") ;
							this.cmd("SetHighlight", rightest.objectID, false) ;
							this.cmd("Step") ;
							this.cmd("SetHighlightColor", rightest.objectID, this.tomato) ;
						}
						// 令最右侧的节点变成根节点
						rightest.x = temp.x ;
						rightest.y = temp.y ;
						{
							this.cmd("Delete", temp.objectID) ;
							this.cmd("Step") ;
							this.cmd("Disconnect", rightest.parent.objectID, rightest.objectID) ;
							this.cmd("Step") ;
							this.cmd("Move", rightest.objectID, rightest.x, rightest.y) ;
							this.cmd("Step") ;
						}
						rightest.leftChild = temp.leftChild ;
						rightest.rightChild = temp.rightChild ;
						rightest.parent.rightChild = null ;
						rightest.parent = temp.parent ;
						this.root = rightest ;
						this.resizeTree() ;
					}
				}
				else {
					// 如果是叶子节点
					if(temp.leftChild == null && temp.rightChild == null) {
						// 直接删除
						{
							this.cmd("SetState", "该节点没有子节点，直接删除") ;
							this.cmd("Step") ;
							this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
							this.cmd("Step") ;
							this.cmd("Delete", temp.objectID) ;
							this.cmd("Step") ;
						}
						// 置其父节点的这个孩子为空
						if(temp == temp.parent.leftChild) {
							temp.parent.leftChild = null ;
						}
						else {
							temp.parent.rightChild = null ;
						}
						temp = null ;
					}
					// 如果只有右孩子
					else if(temp.leftChild == null) {
						// 断开连线
						{
							this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
							this.cmd("Step") ;
							this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID) ;
							this.cmd("Step") ;
							this.cmd("Delete", temp.objectID) ;
							this.cmd("Step") ;
						}
						// 置其父节点的这个孩子为这个孩子的右孩子
						if(temp == temp.parent.leftChild) {
							// 建立连接
							{
								this.cmd("Connect", temp.parent.objectID, temp.rightChild.objectID, this.foregroundColor) ;
								this.cmd("Step") ;
							}
							temp.parent.leftChild = temp.rightChild ;
							temp.rightChild.parent = temp.parent ;
						}
						else {
							// 建立连接
							{
								this.cmd("Connect", temp.parent.objectID, temp.rightChild.objectID, this.foregroundColor) ;
								this.cmd("Step") ;
							}
							temp.parent.rightChild = temp.rightChild ;
							temp.rightChild.parent = temp.parent ;
						}
						temp = null ;
						this.resizeTree() ;
					}
					// 如果只有左孩子
					else if(temp.rightChild == null) {
						// 断开连线
						{
							this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
							this.cmd("Step") ;
							this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID) ;
							this.cmd("Step") ;
							this.cmd("Delete", temp.objectID) ;
							this.cmd("Step") ;
						}
						// 置其父节点的这个孩子为这个孩子的右孩子
						if(temp == temp.parent.leftChild) {
							// 建立连接
							{
								this.cmd("Connect", temp.parent.objectID, temp.leftChild.objectID, this.foregroundColor) ;
								this.cmd("Step") ;
							}
							temp.parent.leftChild = temp.leftChild ;
							temp.leftChild.parent = temp.parent ;
						}
						else {
							// 建立连接
							{
								this.cmd("Connect", temp.parent.objectID, temp.leftChild.objectID, this.foregroundColor) ;
								this.cmd("Step") ;
							}
							temp.parent.rightChild = temp.leftChild ;
							temp.leftChild.parent = temp.parent ;
						}
						temp = null ;
						this.resizeTree() ;
					}
					// 如果左右孩子均有
					else {
						// 先找到左孩子的最右节点
						var rightest = temp.leftChild ;
						while(rightest.rightChild != null) {
							// 找右孩子
							{
								this.cmd("Step") ;
								this.cmd("SetHighlight", rightest.objectID, true) ;
								this.cmd("Step") ;
								this.cmd("SetHighlight", rightest.objectID, false) ;
								this.cmd("Step") ;
							}
							rightest = rightest.rightChild ;
						}
						// 找到最右侧孩子
						{
							this.cmd("SetHighlightColor", rightest.objectID, this.palegreen) ;
							this.cmd("SetState", "找到左子树的最右侧孩子") ;
							this.cmd("Step") ;
							this.cmd("SetHighlight", rightest.objectID, true) ;
							this.cmd("Step") ;
							this.cmd("SetHighlight", rightest.objectID, false) ;
							this.cmd("Step") ;
							this.cmd("SetHighlightColor", rightest.objectID, this.tomato) ;
						}
						// 令最右侧的节点变成根节点
						rightest.x = temp.x ;
						rightest.y = temp.y ;
						{
							this.cmd("Disconnect", rightest.parent.objectID, rightest.objectID) ;
							this.cmd("Step") ;
							this.cmd("Connect", rightest.objectID, temp.leftChild.objectID, this.foregroundColor) ;
							this.cmd("Step") ;
							this.cmd("Connect", rightest.objectID, temp.rightChild.objectID, this.foregroundColor) ;
							this.cmd("Step") ;
							this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
							this.cmd("Step") ;
							this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID) ;
							this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID) ;
							this.cmd("Step") ;
							this.cmd("Connect", temp.parent.objectID, rightest.objectID, this.foregroundColor) ;
							this.cmd("Step") ;
							this.cmd("Delete", temp.objectID) ;
							this.cmd("Step") ;
							this.cmd("Move", rightest.objectID, rightest.x, rightest.y) ;
							this.cmd("Step") ;
						}
						if(rightest != temp.leftChild) {
							rightest.parent.rightChild = null ;
							rightest.leftChild = temp.leftChild ;
							temp.leftChild.parent = rightest ;
						}
						rightest.rightChild = temp.rightChild ;
						temp.rightChild.parent = rightest ;
						rightest.parent = temp.parent ;
						if(temp == temp.parent.leftChild) {
							temp.parent.leftChild = rightest ;
						}
						else {
							temp.parent.rightChild = rightest ;
						}
						temp = null ;
						this.resizeTree() ;
					}
				}
				finded = true ;
				break ;
			}
		}
		if(!finded) {
			// 未找到节点
			{
				this.cmd("SetState", "未找到节点"+value+"，无法删除") ;
				this.cmd("Step") ;
			}
		}
		else {
			// 删除完成
			{
				this.cmd("SetState", "删除完成") ;
				this.cmd("Step") ;
			}
		}
	}
	return this.commands ;
}

// 重新布局树的节点
BinarySearchTree.prototype.resizeTree = function() {
	this.resizeWidth(this.root) ;
	if(this.root != null) {
		this.setNewPosition(this.root, this.startRootX, this.startY, 0) ;
		this.animateNewPosition(this.root) ;
		this.cmd("Step") ;
	}
}

// 设置每个节点的位置(递归)
BinarySearchTree.prototype.setNewPosition = function(tree, x, y, side) {
	// 如果树非空
	if(tree != null) {
		tree.y = y ;
		if(side == -1) { // 左孩子
			x = parseInt(x - tree.rightWidth) ;
		}
		else if(side == 1) { // 右孩子
			x = parseInt(x + tree.leftWidth) ;
		}
		tree.x = x ;
		this.setNewPosition(tree.leftChild, x, parseInt(y + this.intervalY), -1) ;
		this.setNewPosition(tree.rightChild, x, parseInt(y + this.intervalY), 1) ;
	}
}

// 动画显示每个节点的位置(递归)
BinarySearchTree.prototype.animateNewPosition = function(tree) {
	// 如果树非空则递归左右孩子
	if(tree != null) {
		this.cmd("Move", tree.objectID, tree.x, tree.y) ;
		this.animateNewPosition(tree.leftChild) ;
		this.animateNewPosition(tree.rightChild) ;
	}
}

// 计算节点的左右宽度(递归)
BinarySearchTree.prototype.resizeWidth = function(tree) {
	// 如果是空树返回0，递归出口
	if(tree == null) {
		return 0 ;
	}
	tree.leftWidth = Math.max(this.resizeWidth(tree.leftChild), this.intervalX) ; // 左边宽度
	tree.rightWidth = Math.max(this.resizeWidth(tree.rightChild), this.intervalX) ; // 右边宽度
	return parseInt(tree.leftWidth + tree.rightWidth) ;
}

// 深度优先搜索(1:先序, 2:中序, 3:后序)
BinarySearchTree.prototype.DeepFirstSearch = function(order) {
	// 先序搜索
	if(order == 1) {
		this.stateBox = "start" ;
		this.PreOrderRecursive(this.root) ;
	}
	else if(order == 2) {
		this.stateBox = "start" ;
		this.MidOrderRecursive(this.root) ;
	}
	else if(order == 3) {
		this.stateBox = "start" ;
		this.PostOrderRecursive(this.root) ;
	}
	return this.commands ;
}

// 先序递归函数
BinarySearchTree.prototype.PreOrderRecursive = function(tree) {
	if(tree != null) {
		// 高亮连线
		if(tree.parent != null) {
			this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false) ;
			this.cmd("Step") ;
		}
		// 访问节点
		{
			this.cmd("SetHighlight", tree.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", tree.objectID, false) ;
			this.cmd("Step") ;
		}
		// 设置状态框
		this.stateBox = this.stateBox + ", " + tree.value ;
		{
			this.cmd("SetState", this.stateBox) ;
			this.cmd("Step") ;
		}
		this.PreOrderRecursive(tree.leftChild) ;
		this.PreOrderRecursive(tree.rightChild) ;
	}
}

// 中序递归函数
BinarySearchTree.prototype.MidOrderRecursive = function(tree) {
	if(tree != null) {
		// 高亮连线
		if(tree.parent != null) {
			this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false) ;
			this.cmd("Step") ;
		}
		this.MidOrderRecursive(tree.leftChild) ;
		// 访问节点
		{
			this.cmd("SetHighlight", tree.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", tree.objectID, false) ;
			this.cmd("Step") ;
		}
		// 设置状态框
		this.stateBox = this.stateBox + ", " + tree.value ;
		{
			this.cmd("SetState", this.stateBox) ;
			this.cmd("Step") ;
		}
		this.MidOrderRecursive(tree.rightChild) ;
	}
}

// 中序递归函数
BinarySearchTree.prototype.PostOrderRecursive = function(tree) {
	if(tree != null) {
		// 高亮连线
		if(tree.parent != null) {
			this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false) ;
			this.cmd("Step") ;
		}
		this.PostOrderRecursive(tree.leftChild) ;
		this.PostOrderRecursive(tree.rightChild) ;
		// 访问节点
		{
			this.cmd("SetHighlight", tree.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", tree.objectID, false) ;
			this.cmd("Step") ;
		}
		// 设置状态框
		this.stateBox = this.stateBox + ", " + tree.value ;
		{
			this.cmd("SetState", this.stateBox) ;
			this.cmd("Step") ;
		}
	}
}

// 广度优先搜索
BinarySearchTree.prototype.BroadFirstSearch = function() {
	this.stateBox = "start" ;
	var queue = new Array() ;
	queue.push(this.root) ; // 根节点入队
	// 如果队列非空
	while(queue.length != 0) {
		var temp = queue.shift() ; // 取得队首元素
		// 访问节点
		{
			this.cmd("SetHighlight", temp.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", temp.objectID, false) ;
			this.cmd("Step") ;
		}
		// 设置状态框
		this.stateBox = this.stateBox + ", " + temp.value ;
		{
			this.cmd("SetState", this.stateBox) ;
			this.cmd("Step") ;
		}
		// 如果左孩子不空则左孩子入队
		if(temp.leftChild != null) {
			queue.push(temp.leftChild) ;
		}
		// 如果右孩子不空则右孩子入队
		if(temp.rightChild != null) {
			queue.push(temp.rightChild) ;
		}
	}
	return this.commands ;
}

// 树的节点
var TreeNode = function(objectID, value, x, y, leftChild, rightChild, parent) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
	this.leftChild = leftChild ; // 左孩子
	this.rightChild = rightChild ; // 右孩子
	this.parent = parent ; // 父亲
}
