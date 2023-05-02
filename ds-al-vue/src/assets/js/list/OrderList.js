import {Message,Notice} from 'view-ui-plus';
function show_notice(notices, type) {
	var type_zh ;
	if(type == 'success') {
		type_zh = '成功' ;
	} else if(type == 'error') {
		type_zh = '错误' ;
	} else if(type == 'info') {
		type_zh = '提示' ;
	}
	Notice[type]({
		title: type_zh, // 标题
		desc: notices,  // 内容
		duration: 6  	// 持续时间
	});
}
var currentOrderList;
// 初始化函数
export function init(drawing) {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentOrderList = new OrderList(animationManager, drawing.width, drawing.height) ;
}

// 顺序表
var OrderList = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
OrderList.prototype = new Algorithm();
OrderList.prototype.constructor = OrderList;

// 初始化控件
OrderList.prototype.initControls = function() {
	this.initButton.onclick = this.initCallBack.bind(this) ;
	this.insertButton.onclick = this.insertCallBack.bind(this) ;
	this.deleteButton.onclick = this.deleteCallBack.bind(this) ;
}
// 初始化
OrderList.prototype.initAttributes = function() {
	// 逻辑部分ID
	this.head = -1 ; // 头指针
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.width = 50 ; // 矩形的宽度
	this.height = 50 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 100 ; // 开始的x坐标
	this.startY = 150 ; // 开始的y坐标
	this.startArrayY = 250 ; // 开始的数组的y坐标
	this.startArrowY = 300 ; // 开始的箭头的y坐标
	this.length = 30 ; // 箭头的长度
}
// 初始化回调函数
OrderList.prototype.initCallBack = function(length) {
	this.implementAction(this.initArray.bind(this), length);
}
// 插入回调函数
OrderList.prototype.insertCallBack = function(seq, value) {
	this.implementAction(this.insertNode.bind(this), [seq, value]);
}
// 删除回调函数
OrderList.prototype.deleteCallBack = function(seq) {
	this.implementAction(this.deleteNode.bind(this), seq);
}

