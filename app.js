'use strict';

// DOM Elements
const numberbox = document.getElementById("numberbox");
const slider = document.getElementById("slider");
const progressBar = document.getElementById("progress-bar");
const playButton = document.getElementById('play-button');

const queen = '<i class="fas fa-chess-queen" style="color:#1a1a2e; font-size: 1.2rem;"></i>';

let n, speed, tempSpeed, q, Board = 0;

// Number of solutions for N-Queens (N = 0 to 8)
const solutionCounts = [0, 1, 0, 0, 2, 10, 4, 40, 92];

// Used to store the state of the boards
let pos = {};

// Speed control - slider value to delay mapping
slider.oninput = function () {
    const percentage = ((this.value - 1) / 9) * 100;
    progressBar.style.width = Math.min(100, Math.max(10, percentage)) + '%';
    speed = (100 - this.value) * 12 + 50; // Range: 50ms (fast) to 1238ms (slow)
}

// Initialize speed
speed = (100 - slider.value) * 12 + 50;
tempSpeed = speed;

class Queen {
    constructor() {
        this.position = Object.assign({}, pos);
        this.uuid = [];
    }

    nQueen = async () => {
        Board = 0;
        this.position[`${Board}`] = {};
        numberbox.disabled = true;
        playButton.disabled = true;
        playButton.style.opacity = '0.6';
        playButton.style.cursor = 'not-allowed';
        
        await q.solveQueen(Board, 0, n);
        await q.clearColor(Board);
        
        numberbox.disabled = false;
        playButton.disabled = false;
        playButton.style.opacity = '1';
        playButton.style.cursor = 'pointer';
    }

    isValid = async (board, r, col, n) => {
        const table = document.getElementById(`table-${this.uuid[board]}`);
        if (!table) return false;
        
        const currentRow = table.firstChild.childNodes[r];
        const currentColumn = currentRow.getElementsByTagName("td")[col];
        currentColumn.innerHTML = queen;
        await q.delay();

        // Check column
        for (let i = r - 1; i >= 0; --i) {
            const row = table.firstChild.childNodes[i];
            const column = row.getElementsByTagName("td")[col];
            const value = column.innerHTML;

            if (value == queen) {
                column.style.backgroundColor = "#e74c3c";
                currentColumn.innerHTML = "·";
                return false;
            }
            column.style.backgroundColor = "rgba(255, 202, 58, 0.3)";
            await q.delay();
        }

        // Check upper left diagonal
        for (let i = r - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
            const row = table.firstChild.childNodes[i];
            const column = row.getElementsByTagName("td")[j];
            const value = column.innerHTML;

            if (value == queen) {
                column.style.backgroundColor = "#e74c3c";
                currentColumn.innerHTML = "·";
                return false;
            }
            column.style.backgroundColor = "rgba(255, 202, 58, 0.3)";
            await q.delay();
        }

        // Check upper right diagonal
        for (let i = r - 1, j = col + 1; i >= 0 && j < n; --i, ++j) {
            const row = table.firstChild.childNodes[i];
            const column = row.getElementsByTagName("td")[j];
            const value = column.innerHTML;

            if (value == queen) {
                column.style.backgroundColor = "#e74c3c";
                currentColumn.innerHTML = "·";
                return false;
            }
            column.style.backgroundColor = "rgba(255, 202, 58, 0.3)";
            await q.delay();
        }
        return true;
    }

    clearColor = async (board) => {
        const table = document.getElementById(`table-${this.uuid[board]}`);
        if (!table) return;
        
        for (let j = 0; j < n; ++j) {
            const row = table.firstChild.childNodes[j];
            for (let k = 0; k < n; ++k) {
                const cell = row.getElementsByTagName("td")[k];
                // Use the chess pattern with gentle colors
                if ((j + k) & 1) {
                    cell.style.backgroundColor = "rgba(215, 225, 235, 0.25)";
                } else {
                    cell.style.backgroundColor = "rgba(240, 246, 250, 0.15)";
                }
                // Don't override queen cells
                if (cell.innerHTML === queen) {
                    cell.style.backgroundColor = "rgba(245, 180, 120, 0.2)";
                }
            }
        }
    }

    delay = async () => {
        await new Promise((done) => setTimeout(() => done(), speed));
    }

