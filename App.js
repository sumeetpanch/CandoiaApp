console.log('Running');

//var results = api.boa.run('boaScript.boa');

//console.log('boa done');

var node = {name:'node', parent: null, children:[], size:0, hasChildren:false};

var Table = document.createElement('table');

function updateTable(node) {
	Table.innerHTML = "";
	document.getElementById('title').innerHTML = node.name;
	if (node.children !== undefined){
		for (var i = 0; i < node.children.length; i++){
			var tr = document.createElement('tr');
			if (node.children[i].hasChildren){
				console.log(node.children[i].name);
				var button = document.createElement('button');
				button.innerHTML = node.children[i].name;
				button.onclick = (function(){
					var passNode = node.children[i];
					console.log(passNode.name);
					console.log(node.children[i].name);
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
var backButton = document.createElement('button');
backButton.innerHTML = node.name;
backButton.onclick = (function(){
	return function() {
		updateTable(node);
	}
})();
document.getElementById('back').appendChild(backButton);
console.log('done');