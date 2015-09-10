var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'));

exports.write = function parse(path, obj) {
	obj = exports.convert(obj);
	return fs.ensureDirAsync(path).then(function(){
		Promise.all(Object.keys(obj).map(function(name) {
			var value = obj[name];
			if(typeof value === "object"){
				return parse(path+'/'+name, value);
			}else{
				return fs.outputFileAsync(path+'/'+name, value);
			}
		}));
	}).catch(function(err){
		throw err;
	})
};

exports.convert = function(obj){
	var ret = {};
	if(Array.isArray(obj)){
		obj.forEach(function(val, i){
			ret[i] = val;
		})
		return ret;
	}else{
		return obj;
	}
};

exports.read = function parse(path){
	console.log('path', path);
	return fs.statAsync(path).then(function(stats){
		if(stats.isDirectory()){
			return fs.readdirAsync(path).then(function(files){
				console.log('files', files);
				var ret = Promise.all(files.map(function(file){
					var res =  parse(path+'/'+file);
					return res;
				}));
				return ret.then(function(parsedFiles){
					var obj = {};
					parsedFiles.forEach(function(parsedFile, i){
						obj[files[i]] = parsedFile;
					})
					return obj;
				})
			});
		}else{
			console.log('file-path', path)
			return fs.readFileAsync(path, 'utf8');
		}
	});
}