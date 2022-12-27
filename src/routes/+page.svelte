<nav>
	<h1>lons-FM</h1>
</nav>

<script>
	export let form;
	
	let folderErrorMessage = "";
	let deletion
	var fileNameColor = "black";

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
			deletion = new Array();

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

	function markDeletion()
	{
		deletion[i] = fileNames[i];

		fileNameColor = "red";
	}

	function setCurrentFile(i)
	{
		curFileName = fileNames[i];
		curFileExt = fileExts[i];
		curFileContent = fileContents[i];
		if(deletion[i]!=undefined)
		{
			fileNameColor = "red";
		}
		else
		{
			fileNameColor = "black";
		}
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
		<button on:click="{nextFile}">Next</button><br>
		
		<button on:click="{markDeletion}">Mark for deletion</button><br>

		<b>File name:</b> <input style="color:{fileNameColor}" readOnly=true value={curFileName} name="curFileName"><br>
		<b>File type:</b> <input readOnly=true value={curFileExt}><br>
		<b>File content</b> <input readOnly=true value={curFileContent}>
		<br><img src="{curFileContent}" />
	</form>

	<form method="POST" action="?/deleteFiles">
		<button>Confirm deletion</button><br>
		<input style="color:red" value={deletion} name="deletion">
	</form>
</body>
