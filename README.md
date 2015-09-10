JSON-FS
======

JSON-FS converts an Object into a Filetree.

Examaple
---

```javascript
jsonFs.write('./testFilesystem', {
	Value1: "Test content",
	File2: "test file",
	AFolder: {
		User: "TestUser",
		Email: "test@example.com"
	}
}).then(function(){
	console.log('done!');
})
```

will create:

```
testFilesystem
	|--- Value1 	//File with the content "Test content"
	|--- File2		//File with the content "test file"	
	|--- AFolder	//Folder
			|--- User 	// File with content "TestUser"
			|--- Email	// test@example.com
```

