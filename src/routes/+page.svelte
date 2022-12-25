<nav>
	<h1>lons-FM</h1>
</nav>

<script>
	export let data;
	export let form;

	let i = 0;
	let inputDisabled = true;
	
	let fileNames;

	let curFileName;
	let fileContent = data.fileData;
	let lastmod = "1/1/1900";
	
	if(form!=null)
	{
		fileNames = form.fileNames;
		curFileName = fileNames[0];
	}
	else
	{
		console.log("Choose the lookup folder!");
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

	function confirmFolder()
	{
		inputDisabled = true;
	}
</script>

<body>
	<form method="POST" action="?/confirmFolder">
		<b>Lookup folder:</b>
		<input disabled={inputDisabled} type="text" value='.'><br>

		<button on:click="{confirmFolder}">Confirm</button>
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
