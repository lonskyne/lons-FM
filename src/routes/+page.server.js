var files
import fs from 'fs'
fs.readdir('.', function(err, data) {
	files = data
});

export var files

