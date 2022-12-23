<nav>
	<h1>lons-FM</h1>
</nav>

<script>
	var filename = 0
	import fs from 'fs'

	function assign(data)
	{
		filename = data;
	}

	fs.readdir('/home', function(err, data) {
		assign(data)
	});
	
	console.log(filename)	

	let lastmod = "1/1/1900"

</script>

<body>
	<p><b>File name:</b> {filename}</p>
	<p><b>Last modified:</b> {lastmod}</p>
	<button>Next</button>
</body>
