var jsonFS = require('../lib');

jsonFS.write('./testFilesystem', {
	Value1: "Test content",
	File2: "test file",
	AFolder: {
		User: "TestUser",
		Email: "test@example.com"
	}
}).then(function(){
	console.log('done!');
})

