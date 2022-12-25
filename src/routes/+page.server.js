import fs from 'fs'
import promisify from 'util'

export const actions = {
	confirmFolder: async ({ request } ) => {
		const requestData= await request.formData();
		const lookupFolder = requestData.get("lookupFolder");
		var fileNames = await fs.promises.readdir(lookupFolder);
		return { lookupFolder, fileNames};
	}
}

