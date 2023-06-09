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

var currentLinkList;

// 初始化函数
export function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentLinkList = new LinkList(animationManager, drawing.width, drawing.height) ;
}
// 单链表
var LinkList = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
LinkList.prototype = new Algorithm();
LinkList.prototype.constructor = LinkList;

// 初始化控件
LinkList.prototype.initControls = function() {
	this.insertButton.onclick = this.insertCallBack.bind(this) ;
	this.deleteButton.onclick = this.deleteCallBack.bind(this) ;
}

// 初始化
LinkList.prototype.initAttributes = function() {
	// 逻辑部分
	this.head = null ;
	this.tail = null ;
	this.length = 0 ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.width = 50 ; // 矩形的宽度
	this.height = 50 ; // 矩形的高度
	this.interval = 120 ; // 间隙
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 150 ; // 新节点的x坐标
	this.startY = 100 ; // 新节点的y坐标
	this.startHeadY = 200 ; // 头结点的y坐标
	this.startheadArrowY = 250 ; // 头指针的y坐标
	this.starttailArrowY = 310 ; // 尾指针的y坐标
	this.arrowLength = 30 ; // 箭头的长度
	this.implementAction(this.initHeadNode.bind(this), 0);
}

// 插入回调函数
LinkList.prototype.insertCallBack = function(seq, value) {
	if (seq != "" && value != "")
	{
		seq = parseInt(seq);
		value = parseInt(value);
		if(this.head.value <= 5) {
			this.implementAction(this.insertNode.bind(this), [seq, value]);
		}
		else {
			show_notice("链表的长度应6以下", 'error');
		}
	}
}

// 删除回调函数
LinkList.prototype.deleteCallBack = function(value) {
	if (value != "")
	{
		this.implementAction(this.deleteNode.bind(this), value);
	}
}

// 初始化头结点
LinkList.prototype.initHeadNode = function() {
	this.head = new ListNode(this.objectID, 0, this.startX, this.startHeadY, null) ;
	this.tail = this.head ;
	this.objectID ++ ;
	this.length ++ ;
	// 绘制头结点
	{
		this.cmd("CreateRectangle", this.head.objectID, this.head.value, this.width, this.height, 
				 'center', 'center', this.head.x, this.head.y) ;
		this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor) ;
	}
	// 绘制头指针
	this.headArrow = new ListNode(this.objectID, 'head', this.startX, this.startheadArrowY, null) ; 
	this.objectID ++ ;
	this.tailArrow = new ListNode(this.objectID, 'tail', this.startX, this.starttailArrowY, null) ;
	this.objectID ++ ;
	{
		this.cmd("CreatePointer", this.headArrow.objectID, "head", this.arrowLength, 'up', this.headArrow.x, this.headArrow.y) ;
		this.cmd("SetForegroundColor", this.headArrow.objectID, this.tomato) ;
		this.cmd("CreatePointer", this.tailArrow.objectID, "tail", this.arrowLength, 'up', this.tailArrow.x, this.tailArrow.y) ;
		this.cmd("SetForegroundColor", this.tailArrow.objectID, this.tomato) ;
	}
	return this.commands ;
}
	
// 插入
LinkList.prototype.insertNode = function(valueArr) {
	var pos = valueArr[0] ;
	var value = valueArr[1] ;
	var point = this.head ;
	if(pos > this.length || pos <= 0) {
		show_notice("位置错误！位置超出范围。当前范围 1-"+(this.head.value+1).toString(), 'error');
	}
	else {
		var newNode = new ListNode(this.objectID, value, this.startX, this.startY, null) ;
		this.objectID ++ ;
		this.length ++ ;
		// 绘制新结点
		{
			show_notice("创建新节点"+value, 'info');
			this.cmd("Step") ;
			this.cmd("CreateRectangle", newNode.objectID, newNode.value, this.width, this.height, 
					 'center', 'center', newNode.x, newNode.y) ;
			this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
		for(var i=0 ; i<pos-1 ; i++) {
			// 高亮
			{
				show_notice("搜索到位置"+i, 'info');
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, false) ;
				this.cmd("Step") ;
			}
			point = point.linked ;
		}
		// 高亮
		{
			show_notice("搜索到位置"+parseInt(pos-1), 'info');
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, false) ;
			this.cmd("Step") ;
		}
		// 如果插入到尾节点
		if(point == this.tail) {
			newNode.x = parseInt(point.x + this.interval) ;
			newNode.y = parseInt(point.y) ;
			point.linked = newNode ;
			this.tail = newNode ;
			this.tailArrow.x = newNode.x ;
			this.tailArrow.y = this.startheadArrowY ; 
			// 连接
			{
				show_notice("该位置是尾节点,直接插入", 'success');
				this.cmd("Step") ;
				this.cmd("Connect", point.objectID, newNode.objectID, this.forgroundColor) ;
				this.cmd("Step") ;
				this.cmd("Move", newNode.objectID, newNode.x, newNode.y) ;
				this.cmd("Step") ;
				this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
				this.cmd("Step") ;
			}
		}
		else { // 如果不是尾节点
			newNode.x = parseInt(point.x + this.interval) ;
			newNode.y = parseInt(point.y) ;
			newNode.linked = point.linked ;
			point.linked = newNode ;
			// 连接
			{
				show_notice("该位置不是尾节点,插入到该位置", 'info');
				this.cmd("Step") ;
				this.cmd("Disconnect", point.objectID, newNode.linked.objectID) ;
				this.cmd("Step") ;
				show_notice("设置插入节点"+value+"的指针指向后续节点"+newNode.linked.value, 'info');
				this.cmd("Step") ;
				this.cmd("Connect", newNode.objectID, newNode.linked.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				show_notice("设置"+point.value+"的指针指向插入节点"+value, 'info');
				this.cmd("Step") ;
				this.cmd("Connect", point.objectID, newNode.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				this.shiftBack(newNode.linked) ;
				this.cmd("Move", newNode.objectID, newNode.x, newNode.y) ;
				this.cmd("Step") ;
			}
		}
		// 插入成功
		{
			this.head.value ++ ;
			this.cmd("Delete", this.head.objectID) ;
			this.cmd("CreateRectangle", this.head.objectID, this.head.value, this.width, this.height, 
					 'center', 'center', this.head.x, this.head.y) ;
			this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor) ;
			show_notice("插入成功", 'success');
			this.cmd("Step") ;
		}
	}
	return this.commands ;
}
	
