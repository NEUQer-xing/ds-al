// JavaScript Document
/*
**	init()函数
**	GraphEdge类
**	Graph类
*/
// 初始化函数
var currentGraph;
// 有向图的边画法改变
var directedGraphCurveWithSingleEdge = 0.0;		// 两个顶点之间只有一条边， 此时画直线
var directedGraphCurveWithDoubleEdge = 0.15;	// 两个顶点之间有两条边， 此时画曲线
var undirectedGraphCurve = 0.0;
var initialVertexNum = 6;
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentGraph = new Graph(animationManager, drawing.width, drawing.height);
	currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), initialVertexNum) ;

	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 3, 5, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 2, 1, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 1, 6, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [2, 3, 5, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [1, 2, 5, false]) ;

	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [1, 4, 3, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [2, 4, 6, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [4, 5, 6, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [3, 5, 2, false]) ;
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [2, 5, 4, false]) ;
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
	this.directed = false;		// 是否是有向图
	this.showEdgeWeight = true;	// 是否显示边权重
	$(".runPrimNumber").val('0');
	$(".weightPrimNumber").val('10');
	// 图形部分
	this.objectID = 0 ; // 图形的序号
	this.highlightCircleID ;	// 突出显示已经位于树中的顶点
	this.MSTSetCircleID;	// hint区域圆ID
	this.setID;	// set, 0:label U, 1:rect U, 2:label U-V, 3:rect U-V
	this.hintStartX = 600;
	this.hintStartY = 50;
	this.hintWidth = 150;
	this.hintInterval = 4;

	this.radius = 26;	// 顶点圆的半径
	// 顶点位置的确定
	this.R = 150;		// 所有顶点分布在该圆上
	this.X0 = 250;		// 分布圆的圆心横坐标
	this.Y0 = 250; 		// 分布圆的圆心纵坐标
	
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.highlightColor = '#FF0000' ; //高亮颜色
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
// Prim遍历调用函数
runPrimCallBack = function(startVertex) {
	startVertex = ( startVertex == null || isNaN(startVertex) ) ? 0: startVertex;
	currentGraph.implementAction(currentGraph.clearHintArea.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.Prim.bind(currentGraph), startVertex);
}
// 产生随机图调用函数
randomGraphCallBack = function() {
	// 若得到的图不是连通图，then again
	do {
		currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
		currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
	} while (!currentGraph.isAllConnected());
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
	if (!isNaN(parseInt(newVertexNum)) && parseInt(newVertexNum) >=3 && parseInt(newVertexNum) <=10) {
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

// var PrimStartVertexText;
// var runPrimButton;

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

	addLabelToAlgorithmBar("Prim起始顶点");
	PrimStartVertexText = addInputToAlgorithmBar("text", "0");
	
	runPrimButton = addInputToAlgorithmBar("button", "Run Prim");
	runPrimButton.onclick = runPrimCallBack;

	showEdgeWeight = addCheckboxToAlgorithmBar("显示边权重");
	showEdgeWeight.onclick = showEdgeWeightSwitch;
	showEdgeWeight.checked = true;
	showEdgeWeight.disabled = true;

	var directedGraphList = addRadioButtonGroupToAlgorithmBar(["directed Graph","undirected Graph"],"GraphType");
	directedGraph = directedGraphList[0];
	undirectedGraph = directedGraphList[1];
	directedGraph.onclick = directedGraphSwitch;
	undirectedGraph.onclick = directedGraphSwitch;
	undirectedGraph.checked = true;
	directedGraph.disabled = true;
	undirectedGraph.disabled = true;
}

// 初始化数组
Graph.prototype.initGraph = function(vertexNum) {
	this.vertexNum = vertexNum ; 	// 顶点的数量
	// set, 0:label U, 1:rect U, 2:label U-V, 3:rect U-V
	var setNum = 4;
	this.setID = new Array(setNum);
	for (var i=0; i<setNum; i++) {
		this.setID[i] = this.vertexNum + i;
	}

	// 存储高亮连线
	this.highlightConnectArray = new Array();
	this.highlightCircleID = new Array(vertexNum);
	this.MSTSetCircleID = new Array(vertexNum);
	// 高亮圆和右边的hint区域
	for (var i=0; i<vertexNum; i++) {
		this.highlightCircleID[i] = 2 * this.vertexNum + i+setNum;
		this.MSTSetCircleID[i] = this.vertexNum +i+setNum;
	}
	
	this.edgeNum = 0;				// 边的数量
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
	
	for(var i=0 ; i<this.vertexNum ; i++) {
		//this.graphObjectID[i] = -1 ;
		this.cmd("CreateCircle", this.objectID, this.objectID,
				 this.position[this.objectID][0], this.position[this.objectID][1], this.radius);
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.objectID, '#FFFFFF') ;
		this.objectID ++ ;
	}
	// 建立表示集合的两个大矩形
	// label * 2
	this.cmd("CreateLabel", this.setID[0], "U", this.hintStartX, this.hintStartY-30);
	this.cmd("SetForegroundColor", this.setID[0], this.foregroundColor);
	this.cmd("SetBackgroundColor", this.setID[0], this.backgroundColor);
	this.cmd("CreateLabel", this.setID[2], "U-V", this.hintStartX+this.hintWidth, this.hintStartY-30);
	this.cmd("SetForegroundColor", this.setID[2], this.foregroundColor);
	this.cmd("SetBackgroundColor", this.setID[2], this.backgroundColor);
	// rect * 2
	this.cmd("CreateRectangle", this.setID[1], "", 50, this.vertexNum*(2*this.radius+this.hintInterval),
				"center", "top", this.hintStartX, this.hintStartY-20);
	this.cmd("SetForegroundColor", this.setID[1], this.foregroundColor);
	this.cmd("SetBackgroundColor", this.setID[1], this.backgroundColor);
	this.cmd("CreateRectangle", this.setID[3], "", 50, this.vertexNum*(2*this.radius+this.hintInterval),
				"center", "top", this.hintStartX+this.hintWidth, this.hintStartY-20);
	this.cmd("SetForegroundColor", this.setID[3], this.foregroundColor);
	this.cmd("SetBackgroundColor", this.setID[3], this.backgroundColor);

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
					this.cmd("Disconnect", j, i );
					this.matrix[i][j] =0;
					this.matrix[j][i] =0;
				}
			}
		}
	}
	this.edgeNum = 0;
	return this.commands;
}

