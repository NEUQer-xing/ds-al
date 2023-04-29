// JavaScript Document
/*
**	init()函数
**	GraphEdge类
**	Graph类
*/
// 初始化函数
var currentGraph;
/* chenged */
// 有向图的边画法改变
var directedGraphCurveWithSingleEdge = 0.0;	// 两个顶点之间只有一条边， 此时画直线
var directedGraphCurveWithDoubleEdge = 0.15;	// 两个顶点之间有两条边， 此时画曲线
var undirectedGraphCurve = 0.0;
var initialVertexNum = 6;
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentGraph = new Graph(animationManager, drawing.width, drawing.height);
	currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), initialVertexNum) ;
	
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 5, 100, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 4, 30, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 2, 10, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 1, 12, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [1, 2, 5, false]) ;
	
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [2, 3, 50, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [4, 3, 20, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [3, 5, 10, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [4, 5, 60, false]) ;
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
	// 设置界面
	$(".radio1").attr("checked", "checked");
	$(".runDijNumber").val('0');
	$(".weightDijNumber").val('10');
	// $("#displayWeight").attr("checked", "checked");

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
	this.X0 = 250;		// 分布圆的圆心横坐标
	this.Y0 = 250; 		// 分布圆的圆心纵坐标

	this.hintStartX = 600;
	this.hintStartY = 150;
	this.hintObjectWidth = 60;
	this.hintObjectHeight = 30;
	
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.highlightColor = '#FF0000' ; // 高亮色
}

// 添加边调用函数
addEdgeCallBack = function (startVertex, endVertex, weight) {
	if (isNaN(weight) || weight == null) {
		weight = 10;
	}
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [startVertex, endVertex, weight]) ;
}
// 删除边调用函数
delEdgeCallBack = function (startVertex, endVertex) {
	currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [startVertex, endVertex]) ;
}
// Dijkstra调用函数
runDijkstraCallBack = function(startVertex) {
	startVertex = ( startVertex == null || isNaN(startVertex) ) ? 0: startVertex;
	currentGraph.implementAction(currentGraph.clearHintArea.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.Dijkstra.bind(currentGraph), startVertex);
}
// 产生随机图调用函数
randomGraphCallBack = function() {
	currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
}
// 显示边权重调用函数
showEdgeWeightSwitch = function (show) {
	if (show != null) {
		currentGraph.showEdgeWeight = show;
		currentGraph.implementAction(currentGraph.showEdgeWeightFunc.bind(currentGraph), show);
	}
}
// 有向图和无向图的转换
directedGraphSwitch = function (directed) {
	if (directed != null) {
		// 先清除所有的边
		currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
		currentGraph.directed = directed;
		// 获取随机图
		currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
	}
}
// 顶点数量取值变化调用函数
vertexNumSelectChangeCallBack = function (newVertexNum) {
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
		alert("顶点数量取值范围应为 3-10 !");
	}
}

// var vertexNumSelect;

// var randomGraphButton;
// var startVertexText;
// var endVertexText;
// var edgeWeightText;
// var addEdgeButton;
// var delEdgeButton;

// var DijkstraStartVertexText;
// var runDijkstraButton;

// var showEdgeWeight;
// var directedGraph;
// var undirectedGraph;

