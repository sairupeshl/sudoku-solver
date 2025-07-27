const board = document.getElementById('sudoku-grid');

// Get input from the user
for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.classList.add('sudoku-cell');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '1');

    input.addEventListener('input', (e) => {
        const val = e.target.value;
        if (!/^[1-9]?$/.test(val)) {
            e.target.value = '';
        }
    });

    board.appendChild(input);
}

const solveBtn = document.getElementById('solve-btn');

solveBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.sudoku-cell');
    const sudoku = [];

    // Read values from input grid into 2D array
    for (let i = 0; i < 9; i++) {
        sudoku[i] = [];
        for (let j = 0; j < 9; j++) {
            const val = cells[i * 9 + j].value;
            sudoku[i][j] = val
            if (val === '') {
                sudoku[i][j] = 0;
            }
            else {
                sudoku[i][j] = parseInt(val);
            }
        }
    }

    if (solveSudoku(sudoku)) {
        // Update UI with the solution
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = cells[i * 9 + j];
                if (cell.value === '') {
                    cell.value = sudoku[i][j];
                    cell.classList.add('solved-cell');
                }
            }
        }
    }
    else {
        alert("No solution found.");
    }

});

function isValid(sudoku, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] === num || sudoku[i][col] === num || sudoku[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) {
            return false;
        }
    }
    return true;
}

// Find if the input sudoku can be solved
// If yes, solve the sudoku. If not, return false.
function solveSudoku(sudoku) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudoku[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(sudoku, row, col, num)) {
                        sudoku[row][col] = num;
                        if (solveSudoku(sudoku)) {
                            return true;
                        }
                        sudoku[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.sudoku-cell');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = cells[i * 9 + j];
            cell.value = '';
            if (cell.classList.contains('solved-cell')) {
                cell.classList.remove('solved-cell');
            }
        }
    }
})

const delansBtn = document.getElementById('del_ans-btn');

delansBtn.addEventListener('click', () => {
    const cells = document.querySelectorAll('.sudoku-cell');
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = cells[i * 9 + j];
            if (cell.classList.contains('solved-cell')) {
                cell.value = '';
                cell.classList.remove('solved-cell');
            }
        }
    }
})