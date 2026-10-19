# odin-tic-tac-toe

A two-player Tic Tac Toe game in the browser, built with JavaScript for The Odin Project.

**Live preview:** https://jan-christopher-buen.github.io/odin-tic-tac-toe/

## How to play

Type both players' names and click "Start game" (or leave them empty to play as Player 1 and Player 2). Players take turns clicking a square. The first player to get three in a row, column, or diagonal wins. If all nine squares fill up with no winner, the game is a tie. Click "Restart" to play again with the same names.

## How the code is organized

The game has very little global code. It is split into three parts, each with one job:

- **Gameboard** (module): stores the nine squares in a private array and only lets other code read a copy or place a marker on an empty square
- **GameController** (module): keeps track of the players and whose turn it is, and checks for a win or a tie after every move
- **DisplayController** (module): the only part that touches the page; it draws the board and passes clicks to the GameController

Players are created with a `createPlayer` factory function.

## What I practiced

- Factory functions as an alternative to constructors
- The module pattern (IIFE) for objects that only need one instance
- Keeping variables private with closures and exposing only what is needed
- Separating game logic from the display, and building the logic in the console first
- Checking win conditions with `some()` and `every()`
- Event delegation: one click listener on the board instead of one per square

## Built with

- HTML
- CSS (Grid and Flexbox)
- JavaScript
