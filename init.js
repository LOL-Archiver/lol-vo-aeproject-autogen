this.T = {
	enumLine: function(arrEvent, callback) {
		var index = 0;

		for(var eid = 0; eid <= (arrEvent.length - 1); eid++) {
			var event = arrEvent[eid];

			for(var lid = 0; lid < event.arrLine.length; lid++) {
				var line = event.arrLine[lid];

				if(line.duration) {
					callback(line, event, lid, eid, index++);
				}
			}
		}
	},
	each: function each(parent, callback) {
		if(!(parent instanceof Project) && !(parent instanceof FolderItem)) { throw 'parent cannot forEach'; }
		if(!(callback instanceof Function)) { throw 'callback not Function'; }

		var arrItem = [];
		var item;
		var i;

		for(i = 1; i <= parent.numItems; i++) {
			arrItem.push(parent.item(i));
		}

		for(i = 0; i < arrItem.length; i++) {
			item = arrItem[i];

			callback(item, i);
		}
	},
	find: function find(name, parent) {
		var result;

		if(!parent) {
			parent = app.project;
		}

		T.each(parent, function(item) {
			if(item.name == name) {
				result = item;
			}
		});

		return result;
	},
	rgb: function rgb(r, g, b) {
		return [(r / 255).toFixed(4), (g / 255).toFixed(4), (b / 255).toFixed(4)];
	},
	readFile: function readFile(path, encoding) {
		var file = new File(path);

		if(encoding) {
			file.encoding = encoding;
		}

		file.open('r');

		var text = file.read();

		file.close();

		return text;
	},
	ensureFolder: function(name, parent) {
		var folderItem;

		T.each(parent, function(item) {
			if(item instanceof FolderItem) {
				if(name == item.name) {
					folderItem = item;
				}
			}
		});

		return folderItem || parent.items.addFolder(name);
	},
	getBoxSize: function getBoxSize(text) {
		var fontSize = C.size.fontLine;
		var heightLeading = C.size.heightLeading;
		var widthMax = 1080;
		var heightMax = 1080;

		var layerLine = T.compMain.layers.addBoxText([widthMax, heightMax], text);

		var textDocLine = layerLine.sourceText.value;
		textDocLine.resetCharStyle();
		textDocLine.fontSize = fontSize;
		textDocLine.font = 'Source Han Mono SC';
		textDocLine.applyStroke = true;
		textDocLine.strokeWidth = 2;
		textDocLine.text = text;
		textDocLine.name = 'Test';
		textDocLine.leading = fontSize + heightLeading;
		layerLine.sourceText.setValue(textDocLine);

		var rect = layerLine.sourceRectAtTime(0, false);

		var widthBox = Math.ceil(rect.width) + fontSize;
		var lineBox = Math.round((rect.height - fontSize) / (fontSize + heightLeading)) + 1;

		layerLine.remove();

		return [widthBox, lineBox * (fontSize + heightLeading) - heightLeading, lineBox];
	},
	getBoxSizeMark: function getBoxSize(text) {
		var fontSize = C.size.fontMark;
		var heightLeading = C.size.heightLeading;
		var widthMax = 1080;
		var heightMax = 1080;

		var layerLine = T.compMain.layers.addBoxText([widthMax, heightMax], text);

		var textDocLine = layerLine.sourceText.value;
		textDocLine.resetCharStyle();
		textDocLine.fontSize = fontSize;
		textDocLine.font = 'Source Han Mono SC';
		textDocLine.applyStroke = true;
		textDocLine.strokeWidth = 1;
		textDocLine.text = text;
		textDocLine.name = 'TestMark';
		textDocLine.leading = fontSize + heightLeading;
		layerLine.sourceText.setValue(textDocLine);

		var rect = layerLine.sourceRectAtTime(0, false);

		var widthBox = Math.ceil(rect.width) + fontSize;
		var lineBox = Math.round((rect.height - fontSize) / (fontSize + heightLeading)) + 1;

		layerLine.remove();

		return [widthBox, lineBox * (fontSize + heightLeading) - heightLeading, lineBox];
	},
	parseConfig: function parseConfig(str) {
		return str.replace(/\$\{.+?\}/g, function(text) {
			C;
			try {
				return eval(text.replace(/(^\$\{)|(\}$)/g, ''));
			}
			catch(error) {
				return text;
			}
		});
	}
};

var file = new File(C.path.logFile);
file.encoding = 'UTF8';
file.open('a');

this.L = function log() {
	var text = [];

	for(var key in arguments) {
		if(key == '0' || ~~key) {
			text.push(arguments[key]);
		}
	}

	file.writeln.apply(file, [text.join(' ')]);
};
this.L.end = function() {
	file.close();
};

this.D = {
	interval: C.duration.interval,
	title: C.duration.title,
	credit: C.duration.credit
};

this.P = {};
// @include 'part/calcDuration.js';
// @include 'part/addLine.js';
// @include 'part/addLineScroll.js';
// @include 'part/addTitle.js';
// @include 'part/addCredit.js';
// @include 'part/addBgm.js';
// @include 'part/addWaterMark.js';
// @include 'part/addCounter.js';

L('-------date-------'.replace('date', new Date()));