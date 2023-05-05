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
	let type_zh ;
	if(type == 'success') {
		type_zh = '成功' ;
	} else if(type == 'error') {
		type_zh = '错误' ;
	} else if(type == 'info') {
		type_zh = '提示' ;
	}
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
	this.width = 45 ; // 矩形的宽度
	this.height = 10 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 200 ; // 开始的x坐标
	this.startY = 150 ; // 开始的y坐标
	this.startArrayY = 500 ; // 开始的数组的y坐标
}


// 初始化回调函数
Sort.prototype.initCallBack = function(length) {
	var insertValue = length;
	this.implementAction(this.initArray.bind(this), insertValue);
}
Sort.prototype.initCallBack_by_user = function(array) {
	this.implementAction(this.initArray_by_user.bind(this), array);
}


// 选择排序回调函数
Sort.prototype.selectSortCallBack = function(event) {
	this.implementAction(this.selectSort.bind(this), 0);
}

// 插入排序回调函数
Sort.prototype.insertSortCallBack = function(event) {
	this.implementAction(this.insertSort.bind(this), 1);
}

// 冒泡排序回调函数
Sort.prototype.bubbleSortCallBack = function(event) {
	this.implementAction(this.bubbleSort.bind(this), 0);
}

// 希尔排序回调函数
Sort.prototype.shellSortCallBack = function(event) {
	this.implementAction(this.shellSort.bind(this), 0);
}

// 快速排序回调函数
Sort.prototype.quickSortCallBack = function(event) {
	//this.implementAction(this.QuickSort.bind(this), [0,this.maxSize-1]);
	this.iID=this.objectID++;
	this.jID=this.objectID++;
	
	this.cmd("CREATEPOINTER", this.iID, "i", 20,"up", this.arrayList[0].x, this.startArrayY+10) ;
	this.cmd("CREATEPOINTER", this.jID, "j", 20,"up", this.arrayList[this.maxSize-1].x, this.startArrayY+10) ;
	this.QuickSort(0,this.maxSize-1);
	this.cmd("Delete", this.iID);
	this.cmd("Delete", this.jID);
	
}

// 归并排序回调函数
Sort.prototype.mergeSortCallBack = function(event) {
	this.implementAction(this.ToCirle.bind(this));
	this.implementAction(this.divide.bind(this),[0,this.maxSize-1]);
	this.implementAction(this.MergeSort.bind(this), [0,this.maxSize-1]);
}


