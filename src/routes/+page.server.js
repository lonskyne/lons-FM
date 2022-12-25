import fs from 'fs'
import promisify from 'util'

export const actions = {
	confirmFolder: async ({ request} ) => {
		console.log(await request.formData());
		var fileNames = await fs.promises.readdir(".");
		return { fileNames };
	}
}