// 删除
LinkList.prototype.deleteNode = function(pos) {
	if(pos >= this.length || pos <= 0) {
		show_notice("位置错误！位置超出范围。\n当前范围 1-"+this.head.value, 'error');
	}
	else {
		this.length -- ;
		var point = this.head ;
		var next ;
		for(var i=0 ; i<pos-1; i++) {
			// 高亮
			{
				show_notice("搜索到位置"+i, 'info');
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, false) ;
				this.cmd("Step") ;
			}
			point = point.linked ;
		}
		next = point.linked ;
		// 高亮
		{
			show_notice("搜索到位置"+parseInt(pos-1), 'info');
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, false) ;
			this.cmd("Step") ;
			show_notice("搜索到位置"+parseInt(pos), 'info');
			this.cmd("Step") ;
			this.cmd("SetHighlight", next.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", next.objectID, false) ;
			this.cmd("Step") ;
		}
		if(next == this.tail) { // 如果是尾节点
			this.tail = point ;
			this.tailArrow.x = point.x ; 
			if(point == this.head) {
				this.tailArrow.y = this.starttailArrowY ; 
			}
			else {
				this.tailArrow.y = this.startheadArrowY ; 
			}
			// 断开连接并删除
			{
				show_notice("该位置是尾节点,直接删除", 'success');
				this.cmd("Step") ;
				this.cmd("Disconnect", point.objectID, next.objectID) ;
				this.cmd("Step") ;
				this.cmd("Delete", next.objectID) ;
				this.cmd("Step") ;
				this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
				this.cmd("Step") ;
			}
			next = null ;
			this.tail.linked = null ;
		}
		else { // 如果不是尾节点 连接、断开连接并删除
			{
				show_notice("该位置不是尾节点,断开"+point.value+"的指针域", 'info');
				this.cmd("Step") ;
				this.cmd("Disconnect", point.objectID, next.objectID) ;
				this.cmd("Step") ;
				show_notice("设置"+point.value+"的指针指向后续节点"+next.linked.value, 'info');
				this.cmd("Step") ;
				this.cmd("Connect", point.objectID, next.linked.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				show_notice("断开删除节点"+next.value+"的指针域", 'info');
				this.cmd("Step") ;
				this.cmd("Disconnect", next.objectID, next.linked.objectID) ;
				this.cmd("Step") ;
				show_notice("删除节点"+next.value, 'success');
				this.cmd("Step") ;
				this.cmd("Delete", next.objectID) ;
				this.cmd("Step") ;
				this.shiftFront(next.linked) ;
				this.cmd("Step") ;
			}
			point.linked = next.linked ;
			next.linked = null ;
		}
		// 删除成功
		{
			this.head.value -- ;
			this.cmd("Delete", this.head.objectID) ;
			this.cmd("CreateRectangle", this.head.objectID, this.head.value, this.width, this.height, 
					 'center', 'center', this.head.x, this.head.y) ;
			this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor) ;
			show_notice("删除成功", 'success');
			this.cmd("Step") ;
		}
	}
	return this.commands ;
}

// 向后移动
LinkList.prototype.shiftBack = function(head) {
	while(head != this.tail) {
		// 移动
		{
			this.cmd("Move", head.objectID, head.linked.x, head.linked.y) ;
		}
		head.x = head.linked.x ;
		head.y = head.linked.y ;
		head = head.linked ;
	}
	head.x = parseInt(head.x+this.interval) ;
	head.y = head.y ;
	this.tailArrow.x = head.x ;
	this.tailArrow.y = this.startheadArrowY ; 
	// 尾节点后移
	{
		this.cmd("Move", head.objectID, head.x, head.y) ;
		this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
	}
}

// 向前移动
LinkList.prototype.shiftFront = function(head) {
	while(head != this.tail) {
		head.x = parseInt(head.x - this.interval);
		head.y = head.linked.y ;
		// 移动
		{
			this.cmd("Move", head.objectID, head.x, head.y) ;
		}
		head = head.linked ;
	}
	head.x = parseInt(head.x - this.interval);
	head.y = head.y ;
	this.tailArrow.x = head.x ;
	this.tailArrow.y = this.startheadArrowY ; 
	// 移动
	{
		this.cmd("Move", head.objectID, head.x, head.y) ;
		this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
	}
}

var ListNode = function(objectID, value, x, y, linked) {
	this.objectID = objectID ; // 序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标 
	this.linked = linked ; // 指针
}


export function list_insert_index(serialNumber,arrayData){
	if (serialNumber != '' && arrayData != '') {
		currentLinkList.insertCallBack(serialNumber, arrayData);
	}
}

export function list_delete_index(serialNumber){
	if (serialNumber != '') {
		currentLinkList.deleteCallBack(serialNumber);
	}
}