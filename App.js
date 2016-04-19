console.log('Running');

var results = api.boa.run('boaScript.boa');

console.log('boa done');

var node = {name:'node', parent: null, children:[], size:0, hasChildren:false};

var Table = document.createElement('table');

function updateTable(node) {
	Table.innerHTML = "";
	document.getElementById('title').innerHTML = node.name;
	if (node.children !== undefined && node.children.length !== 0){
		for (var i = 0; i < node.children.length; i++){
			var tr = document.createElement('tr');
			if (node.children[i].hasChildren){
				var button = document.createElement('button');
				button.innerHTML = node.children[i].name;
				button.onclick = (function(){
					var passNode = node.children[i];
					return function() {
						updateTable(passNode);
					}
				})();
				tr.appendChild(button);
			} else {
				tr.appendChild(document.createTextNode(node.children[i].name));
			}
			Table.appendChild(tr);
			document.getElementById('table').appendChild(Table);
		}
		var backButton = document.createElement('button');
		backButton.innerHTML = node.name;
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
		document.getElementById('back').innerHTML = "";
		document.getElementById('back').appendChild(backButton);
	} else {
		var tr = document.createElement('tr');
		tr.appendChild(document.createTextNode("Error! No Children in this node!"));
		Table.appendChild(tr);
		document.getElementById('table').appendChild(Table);
	}
}

var node = {name:'node', parent: null, children:[], size:0, hasChildren:true};
var node01 = {name:'node01', parent: node1, children:[], size:0, hasChildren:false};
var node02 = {name:'node02', parent: node1, children:[], size:0, hasChildren:false};
var node0 = {name:'node0', parent: node, children:[node01,node02], size:2, hasChildren:true};
node.children.push(node0);
var node1 = {name:'node1', parent: node, children:[], size:0, hasChildren:false};
node.children.push(node1);
var node21 = {name:'node21', parent: node3, children:[], size:0, hasChildren:false};
var node2 = {name:'node2', parent: node, children:[node21], size:1, hasChildren:true};
node.children.push(node2);
var node3 = {name:'node3', parent: node, children:[], size:0, hasChildren:false};
node.children.push(node3);


updateTable(node);
console.log('done');