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
			//fileContents[i] = await fs.promises.readFile(lookupFolder+'/'+fileNames[i]);
		}

		return { lookupFolder, fileNames, fileExts, fileContents, err};
	}
}

