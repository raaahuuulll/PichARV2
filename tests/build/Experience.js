var start1 =
	"<html><head><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>" +
	"<script src='https://aframe.io/releases/1.0.0/aframe.min.js'></script><script src='https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js'></script>" +
	"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>" +
	"<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>" +
	"<script src='https://cdn.rawgit.com/tizzle/aframe-orbit-controls-component/v0.1.14/dist/aframe-orbit-controls-component.min.js'></script><script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script><script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script></head>" +
	"<body style='margin : 0px; overflow: hidden;'>" +
	"<a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam;debugUIEnabled: false;'><a-entity position='0 0 0' id='imglogo'></a-entity>";
var marker = "<a-marker-camera  orbit-controls='target: #imglogo;invertZoom:true;minPolarAngle:0.75;maxPolarAngle:1.5;enableKeys:false;' preset='hiro'>";
var linkmarker = " ";
var mid3d = ' ';
var mid2d = '</a-marker-camera ></a-scene>';
var end1 = "<div id='splashscreen' style='background-color: white; height:100% ; width:100%; position:absolute; top:0px; left:0px; z-index:4;'>" +
	"<img src='https://stemkoski.github.io/AR-Examples/markers/hiro.png' width='40%' style='margin: 10px;float:left;'>" +
	"<a style='position: absolute;top: 0px;margin: 10px;text-decoration: none;color:#4846ae;'>Share Marker</a>" +
	"<a onclick='facebook()' style='position: absolute;top: 24px;margin: 10px;text-decoration: none;color: #505050; cursor: pointer;'>Facebook</a>" +
	"<a onclick='whatsapp()' data-action='share/whatsapp/share' style='position: absolute;top: 48px;margin: 10px;text-decoration: none;color:#505050; cursor: pointer;'>Whatsapp</a>" +
	"<a onclick='urll()' style='position: absolute;top: 72px;margin: 10px;text-decoration: none;color:#505050; cursor: pointer;'> URL</a>" +
	"<a href='" + linkmarker + "' style='position: absolute;top: calc(40vw + 10px);left: 10px; margin: 10px;text-decoration: none;color:#4846ae;' download>Download Image Marker</a>" +
	"<button style='background-color: #4846ae;color: white;width:100%;position:absolute;bottom:0px;left:0px;padding:10px;' onclick='xyz()'> Watch AR Experience </button>" +
	"</div>";
var end =
	"<div id='ytmodal' class='modal' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><button type='button' onclick='ytremove(this);' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><br></div><div class='modal-body'><iframe id='ytembed' src='' width='100%' height='60%' frameborder=0px allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen ></iframe></div></div></div></div>" +
	"<script> function linkvisit(linkid){window.open(linkid.href);} function urll() {window.open('" + linkmarker + "'); } function whatsapp() { window.open('whatsapp://send?text=" + document.location.href + "'); } function ytremove(e){document.getElementById('ytembed').src = '';} function ytset(e){ ytembed= document.getElementById('ytembed'); ytembed.src= 'https://www.youtube.com/embed/'+e.dataset.source; } function facebook(){window.open('https://www.facebook.com/sharer/sharer.php?u=#" + document.location.href + "');} function audioset(e){var x= document.getElementById(e.dataset.source);x.play();} function xyz(){document.getElementById('splashscreen').style.display= 'none';}</script></body></html>";

// var file;


if (expid != 0)
	fetchExperience();
	
function readFile() {
	showEntities();
	console.log(start1 + marker + mid3d + mid2d + end);
	var file = start1 + marker + mid3d + mid2d + end1 + end;
	return file;
}

function showEntities() {
	var sceneEl = document.querySelector('#perswin');
	var els = sceneEl.querySelectorAll('.exp');
	var els2 = document.querySelectorAll('.exp2');
	mid3d = '';
	var temp = '';
	for (var i = 0; i < els.length; i++) {
		els[i].flushToDOM(true);
		if (els[i].object3D.visible) mid3d += els[i].outerHTML;
	}
	for (var j = 0; j < els2.length; j++) {

		if (els2[j].classList.contains("linkbttn")) {
			els2[j].setAttribute('onclick', 'linkvisit(this)');
		}
		temp += els2[j].outerHTML;
		console.log(els2[j]);
	}
	console.log(temp)
	mid2d += temp;
	return mid3d+mid2d ;
6
}

