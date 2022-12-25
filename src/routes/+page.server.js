import fs from 'fs'
import promisify from 'util'

export const actions = {
	confirmFolder: async ({ request } ) => {
		const requestData= await request.formData();
		const lookupFolder = requestData.get("lookupFolder");
		var fileNames;
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
		return { lookupFolder, fileNames, err};
	}
}

