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
			x = (ray * Math.cos(angle * i)).toFixed(5).rtrimChar('0').rtrimChar('.');
			y = (ray * Math.sin(angle * i)).toFixed(5).rtrimChar('0').rtrimChar('.');
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
				" + time + "% {\
					box-shadow: " + shadow(i - 1) + ";\
				}\
			";
		}
		return result;
	}

	function prefixKeyframes() {
		var string = '';
		for (var i = 0; i < prefix.length; i++) {
			string += "@" + prefix[i] + "keyframes " + animationName + " {\
				" + keyframes() + "\
			}";
		}
		return string;
	}


	string = "\
.loader {\
	height: " + loaderHeight + umLenght + ";\
	width: " + loaderWidth + umLenght + ";\
	position: relative;\
}\
.loader:after {\
	background: transparent;\
	border-radius: 100%;\
	content: '';\
	display: block;\
	height: " + size + umLenght + ";\
	width: " + size + umLenght + ";\
	position: absolute;\
	top: " + ray + umLenght + ";\
	left: " + ray + umLenght +";\
\
	-webkit-animation: " + animationName + " " + speed + " infinite linear;\
	        animation: " + animationName + " " + speed + " infinite linear;\
	box-shadow: " + shadow(0) + ";\
}\
" + prefixKeyframes() + "\
";

	return string;
}