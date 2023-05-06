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
// 初始化函数
var currentGraph;
/* chenged */
// 有向图的边画法改变
var directedGraphCurveWithSingleEdge = 0.0;	// 两个顶点之间只有一条边， 此时画直线
var directedGraphCurveWithDoubleEdge = 0.15;	// 两个顶点之间有两条边， 此时画曲线
var undirectedGraphCurve = 0.0;
var initialVertexNum = 6;
export function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentGraph = new Graph(animationManager, drawing.width, drawing.height);
	currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), initialVertexNum) ;
	
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 4, 5, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 2, 1, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [4, 2, 10, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [5, 3, 5, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [3, 1, 4, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [1, 5, 6, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 5, 10, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 1, 5, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [1, 2, 20, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [4, 5, 5, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [4, 3, 10, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [3, 2, 15, false]) ;
}

// 产生介于上界和下界的随机数，整数，上界和下界都可以取到
function getRandomNumber(lowerBound,upperBound) {
	var range = upperBound - lowerBound + 1;
	var rand = Math.round( Math.random() * 100 );
	return ( (rand% range) + lowerBound );
}


/* 边类 */
function GraphEdge(startVertex, endVertex, weight) {
	if (weight == null) {
		this.weight = 0;
	}
	else {
		this.weight = weight;
	}
	this.startVertex = startVertex;
	this.endVertex = endVertex;
}

GraphEdge.prototype = {
	constructor:GraphEdge,
}

/* 图类开始 */
// 图
var Graph = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initialize() ;
}
// 继承与构造
Graph.prototype = new Algorithm();
Graph.prototype.constructor = Graph;

// 初始化
Graph.prototype.initialize = function() {
	// 逻辑部分ID
	//this.head = -1 ; // 头指针
	this.directed = true;		// 是否是有向图
	this.showEdgeWeight = true;	// 是否显示边权重
	// 图形部分
	this.objectID = 0 ; // 图形的序号
	
	this.highlightRectangleKnownID; // Known 高亮矩形
	this.highlightRectangleCostID;	// cost 高亮矩形
	this.highlightRectanglePathID;	// path 高亮矩形
	
	this.hintVertexID;		// vertex
	this.hintKnownID;		// Known
	this.hintCostID;		// Cost
	this.hintPathID;		// Path

	this.hintVertexColumnID;	// vertex列
	this.hintKnownColumnID;		// Known列
	this.hintCostColumnID;		// Cost列
	this.hintPathColumnID;		// Path列

	this.radius = 26;	// 顶点圆的半径
	// 顶点位置的确定
	this.R = 150;		// 所有顶点分布在该圆上
	this.X0 = 200;		// 分布圆的圆心横坐标
	this.Y0 = 250; 		// 分布圆的圆心纵坐标

	this.tableWidth = 60;
	this.tableHeight = 30;
	this.tableStartX = 500;
	this.tableStartY = 180;

	this.hintStartX = 600;
	this.hintStartY = 150;
	this.hintObjectWidth = 60;
	this.hintObjectHeight = 30;
	
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.highlightColor = '#FF0000' ; // 高亮色
}

// 添加边调用函数
Graph.prototype.addEdgeCallBack = function (startVertex, endVertex, weight) {
	if (isNaN(weight) || weight == null) {
		weight = 10;
	}
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [startVertex, endVertex, weight]) ;
}
// 删除边调用函数
Graph.prototype.delEdgeCallBack = function (startVertex, endVertex) {
	currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [startVertex, endVertex]) ;
}
// Floyd调用函数
Graph.prototype.runFloydCallBack = function(startVertex) {
	// startVertex = ( startVertex == null || isNaN(startVertex) ) ? 0: startVertex;
	// currentGraph.implementAction(currentGraph.clearHintArea.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.Floyd.bind(currentGraph), startVertex);
}
// 产生随机图调用函数
Graph.prototype.randomGraphCallBack = function() {
	currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
}
// 显示边权重调用函数
Graph.prototype.showEdgeWeightSwitch = function (show) {
	if (show != null) {
		currentGraph.showEdgeWeight = show;
		currentGraph.implementAction(currentGraph.showEdgeWeightFunc.bind(currentGraph), show);
	}
}
// 有向图和无向图的转换
Graph.prototype.directedGraphSwitch = function (directed) {
	if (directed != null) {
		// 先清除所有的边
		currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
		currentGraph.directed = directed;
		// 获取随机图
		currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
	}
}

// 顶点数量取值变化调用函数
Graph.prototype.vertexNumSelectChangeCallBack = function (newVertexNum) {
	if (!isNaN(parseInt(newVertexNum)) && parseInt(newVertexNum)>=3 && parseInt(newVertexNum)<=10) {
		// 清除所有
		objectManager = null;
		currentGraph = null;
		animationManager = null;
		// 重新产生所有
		objectManager = new ObjectManager() ;
		animationManager = new AnimationManager(objectManager) ;
		currentGraph = new Graph(animationManager, drawing.width, drawing.height);
		currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), parseInt(newVertexNum) ) ;
	} else {
		show_message("顶点数量取值范围应为 3-10 !",'error');
	}
}

