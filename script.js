window.onload = function() {
	var node = document.getElementById("divTetris");
	divTetris(node);
};

var divTetris = function(parentNode) {
	var divs = {
		container: null,
		game: {
			node: null,
			rows: 16,
			cols: 10,
			blocks: []
		},
		next: {
			node: null,
			side: 4,
			blocks: []
		},
		pause: {
			node: null,
			text: ["Start!", "Paused", "Game over!"]
		}
	};

	divs.game.xStart = Math.floor((divs.game.cols - divs.next.side) / 2);
	divs.game.yStart = -divs.next.side;

	var block = {
		node: null,
		display: true,
		setDisplay: function(display) {
			if (display) {
				this.node.style.visibility = "visible";
			} else {
				this.node.style.visibility = "hidden";
			}
			this.display = display;
		}
	};

	var tetromino = {};

	tetromino.current = {
		tetromino: null,
		number: 0,
		direction: 0,
		x: 0,
		y: 0
	};

	tetromino.next = {
		tetromino: [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		],
		number: 0,
		direction: 0
	};

	tetromino.collection = [
		[ // I
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0]
			],
			[
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0]
			],
			[
				[0, 0, 0, 0],
				[1, 1, 1, 1],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]
		],
		[ // J
			[
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 1, 1],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 1, 0],
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 1],
				[0, 0, 0, 1],
				[0, 0, 0, 0]
			]
		],
		[ // L
			[
				[0, 1, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 1, 0],
				[1, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[1, 1, 1, 0],
				[1, 0, 0, 0],
				[0, 0, 0, 0]
			]
		],
		[ // O
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			]
		],
		[ // S
			[
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 1, 1],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 1, 1],
				[0, 1, 1, 0],
				[0, 0, 0, 0]
			]
		],
		[ // T
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[1, 1, 1, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 1, 1, 0],
				[0, 1, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 1, 1, 0],
				[0, 1, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[1, 1, 0, 0],
				[0, 1, 0, 0]
			]
		],
		[ // Z
			[
				[0, 0, 1, 0],
				[0, 1, 1, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 1],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 1, 0],
				[0, 1, 1, 0],
				[0, 1, 0, 0],
				[0, 0, 0, 0]
			],
			[
				[0, 0, 0, 0],
				[0, 1, 1, 0],
				[0, 0, 1, 1],
				[0, 0, 0, 0]
			]
		]
	];

	tetromino.chooseNext = function() {
		var tetLen = this.collection.length;
		var tetNum = Math.floor(Math.random() * tetLen);
		tetNum = (tetNum === tetLen) ? (tetLen - 1) : tetNum;
		var tetDir = Math.floor(Math.random() * 4);
		tetDir = (tetDir === 4) ? 3 : tetDir;

		this.current.tetromino = this.next.tetromino;
		this.current.number = this.next.number;
		this.current.direction = this.next.direction;
		this.current.x = divs.game.xStart;
		this.current.y = divs.game.yStart;

		this.next.tetromino = this.collection[tetNum][tetDir];
		this.next.number = tetNum;
		this.next.direction = tetDir;

		for (var i = 0; i < divs.next.side; i++) {
			for (var j = 0; j < divs.next.side; j++) {
				divs.next.blocks[i][j].setDisplay(this.next.tetromino[i][j]);
			}
		}
	};

	tetromino.move = function(xChanging, yChanging) {
		if (this.checkPaste(xChanging, yChanging)) {
			this.cutTetronimo();
			this.current.x += xChanging;
			this.current.y += yChanging;
			this.pasteTetronimo();
			return true;
		}
		return false;
	};

	tetromino.rotate = function() {
		this.cutTetronimo();
		var oldDirection = this.current.direction;
		this.current.direction = (this.current.direction + 1) % 4;
		this.current.tetromino = this.collection[this.current.number][this.current.direction];
		if (!this.checkPaste(0, 0)) {
			this.current.direction = oldDirection;
			this.current.tetromino = this.collection[this.current.number][this.current.direction];
		}
		this.pasteTetronimo();
	};

	tetromino.cutTetronimo = function() {
		for (var i = 0; i < divs.next.side; i++) {
			var yBlock = this.current.y + i;
			if (yBlock >= 0) {
				for (var j = 0; j < divs.next.side; j++) {
					if (this.current.tetromino[i][j] !== 0) {
						divs.game.blocks[yBlock][this.current.x + j].setDisplay(0);
					}
				}
			}
		}
	};

	tetromino.checkPaste = function(xChanging, yChanging) {
		for (var i = 0; i < divs.next.side; i++) {
			var yBlock = this.current.y + yChanging + i;
			var yTetBlock = yChanging + i;
			for (var j = 0; j < divs.next.side; j++) {
				if (this.current.tetromino[i][j] !== 0) {
					var xBlock = this.current.x + xChanging + j;
					var xTetBlock = xChanging + j;
					if (xBlock < 0 || xBlock >= divs.game.cols) {
						return false;
					}
					if (yBlock >= divs.game.rows) {
						return false;
					}
					if (yBlock >= 0) {
						if (divs.game.blocks[yBlock][xBlock].display) {
							if ((xTetBlock >= 0) && (xTetBlock < divs.next.side) && (yTetBlock < divs.next.side)) {
								if (this.current.tetromino[yTetBlock][xTetBlock] === 0) {
									return false;
								} else {
									if (xChanging === 0 && yChanging === 0) {
										return false;
									}
								}
							} else {
								return false;
							}
						}
					}
				}
			}
		}
		return true;
	};

	tetromino.pasteTetronimo = function() {
		for (var i = 0; i < divs.next.side; i++) {
			var yBlock = this.current.y + i;
			if (yBlock >= 0) {
				for (var j = 0; j < divs.next.side; j++) {
					if (this.current.tetromino[i][j] !== 0) {
						var xBlock = this.current.x + j;
						divs.game.blocks[yBlock][xBlock].setDisplay(this.current.tetromino[i][j]);
					}
				}
			}
		}
	};

	var game = {};

	game.score = 0;

	game.speed = 1000;

	game.timer = null;

	game.paused = false;

	game.setGame = function() {
		parentNode.className += " tetris";

		divs.container = document.createElement("div");
		divs.container.className = "windowsContainer";
		divs.container.setAttribute("tabindex", "0");
		parentNode.appendChild(divs.container);

		divs.game.node = document.createElement("div");
		divs.game.node.className = "tetrisWindow";
		divs.container.appendChild(divs.game.node);

		var infoDiv = document.createElement("div");
		infoDiv.className = "tetrisWindow infoWindow";
		infoDiv.innerHTML = "SCORE:<br/><br/>";
		divs.container.appendChild(infoDiv);

		var scoreDiv = document.createElement("div");
		scoreDiv.className = "scoreLine";
		scoreDiv.innerHTML = game.score;
		infoDiv.appendChild(scoreDiv);

		infoDiv.innerHTML += "<br/><br/><br/>NEXT:<br/><br/>";

		divs.next.node = document.createElement("div");
		divs.next.node.className = "nextWindow";
		infoDiv.appendChild(divs.next.node);

		divs.pause.node = document.createElement("div");
		divs.pause.node.className = "pauseWindow";
		divs.pause.node.innerHTML = divs.pause.text[0];
		parentNode.appendChild(divs.pause.node);

		for (var i = 0; i < divs.game.rows; i++) {
			divs.game.blocks[i] = [];
			for (var j = 0; j < divs.game.cols; j++) {
				var blockDiv = document.createElement("div");
				blockDiv.className = "block";
				divs.game.node.appendChild(blockDiv);
				divs.game.blocks[i][j] = Object.create(block);
				divs.game.blocks[i][j].node = blockDiv;
			}
		}

		for (i = 0; i < divs.next.side; i++) {
			divs.next.blocks[i] = [];
			for (j = 0; j < divs.next.side; j++) {
				blockDiv = document.createElement("div");
				blockDiv.className = "block";
				divs.next.node.appendChild(blockDiv);
				divs.next.blocks[i][j] = Object.create(block);
				divs.next.blocks[i][j].node = blockDiv;
			}
		}

		divs.container.focus();

		divs.container.addEventListener("click", game.resetGame, false);
	};

	game.resetGame = function() {
		divs.container.removeEventListener("click", game.resetGame, false);
		divs.container.addEventListener("keydown", game.keyPress, false);
		divs.container.addEventListener("focus", game.focus, false);
		divs.container.addEventListener("blur", game.blur, false);
		divs.pause.node.innerHTML = divs.pause.text[1];
		divs.pause.node.style.visibility = "hidden";
		game.setScore(0);

		for (var i = 0; i < divs.game.rows; i++) {
			for (var j = 0; j < divs.game.cols; j++) {
				divs.game.blocks[i][j].setDisplay(0);
			}
		}

		tetromino.chooseNext();
		tetromino.chooseNext();

		game.speed = 1000;
		game.timer = setInterval(game.move, game.speed);
	};

	game.move = function() {
		if (!tetromino.move(0, 1)) {
			game.checkScore();
			game.checkGameOver();
		}
	};

	game.checkScore = function() {
		var lines = 0;
		var curLine = tetromino.current.y + divs.next.side - 1;
		if (curLine >= divs.game.rows) curLine = divs.game.rows - 1;

		for (var i = 0; i <= divs.next.side; i++) {
			var filled = true;
			for (var j = 0; j < divs.game.cols; j++) {
				if (!divs.game.blocks[curLine][j].display) {
					filled = false;
					break;
				}
			}
			if (filled) {
				lines++;
				this.scoreLine(curLine);
			} else {
				curLine--;
				if (curLine < 0) {
					break;
				}
			}
		}

		if (lines > 1) {
			this.addScore(100 * lines);
		}
	};

	game.scoreLine = function(line) {
		for (var i = line; i > 0; i--) {
			for (var j = 0; j < divs.game.cols; j++) {
				divs.game.blocks[i][j].setDisplay(divs.game.blocks[i - 1][j].display);
			}
		}
		this.addScore(100);
	};

	game.setScore = function(newScore) {
		this.score = newScore;
		divs.container.getElementsByClassName("scoreLine")[0].innerHTML = newScore;
	};

	game.addScore = function(scoreToAdd) {
		var oldScore = this.score;
		var newScore = oldScore + scoreToAdd;
		this.setScore(newScore);
		if (game.speed > 100 && (Math.floor(newScore / 1000) > Math.floor(oldScore / 1000))) {
			game.speed -= 10;
			clearInterval(this.timer);
			game.timer = setInterval(game.move, game.speed);
		}
	};

	game.checkGameOver = function() {
		for (var j = 0; j < divs.game.cols; j++) {
			if (divs.game.blocks[0][j].display) {
				this.gameOver();
				return;
			}
		}
		tetromino.chooseNext();
	};

	game.gameOver = function() {
		clearInterval(this.timer);
		divs.pause.node.innerHTML = divs.pause.text[2];
		divs.pause.node.style.visibility = "visible";
		divs.container.removeEventListener("keydown", game.keyPress, false);
		divs.container.removeEventListener("focus", game.focus, false);
		divs.container.removeEventListener("blur", game.blur, false);
		game.animateGameOver();
	};

	game.animateGameOver = function() {
		var i = divs.game.rows - 1;
		var j = 0;
		(function() {
			if (i >= 0) {
				divs.game.blocks[i][j].setDisplay(1);
				if ((j + 1) < divs.game.cols) {
					j++;
				} else {
					j = 0;
					i--;
				}
				setTimeout(arguments.callee, 20);
			} else {
				divs.container.addEventListener("click", game.resetGame, false);
			}
		})();
	};

	game.pause = function() {
		if (game.paused) {
			divs.pause.node.style.visibility = "hidden";
			game.timer = setInterval(game.move, game.speed);
		} else {
			divs.pause.node.style.visibility = "visible";
			clearInterval(this.timer);
		}
		game.paused = !game.paused;
	};

	game.focus = function() {
		if (game.paused) {
			divs.container.focus();
			game.pause();
		}
	};

	game.blur = function() {
		if (!game.paused) {
			game.pause();
		}
	};

	game.keyPress = function(e) {
		e.preventDefault();

		if (!game.paused) {
			switch (e.keyCode) {
				case 37: // Left
					tetromino.move(-1, 0);
					break;
				case 38: // Up
					tetromino.rotate();
					break;
				case 39: // Right
					tetromino.move(1, 0);
					break;
				case 40: // Down
					tetromino.move(0, 1);
					break;
				case 80: // P
					game.pause();
					break;
			}
		} else {
			if (e.keyCode === 80) {
				game.pause();
			}
		}
	};

	game.setGame();
};