    solveQueen = async (board, r, n) => {
        if (r == n) {
            ++Board;
            const table = document.getElementById(`table-${this.uuid[Board]}`);
            if (!table) return;
            
            for (let k = 0; k < n; ++k) {
                let row = table.firstChild.childNodes[k];
                const colIndex = this.position[board][k];
                if (colIndex !== undefined) {
                    row.getElementsByTagName("td")[colIndex].innerHTML = queen;
                }
            }
            this.position[Board] = this.position[board];
            return;
        }

        for (let i = 0; i < n; ++i) {
            await q.delay();
            await q.clearColor(board);
            
            if (await q.isValid(board, r, i, n)) {
                await q.delay();
                await q.clearColor(board);
                
                const table = document.getElementById(`table-${this.uuid[board]}`);
                if (!table) return;
                
                const row = table.firstChild.childNodes[r];
                row.getElementsByTagName("td")[i].innerHTML = queen;
                this.position[board][r] = i;

                if (await q.solveQueen(board, r + 1, n)) {
                    await q.clearColor(board);
                }

                await q.delay();
                board = Board;
                
                const newTable = document.getElementById(`table-${this.uuid[board]}`);
                if (newTable) {
                    const newRow = newTable.firstChild.childNodes[r];
                    if (newRow) {
                        newRow.getElementsByTagName("td")[i].innerHTML = "·";
                    }
                }
                delete this.position[`${board}`][`${r}`];
            }
        }
    }
}

// Play button handler
playButton.onclick = async function visualise() {
    const chessBoard = document.getElementById("n-queen-board");
    const arrangement = document.getElementById("queen-arrangement");

    n = parseInt(numberbox.value);
    q = new Queen();

    // Input validation
    if (n > 8) {
        numberbox.value = "";
        alert("Queen value is too large (max 8)");
        return;
    } else if (n < 1) {
        numberbox.value = "";
        alert("Queen value is too small (min 1)");
        return;
    }

    // Clear previous boards
    while (chessBoard.hasChildNodes()) {
        chessBoard.removeChild(chessBoard.firstChild);
    }
    if (arrangement.hasChildNodes()) {
        arrangement.removeChild(arrangement.lastChild);
    }

    // Update status message
    const totalSolutions = solutionCounts[n] || 0;
    const displayText = n === 1 ? '1 arrangement' : 
                       n === 0 ? '0 arrangements' : 
                       `${totalSolutions} arrangement${totalSolutions > 1 ? 's' : ''}`;
    arrangement.textContent = `♛ ${n}‑Queens · ${displayText}`;

    // Create boards
    if (chessBoard.childElementCount === 0) {
        for (let i = 0; i < totalSolutions; ++i) {
            q.uuid.push(Math.random());
            let div = document.createElement('div');
            let table = document.createElement('table');
            let header = document.createElement('h4');
            header.innerHTML = `Board ${i + 1}`;
            table.setAttribute("id", `table-${q.uuid[i]}`);
            header.setAttribute("id", `paragraph-${i}`);
            chessBoard.appendChild(div);
            div.appendChild(header);
            div.appendChild(table);
        }
    }

    // Initialize boards with cells
    for (let k = 0; k < totalSolutions; ++k) {
        const table = document.getElementById(`table-${q.uuid[k]}`);
        if (!table) continue;
        
        // Clear existing rows
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        
        for (let i = 0; i < n; ++i) {
            const row = table.insertRow(i);
            for (let j = 0; j < n; ++j) {
                const col = row.insertCell(j);
                // Use gentle chess pattern
                if ((i + j) & 1) {
                    col.style.backgroundColor = "rgba(215, 225, 235, 0.25)";
                } else {
                    col.style.backgroundColor = "rgba(240, 246, 250, 0.15)";
                }
                col.innerHTML = "·";
                col.style.border = "1px solid rgba(255, 255, 255, 0.1)";
                col.style.transition = "background-color 0.2s ease";
            }
        }
        await q.clearColor(k);
    }
    
    await q.nQueen();
};

// Keyboard shortcut - Enter to start
numberbox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        playButton.click();
    }
});

// Initialize with default value
window.addEventListener('load', () => {
    numberbox.value = 4;
    // Trigger initial progress bar update
    const initialPercentage = ((slider.value - 1) / 9) * 100;
    progressBar.style.width = Math.min(100, Math.max(10, initialPercentage)) + '%';
});