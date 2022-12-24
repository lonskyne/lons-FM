<nav>
	<h1>lons-FM</h1>
</nav>

<script>
	export let data

	let i = 0;
	let inputDisabled = true;

	$: filename = data.fileNames[i];
	let fileContent = data.fileData;
	let lastmod = "1/1/1900";

	function nextFile() {
		if(i < data.fileNames.length-1)
		{
			i++;
		}
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
	<form>
		<b>Lookup folder:</b>
		<input disabled={inputDisabled} type="text" value='.'><br>

		<button on:click="{enableInput}">Edit</button>
		<button on:click="{confirmFolder}">Confirm</button>
	</form>
	
	<hr>

	<form>
		<p><b>File name:</b> {filename}</p>
		<p><b>File content</b> {fileContent}</p>
		<p><b>Last modified:</b> {lastmod}</p>
		<button on:click="{nextFile}">Next</button>
	</form>
</body>
