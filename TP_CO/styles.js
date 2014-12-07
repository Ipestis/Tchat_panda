var s = {};

/* 
 * Example Use : 
 * $ node
 * require("./styles.js").add_theme();
 * console.log("test".cyan);
 *
 */

exports.add_theme = function () {
	for (a in s.styles) {
		s.apply_styles(a);
	}
};

s.styles = {
	//styles
	"bold"      : ["\x1B[1m",  "\x1B[22m"],
	"italic"    : ["\x1B[3m",  "\x1B[23m"],
	"underline" : ["\x1B[4m",  "\x1B[24m"],
	"inverse"   : ["\x1B[7m",  "\x1B[27m"],
	"strikethrough" : ["\x1B[9m",  "\x1B[29m"],
	
	//text colors
	//grayscale
	"black"     : ["\x1B[30m", "\x1B[39m"],
	"grey"      : ["\x1B[37m", "\x1B[39m"],
	"dgrey"     : ["\x1B[90m", "\x1B[39m"],
	"white"     : ["\x1B[97m", "\x1B[39m"],
	//colors
	"red"       : ["\x1B[31m", "\x1B[39m"],
	"green"     : ["\x1B[32m", "\x1B[39m"],
	"yellow"    : ["\x1B[33m", "\x1B[39m"],
	"blue"      : ["\x1B[34m", "\x1B[39m"],
	"magenta"   : ["\x1B[35m", "\x1B[39m"],
	"cyan"      : ["\x1B[36m", "\x1B[39m"],
	//light colors
	"lred"      : ["\x1B[91m", "\x1B[39m"],
	"lgreen"    : ["\x1B[92m", "\x1B[39m"],
	"lyellow"   : ["\x1B[93m", "\x1B[39m"],
	"lblue"     : ["\x1B[94m", "\x1B[39m"],
	"lmagenta"  : ["\x1B[95m", "\x1B[39m"],
	"lcyan"     : ["\x1B[96m", "\x1B[39m"],
	
	//background colors
	//grayscale
	"blackBG"     : ["\x1B[40m", "\x1B[49m"],
	"greyBG"      : ["\x1B[47m", "\x1B[49m"],
	"dgreyBG"     : ["\x1B[100m", "\x1B[49m"],
	"whiteBG"       : ["\x1B[107m", "\x1B[49m"],
	//colors
	"redBG"       : ["\x1B[41m", "\x1B[49m"],
	"greenBG"     : ["\x1B[42m", "\x1B[49m"],
	"yellowBG"    : ["\x1B[43m", "\x1B[49m"],
	"blueBG"      : ["\x1B[44m", "\x1B[49m"],
	"magentaBG"   : ["\x1B[45m", "\x1B[49m"],
	"cyanBG"      : ["\x1B[46m", "\x1B[49m"],
	//light colors
	"lredBG"      : ["\x1B[101m", "\x1B[49m"],
	"lgreenBG"    : ["\x1B[102m", "\x1B[49m"],
	"lyellowBG"   : ["\x1B[103m", "\x1B[49m"],
	"lblueBG"     : ["\x1B[104m", "\x1B[49m"],
	"lmagentaBG"  : ["\x1B[105m", "\x1B[49m"],
	"lcyanBG"     : ["\x1B[106m", "\x1B[49m"]
};

s.linux_styles = {
	"pink"    : ["\x1b[38;5;200m", "\x1b[39m"]
};

s.apply_styles = function (a) {
	String.prototype.__defineGetter__(a, function ()  {
		return s.styles[a][0] + this + s.styles[a][1];
	});
};