// 初始化数组
Sort.prototype.initArray = function(value) {
	value = parseInt(value);
	if (isNaN(value)) {
		show_message('数组长度应介于2-30。', 'error') ;
		return this.commands;
	}
	if (value < 2 || value > 30) {
		show_message('数组长度应介于2-30。', 'error') ;
		return this.commands;
	}
    if(this.flag){
		for(var j=0;j<this.maxSize;j++){
		this.cmd("DELETE",this.arrayList[j].objectID);
	   }
	}	
	if (this.circleList != null) {
		for (var i=0; i<this.circleList.length; i++) {
			if (this.circleList[i] != null) {
				this.cmd("DELETE", this.circleList[i].objectID);
			}
		}
	}
	this.maxSize=value;
	this.arrayList = new Array(value) ; // 数组框
	this.arrayData =new Array(value) ;
    this.cmd("Step") ;	
	// 设置状态栏
	{
		show_notice("创建大小为"+value+"的数组",'success');
		this.cmd("Step") ;
	}
	for(var i=0 ; i<this.maxSize ; i++) {
		this.flag=1;
	    this.arrayData[i] = Math.floor(1 + Math.random()*29);
		this.arrayList[i] = new ArrayNode(this.objectID, this.arrayData[i], parseInt(this.startX+i*(this.width)), this.startArrayY) ;
		this.objectID ++ ;
		// 创建矩形
		{
			this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height*this.arrayList[i].value, 
					 'center', 'bottom', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
	}
	this.cmd("Step") ;
	
	return this.commands ;
}

// 用户自定义数组
Sort.prototype.initArray_by_user = function(array_date_by_user) {
	var value = array_date_by_user.length;
	if (isNaN(value)) {
		show_message('数组长度应介于2-30。', 'error') ;
		return this.commands;
	}
	if (value < 2 || value > 30) {
		show_message('数组长度应介于2-30。', 'error') ;
		return this.commands;
	}
	show_notice('数组长度'+value+'，数组内容'+array_date_by_user,'success');
    if(this.flag){
		for(var j=0;j<this.maxSize;j++){
		this.cmd("DELETE",this.arrayList[j].objectID);
	   }
	}	
	if (this.circleList != null) {
		for (var i=0; i<this.circleList.length; i++) {
			if (this.circleList[i] != null) {
				this.cmd("DELETE", this.circleList[i].objectID);
			}
		}
	}
	this.maxSize=value;
	this.arrayList = new Array(value) ; // 数组框
	this.arrayData =new Array(value) ;
    this.cmd("Step") ;	
	for(var i=0 ; i<this.maxSize ; i++) {
		this.flag=1;
	    this.arrayData[i] = array_date_by_user[i];
		this.arrayList[i] = new ArrayNode(this.objectID, this.arrayData[i], parseInt(this.startX+i*(this.width)), this.startArrayY) ;
		this.objectID ++ ;
		// 创建矩形
		{
			this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height*this.arrayList[i].value, 
					 'center', 'bottom', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
	}
	this.cmd("Step") ;
	
	return this.commands ;
}

// 选择排序
Sort.prototype.selectSort = function(value) {
	//this.point=value;    //后移的指针
	for(var i=value;i<this.maxSize-1;i++){
	    this.min_pos=i;   //被比较元素的最小值的位置
		show_notice("从位置"+i+"开始排序",'info');
		this.cmd("Step") ;
		this.cmd("SetForegroundColor", this.arrayList[this.min_pos].objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.arrayList[this.min_pos].objectID, this.palegreen) ;
		this.min=this.arrayList[i].value;//被比较元素的最小值
		for(var j=i+1;j<this.maxSize;j++){
		     this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;
			 this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		     this.cmd("Step") ;
			 if(this.arrayList[j].value<this.min){
			      this.cmd("SetForegroundColor", this.arrayList[this.min_pos].objectID, this.foregroundColor) ;
		          this.cmd("SetBackgroundColor", this.arrayList[this.min_pos].objectID, '#FFFFFF') ;
				  this.min=this.arrayList[j].value;
			      this.min_pos=j;   
			 }
			 else{
			      this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;
		          this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
			}
		}
		if(this.min_pos!=i){  //
		    this.swap(i,this.min_pos);
		}
		this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.backgroundColor) ;
	}
	this.cmd("SetForegroundColor", this.arrayList[this.maxSize-1].objectID, this.foregroundColor) ;
	this.cmd("SetBackgroundColor", this.arrayList[this.maxSize-1].objectID, this.backgroundColor) ;
	return this.commands ;
}

// 插入排序
Sort.prototype.insertSort = function(value) {
     for(var i=value;i<this.maxSize;i++){
		  show_notice('第'+(i+1)+'轮排序','info');
		  this.cmd("Step") ;
	      var j=i;
		  while(j>0){
	         this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.palegreen) ;
			 this.cmd("Step");
		     if(this.arrayList[j-1].value<=this.arrayList[j].value){
			      this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消高亮待排序元素
		          this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.backgroundColor) ;
		          this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//取消待排序元素
		          this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.backgroundColor) ;
			      break;
             }
			 this.swap(j-1,j);
			 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.backgroundColor) ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.backgroundColor) ;
			 j--;
		  }
	 }
     return this.commands ;
}

// 冒泡排序
Sort.prototype.bubbleSort = function(value) {
	var flag = 1; // is sorted
    for(var i=value;i<this.maxSize-1;i++){
    	flag = 1;
		show_notice('第'+(i+1)+'轮排序','info');
		this.cmd("Step") ;
	    for(var j=this.maxSize-1;j>i;j--){
		     this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.palegreen) ;
			 this.cmd("Step");
			 
		     if(this.arrayList[j-1].value>this.arrayList[j].value){
			       this.swap(j-1,j);  
			       flag = 0;
			 }
			 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, '#FFFFFF') ;
		}
		// the array is sorted
		if (flag == 1) {
			show_notice('数组已排序完成','success');
			break;
		}
		this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.backgroundColor) ;
	}
	this.cmd("SetForegroundColor", this.arrayList[this.maxSize-1].objectID, this.foregroundColor) ;
	this.cmd("SetBackgroundColor", this.arrayList[this.maxSize-1].objectID, this.backgroundColor) ;
	return this.commands;
}