// 初始化数组
Graph.prototype.initGraph = function(vertexNum) {
	this.vertexNum = vertexNum ; 	// 顶点的数量
	this.edgeNum = 0;				// 边的数量
	this.hintVertexID = vertexNum;
	this.hintKnownID = vertexNum+1;
	this.hintCostID = vertexNum+2;
	this.hintPathID = vertexNum+3;
	this.hintVertexColumnID = new Array(this.vertexNum);
	this.hintKnownColumnID = new Array(this.vertexNum);
	this.hintCostColumnID = new Array(this.vertexNum);
	this.hintPathColumnID = new Array(this.vertexNum);
	for (var i=0; i< this.vertexNum; i++) {
		this.hintVertexColumnID[i] = vertexNum + 4 + 4 * i;
		this.hintKnownColumnID[i] = vertexNum + 4 + 4 * i + 1;
		this.hintCostColumnID[i] = vertexNum + 4 + 4 * i + 2;
		this.hintPathColumnID[i] = vertexNum + 4 + 4 * i + 3;
	}	
	this.highlightRectangleKnownID = 5 * vertexNum + 5;
	this.highlightRectangleCostID = 5 * vertexNum + 6;
	this.highlightRectanglePathID = 5 * vertexNum + 7;

	this.matrix = new Array(this.vertexNum);	// 图的邻接矩阵
	for (var i=0; i<this.vertexNum; i++) {
		this. matrix[i] = new Array(this.vertexNum);
		for (var j=0; j<this.vertexNum; j++) {
			this.matrix[i][j] = 0;
		}
	}
	this.position = new Array(this.vertexNum);	// 存储顶点的位置
	for (var i =0; i< this.vertexNum; i++) {
		this.position[i] = new Array(2);
	}
	// 对顶点的分布做出适应性改变
	this.R = this.R + 20 * (this.vertexNum - 5);
	this.R = (this.R > 220) ? 220 : this.R;
	for (var i =0; i< this.vertexNum; i++) {
		this.position[i][0] = Math.round( this.X0 + this.R * Math.sin( 2* Math.PI * i / this.vertexNum ) );
		this.position[i][1] = Math.round( this.Y0 - this.R * Math.cos( 2 * Math.PI * i / this.vertexNum ) );
	}
	//this.graphObjectID = new Array(maxSize) ; // 
	
	for(var i=0 ; i<this.vertexNum ; i++) {
		//this.graphObjectID[i] = -1 ;
		this.cmd("CreateCircle", this.objectID, this.objectID,
				 this.position[this.objectID][0], this.position[this.objectID][1], this.radius);
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.objectID, '#FFFFFF') ;
		this.objectID ++ ;
	}
	return this.commands;
}

// 清除hint区域
Graph.prototype.clearHintArea = function () {
	if (this.header != null) {
		this.cmd('Delete', this.header.objectID);
	}
	if (this.rowHeader != null) {
		for (var i=0; i<this.rowHeader.length; i++) {
			this.cmd('Delete', this.rowHeader[i].objectID);
		}
	}
	if (this.columnHeader != null) {
		for (var i=0; i<this.columnHeader.length; i++) {
			this.cmd('Delete', this.columnHeader[i].objectID);
		}
	}
	if (this.table != null) {
		for (var i=0; i<this.table.length; i++) {
			for (var j=0; j<this.table[i].length; j++) {
				this.cmd('Delete', this.table[i][j].objectID);
			}
		}
	}
}
// 清除图的所有边
Graph.prototype.clearAllEdges = function () {
	// 有向图
	if (this.directed ) {
		for(var i=0; i<this.vertexNum; i++ ) {
			for(var j=0; j<this.vertexNum; j++) {
				if (this.matrix[i][j]) {
					this.cmd("Disconnect", i, j);
					this.matrix[i][j] = 0;
				}
			}
		}
	}
	// 无向图
	else {
		for (var i=0; i<this.vertexNum; i++) {
			for (var j=0; j<i ; j++) {
				if (this.matrix[i][j]) {
					// 由于connect时候是小到大，故disconnect时候也要小到大
					this.cmd("Disconnect", j, i );	
					this.matrix[i][j] =0;
					this.matrix[j][i] =0;
				}
			}
		}
	}
	this.edgeNum =0;
	return this.commands;
}

