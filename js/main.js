String.prototype.rtrimChar = function (find) {
	var reg = new RegExp("[" + find + "]+$", "g");
	return this.replace(reg, '');
}

function loader(opts) {
	// var size = 10,			// px
	// 	points = 5,
	// 	ray = 100,			// px
	// 	color1 = '#000',
	// 	color2 = '#FFF',
	// 	speedN = 2;		// seconds

	var size = new Number(opts.size),			// px
		points = new Number(opts.points),
		loaderSize = new Number(opts.loaderSize),			// px
		color1 = opts.color1,
		color2 = opts.color2,
		speedN = new Number(opts.speed);		// seconds

	var string = '',
		umLenght = 'px',
		umTime = 's',
		animationName = 'shadow',
		ray = (loaderSize - size) / 2,
		//angle = 360 / points,	// deg
		angle = Math.PI * 2 / points, // radians
		loaderHeight = loaderWidth = loaderSize,
		speed = speedN + umTime,
		frame = 100 / points,
		prefix = ['-webkit-', '-moz-', '-o-', ''];

	function shadow(sel) {
		var result = [],
			color,
			x = y = 0;
		for (var i = 0; i < points; i++) {
			x = (ray * Math.cos(angle * i)).toFixed(15).rtrimChar('0').rtrimChar('.');
			y = (ray * Math.sin(angle * i)).toFixed(15).rtrimChar('0').rtrimChar('.');
			x = (x == 0) ? x : x + umLenght;
			y = (y == 0) ? y : y + umLenght;
			color = color1;
			if (sel === i) {
				color = color2;
			}
			result.push( [x, y, color].join(' ') );
		}
		return result.join(', ');
	}

	function keyframes() {
		var time,
			result = '';
		for (var i = 0; i <= points; i++) {
			time = frame * i;
			result += "\
	" + time + "% {\n\
		box-shadow: " + shadow(i - 1) + ";\n\
	}\n";
		}
		return result;
	}

	function prefixKeyframes() {
		var string = '';
		for (var i = 0; i < prefix.length; i++) {
			string += "\
@" + prefix[i] + "keyframes " + animationName + " {\n\
" + keyframes() + "\
}\n";
		}
		return string;
	}


	string = "\
.loader {\n\
	height: " + loaderHeight + umLenght + ";\n\
	width: " + loaderWidth + umLenght + ";\n\
	position: relative;\n\
}\n\
.loader:after {\n\
	background: transparent;\n\
	border-radius: 100%;\n\
	content: '';\n\
	display: block;\n\
	height: " + size + umLenght + ";\n\
	width: " + size + umLenght + ";\n\
	position: absolute;\n\
	top: " + ray + umLenght + ";\n\
	left: " + ray + umLenght +";\n\
	-webkit-animation: " + animationName + " " + speed + " steps(" + points + ") infinite;\n\
	animation: " + animationName + " " + speed + " steps(" + points + ") infinite;\n\
	box-shadow: " + shadow(0) + ";\n\
}\n\
" + //+ prefixKeyframes();
"@-webkit-keyframes shadow {\n\
  0% {\n\
    -webkit-transform: rotate(0deg);\n\
  }\n\
  100% {\n\
    -webkit-transform: rotate(360deg);\n\
  }\n\
}\n\
@-moz-keyframes shadow {\n\
  0% {\n\
    -moz-transform: rotate(0deg);\n\
  }\n\
  100% {\n\
    -moz-transform: rotate(360deg);\n\
  }\n\
}\n\
@-o-keyframes shadow {\n\
  0% {\n\
    -o-transform: rotate(0deg);\n\
  }\n\
  100% {\n\
    -o-transform: rotate(360deg);\n\
  }\n\
}\n\
@keyframes shadow {\n\
  0% {\n\
    transform: rotate(0deg);\n\
  }\n\
  100% {\n\
    transform: rotate(360deg);\n\
  }\n\
}";


	return string;
}


function loader1(opts) {
	var size = new Number(opts.size),			// px
		points = new Number(opts.points),
		loaderSize = new Number(opts.loaderSize),			// px
		color1 = opts.color1,
		size2 = opts.size2,
		speedN = new Number(opts.speed);		// seconds

	var string = '',
		umLenght = 'px',
		umTime = 's',
		animationName = 'shadow',
		ray = (loaderSize - size) / 2,
		//angle = 360 / points,	// deg
		angle = Math.PI * 2 / points, // radians
		loaderHeight = loaderWidth = loaderSize,
		speed = speedN + umTime,
		frame = 100 / points,
		prefix = ['-webkit-', '-moz-', '-o-', ''];

	function shadow(sel) {
		var result = [],
			color,
			dim,
			n,
			x = y = 0,
			p = points - 1;
		for (var i = 0; i < points; i++) {
			x = (ray * Math.cos(angle * i)).toFixed(5).rtrimChar('0').rtrimChar('.');
			y = (ray * Math.sin(angle * i)).toFixed(5).rtrimChar('0').rtrimChar('.');
			x = (x == 0) ? x : x + umLenght;
			y = (y == 0) ? y : y + umLenght;
			color = color1;
			n = Math.abs(sel - i);
			if (i < sel) {
				n = points - n;
			}
			dim = (size2 - ((size2 - size) / p * (p - n))).toFixed(5).rtrimChar('0').rtrimChar('.');
			dim = (dim == 0) ? dim : dim + umLenght;
			result.push( [x, y, 0, dim, color].join(' ') );
		}
		return result.join(', ');
	}

	function keyframes() {
		var time,
			result = '';
		for (var i = 0; i <= points; i++) {
			time = frame * i;
			result += "\
	" + time + "% {\n\
		box-shadow: " + shadow(i) + ";\n\
	}\n";
		}
		return result;
	}

	function prefixKeyframes() {
		var string = '';
		for (var i = 0; i < prefix.length; i++) {
			string += "\
@" + prefix[i] + "keyframes " + animationName + " {\n\
" + keyframes() + "\
}\n";
		}
		return string;
	}


	string = "\
.loader {\n\
	height: " + loaderHeight + umLenght + ";\n\
	width: " + loaderWidth + umLenght + ";\n\
	position: relative;\n\
}\n\
.loader:after {\n\
	background: transparent;\n\
	border-radius: 100%;\n\
	content: '';\n\
	display: block;\n\
	height: " + size + umLenght + ";\n\
	width: " + size + umLenght + ";\n\
	position: absolute;\n\
	top: " + ray + umLenght + ";\n\
	left: " + ray + umLenght +";\n\
	-webkit-animation: " + animationName + " " + speed + " infinite linear;\n\
	animation: " + animationName + " " + speed + " infinite linear;\n\
	box-shadow: " + shadow(0) + ";\n\
}\n\
" + prefixKeyframes();

	return string;
}