// 希尔排序
Sort.prototype.shellSort = function(value) {
     var gap=Math.floor(this.maxSize/2);   //gap是子序列间隔
	 while(gap!=0){
		 var group=Math.floor(this.maxSize/gap);
		 for(;group>0;group--){
		    var start=(group-1)*gap;
            this.MoveRange(start,start+gap-1,(group-1)*20);   //分组
			this.cmd("Step");
		 }
		//this.cmd("",);
	    for(var i=0;i<gap;i++){
	        for(var j=i;j<this.maxSize;j+=gap){
			    for(var j1=j;j1<this.maxSize;j1+=gap){
				     this.cmd("SetForegroundColor", this.arrayList[j1].objectID, this.foregroundColor) ;//高亮待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[j1].objectID, this.tomato) ;
				}
			    var inc=j;
				while(inc>=gap){
			         this.cmd("SetForegroundColor", this.arrayList[inc].objectID, this.foregroundColor) ;//高亮待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc].objectID, this.tomato) ;
		             this.cmd("SetForegroundColor", this.arrayList[inc-gap].objectID, this.foregroundColor) ;//高亮待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc-gap].objectID, this.tomato) ;
			         this.cmd("Step");
		             if(this.arrayList[inc].value>=this.arrayList[inc-gap].value){
					      this.cmd("SetForegroundColor", this.arrayList[inc].objectID, this.foregroundColor) ;//取消待排序元素
		                  this.cmd("SetBackgroundColor", this.arrayList[inc].objectID, '#FFFFFF') ;
		                  this.cmd("SetForegroundColor", this.arrayList[inc-gap].objectID, this.foregroundColor) ;//取消待排序元素
		                  this.cmd("SetBackgroundColor", this.arrayList[inc-gap].objectID, '#FFFFFF') ;
						  break;
				     } 
					 this.swap(inc-gap,inc);
				     this.cmd("SetForegroundColor", this.arrayList[inc].objectID, this.foregroundColor) ;//取消待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc].objectID, '#FFFFFF') ;
		             this.cmd("SetForegroundColor", this.arrayList[inc-gap].objectID, this.foregroundColor) ;//取消待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc-gap].objectID,'#FFFFFF') ;
				     inc-=gap;
		        }
			}
	    }
		this.cmd("Step");
		for(var i1=0;i1<this.maxSize;i1++){
			this.arrayList[i1].x=parseInt(this.startX+i1*(this.width));
			this.cmd("Move", this.arrayList[i1].objectID, parseInt(this.startX+i1*(this.width)), this.startArrayY) ;
		}
		this.cmd("Step");
		gap=Math.floor(gap / 2);
	 }
     return this.commands;
}

