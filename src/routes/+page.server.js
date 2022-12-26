import fs from 'fs'
import path from 'path'
import { isText } from 'istextorbinary'

var lookupFolder;
var fileNames;
var fileExts = new Array;
var fileContents = new Array;

export const actions = {

	confirmFolder: async ({ request } ) => {
		const requestData= await request.formData();
		lookupFolder = requestData.get("lookupFolder");

		var err = false;

		try
		{
			fileNames = await fs.promises.readdir(lookupFolder);
		}
		catch(error)
		{
			err = true;
		}
		
		if(!err)
		{
			for(let i=0; i<fileNames.length; i++)
			{
				fileExts[i] = path.extname(fileNames[i]);
				var fsStat = await fs.promises.stat(lookupFolder+'/'+fileNames[i]);
				if(fsStat.isDirectory())
				{
					fileExts[i] = "folder"
					fileContents[i] = "";
				}
				else
				{
					fileContents[i] = await fs.promises.readFile(lookupFolder+'/'+fileNames[i]);
					if(isText(fileNames[i], fileContents[i]))
					{
						fileContents[i] = await fs.promises.readFile(lookupFolder+'/'+fileNames[i], "utf-8");
					}
					else
					{
						fileContents[i] = "Cannot read binary files";
					}

				}
			}
		}

		return { lookupFolder, fileNames, fileExts, fileContents, err};
	},

	deleteFiles: async ( {request} ) => {
		const requestData = await request.formData();
		const deletion = requestData.get("deletion").split(",");
		
		for(let i=0; i<deletion.length; i++)
		{
			if(deletion[i].length>0)
			{
				fs.unlink(lookupFolder+'/'+deletion[i], (err => {
					if(err)
						console.log(err);
				}));
			}
		}

		fileNames = new Array;
		lookupFolder = undefined;
		fileExts = new Array;
		fileContents = new Array;

		return {lookupFolder, fileNames, fileExts, fileContents}
	}
}

