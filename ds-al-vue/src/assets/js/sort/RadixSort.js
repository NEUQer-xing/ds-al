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

// 初始化控件
Sort.prototype.initControls = function() {
	this.initButton.onclick = this.initCallBack.bind(this) ;
	this.RadixSortButton.onclick = this.RadixSortCallBack.bind(this) ;
}

// 初始化属性
Sort.prototype.initAttributes = function() {
	// 逻辑部分
	// 图形部分
	this.objectID = 1 ;
	this.width = 40 ; // 矩形的宽度
	this.height = 40 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 30 ; // 开始的x坐标
	this.startArrayY = 250 ; // 开始的数组的y坐标
	this.startLabelY=350;//标签的y坐标
}

// 初始化回调函数
Sort.prototype.initCallBack = function(length) {
	// var insertValue = this.insertField.value;
	var insertValue = length;
		this.implementAction(this.initArray.bind(this), insertValue);
}
Sort.prototype.initCallBack_by_user = function(array) {
	this.implementAction(this.initArray_by_user.bind(this), array);
}


// 基数排序回调函数
Sort.prototype.radixSortCallBack = function(event) {
	this.implementAction(this.RadixSort.bind(this),this.maxSize);
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
	if (this.labelArr != null) {
		for (var i=0; i<this.labelArr.length; i++) {
			if (this.labelArr[i] != null) {
				this.cmd('Delete', this.labelArr[i].objectID);
			}
		}
		this.labelArr = null;
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
	    this.arrayData[i] = Math.floor(1 + Math.random()*999);
		this.arrayList[i] = new ArrayNode(this.objectID, this.arrayData[i], parseInt(this.startX+i*(this.width)), this.startArrayY) ;
		this.objectID ++ ;
		// 创建矩形
		{
			this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height, 
					 'center', 'bottom', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
	}
	this.cmd("Step") ;
	this.labelArr=new Array(10);
	for(var j=0;j<10;j++){
	    this.labelArr[j]=new ArrayNode(this.objectID,j,parseInt(this.startX+j*2*this.width),this.startLabelY);
		this.objectID++;
		this.cmd("CREATEPOINTER",this.labelArr[j].objectID,this.labelArr[j].value,20,"down",this.labelArr[j].x,this.labelArr[j].y);
	}
	this.cmd("Step") ;
	
	return this.commands ;
}

// 用户自定义数组
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
	show_notice('创建大小为'+value+'的数组,数组内容为:'+array_date_by_user, 'success');
	this.cmd("Step") ;

	for(var i=0 ; i<this.maxSize ; i++) {
	    this.arrayData[i] = array_date_by_user[i];
		this.arrayList[i] = new ArrayNode(this.objectID, this.arrayData[i], parseInt(this.startX+i*(this.width)), this.startArrayY) ;
		this.objectID ++ ;
		// 创建矩形
		{
			this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height, 
					 'center', 'bottom', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
	}
	this.cmd("Step") ;
	this.labelArr=new Array(10);
	for(var j=0;j<10;j++){
	    this.labelArr[j]=new ArrayNode(this.objectID,j,parseInt(this.startX+j*2*this.width),this.startLabelY);
		this.objectID++;
		this.cmd("CREATEPOINTER",this.labelArr[j].objectID,this.labelArr[j].value,20,"down",this.labelArr[j].x,this.labelArr[j].y);
	}
	this.cmd("Step") ;
	
	return this.commands ;
}

//基数排序
Sort.prototype.RadixSort = function(value) {
    var d=1;//保存最大位数
	var p=10;
	var i=0,j=0,k=0;
	for(i=0;i<value;i++){
	     if(this.arrayList[i].value>=p){
		      p=p*10;
			  d++;
		 }
	}
	var radix=1;
	var tmp=new Array(this.maxSize);
	var count=new Array(10);//计数器
	var count1=new Array(10);
	for(i=1;i<=d;i++){
		show_notice('进行第'+i+'轮排序','info');
		this.cmd("Step") ;
	    for(j=0;j<10;j++){
		    count[j]=0;     //每次分配前清空计数器
			count1[j]=1;
		}
		for(j=0;j<this.maxSize;j++){
		    k=parseInt((this.arrayList[j].value/radix)%10);//计算每个记录对应的桶号
			count[k]++;                //统计每个桶中的记录数
		}
		for(j=1;j<10;j++){
		    count[j]=count[j]+count[j-1];//将tmp中的位置一次分配给每个桶
		}
		for(j=this.maxSize-1;j>=0;j--)//将所有桶中记录依次收集到tmp中
		{
			k=parseInt((this.arrayList[j].value/radix)%10);
			tmp[count[k]-1]=this.arrayList[j];
			this.cmd("Move", tmp[count[k]-1].objectID, this.labelArr[k].x, this.labelArr[k].y+count1[k]*this.height) ;
			tmp[count[k]-1].x=this.startX+(count[k]-1)*this.width;
			this.cmd("step");
			count[k]--;
			count1[k]++;
		}
		show_notice('进行第'+i+'次收集','info');
		this.cmd("Step") ;
		for(j=0;j<this.maxSize;j++)//将临时数组的内容复制到data中
		{
		    this.arrayList[j]=tmp[j];
			this.cmd("Move", this.arrayList[j].objectID, this.arrayList[j].x, this.arrayList[j].y) ;
			this.cmd("step");
		}
		radix=radix*10;
		this.cmd("step");
	}
	show_notice('排序完成','success');
    return this.commands;
}

//交换元素
Sort.prototype.swap=function(index1,index2){
    minNode=new ArrayNode("","","","");
	minNode=this.arrayList[index2];
    this.arrayList[index2]=this.arrayList[index1];
	this.arrayList[index1]=minNode;
	
	this.arrayList[index2].x+=(index2-index1)*(this.width);
	this.cmd("Move", this.arrayList[index2].objectID, this.arrayList[index2].x, this.arrayList[index2].y) ;
	
	this.arrayList[index1].x-=(index2-index1)*(this.width);
	this.cmd("Move", this.arrayList[index1].objectID, this.arrayList[index1].x, this.arrayList[index1].y) ;
    this.cmd("Step") ;
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
	currentSort.radixSortCallBack();
}