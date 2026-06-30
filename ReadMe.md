# N-Queens Visualizer 👑

An interactive web tool that visualizes the classic **N-Queens Puzzle** using a recursive backtracking algorithm. Watch how a computer searches through configurations, detects conflicts, and backtracks to find all valid arrangements on an $N \times N$ chessboard.

🔗 **[Live Demo]( )** *(Replace with your actual deployment link)*

---

## 🚀 Features

- **Dynamic Grid Sizes:** Change the board size dynamically (e.g., $N = 1$ to $N = 10$).
- **Real-Time Backtracking Animation:** Watch queens get placed, tested for safety, and removed during backtracking steps.
- **Speed Control:** Speed up or slow down the execution to examine the algorithm at your own pace.
- **Responsive UI:** Clean, intuitive layout built entirely with modern web technologies.

---

## 🧩 The Problem & Algorithm

The **N-Queens problem** requires placing $N$ chess queens on an $N \times N$ board so that no two queens threaten each other (none share the same row, column, or diagonal).

- **Core Algorithm:** Recursive Backtracking.
- **Time Complexity:** $O(N!)$ worst-case.
- **Space Complexity:** $O(N)$ for the recursion stack.

Instead of brute-forcing all positions, the algorithm immediately prunes invalid sub-trees the moment a conflict is found, optimizing the search path.

---

## 🛠️ Tech Stack

- **HTML5** & **CSS3 (Grid/Flexbox)** for layout and chessboard rendering.
- **JavaScript (ES6+)** for asynchronous backtracking logic and UI state management.

---

## 📦 Getting Started

### Local Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/Piyush3014/N-Queens-Visualizer.git](https://github.com/Piyush3014/N-Queens-Visualizer.git)