// 产生一个随机图
Graph.prototype.getRandomGraph = function () {
	// 产生无向图
	if (!this.directed) {
		for(var i=0; i < this.vertexNum; i++) {
			for (var j=0; j<i; j++) {
				if (getRandomNumber(0,1) ) {
					this.addEdge( [j , i, getRandomNumber(1,100), false] );
				}
			}
		}
	}
	// 产生有向图
	else {
		for(var i=0; i < this.vertexNum; i++) {
			for (var j=0; j<this.vertexNum; j++) {
				if (i != j ) {
					// 决定是否添加边
					if (getRandomNumber(0,1) ) {
						this.addEdge( [i , j, getRandomNumber(1,100), false] );
					}
				}
			}
		}
	}
	return this.commands;
}
	
// 添加边
Graph.prototype.addEdge = function() {
	// 传入参数，起点，终点，权重, 是否需要动画
	var startVertex =  arguments[0][0];
	var endVertex =  arguments[0][1];
	var weight =  arguments[0][2];	
	var withAnimation = arguments[0][3];	// bool
	// 传入参数的合法性判断
	if (startVertex <0 || startVertex >= this.vertexNum) {
		show_message('起始节点输入错误',error);
		return this.commands;
	}
	if (endVertex <0 || endVertex >= this.vertexNum) {
		show_message('终止节点输入错误',error);
		return this.commands;
	}
	if(weight <=0 ) {
		show_message('权重应该大于0',error);
		return this.commands;
	}
	// 判断这条边是否已经存在
	if (this.directed) {
		if (this.matrix[startVertex][endVertex] ) {
			show_message('该边已经存在',error);
			return this.commands;
		}
	}
	else {
		if (this.matrix[startVertex][endVertex] || this.matrix[endVertex][startVertex]) {
			show_message('该边已经存在',error);
			return this.commands;
		}
	}
	// 添加这个边
	if (withAnimation) {
		this.cmd("SetHighlight", startVertex, true) ;
		this.cmd("SetHighlight", endVertex, true) ;
		this.cmd("Step") ;
		this.cmd("SetHighlight", startVertex, false) ;
		this.cmd("SetHighlight", endVertex, false) ;
		this.cmd("Step") ;
	}

	// 有向图
	if (this.directed) {
		this.matrix[startVertex][endVertex] = weight;
		//var label1 = (startVertexText.checked) ? this.matrix[startVertex][endVertex] : "";
		//var label2 = (startVertexText.checked) ? this.matrix[endVertex][startVertex] : "";
		// 对于有向图，需要先判断是否已经存在反向的连线
		if (this.matrix[endVertex][startVertex] ) {
			this.cmd("Disconnect", endVertex, startVertex );
			this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 
					directedGraphCurveWithDoubleEdge, this.directed, this.matrix[startVertex][endVertex] );
			this.cmd("Connect", endVertex, startVertex, this.foregroundColor, 
					directedGraphCurveWithDoubleEdge, this.directed, this.matrix[endVertex][startVertex] );
		}
		else {
			this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 
					directedGraphCurveWithSingleEdge, this.directed, this.matrix[startVertex][endVertex] );
		}
	}
	// 无向图
	else {
		this.matrix[startVertex][endVertex] = weight;
		this.matrix[endVertex][startVertex] = weight;
		var label = (this.showEdgeWeight) ? weight : "";
		if (startVertex>endVertex) {
			var tmp = startVertex;
			startVertex = endVertex;
			endVertex = tmp;
		}
		this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 
				undirectedGraphCurve, this.directed, weight);
	}
	this.edgeNum++;
	return this.commands;
}