// 产生随机图
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
			for (var j=0; j < this.vertexNum; j++) {
				if (i != j ) {
					//alert(i +" "+j +":"+this.matrix[i][j] );
					// 决定是否添加边
					if (getRandomNumber(0,1) ) {
						this.addEdge( [i , j, getRandomNumber(1,100), false] );
					}
				}
			}
		}
	}
	//alert(this.matrix);
	return this.commands;
}

// 添加边
Graph.prototype.addEdge = function() {
	// 传入参数，起点，终点，权重, 是否需要动画
	var startVertex =  arguments[0][0];
	var endVertex =  arguments[0][1];
	var weight =  arguments[0][2];	
	var withAnimation = (arguments[0].length > 3) ? arguments[0][3] : true;	// bool

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
	//this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);

	// 有向图
	if (this.directed) {
		this.matrix[startVertex][endVertex] = weight;
		var label1 = (this.showEdgeWeight) ? this.matrix[startVertex][endVertex] : "";
		var label2 = (this.showEdgeWeight) ? this.matrix[endVertex][startVertex] : "";
		// 对于有向图，需要先判断是否已经存在反向的连线
		if (this.matrix[endVertex][startVertex] ) {
			this.cmd("Disconnect", endVertex, startVertex );
			this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 
				directedGraphCurveWithDoubleEdge, this.directed, label1 );
			this.cmd("Connect", endVertex, startVertex, this.foregroundColor, 
				directedGraphCurveWithDoubleEdge, this.directed, label2 );
		}
		else {
			this.cmd("Connect", startVertex, endVertex, this.foregroundColor, directedGraphCurveWithSingleEdge, this.directed, label1);
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
			undirectedGraphCurve, this.directed, label);
	}
	/* changed */
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
	//this.cmd("Disconnect", startVertex, endVertex);
	// 有向图
	if (this.directed) {
		this.cmd("Disconnect", startVertex, endVertex);
		this.matrix[startVertex][endVertex] = 0;
		if (this.matrix[endVertex][startVertex] ) {
			var label = (this.showEdgeWeight) ? this.matrix[endVertex][startVertex] : "";
			this.cmd("Disconnect", endVertex, startVertex );
			this.cmd("Connect", endVertex, startVertex, this.foregroundColor, 
					directedGraphCurveWithSingleEdge, this.directed, label);
		}
	}
	else {
		//alert(startVertex+" "+endVertex);
		this.cmd("Disconnect", startVertex, endVertex);
		this.matrix[startVertex][endVertex] = 0;
		this.matrix[endVertex][startVertex] = 0;
	}
	this.edgeNum --;
	return this.commands;
}
// 对connect连线设置高亮, highlight -- bool
Graph.prototype.setConnectLineHighlight = function (startVertex, endVertex, highlight) {
	this.cmd("Disconnect", startVertex, endVertex);
	if (this.showEdgeWeight && !this.directed) {
		var curve  =0.0;
		var label = this.matrix[startVertex][endVertex];
		if (highlight) {
			this.cmd("Connect", startVertex, endVertex, this.highlightColor, curve, false, label);
			//this.highlightConnectArray.push([startVertex, endVertex]);
		}
		else {
			this.cmd("Connect", startVertex, endVertex, this.foregroundColor, curve, false, label);
		}
	}
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

// DFS
Graph.prototype.DFS = function(vertex) {
	this.visited[vertex] = true;
	//alert("DFS:"+vertex);
	for (var edge = this.firstEdge(vertex); ; edge = this.nextEdge(edge)) {
		if( edge == null ) {		// edge 不是边, 退出
			return null;
		}
		if( !this.visited[edge.endVertex] ) {
			this.DFS(edge.endVertex);
		}
	}	
}
//
Graph.prototype.clearHighlightCircle = function () {
	for (var i=0; i< this.highlightCircleID.length; i++) {
		// 如何判断某一个高亮圆是否create
		try{
			this.cmd("Delete", this.highlightCircleID[i]);
		}
		catch(error) {
			// do nothing
		}
	}
	return this.commands;
}
// 
Graph.prototype.clearHintArea = function () {
	if (typeof(this.addNew) == 'undefined') {
		return this.commands;
	}
	for (var i=0; i< this.vertexNum; i++) {
		if (this.addNew[i] == -1){
			try {
					this.cmd("Delete", this.MSTSetCircleID[i]);
				}
				catch(error)  {
					// do nothing
				}
		}
	}
	return this.commands;
}


// 判断图是否连通
Graph.prototype.isAllConnected = function () {
	this.visited = new Array(this.vertexNum);
	for (var i=0; i <this.vertexNum; i++ ) {
		this.visited[i] = false;
	}
	this.DFS(0);
	// 判断是否所有的顶点已经访问
	for (var i=0; i<this.vertexNum; i++) {
		if ( !this.visited[i] ) {
			return false;
		}
	}
	// 释放无用垃圾
	this.visited = null;
	return true;
}
// Prim算法
Graph.prototype.Prim = function (startVertex) {
	// 先判断是否是连通图，不是的话停止算法执行
	if ( !this.isAllConnected() ) {
		// alert("This graph is not a connected graph, algorithm cannot run. Please add some edges or get a new graph to retry the algorithm. ");
		this.cmd("SetState", "该图不是连通图，算法停止执行");
		return this.commands;
	}
	// 检查边顶点是否高亮，
	for (var i=0; i<this.vertexNum; i++) {
		this.cmd("SetForegroundColor", i, this.foregroundColor);
	}
	// 检查是否有高亮显示的边，有的话删除掉
	while (this.highlightConnectArray.length ) {
		var line = this.highlightConnectArray.pop();
		var startV = line[0];
		var endV = line[1];
		this.setConnectLineHighlight(startV, endV, false);
	}

	this.cmd("SetState", "将所有的顶点加到集合 U 中");
	var inSetCount = 0;	// MST集合计数器
	var outSetCount = this.vertexNum;	// not in MST集合计数器
	// 展现所有的not In MST集合顶点
	for (var i=0; i< this.vertexNum; i++) {
		this.cmd("CreateCircle", this.MSTSetCircleID[i], i, this.hintStartX, this.hintStartY + i * (this.hintInterval+ 2 * this.radius), this.radius-8);
		this.cmd("SetForegroundColor", this.MSTSetCircleID[i], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.MSTSetCircleID[i], this.backgroundColor);
		//this.cmd("Step");
	}
	this.cmd("Step");
	this.cmd("SetState", "将算法起始顶点<"+startVertex+">加到集合 U-V 中");
	// 将起点加入到MST集合
	this.cmd("Move", this.MSTSetCircleID[startVertex],
			this.hintStartX + this.hintWidth, this.hintStartY + inSetCount*(this.hintInterval + 2 * this.radius));
	this.cmd("SetForegroundColor", this.MSTSetCircleID[startVertex], this.highlightColor);
	this.cmd("Step");
	inSetCount++;
	outSetCount--;
	var INF = 10000;	// 最大值
	// 存储最小生成树的边
	var edges = new Array();
	var lowCost = new Array(this.vertexNum );
	// addNew[v] = -1, 表示v已经添加到生成树中
	this.addNew = new Array(this.vertexNum );
	// 一些初始化
	for (var i=0; i<this.vertexNum; i++) {
		this.addNew[i] = startVertex;	// 没有加入集合
		if (this.matrix[startVertex][i] ) {
			lowCost[i] = this.matrix[startVertex][i];
		}
		else {
			lowCost[i] = INF;
		}
	}
	
	this.addNew[startVertex] = -1;	// 把prim起点加入集合
	// this.cmd("CreateHighlightCircle", this.highlightCircleID[startVertex], 
	// 		this.position[startVertex][0], this.position[startVertex][1], this.radius);
	this.cmd("SetForegroundColor", startVertex, this.highlightColor);
	this.cmd("Step");
	this.cmd("Step");
	
	for (var i=1; i<this.vertexNum; i++) {
		var min = INF ;
		var v = -1;
		for (var j=0; j< this.vertexNum; j++) { 
			if (this.addNew[j] > -1 && lowCost[j] != INF) {
				var fromV =j
				var toV = this.addNew[j];
				this.cmd("Connect", this.MSTSetCircleID[fromV], this.MSTSetCircleID[toV], 
						this.foregroundColor, 0.0, false, this.matrix[fromV][toV]);
				
				var tmp;
				(fromV > toV ) ? (tmp = fromV, fromV = toV, toV = tmp) : (true);
				this.cmd("SetLineHighlight", fromV, toV, true);
				this.cmd("Step");
				// this.cmd("Step");
				this.cmd("SetLineHighlight", fromV, toV, false);
				this.cmd("Step");
				// this.cmd("Step");
			}
			if (this.addNew[j] > -1 && lowCost[j] < min ) {
				min = lowCost[j];
				v = j;
			}
		}
		if (v != -1 ) {
			// 找到生成树的一条边
			if (this.addNew[v] < v ) {
				var tmpEdge = new GraphEdge(this.addNew[v], v, this.matrix[this.addNew[v]][v] );
			}
			else {
				var tmpEdge = new GraphEdge(v, this.addNew[v], this.matrix[this.addNew[v]][v] );
			}
			// hint区域高亮显示最短路径
			this.cmd("SetLineHighlight", this.MSTSetCircleID[v], this.MSTSetCircleID[this.addNew[v]],
					 this.highlightColor);
			this.cmd("Step");
			// 对hint区域高亮
			this.cmd("SetForegroundColor", this.MSTSetCircleID[v], this.highlightColor);

			this.cmd("SetLineHighlight", tmpEdge.startVertex, tmpEdge.endVertex, true );
			this.cmd("Step");
			this.cmd("SetLineHighlight", tmpEdge.startVertex, tmpEdge.endVertex, false);
			this.cmd("Step");
			// 设置高亮显示连线
			this.setConnectLineHighlight(tmpEdge.startVertex, tmpEdge.endVertex, true);
			this.highlightConnectArray.push([tmpEdge.startVertex, tmpEdge.endVertex]);

			edges.push(tmpEdge);
			var tmp = this.addNew[v];
			this.addNew[v] = -1;		// 将v点添加到生成树中
			var e = "<"+tmp+","+v+">";
			this.cmd("SetState", "找到权重最小的边"+e+",将点<"+v+">添加到集合 U-V 中");
			// hint区域非最短路径disconnect
			for (var j=0; j<this.vertexNum; j++) {
				if (this.addNew[j] > -1 && lowCost[j] != INF) {
					var fromV = j;
					var toV =  this.addNew[j];
					//(j > this.addNew[j]) ? (fromV = this.addNew[j], toV = j) : (fromV = j, toV = this.addNew[j] );
					this.cmd("Disconnect", this.MSTSetCircleID[fromV], this.MSTSetCircleID[toV]);
				}
			}
			{	
				this.cmd("Move", this.MSTSetCircleID[v], 
						this.hintStartX+this.hintWidth, this.hintStartY + inSetCount * (this.hintInterval + 2 * this.radius));
				this.cmd("Step");
				this.cmd("Step");
				inSetCount++;
				outSetCount--;

				var fromV = v;
				var toV = tmp;
				// hint区域最短路径的disconnect
				this.cmd("Disconnect", this.MSTSetCircleID[fromV], this.MSTSetCircleID[toV]);
				this.cmd("Step");
			}
			// 加顶点，高亮
			// this.cmd("CreateHighlightCircle", this.highlightCircleID[v], 
			// 		this.position[v][0], this.position[v][1], this.radius);
			this.cmd("SetForegroundColor", v, this.highlightColor);
			this.cmd("Step");
			this.cmd("Step");

			for (var edge = this.firstEdge(v); ; edge = this.nextEdge(edge) ) {
				if (edge == null ) {
					break;
				}
				var u = edge.endVertex;
				if ( this.addNew[u] != -1 && lowCost[u] > edge.weight ) {
					this.addNew[u] = v;
					lowCost[u] = edge.weight;
				}
			}
		}
	}
	var edgesStr = "";
	for (var i=0; i<edges.length; i++) {
		if (i!=0) {
			edgesStr+=",";
		}
		edgesStr+="<"+edges[i].startVertex+","+edges[i].endVertex+">";
	}
	this.cmd("SetState", "最小生成树的边有" + edgesStr);
	for (var i=0; i<10; i++)  {
		this.cmd("Step");
	}
	// this.clearHighlightCircle();
	return this.commands;
}