// 添加控制按钮
Graph.prototype.addControls = function () {
	addLabelToAlgorithmBar("顶点数量");
	var vertexNumList = [3, 4, 5, 6, 7, 8, 9, 10];
	vertexNumSelect = addSelectToAlgorithmBar(vertexNumList);
	vertexNumSelect.onchange = vertexNumSelectChangeCallBack;
	// 添加初始值
	for (var i=0; i<vertexNumSelect.length; i++) {
		if (vertexNumSelect.options[i].value == initialVertexNum ) {
			vertexNumSelect.options[i].selected = true;
		}
	}

	addLabelToAlgorithmBar("起点");
	startVertexText = addInputToAlgorithmBar("text", "");
	addLabelToAlgorithmBar("终点");
	endVertexText = addInputToAlgorithmBar("text", "");
	addLabelToAlgorithmBar("权重");
	edgeWeightText = addInputToAlgorithmBar("text", "");
	edgeWeightText.value = "10";
	addEdgeButton = addInputToAlgorithmBar("button", "添加边");
	addEdgeButton.onclick = addEdgeCallBack;
	delEdgeButton = addInputToAlgorithmBar("button", "删除边");
	delEdgeButton.onclick = delEdgeCallBack;	
	randomGraphButton = addInputToAlgorithmBar("button", "生成随机图");
	randomGraphButton.onclick = randomGraphCallBack;

	addLabelToAlgorithmBar("Dijkstra起始顶点");
	DijkstraStartVertexText = addInputToAlgorithmBar("text", "0");
	
	runDijkstraButton = addInputToAlgorithmBar("button", "Run Dijkstra");
	runDijkstraButton.onclick = runDijkstraCallBack;

	showEdgeWeight = addCheckboxToAlgorithmBar("显示边权重");
	showEdgeWeight.onclick = showEdgeWeightSwitch;
	showEdgeWeight.checked = true;
	showEdgeWeight.disabled = true;

	var directedGraphList = addRadioButtonGroupToAlgorithmBar(["directed Graph","undirected Graph"],"GraphType");
	directedGraph = directedGraphList[0];
	undirectedGraph = directedGraphList[1];
	directedGraph.onclick = directedGraphSwitch;
	undirectedGraph.onclick = directedGraphSwitch;
	directedGraph.checked = true;
}

// 初始化数组
Graph.prototype.initGraph = function(vertexNum) {
	this.vertexNum = vertexNum ; 	// 顶点的数量
	this.edgeNum = 0;				// 边的数量
	// 对一些图形ID进行初始化	
	// this.highlightRectangleKnownID; // Known 高亮矩形
	// this.highlightRectangleCostID = vecostte Num;
	// this.highlightRectanglePathID = vertpathN um+1;
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

// 是否显示边权重，show为bool类型，表示是否显示权重
Graph.prototype.showEdgeWeightFunc = function(show) {
	//alert("show Edge weight");
	// 有向图
	if (this.directed) {
		// 先删除图上所有的边
		for (var i=0; i< this.vertexNum; i++) {
			for (var j=0; j< this.vertexNum; j++) {
				if (this.matrix[i][j] ) {
					this.cmd("Disconnect", i, j);
				}
			}
		}
		// 重新绘边
		for (var i=0; i<this.vertexNum; i++) {
			for (var j =0; j<this.vertexNum; j++) {
				if(this.matrix[i][j]) {
					var label = show ? this.matrix[i][j] : "";
					var curve = (this.matrix[j][i] ) ? directedGraphCurveWithDoubleEdge : directedGraphCurveWithSingleEdge;
					this.cmd("Connect", i, j, this.foregroundColor, 
							curve, this.directed, label);
				}
			}
		}
	}
	// 无向图
	else {
		// 先删除图上所有的边
		for (var i=0; i< this.vertexNum; i++) {
			for (var j=0; j< i; j++) {
				if (this.matrix[j][i] ) {
					this.cmd("Disconnect", j, i);
				}
			}
		}
		// 重新绘边
		for (var i=0; i<this.vertexNum; i++) {
			for (var j =0; j<i; j++) {
				if(this.matrix[j][i]) {
					var label = show ? this.matrix[i][j] : "";
					this.cmd("Connect", j, i, this.foregroundColor, 
							undirectedGraphCurve, this.directed, label);
				}
			}
		}
	}
	return this.commands;
}
// 清除hint区域
Graph.prototype.clearHintArea = function () {
	if(typeof(this.INF) == 'undefined') {
		// do nothing
		return this.commands;
	}
	// 已经定义this.INF，说明已经运行过Dijkstra算法
	for (var i=0; i<this.vertexNum; i++) {
		this.cmd("Delete", this.hintPathColumnID[i]);
		this.cmd("Delete", this.hintCostColumnID[i]);
		this.cmd("Delete", this.hintKnownColumnID[i]);
		this.cmd("Delete", this.hintVertexColumnID[i]);
	}
	this.cmd("Delete", this.hintPathID);
	this.cmd("Delete", this.hintCostID);
	this.cmd("Delete", this.hintKnownID);
	this.cmd("Delete", this.hintVertexID);
	return this.commands;
}
// 清除图的所有边
Graph.prototype.clearAllEdges = function () {
	//alert("clearAllEdges");
	// 有向图
	//alert(this.directed);
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
					//alert("disconnected"+" "+j +" "+i);
					this.matrix[i][j] =0;
					this.matrix[j][i] =0;
				}
			}
		}
	}
	this.edgeNum =0;
	return this.commands;
}