// 快速排序
Sort.prototype.QuickSort = function(low,high) {
    // var low=valueArr[0];
	// var high=valueArr[1];
	 if(high<low){
		return;
	 }
	 this.cmd("step");
	 var i=low+1;
	 var j=high;
	 var pivot=this.arrayList[low].value;
	 // 创建轴值状态框
	 this.pivotStateID=this.objectID;
	 this.objectID++;
	{
		this.cmd("Step") ;
		var y=parseInt(this.startArrayY-this.height*this.arrayList[low].value/2);
		this.cmd("CREATECIRCLE",this.pivotStateID,this.arrayList[low].value,this.arrayList[low].x,y,20);// 圆形的半径
		this.cmd("Step") ;
		this.cmd("Move",this.pivotStateID,this.arrayList[low].x,140);
		this.cmd("Step") ;
	}
	if(i==this.maxSize){
		this.cmd("Move", this.iID, this.arrayList[i-1].x+this.width, this.startArrayY + 10);
		this.cmd("Move", this.jID, this.arrayList[j-1].x+this.width, this.startArrayY + 10);
	    this.cmd("Step");
	}
	else{
	     this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 10);
	     this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 10);
	     this.cmd("Step");
	}
	 while(i<=j){
	     this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.palegreen) ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		 this.cmd("Step");
		 this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
		 while(i<=j && this.arrayList[i].value<pivot){
		      i++;
			  if(i==this.maxSize){
			       this.cmd("Move", this.iID, this.arrayList[i-1].x+this.width, this.startArrayY + 10);
			       this.cmd("Step");
			  }
			  else{
			       this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 10);
			       this.cmd("Step");
			  }
			  if(i<=j){
			       this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//高亮待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.palegreen) ;
		           this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		           this.cmd("Step");
		           this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//取消待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		           this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
			 }
		 }
		 
		 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		 this.cmd("Step");
		 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
		 while(j>=i && this.arrayList[j].value>pivot){
		       j--;
			   this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 10);
			   this.cmd("Step");
			   this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		       this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		       this.cmd("Step");
		       this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
		       this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
		 }
		 if(i<=j){
		       this.cmd("Move", this.iID, this.arrayList[i+1].x, this.startArrayY + 10);
	           this.cmd("Move", this.jID, this.arrayList[j-1].x, this.startArrayY + 10);
		       this.swap(i,j);	
			   i++;
			   j--;
		 }
	 }
	 this.swap(low,j);
	 this.cmd("DELETE",this.pivotStateID);
	 this.cmd("Step");
	 this.QuickSort(low,j-1);
	 this.QuickSort(j+1,high);
     return this.commands;
}