OrderList.prototype.clearCanvas = function() {
	// 清空数组
	if(this.arrayList != null && this.arrayList != undefined) {
		for(var i=0 ; i<this.arrayList.length ; i++) {
			this.cmd("Delete", this.arrayList[i].objectID) ;
		}
		this.arrayList = null ;
	}
	// clear pos label
	if(this.arrayListLabel != null && this.arrayListLabel != undefined) {
		for(var i=0 ; i<this.arrayListLabel.length ; i++) {
			this.cmd("Delete", this.arrayListLabel[i].objectID) ;
		}
		this.arrayListLabel = null ;
	}
	// 清空元素
	if(this.orderList != null && this.orderList != undefined) {
		for(var i=0 ; i<this.orderList.length ; i++) {
			if (this.orderList[i] != undefined && this.orderList[i] instanceof OrderListNode) {
				this.cmd("Delete", this.orderList[i].objectID) ;
			}
		}
		this.orderList = null ;
	}
	// 清空箭头
	if(this.arrow != null) {
		this.cmd("Delete", this.arrow.objectID) ;
		this.arrow = null ;
	}
}
// 初始化数组
OrderList.prototype.initArray = function(maxSize) {
	// 删除所有数组
	this.clearCanvas();
	this.head = -1;
	this.maxSize = parseInt(maxSize) ; // 数组最大容量
	this.arrayList = new Array(this.maxSize) ; // 数组框
	this.arrayListLabel = new Array(this.maxSize); // pos label
	this.orderList = new Array(this.maxSize) ; // 顺序表数组
	// 显示状态
	show_notice("创建大小为 "+maxSize+" 的数组", 'success');
	// 创建数组
	for(var i=0 ; i<this.maxSize ; i++) {
		this.arrayList[i] = new OrderListNode(this.objectID, "", parseInt(this.startX+i*(this.width-1)), this.startArrayY) ;
		this.objectID ++ ;
		// 创建矩形
		{
			this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height, 
					 'center', 'center', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
		// create pos label
		this.arrayListLabel[i] = new OrderListNode(this.objectID, i, parseInt(this.startX+i*(this.width-1)), this.startArrayY+40);
		this.objectID ++;
		this.cmd("CreateLabel", this.arrayListLabel[i].objectID, this.arrayListLabel[i].value, this.arrayListLabel[i].x, this.arrayListLabel[i].y);
		this.cmd("SetForegroundColor", this.arrayListLabel[i].objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.arrayListLabel[i].objectID, '#FFFFFF');
		
	}
	this.cmd("Step");
	return this.commands;
}
	
// 插入
OrderList.prototype.insertNode = function(valueArr) {
	var pos = valueArr[0] ;
	var value = valueArr[1] ;
	var newNode;
	if(this.head >= this.maxSize-1) {
		//alert("顺序表已满，无法插入！");
		show_notice("顺序表已满，无法插入！", 'error');
	}
	else {
		if(pos > this.head+1 || pos < 0) {
			//alert("位置错误！");
			show_notice("位置错误！", 'error');
		}
		else {
			this.head ++ ;
			newNode = new OrderListNode(this.objectID, value, this.startX, this.startY) ;
			this.objectID ++ ;
			// 创建矩形
			{
				//this.cmd("SetState", "创建值为"+value+"的数组元素") ;
				show_notice("创建值为"+value+"的数组元素", 'info');
				this.cmd("Step") ;
				this.cmd("CreateRectangle", newNode.objectID, newNode.value, this.width, this.height, 
					'center', 'center', newNode.x, newNode.y) ;
				this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor) ;
				this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor) ;
				this.cmd("Step") ;
			}
			// 查找对应位置
			if(this.head == pos) {
				// 方框高亮
				{
					//this.cmd("SetState", "数组"+pos+"位置无元素, 可插入新元素") ;
					show_notice("数组"+pos+"位置无元素, 可插入新元素", 'info');
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.arrayList[pos].objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.arrayList[pos].objectID, false) ;
					this.cmd("Step") ;
				}
			}
			else {
				// 数组元素高亮
				{
					//this.cmd("SetState", "数组"+pos+"位置有元素, 之后的所有元素后移一位") ;
					show_notice("数组"+pos+"位置有元素, 之后的所有元素后移一位", 'info');
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.orderList[pos].objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.orderList[pos].objectID, false) ;
					this.cmd("Step") ;
				}
				// 之后的节点向后移动一位
				for(var i=this.head-1 ; i>=pos ; i--) {
					this.orderList[i+1] = this.orderList[i] ;
					this.orderList[i+1].x += this.width-1 ;
					// 元素移动
					{
						this.cmd("Move", this.orderList[i+1].objectID, this.orderList[i+1].x, this.orderList[i+1].y) ;
					}
				}
				this.cmd("Step") ;
			}
			// 新生成的节点插入
			this.orderList[pos] = newNode ;
			this.orderList[pos].x = parseInt(this.startX+pos*(this.width-1)) ;
			this.orderList[pos].y = this.startArrayY ;
			{
				//this.cmd("SetState", "在数组"+pos+"位置插入新元素"+value) ;
				show_notice("在数组"+pos+"位置插入新元素"+value, 'success');
				this.cmd("Step") ;
				this.cmd("Move", this.orderList[pos].objectID, this.orderList[pos].x ,this.orderList[pos].y) ;
				this.cmd("Step") ;
			}
			// 画头指针
			if(this.head == 0) {
				this.arrow = new OrderListNode(this.objectID, 'head', this.startX, this.startArrowY);
				{
					this.cmd("CreatePointer", this.arrow.objectID, "head", this.length, 'up', this.arrow.x, this.arrow.y) ;
					this.cmd("SetForegroundColor", this.arrow.objectID, this.tomato) ;
					this.cmd("Step") ;
				}
				this.objectID ++ ;
			}
			else {
				this.arrow.x = parseInt(this.arrow.x + this.width - 1) ;
				this.cmd("Move", this.arrow.objectID, this.arrow.x, this.arrow.y) ;
			}
			// 判断是否满
			if(this.head == this.maxSize-1) {
				//this.cmd("SetState", "数组满,已经无法插入") ;
				show_notice("数组满,已经无法插入", 'error');
				this.cmd("Step") ;
			}
			this.objectID ++ ;
		}
	}
	return this.commands ;
}
	
