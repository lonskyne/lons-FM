import fs from 'fs'
import path from 'path'
import { isText } from 'istextorbinary'

export const actions = {

	confirmFolder: async ({ request } ) => {
		const requestData= await request.formData();
		const lookupFolder = requestData.get("lookupFolder");
		var fileNames;
		var fileExts = new Array;
		var fileContents = new Array;

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
	}
}

