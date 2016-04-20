console.log('Running');

var results = api.boa.run('boaScript.boa');
console.log(results);
var files = results["out"]["[]"];
console.log(files);

var nodeNameArr = [];
var nodeArr = [];
var node = {name: "root", parent: null, children:[], size:0, hasChildren:false};

function createTree() {
	var parentNode = node;
	for (var i = 0; i < files.length; i++) {
		if (nodeNameArr.indexOf(files[i]) === -1){
			nodeNameArr.push(files[i]);
			var nameArr = files[i].split("/");
			for (var j = 0; j < nameArr.length; j++){
				if (j === nameArr.length-1){
					var newNode = {name:nameArr[j], parent: parentNode, children:[], size:0, hasChildren:false};
					nodeArr.push(newNode);
					parentNode.size++;
					parentNode.hasChildren = true;
					parentNode.children.push(nodeArr[nodeArr.length-1]);
				} else {
					exists = false;
					for (var k = 0; k < nodeArr.length; k++){
						if (nodeArr[k].name === nameArr[j]){
							exists = true;
							parentNode = nodeArr[k];
							break;
						}
					}
					if (!exists) {
						var newNode = {name:nameArr[j], parent: parentNode, children:[], size:0, hasChildren:false};
						nodeArr.push(newNode);
						parentNode.children.push(nodeArr[nodeArr.length-1]);
						parentNode.size++;
						parentNode.hasChildren = true;
						parentNode = newNode;
					}
				}
			}
		}
	}
}

console.log('boa done');

//var node = {name:'node', parent: null, children:[], size:0, hasChildren:false};
createTree();

var Table = document.createElement('table');

function updateTable(node) {
	Table.innerHTML = "";
	document.getElementById('title').innerHTML = node.name;
	if (node.children !== undefined && node.children.length !== 0){
		var folderCount = 0;
		var itemCount = 0;
		for (var i = 0; i < node.children.length; i++){
			var tr = document.createElement('tr');
			if (node.children[i].hasChildren){
				var button = document.createElement('button');
				button.setAttribute("class","btn-link");
				button.innerHTML = node.children[i].name;
				button.onclick = (function(){
					var passNode = node.children[i];
					return function() {
						updateTable(passNode);
					}
				})();
				tr.appendChild(button);
				folderCount++;
			} else {
				itemCount++;
				tr.appendChild(document.createTextNode(node.children[i].name));
			}
			Table.appendChild(tr);
			document.getElementById('table').appendChild(Table);
		}
		if (folderCount === 1) {
			var folderPlural = "";
		} else {
			var folderPlural = "s";
		}
		if (itemCount === 1) {
			var itemPlural = "";
		} else {
			var itemPlural = "s";
		}
		document.getElementById('itemCount').innerHTML = "This folder contains " + folderCount + " folder" + folderPlural + " and " + itemCount + " file" + itemPlural + " directly (not including subfolders)";
		document.getElementById('title').innerHTML = "";
		document.getElementById('title').appendChild(document.createTextNode(node.name));
		while (node.parent!== null){
			var backButton = document.createElement('button');
			backButton.innerHTML = node.parent.name;
			backButton.onclick = (function(){
				if (node.parent !== null) {
					var pastNode = node.parent;
				} else {
					var pastNode = node;
				}
				return function() {
					updateTable(pastNode);
				}
			})();
			backButton.setAttribute("class","btn-link");
			if (node.parent!==null) document.getElementById('title').insertBefore(document.createTextNode("/"), document.getElementById('title').firstChild);
			document.getElementById('title').insertBefore(backButton, document.getElementById('title').firstChild);
			node = node.parent;
		}
	} else {
		var tr = document.createElement('tr');
		tr.appendChild(document.createTextNode("Error! No Children in this node!"));
		Table.appendChild(tr);
		document.getElementById('table').appendChild(Table);
	}
}

//var node = {name:'node', parent: null, children:[], size:0, hasChildren:true};
//var node011 = {name:'node011', parent: null, children:[], size:0, hasChildren:false};
//var node012 = {name:'node012', parent: null, children:[], size:0, hasChildren:false};
//var node01 = {name:'node01', parent: null, children:[node011,node012], size:2, hasChildren:true};
//node011.parent = node01;
//node012.parent = node01;
//var node021 = {name:'node021', parent: null, children:[], size:0, hasChildren:false};
//var node022 = {name:'node022', parent: null, children:[], size:0, hasChildren:false};
//var node023 = {name:'node023', parent: null, children:[], size:0, hasChildren:false};
//var node02 = {name:'node02', parent: null, children:[node021,node022,node023], size:3, hasChildren:true};
//node021.parent = node02;
//node022.parent = node02;
//node023.parent = node02;
//var node0 = {name:'node0', parent: node, children:[node01,node02], size:2, hasChildren:true};
//node.children.push(node0);
//node01.parent = node0;
//node02.parent = node0;
//var node1 = {name:'node1', parent: node, children:[], size:0, hasChildren:false};
//node.children.push(node1);
//var node21 = {name:'node21', parent: null, children:[], size:0, hasChildren:false};
//var node2 = {name:'node2', parent: node, children:[node21], size:1, hasChildren:true};
//node21.parent = node2;
//node.children.push(node2);
//var node3 = {name:'node3', parent: node, children:[], size:0, hasChildren:false};
//node.children.push(node3);


updateTable(node);
console.log('done');