// 删除
OrderList.prototype.deleteNode = function(pos) {
	if(this.head <= -1) {
		show_notice("顺序表已空，无法删除！", 'error');
	}
	else {
		if(pos > this.head || pos < 0) {
			show_notice("位置错误！", 'error');
		}
		else {
			// 查找对应位置
			{
				//this.cmd("SetState", "在数组"+pos+"位置删除新元素"+this.orderList[pos].value) ;
				show_notice("在数组"+pos+"位置删除新元素"+this.orderList[pos].value, 'info');
				this.cmd("Step") ;
				this.cmd("SetHighlight", this.orderList[pos].objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", this.orderList[pos].objectID, false) ;
				this.cmd("Step") ;
			}
			// 新生成的节点删除
			{
				this.cmd("Move", this.orderList[pos].objectID, this.startX ,this.startY) ;
				this.cmd("Step") ;
				this.cmd("Delete", this.orderList[pos].objectID) ;
				this.cmd("Step") ;
			}
			if(pos != this.head) {
				// 元素向后移动
				{
					//this.cmd("SetState", "数组位置"+pos+"之后的元素向前移动") ;
					show_notice("数组位置"+pos+"之后的元素向前移动", 'info');
					this.cmd("Step") ;
				}
				// 之后的节点向前移动一位
				for(var i=parseInt(pos)+1 ; i<=this.head ; i++) {
					this.orderList[i-1] = this.orderList[i] ;
					this.orderList[i-1].x -= this.width-1 ;
					// 元素移动
					{
						this.cmd("Move", this.orderList[i-1].objectID, this.orderList[i-1].x, this.orderList[i-1].y) ;
					}
				}
				this.cmd("Step") ;
				// 删除成功
				{
					//this.cmd("SetState", "删除成功") ;
					show_notice("删除成功", 'success');
					this.cmd("Step") ;
				}
			}
			else {
				// 元素向后移动
				{
					//this.cmd("SetState", "删除成功") ;
					show_notice("删除成功", 'success');
					this.cmd("Step") ;
				}
			}
			this.orderList[this.head] = [] ;
			this.head -- ;
			// 画头指针
			if(this.head == -1) {
				this.cmd("Delete", this.arrow.objectID) ;
			}
			else {
				this.arrow.x = parseInt(this.arrow.x - (this.width-1)) ;
				this.cmd("Move", this.arrow.objectID, this.arrow.x, this.arrow.y) ;
			}
			// 判断数组是否空
			if(this.head == -1) {
				//this.cmd("SetState", "数组空,已经无法删除") ;
				show_notice("数组空,已经无法删除", 'error');
				this.cmd("Step") ;
			}
		}
	}
	return this.commands ;
}

// 顺序表的节点
var OrderListNode = function(objectID, value, x, y) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
}







// 连接组件
export function list_init_index(dataLength){
    if (dataLength != '') {
        if(dataLength>=18){
            alert('数组长度过大,请输入小于18的数值');
        }else if(dataLength<=0){
            Message.error({
				background: true,
				content: '数组长度过小,请输入大于0的数值'
			});
        }else{
            currentOrderList.initCallBack(dataLength);
        }
    }
}

export function list_insert_index(serialNumber,arrayData){
	if (serialNumber != '' && arrayData != '') {
		currentOrderList.insertCallBack(serialNumber, arrayData);
	}
}

export function list_delete_index(serialNumber){
	if (serialNumber != '') {
		currentOrderList.deleteCallBack(serialNumber);
	}
}