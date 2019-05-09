$(document).ready(function() {

		//init code mirror
		var editor = CodeMirror(document.querySelector(".block-code"), {
			lineNumbers: true,
			autofocus: true,
			matchBrackets: true,
		    autoCloseBrackets: true,
		    mode: "application/ld+json",
		    lineWrapping: true
		});

		// #ABBR [  DC == Depenedency, RQ == Required]


		//bind click event
		$(".unpack").click(function() {


			// check input is json
			var code = editor.getValue();

			if(code == '') {
				showMessage('error', 'Empty Json');
				return;
			}

			if(!IsValidJSONString(code)) {
				showMessage('error', 'Invalid Json')
				return;
			}

			// make an array of all MAIN DC
			var json = JSON.parse(code);

			if(!json.dependencies) {
				showMessage('error', 'Invalid package-lock.json code');
				return;
			}

			var mainPackages = json.dependencies;
			var subPackages = [];
			var required = [];

			// loop thru all DC and check their DC exist in the MAIN DC
			for(package in mainPackages) {

				if(subPackages.indexOf(package) === -1) {
					var thisPackageDependencies = packageInfo(package);

				} else {
					continue;
				}
				break;
			}

			// finally we should have an array of RQ DC

			// Generate package.json from this RQ DC array

			// paste it into the editor and give a success message

		});


		


		function IsValidJSONString(str) {

			if(str === null || str == '' || !isNaN(str) ) {
				return false;
			}

		    try {
		        JSON.parse(str);
		    } catch (e) {
		        return false;
		    }
		    return true;
		}

		function showMessage(type, message) {

			$(".block-title").html(` 
				<div class="message ${type}">
					${message}
				</div>
			`);
		}

		function packageInfo(package) {
			let pkg = encodeURIComponent(package)
			let info = fetch("https://api.npms.io/v2/package/"+pkg)
						.then(response => response.json())
						.then(jsonResponse => console.log(jsonResponse))
			console.log(info);
		}

		fetch('package-lock.json')
			.then(response => response.json())
			.then(jsonResponse => console.log(jsonResponse))
});
