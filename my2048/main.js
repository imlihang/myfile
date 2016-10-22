var board=new Array([]);
var score=0;
var hasConflicted=new Array([]);

var startx=0;
var starty=0;
var endx=0;
var endy=0;

$(document).ready(function() {
	prepareForMobile();
	newgame();
});

function prepareForMobile() {
	if (documentWidth>500) {
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
		documentWidth=500;
	}

	$('#info').css('width', documentWidth);
	$('#grid-container').css('width', gridContainerWidth-2*cellSpace+'px');
	$('#grid-container').css('height', gridContainerWidth-2*cellSpace+'px');
	$('#grid-container').css('padding',cellSpace+'px');
	$('#grid-container').css('border-radius', 0.02*gridContainerWidth+'px');

	$('.grid-cell').css('width', cellSideLength+'px');
	$('.grid-cell').css('height', cellSideLength+'px');
	$('.grid-cell').css('border-radius', 0.02*cellSideLength+'px');
}

document.addEventListener('touchstart', function(e) {
	startx=e.touches[0].pageX;
	starty=e.touches[0].pageY;
});
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
});
document.addEventListener('touchend', function(e) {
	endx=e.changedTouches[0].pageX;
	endy=e.changedTouches[0].pageY;

	var deltax=endx-startx;
	var deltay=endy-starty;

	if (Math.abs(deltax)<0.1*documentWidth&&Math.abs(deltay)<0.1*documentWidth) {
		return;
	}

	if (Math.abs(deltax)>=Math.abs(deltay)) {
		if (deltax>0) {
			//move right
			if (moveRight()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
				
			}
		}
		else{
			//move left
			if (moveLeft()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
				
			}
		}
	}
	else{
		if (deltay>0) {
			//move down
			if (moveDown()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
				
			}
		}
		else{
			//move up
			if (moveUp()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
				
			}
		}
	}
});

function newgame() {
	//初始化棋盘
	init();
	//随机两个格子生成数字
	ganerateOneNumber();
	ganerateOneNumber();

}
function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top', getPosTop(i,j));
			gridCell.css('left', getPosLeft(i,j));
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i]=new Array([]);
		hasConflicted[i]=new Array([]);
		for (var j = 0; j < 4; j++) {
			board[i][j]=0;
			hasConflicted[i][j]=false;
		}
	}

	updateBoardView();

	score=0;
}
function updateBoardView() {
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);
			if (board[i][j]===0) {
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');		
				theNumberCell.css('top', getPosTop(i,j)+0.5*cellSideLength);		
				theNumberCell.css('left', getPosLeft(i,j)+0.5*cellSideLength);		
			}
			else{
				theNumberCell.css('width', cellSideLength);
				theNumberCell.css('height', cellSideLength);		
				theNumberCell.css('top', getPosTop(i,j));		
				theNumberCell.css('left', getPosLeft(i,j));
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color', getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j]=false;
		}
	}

	$('.number-cell').css('line-height', cellSideLength+'px');
	$('.number-cell').css('font-size', 0.4*cellSideLength+'px');
}
function ganerateOneNumber() {
	if (nospace(board)) {
		return false;
	}
    //随机一个位置
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));

    var times=0;
    while (times<50) {
    	if (board[randx][randy]===0) {
    		break;
    	}
    	randx=parseInt(Math.floor(Math.random()*4));
    	randy=parseInt(Math.floor(Math.random()*4));

    	times++;
    }
    if (times==50) {
    	for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j]===0) {
					randx=i;
					randy=j;
				}
            }
		}
    }
    //随机一个数字

    var randNumber=Math.random()<0.5?2:4;

    //在随机位置显示随机数字
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
	return true;
}

$(document).keydown(function(event) {

	switch(event.keyCode) {

		case 37:   //left
		event.preventDefault();//阻挡默认效果
			if (moveLeft()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
				
			}
			break;
		case 38:   //up
		event.preventDefault();//阻挡默认效果
			if (moveUp()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
			}
			break;
		case 39:   //right
		event.preventDefault();//阻挡默认效果
			if (moveRight()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
			}
			break;
		case 40:   //down
		event.preventDefault();//阻挡默认效果
			if (moveDown()) {
				setTimeout(function () {
					ganerateOneNumber();
				}, 210);
				setTimeout(function () {
					isgameover();
				}, 300);
			}
			break;
		default: //default

			break;
	}
});

function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}


	//moveLeft
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j]!==0) {
				
				for (var k = 0; k < j; k++) {
					if (board[i][k]===0&&noBlockHorizontal(i,k,j,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);

						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						continue;

					}
				}
			}
		}		
	}
	setTimeout(function () {
			updateBoardView();
		}, 200);
	return true;

	
}
function moveRight() {
	if (!canMoveRight(board)) {
		return false;
	}
	
	//moveRight
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j]!==0) {
				
				for (var k = 3; k > j; k--) {
					if (board[i][k]===0&&noBlockHorizontal(i,j,k,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);

						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);
						hasConflicted[i][k]=true;
						continue;

					}
				}
			}
		}		
	}
	setTimeout(function () {
			updateBoardView();
		}, 200);
	return true;	
}
function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	}


	//moveUp
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j]!==0) {
				
				for (var k = 0; k < i; k++) {
					if (board[k][j]===0&&noBlockVertical(j,k,i,board)) {
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);

						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
						hasConflicted[k][j]=true;
						continue;

					}
				}
			}
		}		
	}
	setTimeout(function () {
			updateBoardView();
		}, 200);
	return true;
}

function moveDown() {
	if (!canMoveDown(board)) {
		return false;
	}


	//moveDown
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >=0 ; i--) {
			if (board[i][j]!==0) {

				for (var k = 3; k > i; k--) {
					if (board[k][j]===0&&noBlockVertical(j,i,k,board)) {
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);

						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						score+=board[k][j];
						updateScore(score);
						hasConflicted[k][j]=true;
						continue;

					}
				}
			}
		}		
	}
	setTimeout(function () {
			updateBoardView();
		}, 200);
	return true;	
}


function isgameover() {
	if (nospace(board)&&nomove(board)) {
		gameover();
	}
}
function gameover() {
	alert('Game Over');
}
