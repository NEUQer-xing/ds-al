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

var currentSort;
// 初始化函数
export function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentSort = new Sort(animationManager, drawing.width, drawing.height) ;
}

// 排序
var Sort = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Sort.prototype = new Algorithm();
Sort.prototype.constructor = Sort;

// 初始化属性
Sort.prototype.initAttributes = function() {
	// 逻辑部分
	// 图形部分
	this.objectID = 1 ;
	this.width = 50 ; // 矩形的宽度
	this.height = 60 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 50 ; // 开始的x坐标
	this.startArrayY = 130 ; // 开始的数组的y坐标
	this.heapStartX = 500;
	this.heapStartY = 300;
}


// 初始化回调函数
Sort.prototype.initCallBack = function(value) {
	var insertValue = value;
	this.implementAction(this.initArray.bind(this), insertValue);
}
Sort.prototype.initCallBack_by_user = function(array) {
	this.implementAction(this.initArray_by_user.bind(this), array);
}



Sort.prototype.HeapSortCallBack = function(event) {
	this.implementAction(this.HeapSort.bind(this),this.maxSize);
}

Sort.prototype.clearCanvas = function() {
	if (this.arrayList != null) {
		for (var i=0; i<this.arrayList.length; i++) {
			if (this.arrayList[i] != null) {
				this.cmd('Delete', this.arrayList[i].objectID);
			}
		}
		this.arrayList = null;
	}
	this.arrayData = null;
	this.maxSize = 0;
}


