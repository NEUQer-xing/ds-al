// JavaScript Document
/*
**	init()函数
**	GraphEdge类
**	Graph类
**  UFSets类
*/
// 初始化函数
var currentGraph;
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
	$(".runKruNumber").val('0');
	$(".weightKruNumber").val('10');
	// 图形部分
	this.objectID = 0 ; // 图形的序号
	this.highightCircleID;	// 高亮圆
	this.EdgeArrayObjectID;	// 对所有的连线进行排序
	this.hintLabelLeftID;	// label left ID
	this.hintLabelRightID;	// label right ID
	this.EdgeArrayLeftHighlightCircleID;
	this.EdgeArrayRightHighlightCircleID;
	this.UFSetsObjectID;	// UFSets等价类矩形ID数组
	this.radius = 26;	// 顶点圆的半径
	// 顶点位置的确定
	this.R = 150;		// 所有顶点分布在该圆上
	this.X0 = 250;		// 分布圆的圆心横坐标
	this.Y0 = 250; 		// 分布圆的圆心纵坐标

	this.EdgeArrayObjectStartX = 550;
	this.EdgeArrayObjectStartY = 100;
	this.EdgeArrayObjectInterval = 20;
	this.EdgeArrayLineLength = 30;
	this.EdgeArrayObjectRadius = 20;

	this.UFSetsObjectStartX = 750;
	this.UFSetsObjectStartY = 150;
	this.UFSetsObjectWidth = 25;
	this.UFSetsObjectHeight = 20;
	this.UFSetsObjectInterval = 15;
	this.UFSetsObjectCount;
	this.UFSetsObjectPosition;
	
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.highlightColor = '#FF0000' ; //高亮色
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
// DFS遍历调用函数
runKruskalCallBack = function() {
	// startVertex = ( startVertex == null || isNaN(startVertex) ) ? 0: startVertex;
	// currentGraph.implementAction(currentGraph.clearHintArea.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.Kruskal.bind(currentGraph), 0);
}
// 产生随机图调用函数
randomGraphCallBack = function() {
	do {
		currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
		currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
	} while(!currentGraph.isAllConnected());
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

// var KruskalStartVertexText;
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
	
	addLabelToAlgorithmBar("Kruskal起始顶点");
	KruskalStartVertexText = addInputToAlgorithmBar("text", "0");
	
	runKruskalButton = addInputToAlgorithmBar("button", "Run Kruskal");
	runKruskalButton.onclick = runKruskalCallBack;

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
	this.highightCircleID = new Array(vertexNum);
	this.UFSetsObjectID = new Array(vertexNum);
	// this.EdgeArrayLeftHighlightCircleID = 3 * vertexNum;
	// this.EdgeArrayRightHighlightCircleID = 3 * vertexNum + 1;
	this.hintLabelLeftID = 7 * vertexNum;
	this.hintLabelRightID = 7 * vertexNum + 1;
	this.EdgeArrayLeftHighlightCircleID = 7 * vertexNum + 2;
	this.EdgeArrayRightHighlightCircleID = 7 * vertexNum + 3;
	// 高亮的connect连线数组
	this.highlightConnectArray = new Array();

	//this.EdgeArrayObjectID = new Array();
	for (var i=0; i<this.vertexNum; i++) {
		this.highightCircleID[i] = vertexNum + i;
		this.UFSetsObjectID[i] = 2 * vertexNum + i;
	}
	this.UFSetsObjectCount = new Array(vertexNum);
	this.UFSetsObjectPosition = new Array(vertexNum);
	// for (var i=0; i< this.vertexNum; i++) {
	// 	this.UFSetsObjectCount[i] = 1;
	// 	// 二维坐标
	// 	this.UFSetsObjectPosition[i] = new Array(2);
	// 	this.UFSetsObjectPosition[i][0] = this.UFSetsObjectStartX;
	// 	this.UFSetsObjectPosition[i][1] = this.UFSetsObjectStartY + i * (this.UFSetsObjectHeight + this.UFSetsObjectInterval);
	// }

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
Graph.prototype.showEdgeWeight = function(show) {
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
	//alert("getRandomGraph");
	//alert(this.matrix);
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
		if(startVertex > endVertex) {
			var tmp = endVertex;
			endVertex = startVertex;
			startVertex = tmp;
		}
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

// 利用DFS判断图是否连通
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
// Kruskal算法
Graph.prototype.Kruskal = function ( ) {
	// 先判断是否是连通图，不是的话停止算法执行
	if ( !this.isAllConnected() ) {
		// alert("This graph is not a connected graph, algorithm cannot run. Please add some edges or get a new graph to retry the algorithm. ");
		this.cmd("SetState", "该图不是连通图，算法停止执行");
		return this.commands;
	}
	// 检查是否有高亮显示的边，有的话删除掉
	while (this.highlightConnectArray.length ) {
		var line = this.highlightConnectArray.pop();
		var startV = line[0];
		var endV = line[1];
		//alert(startV+" "+endV);
		this.setConnectLineHighlight(startV, endV, false);
	}
	// 将所有的顶点前景色设为一般颜色（非高亮）
	for (var i=0; i<this.vertexNum; i++) {
		this.cmd("SetForegroundColor", i, this.foregroundColor);
	}
	// 将UFSets Object位置reset
	for (var i=0; i< this.vertexNum; i++) {
		this.UFSetsObjectCount[i] = 1;
		// 二维坐标
		this.UFSetsObjectPosition[i] = new Array(2);
		this.UFSetsObjectPosition[i][0] = this.UFSetsObjectStartX;
		this.UFSetsObjectPosition[i][1] = this.UFSetsObjectStartY + i * (this.UFSetsObjectHeight + this.UFSetsObjectInterval);
	}
	// 将所有的边按照边权的大小升序排列
	var hasHighlightCiecle = new Array(this.vertexNum);
	for (var i=0; i<this.vertexNum; i++) {
		hasHighlightCiecle[i] = false;
	}
	var edgeArray = new Array();
	for (var i=0; i<this.vertexNum; i++) {
		for (var j=0; j<i; j++) {
			if (this.matrix[i][j] ) {
				var tmpEdge = new GraphEdge(j, i, this.matrix[i][j] );
				edgeArray.push(tmpEdge );
			}
		}
	}
	// 最小生成树的边
	var MSTEdge = new Array();
	// 对Edge object id 初始化
	this.EdgeArrayObjectID = new Array(2 * edgeArray.length);
	for (var i=0 ; i< 2 * edgeArray.length; i++) {
		this.EdgeArrayObjectID[i] = 3* this.vertexNum + i;
	}

	this.cmd("SetState", "先对所有的边排序");
	this.cmd("Step");
	this.cmd("Step");
	this.cmd("Step");
	// 对所有的边进行排序，升序
	edgeArray.sort( function (e1, e2) {return (e1.weight > e2.weight) ? 1 : -1; }  );
	// 显示Edge Array
	this.cmd("SetState", "排序完成");
	this.cmd("CreateLabel", this.hintLabelLeftID, "排序后的边", this.EdgeArrayObjectStartX + 35, this.EdgeArrayObjectStartY - 50);
	this.cmd("SetForegroundColor", this.hintLabelLeftID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.hintLabelLeftID, this.backgroundColor);
	for (var i=0; i<edgeArray.length; i++) {
		// 产生左边的圆
		this.cmd("CreateCircle", this.EdgeArrayObjectID[2*i], edgeArray[i].startVertex, 
				this.EdgeArrayObjectStartX, this.EdgeArrayObjectStartY + i * (this.EdgeArrayObjectInterval + 2 * this.EdgeArrayObjectRadius),
				this.EdgeArrayObjectRadius);
		this.cmd("SetForegroundColor", this.EdgeArrayObjectID[2*i], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.EdgeArrayObjectID[2*i], this.backgroundColor);
		// 产生右边的圆
		this.cmd("CreateCircle", this.EdgeArrayObjectID[2*i+1], edgeArray[i].endVertex,
				this.EdgeArrayObjectStartX+2*this.EdgeArrayObjectRadius+this.EdgeArrayLineLength, this.EdgeArrayObjectStartY + i * (this.EdgeArrayObjectInterval + 2*(this.EdgeArrayObjectRadius)),
				this.EdgeArrayObjectRadius);
		this.cmd("SetForegroundColor", this.EdgeArrayObjectID[2*i+1], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.EdgeArrayObjectID[2*i+1], this.backgroundColor);
		// 连接两个圆
		this.cmd("Connect", this.EdgeArrayObjectID[2*i], this.EdgeArrayObjectID[2*i+1], this.highlightColor, 0.0, false, edgeArray[i].weight);
	}
	this.cmd("Step");

	var set = new UFSets(this.vertexNum);
	// 在右边产生UFSet矩形, 每个矩形各成一类
	this.cmd("CreateLabel", this.hintLabelRightID, "等价类", this.UFSetsObjectPosition[0][0] - 50, this.UFSetsObjectPosition[0][1]);
	this.cmd("SetForegroundColor", this.hintLabelRightID, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.hintLabelRightID, this.backgroundColor);
	for (var i=0; i<this.vertexNum; i++) {
		this.cmd("CreateRectangle", this.UFSetsObjectID[i], i, this.UFSetsObjectWidth, this.UFSetsObjectHeight, 
				'center', 'center', this.UFSetsObjectPosition[i][0], this.UFSetsObjectPosition[i][1] );
		this.cmd("SetForegroundColor", this.UFSetsObjectID[i], this.foregroundColor);
		this.cmd("SetBackgroundColor", this.UFSetsObjectID[i], this.backgroundColor);
	}
	this.cmd("Step");
	// 记录生成树的当前边数
	//var edgeNum = 0;
	// 记录当前使用到的edgeArray序号
	var edgeCount = 0;
	// 记录所有的高亮圆，便于之后删除
	// var highlightLineArray = new Array();
	while (MSTEdge.length < this.vertexNum-1) {
		if (edgeCount < edgeArray.length) {
			var startVertex = edgeArray[edgeCount].startVertex;
			var endVertex = edgeArray[edgeCount].endVertex;
			// 动画显示检查顶点过程
			this.cmd("CreateHighlightCircle", this.EdgeArrayLeftHighlightCircleID, 
					this.EdgeArrayObjectStartX, this.EdgeArrayObjectStartY, this.EdgeArrayObjectRadius/2);
			this.cmd("SetForegroundColor", this.EdgeArrayLeftHighlightCircleID, this.highlightColor);
			this.cmd("SetBackgroundColor", this.EdgeArrayLeftHighlightCircleID, this.backgroundColor);
			this.cmd("CreateHighlightCircle", this.EdgeArrayRightHighlightCircleID, 
					this.EdgeArrayObjectStartX + this.EdgeArrayLineLength + 2*this.EdgeArrayObjectRadius, this.EdgeArrayObjectStartY, this.EdgeArrayObjectRadius/2);
			this.cmd("SetForegroundColor", this.EdgeArrayRightHighlightCircleID, this.highlightColor);
			this.cmd("SetBackgroundColor", this.EdgeArrayRightHighlightCircleID, this.backgroundColor);
			this.cmd("Step");
			this.cmd("step");
			this.cmd("Step");
			this.cmd("Step");
			var stateV = "<"+edgeArray[edgeCount].startVertex+","+edgeArray[edgeCount].endVertex+">";
			this.cmd("SetState", "检查两个顶点"+stateV+"是否在同一个等价类中");
			this.cmd("Step");
			this.cmd("Move", this.EdgeArrayLeftHighlightCircleID, 
					this.UFSetsObjectPosition[startVertex][0], this.UFSetsObjectPosition[startVertex][1] );
			this.cmd("Move", this.EdgeArrayRightHighlightCircleID, 
					this.UFSetsObjectPosition[endVertex][0], this.UFSetsObjectPosition[endVertex][1] );
			this.cmd("Step");
			this.cmd("Step");
			this.cmd("Delete", this.EdgeArrayLeftHighlightCircleID);
			this.cmd("Delete", this.EdgeArrayRightHighlightCircleID);
			
			// 检查两个顶点是否属于同一个等价类
			if ( !set.check(startVertex, endVertex) ) {
				this.cmd("SetState", "顶点"+stateV+"不在同一个等价类，添加该边到最小生成树，合并该等价类");
				// 将两个不属于同一个等价类的顶点合并为一个等价类
				set.union(startVertex, endVertex );
				MSTEdge.push(stateV);
				// edgeNum++;
				// 对UFset图形重新绘制
				for (var i=0; i< this.vertexNum; i++) {
					this.UFSetsObjectCount[i] = 0;
				}
				for (var i=0; i< this.vertexNum; i++) {
					this.UFSetsObjectPosition[i][0] = this.UFSetsObjectStartX + this.UFSetsObjectCount[set.find(i)] * this.UFSetsObjectWidth;
					this.UFSetsObjectPosition[i][1] = this.UFSetsObjectStartY + (set.find(i)) * (this.UFSetsObjectHeight + this.UFSetsObjectInterval);
					//alert(this.UFSetsObjectPosition[i][0]+" "+this.UFSetsObjectPosition[i][1]);
					this.cmd("Move", this.UFSetsObjectID[i], this.UFSetsObjectPosition[i][0], 
							this.UFSetsObjectPosition[i][1] );
					this.UFSetsObjectCount[ set.find(i) ] ++;

				}
				this.cmd("Step");
				//alert(startVertex +" "+ endVertex);
				// 图上的高亮操作
				if ( !hasHighlightCiecle[startVertex] ) {
					this.cmd("CreateHighlightCircle", this.highightCircleID[startVertex], 
							this.position[startVertex][0], this.position[startVertex][1], this.radius);
					hasHighlightCiecle[startVertex] = true;
				}
				if ( !hasHighlightCiecle[endVertex] ) {
					this.cmd("CreateHighlightCircle", this.highightCircleID[endVertex], 
							this.position[endVertex][0], this.position[endVertex][1], this.radius);
					hasHighlightCiecle[endVertex] = true;
				}
				// 对图上的边闪耀
				this.cmd("SetLineHighlight", startVertex, endVertex, true);
				this.cmd("Step");
				this.cmd("SetLineHighlight", startVertex, endVertex, false);
				this.cmd("Step");
				// 对找到的边显示高亮
				this.setConnectLineHighlight(startVertex, endVertex, true);
				this.highlightConnectArray.push([startVertex, endVertex]);
				// 高亮顶点
				this.cmd("SetForegroundColor", startVertex, this.highlightColor);
				this.cmd("SetForegroundColor", endVertex, this.highlightColor);
			}
			// 该边位于同一个等价类
			else{
				this.cmd("SetState", "顶点"+stateV+"在同一个等价类，舍弃该边");
				this.cmd("Step");
			}
			// 检查完成后需要把第一条边删掉并且剩余的边需要上移一行
			this.cmd("Disconnect", this.EdgeArrayObjectID[2*edgeCount], this.EdgeArrayObjectID[2*edgeCount+1]);
			this.cmd("Delete", this.EdgeArrayObjectID[2*edgeCount]);
			this.cmd("Delete", this.EdgeArrayObjectID[2*edgeCount+1]);
			for (var i = edgeCount+1; i < edgeArray.length; i++) {
				this.cmd("Move", this.EdgeArrayObjectID[2*i], this.EdgeArrayObjectStartX, 
						this.EdgeArrayObjectStartY + (i-edgeCount-1) * (this.EdgeArrayObjectInterval + 2*this.EdgeArrayObjectRadius) );
				this.cmd("Move", this.EdgeArrayObjectID[2*i+1], 
						this.EdgeArrayObjectStartX+ this.EdgeArrayLineLength + 2*this.EdgeArrayObjectRadius, 
						this.EdgeArrayObjectStartY + (i-edgeCount-1) * (this.EdgeArrayObjectInterval + 2*this.EdgeArrayObjectRadius) );
			}
			this.cmd("Step");
		}
		else {
			// alert("不存在最小生成树");
			this.cmd("SetState", "不存在最小生成树");
			return this.commands;
		}
		edgeCount++;
	}
	this.cmd("SetState", "完成算法");
	this.cmd("Step");
	MSTEdge.reverse();
	var edgesStr = ""+ MSTEdge.pop();
	while (MSTEdge.length > 0) {
		edgesStr+=("," + MSTEdge.pop());
	}
	this.cmd("SetState", "最小生成树的边有" + edgesStr);
	// 删除剩余的 edge circle
	this.cmd("Step");
	this.cmd("Step");
	this.cmd("Step");
	this.cmd("Step");
	this.cmd("Step");
	this.cmd("Step");
	for (var i= edgeCount; i < edgeArray.length; i++) {
		this.cmd("Disconnect", this.EdgeArrayObjectID[2*i], this.EdgeArrayObjectID[2*i+1]);
		this.cmd("Delete", this.EdgeArrayObjectID[2*i]);
		this.cmd("Delete", this.EdgeArrayObjectID[2*i+1]);
	}
	// 删除label
	this.cmd("Delete", this.hintLabelLeftID);
	this.cmd("Delete", this.hintLabelRightID);
	// 删除高亮圆，删除UFSet提示矩形
	for (var i=0; i<this.vertexNum; i++ ) {
		this.cmd("Delete", this.highightCircleID[i]);
		this.cmd("Delete", this.UFSetsObjectID[i]);
	}
	this.cmd("Step");
	return this.commands;
}

// 等价类
function UFSets (n) {
	// 对n个数字进行等价分析
	this.n = n;
	this.sameSet = new Array(n);
	// 初始化所有的编号属于自己的类， 各自成类
	for (var i=0; i< this.n; i++) {
		this.sameSet[i] = i;
	}
}

UFSets.prototype = {
	constructor: UFSets,
}
// 对n1和n2 进行等价合并
UFSets.prototype.union = function (n1, n2) {
	if(n1 == n2 ) {
		alert("cannot union two same number " + n1);
		return null;
	}
	if (this.sameSet[n1] == this.sameSet[n2]) {
		alert(n1+","+n2 +" are already in the same Set. ");
		return null;
	}
	var min = (this.sameSet[n1] < this.sameSet[n2]) ? this.sameSet[n1] : this.sameSet[n2];
	var max = (this.sameSet[n1] < this.sameSet[n2]) ? this.sameSet[n2] : this.sameSet[n1];
	for (var i=0; i< this.n; i++) {
		if (this.sameSet[i] == max ) {
			this.sameSet[i] = min;
		}
	}
	return null;
}
// 检查n1和n2是否属于同一个等价类
UFSets.prototype.check = function (n1, n2) {
	if (this.sameSet[n1]  ==  this.sameSet[n2] ) {
		return true;
	}
	return false;
}
// find
UFSets.prototype.find = function (n) {
	return this.sameSet[n];
}