function sharelnk(e) {
	console.log('reached share');
	
	// if expid == 0 else {editExperiance}
	var exptxt = document.getElementById('exptxt');
		exptxt.value = readFile();
	if (expid == 0) {
		let form = document.querySelector('#form0');
		let formData = new FormData(form);
		console.log(formData);
		$.ajax({
			method: 'POST',
			url: 'https://pitchar.io/pitchar_api/_post_experience.php',
			data: formData,
			processData: false,
			contentType: false,
			xhr: function () {
				var xhr = new window.XMLHttpRequest();

				// Upload progress
				xhr.upload.addEventListener(
					'progress',
					function (evt) {
						if (evt.lengthComputable) {
							var percentComplete = evt.loaded / evt.total;
							//Do something with upload progress
							uploadbar.style.width = percentComplete * 100 + '%';
							if (percentComplete == 1) uploadbar.style.width = 0;
						}
					},
					false
				);

				// Download progress
				xhr.addEventListener(
					'progress',
					function (evt) {
						if (evt.lengthComputable) {
							var percentComplete = evt.loaded / evt.total;
							// Do something with download progress
							uploadbar.style.width = percentComplete * 100 + '%';
							if (percentComplete == 1) uploadbar.style.width = 0;
						}
					},
					false
				);

				return xhr;
			},
			success(data) {
				console.log(data);
				uploadbar.style.width = 0;
				console.log(data.Data.share_experience)
				document.getElementById('shrlnk').value = data.Data.share_experience;
				//window.location.href= "http://studio.pitchar.io/build/?token="+token+"&edit="+data.Data.id;
				edit_Id = data.Data.id;
				console.log(edit_Id + "= editid");

			}});

	} else {
		editExperience(exptxt.value);
	}


	console.log(k);

}
function gotolink() {
	var k = document.getElementById('shrlnk').value;
	window.location.href= "http://studio.pitchar.io/build/?token="+token+"&edit="+edit_Id;
	window.open(k);
	
	console.log(token + edit_Id);
}

function selectMarker(e) {
	$.ajax({
		method: 'POST',
		url: 'https://pitchar.io/pitchar_api/_fetch_marker.php',
		data: { authtoken: token, submit: 1, id: e.dataset.markerid },
		success(data) {
			console.log(data);
			start1 =
				"<html><head><script src='https://aframe.io/releases/0.9.0/aframe.min.js'></script><script src='https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js'></script>" +
				"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>" +
				"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script></head>" +
				"<body style='margin : 0px; overflow: hidden;'>" +
				"<a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam;debugUIEnabled: false;'>";
			end1 = "<div id='splashscreen' style='background-color: white; height:100% ; width:100%; position:absolute; top:0px; left:0px; z-index:4;'>" +
				"<img src='https://upload.wikimedia.org/wikipedia/commons/4/48/Hiro_marker_ARjs.png' width='40%' style='margin: 10px;float:left;'>" +
				"<a href='#' style='position: absolute;top: 0px;margin: 10px;text-decoration: none;color:#4846ae;'>Share Marker</a>" +
				"<a onclick='facebook()' style='position: absolute;top: 24px;margin: 10px;text-decoration: none;color: #505050; cursor: pointer;'>Facebook</a>" +
				"<a onclick='whatsapp()' data-action='share/whatsapp/share' style='position: absolute;top: 48px;margin: 10px;text-decoration: none;color:#505050; cursor: pointer;'>Whatsapp</a>" +
				"<a onclick='urll()' style='position: absolute;top: 72px;margin: 10px;text-decoration: none;color:#505050; cursor: pointer;'> URL</a>" +
				"<a href='" + data.Data[0].linkmarker + "' style='position: absolute;top: calc(40vw + 10px);left: 10px; margin: 10px;text-decoration: none;color:#4846ae;' download>Download Image Marker</a>" +
				"<button style='background-color: #4846ae;color: white;width:100%;position:absolute;bottom:0px;left:0px;padding:10px;' onclick='xyz()'> Watch AR Experience </button>" +
				"</div>";
			end =
				"<div id='ytmodal' class='modal' tabindex='-1' role='dialog'><div class='modal-dialog' role='document'><div class='modal-content'><div class='modal-header'><button type='button' onclick='ytremove(this);' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button><br></div><div class='modal-body'><iframe id='ytembed' src='' width='100%' height='60%' frameborder=0px allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen ></iframe></div></div></div></div>" +
				"<script>  function urll(){ window.open('" + data.Data[0].linkmarker + "'); } function whatsapp() { window.open('whatsapp://send?text=" + document.location.href + "'); } function ytremove(e){document.getElementById('ytembed').src = '';} function ytset(e){ ytembed= document.getElementById('ytembed'); ytembed.src= 'https://www.youtube.com/embed/'+e.dataset.source; } function facebook(){window.open('https://www.facebook.com/sharer/sharer.php?u=#" + document.location.href + "');} function audioset(e){var x= document.getElementById(e.dataset.source);x.play();} function xyz(){document.getElementById('splashscreen').style.display= 'none';}</script></body></html>";
			mid2d = '</a-marker-camera></a-scene>';
			marker = "<a-marker preset='pattern' type='pattern' url=" + "'" + data.Data[0].linkpatt + "'" + ">";
			var logo = document.getElementById('imglogo');
			logo.setAttribute('src', data.Data[0].linkmarker);
			//	logo.object3D.position.z = -1.5;
			$('#choosemarker .close').click();
			$('.modal-backdrop').remove();
			var fullMarkerImage = document.createElement('img');
			fullMarkerImage.src = data.Data[0].linkmarker;
			var container = document.querySelector('#object-panel');
			while (container.firstChild) container.removeChild(container.firstChild);
			container.appendChild(fullMarkerImage);
		}
	});
}

