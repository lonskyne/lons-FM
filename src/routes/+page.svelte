<nav>
	<h1>lons-FM</h1>
</nav>

<script>
	export let data

	let i = 0;

	$: filename = data.data[i]
	let lastmod = "1/1/1900"

	function _next() {
		if(i < data.data.length-1)
		{
			i++;
		}
	}
</script>

<body>
	<p><b>File name:</b> {filename}</p>
	<p><b>Last modified:</b> {lastmod}</p>
	<button on:click="{_next}">Next</button>
</body>
