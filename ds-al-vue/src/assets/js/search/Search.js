// JavaScript Document
import {Message,Notice} from 'view-ui-plus';
function show_notice(notices, type , during_time) {
	let type_zh ;
	if(type == 'success') {
		type_zh = '成功' ;
	} else if(type == 'error') {
		type_zh = '错误' ;
	} else if(type == 'info') {
		type_zh = '提示' ;
	} else if(type == 'warning') {
		type_zh = '警告' ;
	}
	var times = during_time == undefined ? 6 : during_time ;
	Notice[type]({
		title: type_zh, // 标题
		desc: notices,  // 内容
		duration: times  	// 持续时间
	});
}
function show_message(content, type, during_time ) {
	var times = during_time == undefined ? 0: during_time ;
	Message[type]({
		content: content, // 内容
		duration: times , 	// 持续时间
		background: true, // 是否显示背景色
		closable: true, // 是否显示关闭按钮
	});
}

var currentSearch;
// 初始化函数
export function init() {
	objectManager = new ObjectManager();
	animationManager = new AnimationManager(objectManager);
	currentSearch = new Search(animationManager, drawing.width, drawing.height);
}

// 顺序表
var Search = function(animManager, width, height) {
	this.init(animManager, width, height);
	this.initAttributes(); 
}

// 继承与构造
Search.prototype = new Algorithm();
Search.prototype.constructor = Search;

// 初始化控件
Search.prototype.initControls = function() {
	this.initMaxSizeButton.onclick = this.initMaxSizeCallBack.bind(this);
	this.initArrayButton.onclick = this.initArrayCallBack.bind(this);
	this.initNumberButton.onclick = this.initNumberCallBack.bind(this);
	this.searchNumberButton.onclick = this.searchNumberCallBack.bind(this);
}

// 初始化
Search.prototype.initAttributes = function() {
	// 逻辑部分ID
	this.head = 0; // 头指针
	this.number = 0; //查找数字
	this.numNode = null; // 数字节点
	this.node = 0; //数组元素值
	this.arraytimer = false; //判断数组是否已经完成初始化
	this.numtimer = false; //判断查找数字是否已经完成初始化
	this.haveInitMax = false;
	// 图形部分
	this.objectID = 1; // 图形的序号
	this.width = 50; // 矩形的宽度
	this.height = 50; // 矩形的高度
	this.foregroundColor = '#1E90FF'; // 前景色
	this.backgroundColor = '#B0E0E6'; // 背景色
	this.startX = 100; // 开始的x坐标
	this.startY = 200; // 开始的y坐标
	this.startArrayY = 300; // 开始的数组的y坐标
}
//初始化数组边界
Search.prototype.initMaxSizeCallBack = function(value) {
	var insertValue = parseInt(value);
	if (insertValue != "" && !isNaN(insertValue)) {
		this.implementAction(this.initMaxSize.bind(this), insertValue);
	}
}

// 自动初始化数组
Search.prototype.initArrayCallBack_by_auto = function(value) {
	var length = parseInt(value);
	if (length != "" && !isNaN(length)) {
		this.implementAction(this.initMaxSize.bind(this), length);
	}else{
		return ;
	}
	var arrayContent = new Array(length);
	for (var i=0; i<length; i++) {
		arrayContent[i] = Math.floor(1 + Math.random()*29);
		this.implementAction(this.initArray.bind(this), arrayContent[i]);
	}
}

// 人为初始化数组
Search.prototype.initArrayCallBack_by_custom = function(array) {
	var length = array.length;
	if (length != "" && !isNaN(length)) {
		this.implementAction(this.initMaxSize.bind(this), length);
	}else{
		return ;
	}
	var arrayContent = new Array(length);
	for (var i=0; i<length; i++) {
		arrayContent[i] = array[i];
		this.implementAction(this.initArray.bind(this), arrayContent[i]);
	}
}

// 初始化查找数字回调函数
Search.prototype.initNumberCallBack = function(value) {
	this.implementAction(this.initNumber.bind(this), value);
}

// 查找回调函数
Search.prototype.linearSearchCallBack = function(value) {
	value = parseInt(value);
	this.initNumberCallBack(value);
	this.implementAction(this.linearSearch.bind(this), 0);
}

// binary search
Search.prototype.binarySearchCallBack = function(value) {
	value = parseInt(value);
	this.initNumberCallBack(value);
	this.implementAction(this.binarySearch.bind(this), 0);
}

//初始化数组边界
Search.prototype.initMaxSize = function(maxSize) {
	if (this.arraytimer == true) {
		for (var i = 0; i < this.maxSize + 1; i++) {
			this.cmd("Delete", i + 1);
		}
		this.cmd("Step");
		this.objectID = 1;
		this.head = 0;
		this.haveInitMax = true;
	}
	this.maxSize = maxSize; // 数组最大容量 
	this.arrayList = new Array(this.maxSize);
	// 创建状态框明确数组大小
	{
		show_notice("数组大小是" + this.maxSize,'success');
		this.cmd("Step");
	}
	// 创建矩形
	for (var i = 0; i < this.maxSize; i++) {
		this.arrayList[i] = new SearchNode(this.objectID, "", parseInt(this.startX + i * (this.width - 1)), this.startArrayY);
		this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height, 'center', 'center', this.arrayList[i].x, this.arrayList[i].y);
		this.cmd("Step");
		this.objectID++;
	}
	this.arraytimer = true;
	return this.commands;
}