// 删除边
Graph.prototype.delEdge = function() {
	// 传入参数，要删除的边
	var startVertex = arguments[0][0];
	var endVertex = arguments[0][1];
	// 传入参数的合法性判断
	if (startVertex <0 || startVertex >= this.vertexNum) {
		show_message('起始节点输入错误',error);
		return this.commands;
	}
	if (endVertex <0 || endVertex >= this.vertexNum) {
		show_message('终止节点输入错误',error);
		return this.commands;
	}
	// 如果是无向图，需要调整起点和终点
	if (!this.directed && startVertex>endVertex) {
		var tmp = startVertex;
		startVertex = endVertex;
		endVertex = tmp;
	}
	if ( !this.matrix[startVertex][endVertex] ) {
		show_message('该边不存在',error);
		return this.commands;
	}
	
	this.cmd("SetHighlight", startVertex, true) ;
	this.cmd("SetHighlight", endVertex, true) ;
	this.cmd("Step") ;
	this.cmd("SetHighlight", startVertex, false) ;
	this.cmd("SetHighlight", endVertex, false) ;
	this.cmd("Step") ;
	// 有向图
	if (this.directed) {
		this.cmd("Disconnect", startVertex, endVertex);
		this.matrix[startVertex][endVertex] = 0;
		if (this.matrix[endVertex][startVertex] ) {
			var label = (showEdgeWeight.checked) ? this.matrix[endVertex][startVertex] : "";
			this.cmd("Disconnect", endVertex, startVertex );
			this.cmd("Connect", endVertex, startVertex, this.foregroundColor, 
					directedGraphCurveWithSingleEdge, this.directed, label);
		}
	}
	else {
		this.cmd("Disconnect", startVertex, endVertex);
		this.matrix[startVertex][endVertex] = 0;
		this.matrix[endVertex][startVertex] = 0;
	}
	this.edgeNum--;
	return this.commands;
}

// firstEdge, nextEdge
Graph.prototype.firstEdge = function (vertex) {
	for(var i=0; i< this.vertexNum; i++) {
		if ( this.matrix[vertex][i] ) {
			var edge = new GraphEdge(vertex,i,this.matrix[vertex][i]);
			return edge;
		}
	}
	return null;	// 该顶点没有邻边
}
// 输入一条边，输出同起点的下一条边
Graph.prototype.nextEdge = function (edge) {
	for (var i = edge.endVertex + 1; i<this.vertexNum; i++) {
		if( this.matrix[edge.startVertex][i] ) {
			edge.endVertex = i;
			edge.weight = this.matrix[edge.startVertex][i];
			return edge;
		}
	}
	return null;	// 没有nextEdge
}

