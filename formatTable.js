function rowHeights(rows) {
	return rows.map(function (row) {
		return row.reduce(function(max, cell){
			return Math.max(max, cell.minHeight());
		},0);
	});
}

function colWidths(rows){
	return rows[0].map(function(_, i){
		return rows.reduce(function(max, row){
			return Math.max(max, row[i].minWidth());
		}, 0);
	});
}

function drawTable(rows){
	let heights = rowHeights(rows);
	let widths = colWidths(rows);

	function drawLine(blocks, lineNo){
		return blocks.map(function(block){
			return block[lineNo];
		}).join(" ");
	}

	function drawRow(row, rowNum) {
		let blocks = row.map(function(cell,colNum){
			return cell.draw(widths[colNum], heights[rowNum]);
		});
		return blocks[0].map(function(_, lineNo){
			return drawLine(blocks, lineNo);
		}).join("n");
	}
	return rows.map(drawRow).join("\n");
}

function repeat(string, times){
	let result = "";
	for(let i = 0; i < times; i++) result += string;
	return result;
}

function TextCell(text){
	this.text = text.split("\n");
}
TextCell.prototype.minWidth = function(){
	return this.text.reduce(function(width,line){
		return Math.max(width, line.length);
	}, 0);
};
TextCell.prototype.minHeight = function(){
	return this.text.length;
}
TextCell.prototype.draw = function(width, height){
	let result = [];
	for(let i = 0; i < height; i++){
		let line = this.text[i] || "";
		result.push(line + repeat(" ", width - line.length));
	}
	return result;
};
//Сейчас попробуем построить шахматную доску 10*10
let rows = [];
for(let i = 0; i < 10; i++){
	let row = [];
	for(let j = 0; j < 10; j++){
		if((j+i)%2 == 0) row.push(new TextCell("#"));
		else row.push(new TextCell(" "));
	}
	rows.push(row);
}
console.log(drawTable(rows));

function UnderlinedCell(inner) {
	this.inner = inner;
};
UnderlinedCell.prototype.minWidth = function(){
	return this.inner.minWidth();
}
UnderlinedCell.prototype.minHeight = function(){
	return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height){
	return this.inner.draw(width,height-1).concat([repeat("-",width)]);
};

function dataTable(data){
	let keys = Object.keys(data[0]);
	let headers = keys.map(function(name){
		return new UnderlinedCell(new TextCell(name));
	});
	let body = data.map(function(row){
		return keys.map(function(name){
			let value = row[name];
			if(typeof value == "number")return new RTextCell(String(value));
			else return new TextCell(String(value));
			
		});
	});
	return [headers].concat(body);
}
console.log(drawTable(dataTable(rows)));

function RTextCell(text){
	TextCell.call(this,text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height){
	let result = [];
	for(let i = 0; i < height; i++){
		let line = this.text[i] || "";
		result.push(repeat(" ", width - line.length) + line);
	}
	return result;
};