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
	let fileExts;
	let fileContents;
	
	//Current file variables
	let curFileName;	
	let curFileContent;
	let curFileExt;

	//Update files if the folder path is confirmed
	if(form!=null)
	{
		if(!form.err)
		{
			fileNames = form.fileNames;
			fileExts = form.fileExts;
			fileContents = form.fileContents;
			lookupFolder = form.lookupFolder;

			setCurrentFile(0);

			inputDisabled = true;
			folderErrorMessage = "";
		}
		else
		{
			folderErrorMessage = "The folder you selected does not exist!"
		}
	}

	function previousFile() 
	{
		if(i>0)
		{
			i--;
		}

		setCurrentFile(i);
	}	
	
	function nextFile() 
	{
		if(i < fileNames.length-1)
		{
			i++;
		}

		setCurrentFile(i);
	}

	function enableInput()
	{
		inputDisabled = false;
	}

	function setCurrentFile(i)
	{
		curFileName = fileNames[i];
		curFileExt = fileExts[i];
		curFileContent = fileContents[i];
	}
</script>

<body>
	<span id="folderError" style="color:red">{folderErrorMessage}</span>
	<form method="POST" action="?/confirmFolder">
		<b>Lookup folder:</b>
		<input disabled={inputDisabled} type="text" name="lookupFolder" value={lookupFolder}/><br>

		<button disabled="{inputDisabled}">Confirm</button>
	</form>
		<button disabled="{!inputDisabled}" on:click="{enableInput}">Edit</button>
	
	<hr>

	<form>
		<button on:click="{previousFile}">Previous</button>
		<button on:click="{nextFile}">Next</button>
		<p><b>File name:</b> {curFileName}</p>
		<p><b>File type:</b> {curFileExt}</p>
		<p><b>File content</b> {curFileContent}</p>
	</form>
</body>
