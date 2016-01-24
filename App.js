console.log('hello world');

api.store.put("secretkey", 3425234);

//var results = api.boa.run('boaScript.boa');

//var results = api.boa.exec("# How many committers are in each project?"+
//	"p: Project = input;"+
//	"counts: output sum[string] of int;"+
//
//	"committers: map[string] of bool;"+
//
//	"visit(p, visitor {"+
//	"	before node: Revision ->"+
//	"		if (!haskey(committers, node.committer.username)) {"+
//	"			committers[node.committer.username] = true;"+
//	"			counts[p.id] << 1;"+
//	"		}"+
//	"});");

console.log(api);