//矩形元素转换成圆圈元素
Sort.prototype.ToCirle=function(){
	//this.startX=300;
	this.circleList=new Array(this.maxSize);
	for(var i=0;i<this.maxSize;i++){
		var y=parseInt(this.startArrayY-this.height*this.arrayList[i].value/2);
		this.circleList[i] = new ArrayNode(this.objectID, this.arrayData[i], this.arrayList[i].x, y);
		this.objectID ++ ;
		{
			this.cmd("Step") ;
			this.cmd("CREATECIRCLE",this.circleList[i].objectID,this.circleList[i].value,this.circleList[i].x,this.circleList[i].y,20);
			this.cmd("SetBackgroundColor", this.circleList[i].objectID, '#FFFFFF') ;
			this.cmd("Step") ;
		}
	}
	this.cmd("Step") ;
	for(var j=0;j<this.maxSize;j++){
		this.cmd("Step") ;
		this.cmd("DELETE",this.arrayList[j].objectID);
		this.cmd("Step") ;
	}
	this.cmd("Step");
	this.MoveToStart(100,150);
	return this.commands ;
}
//元素分割
Sort.prototype.divide=function(valueArr){
	var low=valueArr[0];
	var high=valueArr[1];
	if(low<high){
		var mid=Math.floor((low + high) / 2);
		this.CircleMoveRange(mid+1,this.maxSize-1,30);
		this.cmd("Step");
		this.divide([low,mid]);
		//this.cmd("Step");
		this.divide([mid+1,high]);
		//this.cmd("Step");
	}
	this.cmd("Step");
	return this.commands ;
}
// 归并排序
Sort.prototype.MergeSort = function(valueArr) {
     var low=valueArr[0];
	 var high=valueArr[1];
	 if(low<high){
	     var mid=Math.floor((low + high) / 2);
		 this.MergeSort([low,mid]);
		 this.MergeSort([mid+1,high]);
		 var leftIndex=low;
		 var rightIndex=mid+1;
		 var k=low;
		 var InsertArray=new Array(high-low+1);
		 for(var j=0;j<high-low+1;j++){
		     InsertArray[j]=new ArrayNode("","","","");
		 }
		 var index=0;
		 while(leftIndex<=mid && rightIndex<=high){
		     if(this.circleList[leftIndex].value<=this.circleList[rightIndex].value){
				 show_notice(this.circleList[leftIndex].value+"<="+this.circleList[rightIndex].value,'info');
		         this.cmd("Step") ;
			     this.cmd("Move", this.circleList[leftIndex].objectID, this.startX+k*this.width, 300);
                 this.cmd("Step") ;
				 this.circleList[leftIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.circleList[leftIndex];
                 k++;
                 leftIndex++;				 
			 }
			 else{
				 show_notice(this.circleList[leftIndex].value+">"+this.circleList[rightIndex].value,'info');
		         this.cmd("Step") ;
			     this.cmd("Move", this.circleList[rightIndex].objectID, this.startX+k*this.width, 300);
                 this.cmd("Step") ;
				 this.circleList[rightIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.circleList[rightIndex];
                 k++;
                 rightIndex++;
			 }
		 }
		 if(leftIndex<=mid){
		      while(leftIndex<=mid){
		         this.cmd("Step") ;
			     this.cmd("Move", this.circleList[leftIndex].objectID, this.startX+k*this.width, 300);
                 this.cmd("Step") ;
				 this.circleList[leftIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.circleList[leftIndex];
                 k++;
                 leftIndex++; 
			  }
		 }
		 else{
		     while(rightIndex<=high){
		         this.cmd("Step") ;
			     this.cmd("Move", this.circleList[rightIndex].objectID, this.startX+k*this.width, 300);
                 this.cmd("Step") ;
				 this.circleList[rightIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.circleList[rightIndex];
                 k++;
                 rightIndex++;
			 }
		 }
		 for(var i1=0,i2=low;i1<index,i2<=high;i1++,i2++){
		     this.circleList[i2]=InsertArray[i1];

		 }
		 for(var i=low;i<=high;i++){
		    this.cmd("Move", this.circleList[i].objectID, this.circleList[i].x, this.circleList[i].y) ;
		 }
		 this.cmd("Step") ;
	 }
     return this.commands;
}
//交换元素
Sort.prototype.swap=function(index1,index2){
	var distance=this.arrayList[index2].x-this.arrayList[index1].x;
    var minNode=new ArrayNode("","","","");
	minNode=this.arrayList[index2];
    this.arrayList[index2]=this.arrayList[index1];
	this.arrayList[index1]=minNode;
	
	this.arrayList[index2].x+=distance;
	this.cmd("Move", this.arrayList[index2].objectID, this.arrayList[index2].x, this.arrayList[index2].y) ;
	
	this.arrayList[index1].x-=distance;
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
//数组水平移动范围
Sort.prototype.MoveRange=function(start,end,distance){
	for(var i=start;i<=end;i++){
		this.arrayList[i].x+=distance;
		this.cmd("Move", this.arrayList[i].objectID, this.arrayList[i].x, this.arrayList[i].y) ;
		
	}
}
Sort.prototype.CircleMoveRange=function(start,end,distance){
	for(var i=start;i<=end;i++){
		this.circleList[i].x+=distance;
		this.cmd("Move", this.circleList[i].objectID, this.circleList[i].x, this.circleList[i].y) ;
		
	}
}
Sort.prototype.MoveToStart=function(x,y){
	for(var i=0;i<this.maxSize;i++){
		this.cmd("Step");
		if(i==this.maxSize-1){
		this.circleList[i].x=x+i*32;
		this.circleList[i].y=y-2;
		}
		else{
			this.circleList[i].x=x+i*32;
		    this.circleList[i].y=y;
		}
		this.cmd("Move", this.circleList[i].objectID, this.circleList[i].x, this.circleList[i].y) ;
		this.cmd("Step");
	}
}


export function creat_random_array_js(length){
	currentSort.initCallBack(length);
}
export function creat_custom_array_js(array){
	for (var i = 0; i < array.length; i++) {
		if(array[i]>40){
			show_message("不得输入大于40的数字",'error');
			return;
		}else if(array[i]<=0){
			show_message("不得输入小于1的数字",'error');
			return;
		}
	}
	show_notice('成功初始化数组'+array,'success');
	currentSort.initCallBack_by_user(array);
}
export function start_sort_js(sort_style,a,b){
	if(a==0&&b==0){
		show_message("请先初始化数组",'error');
		return;
	}
	if(sort_style=='insert_sort'){
		currentSort.insertSortCallBack();
	}else if(sort_style=='select_sort'){
		currentSort.selectSortCallBack();
	}else if(sort_style=='bubble_sort'){
		currentSort.bubbleSortCallBack();
	}else if(sort_style=='shell_sort'){
		currentSort.shellSortCallBack();
	}else if(sort_style=='quick_sort'){
		currentSort.quickSortCallBack();
	}else if(sort_style=='merge_sort'){
		currentSort.mergeSortCallBack();
	}
}