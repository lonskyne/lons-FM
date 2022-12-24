import fs from 'fs'
import promisify from 'util'


export async function load()
{
	var fileNames = await fs.promises.readdir('.')
	var fileData = await fs.promises.readFile("./demo.txt")
	console.log(fileData)
	return { fileNames }
}
