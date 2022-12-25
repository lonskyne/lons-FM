<nav>
	<h1>lons-FM</h1>
</nav>

<script>
	export let data;
	export let form;
	
	let folderErrorMessage = "";

	let i = 0;
	let inputDisabled = true;
	
	//Overall folder variables
	let lookupFolder;
	let fileNames;
	
	//Current file variables
	let curFileName;	
	let fileContent = data.fileData;
	let lastmod = "1/1/1900";

	//Update files if the folder path is confirmed
	if(form!=null)
	{
		if(!form.err)
		{
			fileNames = form.fileNames;
			lookupFolder = form.lookupFolder;
			curFileName = fileNames[0];
			inputDisabled = true;
			folderErrorMessage = "";
		}
		else
		{
			folderErrorMessage = "The folder you selected does not exist!"
		}
	}
	
	function nextFile() {
		if(i < fileNames.length-1)
		{
			i++;
		}

		curFileName = fileNames[i];
	}

	function enableInput()
	{
		inputDisabled = false;
	}
</script>

<body>
	<span id="folderError" style="color:red">{folderErrorMessage}</span>
	<form method="POST" action="?/confirmFolder">
		<b>Lookup folder:</b>
		<input disabled={inputDisabled} type="text" name="lookupFolder" value={lookupFolder}/><br>

		<button>Confirm</button>
	</form>
		<button on:click="{enableInput}">Edit</button>
	
	<hr>

	<form>
		<p><b>File name:</b> {curFileName}</p>
		<p><b>File content</b> {fileContent}</p>
		<p><b>Last modified:</b> {lastmod}</p>
		<button on:click="{nextFile}">Next</button>
	</form>
</body>
