var files
import fs from 'fs'
import promisify from 'util'


export async function load()
{
	var data = await fs.promises.readdir('.')
	return { data }
}

export var files

