        document.addEventListener('DOMContentLoaded', () => {
            const gameBoard = document.getElementById('gameBoard');
            const resetButton = document.querySelector('.reset-button');
            const playButton = document.querySelector('.play-button');
            let dotsCount = 0;
            let numRows = 8;

            function initializeBoard() {
                gameBoard.innerHTML = '';
                for (let i = 0; i < numRows; i++) {
                    const newRow = document.createElement('div');
                    newRow.className = 'row';
                    for (let j = 0; j < 6; j++) {
                        const newSquare = document.createElement('div');
                        newSquare.className = 'square';
                        newRow.appendChild(newSquare);
                    }
                    gameBoard.appendChild(newRow);
                }
            }

            resetButton.addEventListener('click', () => {
                clearAllSquares();
                dotsCount = 0;
            });

            playButton.addEventListener('click', () => {
                if (dotsCount >= 15) {
                    alert('Игра окончена!');
                    return;
                }

                if (dotsCount < numRows) {
                    placeDot(dotsCount);
                } else {
                    removeRowWithDot();
                    addRowWithDot();
                }
                dotsCount++;
                maintainRowCount();
            });

            function placeDot(rowNumber) {
                const rows = Array.from(gameBoard.querySelectorAll('.row'));
                const squares = rows[numRows - 1 - rowNumber].querySelectorAll('.square');
                const randomSquare = Math.floor(Math.random() * squares.length);
                squares[randomSquare].classList.add('active');
            }

            function addRowWithDot() {
                const newRow = document.createElement('div');
                newRow.className = 'row';
                for (let i = 0; i < 6; i++) {
                    const newSquare = document.createElement('div');
                    newSquare.className = 'square';
                    newRow.appendChild(newSquare);
                }
                gameBoard.insertBefore(newRow, gameBoard.firstChild);
                placeDotInNewRow(newRow);
            }

            function placeDotInNewRow(newRow) {
                const squares = newRow.querySelectorAll('.square');
                const randomSquare = Math.floor(Math.random() * squares.length);
                squares[randomSquare].classList.add('active');
            }

            function removeRowWithDot() {
                gameBoard.removeChild(gameBoard.lastChild);
            }

            function maintainRowCount() {
                while (gameBoard.children.length > numRows) {
                    gameBoard.removeChild(gameBoard.lastChild);
                }
            }

            function clearAllSquares() {
                const squares = gameBoard.querySelectorAll('.square');
                squares.forEach(square => square.classList.remove('active'));
            }

            function adjustOrientation() {
                if (window.matchMedia('(min-aspect-ratio: 16/9)').matches) {
                    numRows = 8;
                } else {
                    numRows = 5;
                }
                initializeBoard();
                clearAllSquares();
                dotsCount = 0;
            }

            window.addEventListener('resize', adjustOrientation);
            adjustOrientation();
        });