// Floyd 算法
Graph.prototype.Floyd = function() {
	this.cmd("CreateLabel", 99999 , '纵轴为起始点,横轴为终点,各个顶点最短路径如下:',this.hintStartX+60,this.hintStartY-20);
	this.INF = 10000;
	this.clearHintArea();
	this.dist = new Array(this.vertexNum);
	for (var i=0; i<this.vertexNum; i++) {
		this.dist[i] = new Array(this.vertexNum);
	}
	for (var i=0; i<this.vertexNum; i++) {
		for (j=0; j<this.vertexNum; j++) {
			this.dist[i][j] = this.matrix[i][j];
			if (this.matrix[i][j] == 0) {
				this.dist[i][j] = this.INF;
			}
		}
	}
	// create table
	this.table = new Array(this.vertexNum);
	for (var i=0; i<this.vertexNum; i++) {
		this.table[i] = new Array(this.vertexNum);
	}
	this.objectID = 100;
	for (var i=0; i<this.vertexNum; i++) {
		for (var j=0; j<this.vertexNum; j++) {
			var label = this.dist[i][j];
			if (label >= this.INF)
				label = 'INF';
			this.table[i][j] = new Node(this.objectID++, label, this.tableStartX+i*this.tableWidth, this.tableStartY+j*this.tableHeight);
			this.cmd('CreateRectangle', this.table[i][j].objectID, label, this.tableWidth, this.tableHeight,
				'left', 'top', this.table[i][j].x, this.table[i][j].y);
			this.cmd('SetForegroundColor', this.table[i][j].objectID, this.foregroundColor);
			this.cmd('SetBackgroundColor', this.table[i][j].objectID, this.backgroundColor);
		}
	}
	// set table Row and Column
	this.header = new Node(this.objectID++, '', this.tableStartX-this.tableWidth, this.tableStartY-this.tableHeight);
	this.cmd('CreateRectangle', this.header.objectID, this.header.value, this.tableWidth, this.tableHeight,
		'left', 'top', this.header.x, this.header.y);
	this.cmd('SetForegroundColor', this.header.objectID, this.foregroundColor);
	this.cmd('SetBackgroundColor', this.header.objectID, this.backgroundColor);
	this.rowHeader = new Array(this.vertexNum);
	for (var i=0; i<this.vertexNum; i++) {
		this.rowHeader[i] = new Node(this.objectID++, i, this.tableStartX-this.tableWidth, this.tableStartY+i*this.tableHeight);
		this.cmd('CreateRectangle', this.rowHeader[i].objectID, this.rowHeader[i].value, this.tableWidth, this.tableHeight,
			'left', 'top', this.rowHeader[i].x, this.rowHeader[i].y);
		this.cmd('SetForegroundColor', this.rowHeader[i].objectID, this.foregroundColor);
		this.cmd('SetBackgroundColor', this.rowHeader[i].objectID, this.backgroundColor);
	}
	this.columnHeader = new Array(this.vertexNum);
	for (var i=0; i<this.vertexNum; i++) {
		this.columnHeader[i] = new Node(this.objectID++, i, this.tableStartX+i*this.tableWidth, this.tableStartY-this.tableHeight);
		this.cmd('CreateRectangle', this.columnHeader[i].objectID, this.columnHeader[i].value, this.tableWidth, this.tableHeight,
			'left', 'top', this.columnHeader[i].x, this.columnHeader[i].y);
		this.cmd('SetForegroundColor', this.columnHeader[i].objectID, this.foregroundColor);
		this.cmd('SetBackgroundColor', this.columnHeader[i].objectID, this.backgroundColor);
	}

	var highlightCircle1 = new Node(this.objectID++, '', this.position[0][0], this.position[0][1]);
	var highlightCircle2 = new Node(this.objectID++, '', this.position[0][0], this.position[0][1]);
	var highlightCircle3 = new Node(this.objectID++, '', this.position[0][0], this.position[0][1]);
	for (var k=0; k<this.vertexNum; k++) {
		for (var i=0; i<this.vertexNum; i++) {
			for (var j=0; j<this.vertexNum; j++) {
				if (i == j || j == k|| i == k) {
					continue;
				}
				this.cmd('SetBackgroundColor', i, this.backgroundColor);
				this.cmd('SetBackgroundColor', j, this.backgroundColor);
				this.cmd('SetBackgroundColor', k, this.backgroundColor);

				if (this.dist[i][k]+this.dist[k][j] < this.dist[i][j]) {
					show_notice('dist['+i+']['+k+']+dist['+k+']['+j+'] < dist['+i+']['+j+']','info');
					this.dist[i][j] = this.dist[i][k] + this.dist[k][j];
					// change table 
					this.cmd('SetHighlight', this.table[i][k].objectID, true);
					this.cmd('SetHighlight', this.table[k][j].objectID, true);
					this.cmd('Step');
					this.cmd('SetHighlight', this.table[i][j].objectID, true);
					this.cmd('Step');
					//this.table[i][j].value = this.dist[i][j];
					this.cmd('SetLabel', this.table[i][j].objectID, this.dist[i][j]);
					this.cmd('SetHighlight', this.table[i][j].objectID, false);
					this.cmd('Step');
					this.cmd('SetHighlight', this.table[i][k].objectID, false);
					this.cmd('SetHighlight', this.table[k][j].objectID, false);
					this.cmd('Step');
				} else {
					show_notice('dist['+i+']['+k+']+dist['+k+']['+j+'] > dist['+i+']['+j+']','info');
					this.cmd('SetHighlight', this.table[i][k].objectID, true);
					this.cmd('SetHighlight', this.table[k][j].objectID, true);
					this.cmd('Step');
					this.cmd('SetHighlight', this.table[i][k].objectID, false);
					this.cmd('SetHighlight', this.table[k][j].objectID, false);
					this.cmd('Step');
				}

				this.cmd('SetBackgroundColor', i, '#FFFFFF');
				this.cmd('SetBackgroundColor', j, '#FFFFFF');
				this.cmd('SetBackgroundColor', k, '#FFFFFF');
			}
		}
	}
	show_notice('算法执行完成!','success',0);
	return this.commands;
}

var Node = function(objectID, value, x, y) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
}


export function change_graph_style_js(style) {
	var flag = false;
	if(style=='有向图'){
		flag = true;
	}else{
		flag = false;
	}	
	currentGraph.directedGraphSwitch(flag);
}
export function creat_graph_js(node_count) {
	currentGraph.vertexNumSelectChangeCallBack(node_count);
    currentGraph.randomGraphCallBack();
}
export function insert_edge_js(start_node,end_node,weight) {
	currentGraph.addEdgeCallBack(start_node, end_node,weight);
}
export function delete_edge_js(start_node,end_node) {
	currentGraph.delEdgeCallBack(start_node,end_node);
}
export function start_traverse_js() {
	currentGraph.runFloydCallBack();
}