// 初始化数组
Sort.prototype.initArray = function(value) {
	value = parseInt(value);
	if (isNaN(value)) {
		show_message('数组长度应介于2-24。', 'error');
		return this.commands;
	}
	if (value < 2 || value > 24) {
		show_message('数组长度应介于2-24。', 'error');
		return this.commands;
	}
	this.clearCanvas();
    this.maxSize=value;
	this.arrayList = new Array(value) ; // 数组框
	this.arrayData =new Array(value) ; 
	// 设置状态栏
	{
		show_notice('创建大小为'+value+'的数组', 'success');
		this.cmd("Step") ;
	}
	for(var i=0 ; i<this.maxSize ; i++) {
	    this.arrayData[i] = Math.floor(1 + Math.random()*99);
		this.arrayList[i] = new ArrayNode(this.objectID, this.arrayData[i], parseInt(this.startX+i*(this.width)), this.startArrayY) ;
		this.objectID ++ ;
		{
			this.cmd("CREATECIRCLE",this.arrayList[i].objectID,this.arrayList[i].value,this.arrayList[i].x,this.arrayList[i].y,20);
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
	}
	this.cmd("Step") ;
	
	return this.commands ;
}
Sort.prototype.initArray_by_user = function(array_date_by_user) {
	var value = array_date_by_user.length;
	if (isNaN(value)) {
		show_message('数组长度应介于2-24。', 'error');
		return this.commands;
	}
	if (value < 2 || value > 24) {
		show_message('数组长度应介于2-24。', 'error');
		return this.commands;
	}
	this.clearCanvas();
    this.maxSize=value;
	this.arrayList = new Array(value) ; // 数组框
	this.arrayData =new Array(value) ; 
	// 设置状态栏
	{
		show_notice('创建大小为'+value+'的数组', 'success');
		this.cmd("Step") ;
	}
	for(var i=0 ; i<this.maxSize ; i++) {
	    this.arrayData[i] = array_date_by_user[i];
		this.arrayList[i] = new ArrayNode(this.objectID, this.arrayData[i], parseInt(this.startX+i*(this.width)), this.startArrayY) ;
		this.objectID ++ ;
		// 创建矩形
		{
			this.cmd("CREATECIRCLE",this.arrayList[i].objectID,this.arrayList[i].value,this.arrayList[i].x,this.arrayList[i].y,20);
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
	}
	this.cmd("Step") ;
	return this.commands ;
}
//堆排序
Sort.prototype.HeapSort = function(value) {
	show_notice('将数组展开呈堆形', 'info');
	this.cmd("Step");
	this.MoveToStart();//将数组展开呈堆形
	this.BulidHeap();//建堆
	var arraySize=this.maxSize;
	for(var i=this.maxSize-1;i>0;i--)
	{
		show_notice('找出当前堆的最大值'+this.arrayList[0].value, 'info');
	    this.cmd("Step");
		this.swap(0,i);
		this.cmd("SetBackgroundColor",this.arrayList[i].objectID,this.backgroundColor) ;
		this.cmd("Step");
		this.maxSize--;
		this.SiftDown(0);
		this.cmd("Step");
	}

	this.cmd("SetBackgroundColor",this.arrayList[0].objectID,this.backgroundColor) ;
	this.cmd("Step");
	
	for (var j = 0; j < arraySize; j++) {
		this.arrayList[j].x=parseInt(this.startX+j*(this.width));
		this.arrayList[j].y=this.startArrayY;
		this.cmd("Move", this.arrayList[j].objectID, this.arrayList[j].x, this.arrayList[j].y);
		this.cmd("Step");
	}
    return this.commands;
}
//建堆
Sort.prototype.BulidHeap=function(){
	for(var i = parseInt(this.maxSize/2-1); i>=0; i-- )
	{
		this.SiftDown(i);
		this.cmd("Step") ;
	}
}
//向下调整
Sort.prototype.SiftDown = function (left) {

	show_notice('向下调整堆', 'info');
	this.cmd("Step");
	var i=left;
	var j=i*2+1;
	console.log('i='+i+"j="+j);
	while(j<this.maxSize){
		if((j<this.maxSize-1) && (this.arrayList[j].value<this.arrayList[j+1].value))
			j++;
		this.cmd("Step");
		this.cmd("Step");
		if(this.arrayList[i].value < this.arrayList[j].value)
		{
			show_notice(this.arrayList[i].value+" < "+this.arrayList[j].value+",交换两个元素。", 'info');
	        this.cmd("Step");
			this.swap(i,j);
			i=j;
			j=2*j+1;
		}
		else
			break;
	}
}
//交换元素
Sort.prototype.swap = function (index1, index2) {
	
	var distanceX=this.arrayList[index2].x-this.arrayList[index1].x;
	var distanceY=this.arrayList[index2].y-this.arrayList[index1].y;
    var minNode=new ArrayNode("","","","");
	minNode=this.arrayList[index2];
    this.arrayList[index2]=this.arrayList[index1];
	this.arrayList[index1]=minNode;
	
	this.arrayList[index2].x+=distanceX;
	this.arrayList[index2].y += distanceY;

	this.cmd("Move", this.arrayList[index2].objectID, this.arrayList[index2].x, this.arrayList[index2].y) ;
	
	this.arrayList[index1].x-=distanceX;
	this.arrayList[index1].y-=distanceY;
	this.cmd("Move", this.arrayList[index1].objectID, this.arrayList[index1].x, this.arrayList[index1].y);
	this.cmd("Step");
}

Sort.prototype.MoveToStart=function(){
	var row=0;
	var i,j;
	var k=0;
	for(i=0; ;i++)
	{
		if((this.power(2,i)-1)>this.maxSize)
			break;
	}
	
	for(j=0;j<i;j++){
		row= - (this.power(2,j)-1)/2;
		for(k=this.power(2,j)-1;(k<this.power(2,j+1)-1) && k<this.maxSize;k++)
		{
			this.arrayList[k].x=this.heapStartX+row*30*Math.pow(2, i-j);
			this.arrayList[k].y=this.heapStartY+j*70; // 控制两个节点之间的y距离
			this.cmd("Move", this.arrayList[k].objectID, this.arrayList[k].x, this.arrayList[k].y) ;
			this.cmd("Step");
			row++;
		}
	}
	this.cmd("Step");
	return this.commands ;
}
Sort.prototype.power=function(m,n){
	var result=1;
	for(var i=0;i<n;i++)
	{
		result*=m;
	}
	return result;
}
// 数组的节点
var ArrayNode = function(objectID, value, x, y) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
}

export function creat_random_array_js(length){
	currentSort.initCallBack(length);
}
export function creat_custom_array_js(array){
	show_notice('成功初始化数组'+array,'success');
	currentSort.initCallBack_by_user(array);
}
export function start_sort_js(a,b){
	if(a==0&&b==0){
		show_message("请先初始化数组",'error');
		return;
	}
	currentSort.HeapSortCallBack();
}
