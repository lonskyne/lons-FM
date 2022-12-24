var files
import fs from 'fs'
import promisify from 'utils'

const reddir = promisify(fs.reddir())

async function load()
{
	var data = await readdir('.')
	return data
}

export var files