function resetMarker(e) {
	start1 =
		"<html><head><script src='https://aframe.io/releases/0.9.0/aframe.min.js'></script><script src='https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js'></script>" +
		"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>" +
		"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script></head>" +
		"<body style='margin : 0px; overflow: hidden;'>" +
		"<a-scene vr-mode-ui='enabled: false' arjs='sourceType: webcam;debugUIEnabled: false;'>";

	mid2d = '</a-marker-camera></a-scene>';

	marker = "<a-marker-camera preset='hiro'>";
	var fullMarkerImage = document.createElement('img');
	fullMarkerImage.src = "marker/hiro.png";
	var logo = document.getElementById('imglogo');
	logo.setAttribute('src', "marker/hiro.png");
	var container = document.querySelector('#object-panel');
	while (container.firstChild) container.removeChild(container.firstChild);
	container.appendChild(fullMarkerImage);
	//	logo.object3D.position.z = -1.5;
	$('#choosemarker .close').click();
	$('.modal-backdrop').remove();
}

function markerless(e) {
	start1 =
		"<html><head><script src='https://aframe.io/releases/0.9.0/aframe.min.js'></script><script src='https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.0/aframe/build/aframe-ar.js'></script>" +
		"<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'>" +
		"<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script></head>" +
		"<body style='margin : 0px; overflow: hidden;'>" +
		" <a-scene embedded arjs='debugUIEnabled: false;' vr-mode-ui='enabled: false'> ";
	marker = "";
	mid2d = '</a-scene>';
	var logo = document.getElementById('imglogo');
	logo.setAttribute('src', "#");
	//	logo.object3D.position.z = -1.5;
	$('#choosemarker .close').click();
	$('.modal-backdrop').remove();
}

function fetchExperience() {
	$.ajax({
		method: 'POST',
		url: 'https://pitchar.io/pitchar_api/_fetch_experience.php',
		data: { authtoken: token, experienceid: expid, submit: 1 },
		success(data) {
			var dom = document.createElement('html');
			var scene = document.getElementById('perswin');
			dom.innerHTML = data.Data[0].experience;
			var els = dom.querySelectorAll('.exp');
			var els2 = dom.querySelectorAll('.exp2');
			console.log(els2);
			for (var i = 0; i < els.length; i++) {
				scene.appendChild(els[i]);
			}
			for (var i = 0; i < els2.length; i++) {
				document.getElementById('d2').appendChild(els2[i]);
				console.log(dom);
			}
		}
	});
}

function editExperience(exptxt) {
	$.ajax({
		method: 'POST',
		url: 'https://pitchar.io/pitchar_api/_edit_post_experience.php',
		data: { authtoken: token, id: expid, submit: 1, experience: exptxt},
		success(data) {
				console.log(data);
				uploadbar.style.width = 0;
				document.getElementById('shrlnk').value = data.Data.share_experience;
			
		}
	});
}