var enActive = true;
function toggle()
{
	if (enActive)
	{
		document.getElementById('encrypt').style.width = "0vw";
		document.getElementById('decrypt').style.width = "100vw";
		document.getElementById('decrypt').style.left = "0vw";
		document.getElementById('arrow').style.transform = "rotate(180deg)";
		enActive = false;
	}
	else
	{
		document.getElementById('encrypt').style.width = "100vw";
		document.getElementById('decrypt').style.width = "0vw";
		document.getElementById('decrypt').style.left = "100vw";
		document.getElementById('arrow').style.transform = "rotate(0deg)";
		enActive = true;
	}
}
function generateImage()
{
	var txt = document.getElementById('txtEncrypt').value;
	var can = document.getElementById('enCanvas');
	var ctx = can.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	var h = null;
	var w = null;
	while(h==null)
	{
		for(var i=Math.floor(Math.sqrt(txt.length)); (i > 1)&&(h==null);i-- )
		{
			if (txt.length%i==0)
			{
				w=txt.length/i;
				h=i;
			}
		}
		if (h==null)
		{
			txt += " ";
		}
	}
	can.width = w;
	can.height = h;
	for(var i = 0; i<h*w; i++)
	{
		var clrCode = "#" + txt.charCodeAt(i).toString(16)[0] + txt.charCodeAt(i).toString(16)[0] + txt.charCodeAt(i).toString(16)[0] + txt.charCodeAt(i).toString(16)[1] +txt.charCodeAt(i).toString(16)[1] +txt.charCodeAt(i).toString(16)[1];
		ctx.fillStyle = clrCode;
		ctx.fillRect(i%w, Math.floor(i/w), 1, 1);
	}
	var a  = document.createElement('a');
    a.href = can.toDataURL('image/png');
    a.download = 'Output.png';
    a.click();
}
function decryptImage()
{
	var img = new Image();
	var file = document.getElementById('fileUp').files[0];
	var reader  = new FileReader();
	var out = document.getElementById('outText');
	var canv = document.createElement('canvas');
    var cntx = canv.getContext("2d");
	reader.addEventListener("load", function () {
		img.src = reader.result;
		}, false);
	if (file)
	{
		reader.readAsDataURL(file);
	}
	img.onload = function() {
		canv.width = this.width;
		canv.height = this.height;
		cntx.drawImage(img, 0, 0);
		out.value = "";
		for(var i = 0; i<canv.width*canv.height;i++)
		{
			var imgd = cntx.getImageData(0, 0, canv.width, canv.height);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4)
			{
				out.value += String.fromCharCode(pix[i+1]);
			}
			
		}
	}
}