/* changed */ 
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
					//alert(i +" "+j +":"+this.matrix[i][j] );
					// 决定是否添加边
					if (getRandomNumber(0,1) ) {
						//alert(i+ " " +j +" "+ rand);
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
		alert("start Vertex illeagl");
		return this.commands;
	}
	if (endVertex <0 || endVertex >= this.vertexNum) {
		alert("end Vertex illeagl");
		return this.commands;
	}
	if(weight <=0 ) {
		alert("weight illeagl");
		return this.commands;
	}
	// 判断这条边是否已经存在
	if (this.directed) {
		if (this.matrix[startVertex][endVertex] ) {
			alert("this edge already exists");
			return this.commands;
		}
	}
	else {
		if (this.matrix[startVertex][endVertex] || this.matrix[endVertex][startVertex]) {
			alert("this edge already exists");
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
	startVertex = arguments[0][0];
	endVertex = arguments[0][1];
	// 传入参数的合法性判断
	if (startVertex <0 || startVertex >= this.vertexNum) {
		alert("start Vertex illeagl.");
		return this.commands;
	}
	if (endVertex <0 || endVertex >= this.vertexNum) {
		alert("end Vertex illeagl.");
		return this.commands;
	}
	// 如果是无向图，需要调整起点和终点
	if (!this.directed && startVertex>endVertex) {
		var tmp = startVertex;
		startVertex = endVertex;
		endVertex = tmp;
	}
	if ( !this.matrix[startVertex][endVertex] ) {
		alert("this edge do not exists.");
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

// Dijkstra算法
Graph.prototype.Dijkstra = function (startVertex) {
	// 把高亮顶点取消
	for (var i=0; i<this.vertexNum; i++) {
		this.cmd("SetForegroundColor", i, this.foregroundColor);
	}
	// 先假设是有向图
	this.INF = 10000;
	// 源点到i的最短距离
	var dist = new Array(this.vertexNum);
	// 是否找到到i 的最短路径
	var found = new Array( this.vertexNum );
	// 记录路径
	var path = new Array(this.vertexNum);
	// 记录完全路径
	var fullPath = new Array(this.vertexNum);
	for (var i=0; i< this.vertexNum; i++) {
		fullPath[i] = new Array();
	}
	// 一些初始化
	for (var i=0; i< this.vertexNum; i++) {
		if (this.matrix[startVertex][i]) {
			dist[i] = this.matrix[startVertex][i];
		}
		else {
			dist[i] = this.INF;
		}
		found[i] = -1;	// -1表示没有找到
		path[i] = startVertex;	// 经由startVertex到达
	}
	dist[startVertex] = 0;
	found[startVertex] = 1;
	this.cmd("SetForegroundColor", startVertex, this.highlightColor);
	fullPath[startVertex].push(startVertex);
	//path[startVertex] = startVertex;
	// hint显示当前内容
	// vertex
	this.cmd("CreateRectangle", this.hintVertexID, 'Vertex', this.hintObjectWidth, this.hintObjectHeight, 
			'left', 'top', this.hintStartX, this.hintStartY - this.hintObjectHeight);
	this.cmd("SetForegroundColor", this.hintVertexID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.hintVertexID, this.backgroundColor);
	// Known
	this.cmd("CreateRectangle", this.hintKnownID, 'Known', this.hintObjectWidth, this.hintObjectHeight, 
			'left', 'top', this.hintStartX+this.hintObjectWidth, this.hintStartY - this.hintObjectHeight);
	this.cmd("SetForegroundColor", this.hintKnownID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.hintKnownID, this.backgroundColor);
	// Cost
	this.cmd("CreateRectangle", this.hintCostID, 'Cost', this.hintObjectWidth, this.hintObjectHeight, 
			'left', 'top', this.hintStartX + 2*this.hintObjectWidth, this.hintStartY - this.hintObjectHeight);
	this.cmd("SetForegroundColor", this.hintCostID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.hintCostID, this.backgroundColor);
	// Path
	this.cmd("CreateRectangle", this.hintPathID, 'Path', 2*this.hintObjectWidth, this.hintObjectHeight, 
			'left', 'top', this.hintStartX + 3*this.hintObjectWidth, this.hintStartY - this.hintObjectHeight);
	this.cmd("SetForegroundColor", this.hintPathID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.hintPathID, this.backgroundColor);
	// vertex
	for (var i=0; i< this.vertexNum; i++) {
		this.cmd("CreateRectangle", this.hintVertexColumnID[i], i, this.hintObjectWidth, this.hintObjectHeight,
				'left', 'top', this.hintStartX, this.hintStartY + i*this.hintObjectHeight);
		this.cmd("SetForegroundColor", this.hintVertexColumnID[i], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.hintVertexColumnID[i], this.backgroundColor);
	}
	// known
	for (var i=0; i< this.vertexNum; i++) {
		var label = (found[i] == 1) ? 'True' : 'False';
		this.cmd("CreateRectangle", this.hintKnownColumnID[i], label, this.hintObjectWidth, this.hintObjectHeight,
				'left', 'top', this.hintStartX + this.hintObjectWidth, this.hintStartY + i*this.hintObjectHeight);
		this.cmd("SetForegroundColor", this.hintKnownColumnID[i], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.hintKnownColumnID[i], this.backgroundColor);
	}
	// cost
	for (var i=0; i< this.vertexNum; i++) {
		var label = (dist[i] == this.INF) ? 'INF' : dist[i];
		this.cmd("CreateRectangle", this.hintCostColumnID[i], label, this.hintObjectWidth, this.hintObjectHeight,
				'left', 'top', this.hintStartX + 2*this.hintObjectWidth, this.hintStartY + i*this.hintObjectHeight);
		this.cmd("SetForegroundColor", this.hintCostColumnID[i], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.hintCostColumnID[i], this.backgroundColor);
	}
	// Path
	for (var i=0; i< this.vertexNum; i++) {
		var label = '';
		this.cmd("CreateRectangle", this.hintPathColumnID[i], label, 2*this.hintObjectWidth, this.hintObjectHeight,
				'left', 'top', this.hintStartX + 3*this.hintObjectWidth, this.hintStartY + i*this.hintObjectHeight);
		this.cmd("SetForegroundColor", this.hintPathColumnID[i], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.hintPathColumnID[i], this.backgroundColor);
	}

	this.cmd("SetState", "把起始顶点 "+startVertex+" 到自身的代价设为0");
	this.cmd("SetHighlight", startVertex, true);
	this.cmd("Step");
	this.cmd("SetHighlight", startVertex, false);
	this.cmd("Step");
	
	// 向起点添加路径
	this.cmd("CreateHighlightRectangle", this.highlightRectangleKnownID, 
			this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
			this.hintStartX+this.hintObjectWidth, this.hintStartY+startVertex*this.hintObjectHeight);
	this.cmd("SetForegroundColor", this.highlightRectangleKnownID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.highlightRectangleKnownID, this.backgroundColor);
	this.cmd("Step");
	this.cmd("CreateHighlightRectangle", this.highlightRectanglePathID, 
			2*this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
			this.hintStartX+3*this.hintObjectWidth, this.hintStartY+startVertex*(this.hintObjectHeight) );
	this.cmd("SetForegroundColor", this.highlightRectanglePathID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.highlightRectanglePathID, this.backgroundColor);
	this.cmd("Step");
	this.cmd("SetLabel", this.hintPathColumnID[startVertex], fullPath[startVertex][0]);
	this.cmd("Step");
	this.cmd("Delete", this.highlightRectanglePathID);
	this.cmd("Delete", this.highlightRectangleKnownID);

	for (var i=1; i< this.vertexNum; i++ ) {
		var min = this.INF;
		var vertex = -1;
		for (var j=0; j< dist.length; j++) {
			if ( found[j] == -1 && dist[j] < min) {
				min = dist[j];
				vertex = j;
			}
		}
		// 找不到有效且最小的边
		if (vertex == -1) {		// 中指
			break;
		}
		// 找到了合适的边
		found[vertex] = 1;
		this.cmd("SetState", "找到到达顶点 "+vertex+" 的最短路径,代价是 "+min);
		// 由path推算出完全路径
		fullPath[vertex].push(vertex);
		for (var i=fullPath[path[vertex]].length-1; i>=0; i--) {
			fullPath[vertex].unshift(fullPath[path[vertex]][i]);
		}
		// 高亮显示最小的cost
		this.cmd("CreateHighlightRectangle", this.highlightRectangleCostID, 
				this.hintObjectWidth, this.hintObjectHeight, 'left', 'top', 
				this.hintStartX + 2*this.hintObjectWidth, this.hintStartY + vertex * this.hintObjectHeight);
		this.cmd("SetForegroundColor", this.highlightRectangleCostID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.highlightRectangleCostID, this.backgroundColor);
		this.cmd("Step");
		this.cmd("SetForegroundColor", vertex, this.highlightColor);
		// 将vertex的Known修改
		this.cmd("CreateHighlightRectangle", this.highlightRectangleKnownID, 
				this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
				this.hintStartX + this.hintObjectWidth, this.hintStartY + vertex * this.hintObjectHeight);
		this.cmd("SetForegroundColor", this.highlightRectangleKnownID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.highlightRectangleKnownID, this.backgroundColor);
		this.cmd("SetLabel", this.hintKnownColumnID[vertex], 'True');
		// this.cmd("SetForegroundColor", this.hintKnownColumnID[vertex], this.highlightColor);
		this.cmd("Step");
		// 高亮显示Path，并更新
		this.cmd("CreateHighlightRectangle", this.highlightRectanglePathID, 
				2*this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
				this.hintStartX + 3*this.hintObjectWidth, this.hintStartY + vertex*this.hintObjectHeight);
		this.cmd("SetForegroundColor", this.highlightRectanglePathID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.highlightRectanglePathID, this.backgroundColor);
		this.cmd("Step");
		var labelPath ="";
		for (var i=0; i<fullPath[vertex].length; i++) {
			labelPath = labelPath + fullPath[vertex][i] + " ";
		}
		this.cmd("SetLabel", this.hintPathColumnID[vertex], labelPath);
		this.cmd("Step");
		// 删除掉两个高亮圆
		// this.cmd("Delete", this.highlightRectangleKnownID);
		this.cmd("Delete", this.highlightRectangleCostID);
		this.cmd("Delete", this.highlightRectanglePathID);
		this.cmd("Step");

		this.cmd("SetHighlight", vertex, true);
		this.cmd("Step");
		this.cmd("SetHighlight", vertex, false);
		this.cmd("Step");
		for (var edge = this.firstEdge(vertex); edge!=null ; edge = this.nextEdge(edge) ) {
			
			this.cmd("SetHighlight", edge.startVertex, true);
			this.cmd("Step");
			this.cmd("SetHighlight", edge.startVertex, false);
			this.cmd("Step");
			var lineSt = edge.startVertex;
			var lineEn = edge.endVertex;
			if (!this.directed && lineSt>lineEn) {
				var tmp = lineEn;
				lineEn = lineSt;
				lineSt = tmp;
			}
			this.cmd("SetLineHighlight", lineSt, lineEn, true);
			this.cmd("Step");
			this.cmd("SetLineHighlight", lineSt, lineEn, false);
			this.cmd("Step");
			if (found[edge.endVertex] == -1 && dist[vertex]+ edge.weight < dist[edge.endVertex]) {
				this.cmd("SetState", "更新从顶点"+startVertex+" 到 "+edge.endVertex+" 的最短路径为"+
						startVertex+".->"+vertex+"->"+edge.endVertex);
				this.cmd("Step");
				dist[edge.endVertex] = dist[vertex]+ edge.weight;
				// 高亮显示dist更新
				// this.cmd("CreateHighlightRectangle", this.highlightRectangleCostID, 
				// 		this.hintObjectWidth, this.hintObjectHeight, 'left', 'top', 
				// 		this.hintStartX + 2* this.hintObjectWidth, this.hintStartY + edge.endVertex * this.hintObjectHeight);
				// this.cmd("SetForegroundColor", this.highlightRectangleCostID, this.foregroundColor);
				// this.cmd("SetBackgroundColor", this.highlightRectangleCostID, this.backgroundColor);
				// this.cmd("Step");
				// this.cmd("SetLabel", this.hintCostColumnID[edge.endVertex], dist[edge.endVertex]);
				// this.cmd("Step");
				// this.cmd("Delete", this.highlightRectangleCostID);

				path[edge.endVertex] = vertex;
			} else {
				this.cmd("SetState", "顶点"+startVertex+" 到 "+edge.endVertex+" 的路径不用更新");
				this.cmd("Step");
			}
			// 找到一个最短路径的顶点后，更新cost
			this.cmd("CreateHighlightRectangle", this.highlightRectangleCostID, 
					this.hintObjectWidth, this.hintObjectHeight, 'left', 'top', 
					this.hintStartX + 2* this.hintObjectWidth, this.hintStartY + edge.endVertex * this.hintObjectHeight);
			this.cmd("SetForegroundColor", this.highlightRectangleCostID, this.foregroundColor);
			this.cmd("SetBackgroundColor", this.highlightRectangleCostID, this.backgroundColor);
			this.cmd("Step");
			this.cmd("SetLabel", this.hintCostColumnID[edge.endVertex], dist[edge.endVertex]);
			this.cmd("Step");
			this.cmd("Delete", this.highlightRectangleCostID);
		}
		// 更新完成，删除known high light circle ID
		this.cmd("Delete", this.highlightRectangleKnownID);
		this.cmd("Step");
	}

	// 处理剩余的找不到路径的顶点，其路径设置为NO PATH
	for (var i=0; i< this.vertexNum; i++) {
		if ( found[i] == -1 && dist[i] == this.INF) {
			// hint区域高亮这个顶点，然后修改路径label
			this.cmd("SetState", "没有找到从 "+startVertex+" 到 "+i+" 的路径，其路径设置为NO PATH");
			this.cmd("Step");
			this.cmd("CreateHighlightRectangle", this.highlightRectangleKnownID,
					this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
					this.hintStartX + this.hintObjectWidth, this.hintStartY + i*(this.hintObjectHeight));
			this.cmd("SetForegroundColor", this.highlightRectangleKnownID, this.foregroundColor);
			this.cmd("SetBackgroundColor", this.highlightRectangleKnownID, this.backgroundColor);
			this.cmd("CreateHighlightRectangle", this.highlightRectangleCostID, 
					this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
					this.hintStartX+2*this.hintObjectWidth, this.hintStartY+i*this.hintObjectHeight);
			this.cmd("SetForegroundColor", this.highlightRectangleCostID, this.foregroundColor);
			this.cmd("SetBackgroundColor", this.highlightRectangleCostID, this.backgroundColor);
			this.cmd("CreateHighlightRectangle", this.highlightRectanglePathID,
					2*this.hintObjectWidth, this.hintObjectHeight, 'left', 'top',
					this.hintStartX + 3*this.hintObjectWidth, this.hintObjectHeight+i*this.hintObjectHeight);
			this.cmd("SetForegroundColor", this.highlightRectanglePathID, this.foregroundColor);
			this.cmd("SetBackgroundColor", this.highlightRectanglePathID, this.backgroundColor);
			this.cmd("Step");
			this.cmd("SetLabel", this.hintPathColumnID[i], 'NO PATH');
			this.cmd("Setp");
			this.cmd("Delete", this.highlightRectanglePathID);
			this.cmd("Delete", this.highlightRectangleCostID);
			this.cmd("Delete", this.highlightRectangleKnownID);
			this.cmd("Step");
		}
	}
	this.cmd("SetState", "算法执行完成，结果见下表");
	return this.commands;
}