// 初始化数组
Search.prototype.initArray = function(arrayNodeValue) {
	if (this.head < this.maxSize) {
		// 向矩形内添加元素
		{
			this.arrayList[this.head].value = arrayNodeValue; //数组元素值
			this.cmd("SetLabel", this.arrayList[this.head].objectID, this.arrayList[this.head].value);
			this.head++;
		}
	}
	return this.commands;
}

//初始化查找数字	
Search.prototype.initNumber = function(number) {
	if (this.numtimer == true && this.haveInitMax != true) {
		if (this.numNode.value != null) {
			this.cmd("Delete", this.numNode.objectID);
			this.cmd("Step");
		}
	}
	this.haveInitMax = false;
	if (isNaN(number)) {
		show_message("请输入数字",'warning');
		return this.commands;
	}
	this.number = number;
	this.numNode = new SearchNode(this.objectID, this.number, this.startX, this.startY);
	// 创建矩形
	{
		this.cmd("CreateRectangle", this.numNode.objectID, this.numNode.value, this.width, this.height, 'center', 'center', this.numNode.x, this.numNode.y);
		this.cmd("SetForegroundColor", this.numNode.objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.numNode.objectID, this.backgroundColor);
		this.cmd("Step");
	}
	//this.objectID ++ ;
	this.numtimer = true;
	return this.commands;
}

//查找函数	
Search.prototype.linearSearch = function() {
	for (var i = 0; i < this.maxSize; i++) {
		//移动矩形
		{
			this.cmd("Move", this.numNode.objectID, parseInt(this.numNode.x + i * (this.width - 1)), this.numNode.y);
			this.cmd("Step");
		}
		if (this.numNode.value == this.arrayList[i].value) {
			// 创建状态框找到该元素
			{
				show_notice("找到该元素",'success');
				this.cmd("Step");
			}
			// 将匹配数字和数组元素背景色变绿
			{
				this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#32CD32');
				this.cmd("Step");
				this.cmd("SetBackgroundColor", this.numNode.objectID, '#32CD32');
				this.cmd("Step");
			}
			i = -1;
			break;
		} else {
			// 创建状态框
			{
				show_notice("当前数组第" + parseInt(i + 1) + "个元素和查找数字不相等",'info');
				this.cmd("Step");
			}
		}
		//查找对比位置
		{
			this.cmd("SetHighlight", this.arrayList[i].objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.arrayList[i].objectID, false);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, false);
			this.cmd("Step");
		}
	}
	if (i != -1) {
		// 创建状态框查找失败
		{
			show_notice("数组中无此元素",'error');
			this.cmd("Step");
		}
	}
	return this.commands;
}


//查找函数	
Search.prototype.binarySearch = function() {
	// invalid array order
	for (var i=1; i<this.maxSize; i++) {
		if (this.arrayList[i].value < this.arrayList[i-1].value) {
			show_message("数组不满足升序的要求，不能执行二分查找",'warning');
			return this.commands;
		}
	}
	var left = 0;
	var right = this.maxSize - 1;
	var midm = 0;
	while (left <= right) {
		mid = parseInt((left + right) / 2);
		//移动矩形
		{
			this.cmd("Move", this.numNode.objectID, parseInt(this.numNode.x + mid * (this.width - 1)), this.numNode.y);
			this.cmd("Step");
		}
		if (this.numNode.value < this.arrayList[mid].value) {
			right = mid - 1;
			// 创建状态框
			{
				show_notice("当前mid值为" + mid + ",数组第" + parseInt(mid + 1) + "个元素和查找数字不相等",'info');
				this.cmd("Step");
			}
		} else if (this.numNode.value > this.arrayList[mid].value) {
			left = mid + 1;
			// 创建状态框
			{
				show_notice("当前mid值为" + mid + ",数组第" + parseInt(mid + 1) + "个元素和查找数字不相等",'info');
				this.cmd("Step");
			}
		} else {
			// 创建状态框找到该元素
			{
				show_notice("找到该元素，位置在数组第" + parseInt(mid + 1) + "个位置",'success');
				this.cmd("Step");
			}
			// 将匹配数字和数组元素背景色变绿
			{
				this.cmd("SetBackgroundColor", this.arrayList[mid].objectID, '#32CD32');
				this.cmd("Step");
				this.cmd("SetBackgroundColor", this.numNode.objectID, '#32CD32');
				this.cmd("Step");
			}
			break;
		}
		//查找对比位置
		{
			this.cmd("SetHighlight", this.arrayList[mid].objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.arrayList[mid].objectID, false);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, false);
			this.cmd("Step");
		}
	}
	if (left > right) {
		// 创建状态框查找失败
		{
			show_notice("数组中无此元素",'error');
			this.cmd("Step");
		}
	}
	return this.commands;
}

// 顺序表的节点
var SearchNode = function(objectID, value, x, y) {
	this.objectID = objectID; // 图形序号
	this.value = value; // 节点元素的值
	this.x = x; // x坐标
	this.y = y; // y坐标
}

export function creat_random_array_js(length){
	if(length>2&&length<15){
		currentSearch.initArrayCallBack_by_auto(length);
	}else{
		show_message("请输入2-15之间的数字",'error');
	}
}
export function creat_custom_array_js(array){
	currentSearch.initArrayCallBack_by_custom(array);
}
export function start_search_js(search_style,a,b,search_value){
	if(a==b==0){
		show_message("请先生成数组",'error');
		return;
	}
	if(search_style=='顺序查找'){
		currentSearch.linearSearchCallBack(search_value);
	}else if(search_style=='二分查找'){
		currentSearch.binarySearchCallBack(search_value);
	}
}