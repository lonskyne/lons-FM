import fs from 'fs'
import path from 'path'

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
			fileNames = await fs.promises.readdir(".");
			err = true;
		}

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
				fileContents[i] = await fs.promises.readFile(lookupFolder+'/'+fileNames[i], "utf-8");
			}
		}

		return { lookupFolder, fileNames, fileExts, fileContents, err};
	}
}

