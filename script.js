const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => [...board];

    const placeMarker = (index, marker) => {
        if (board[index] !== "") {
            return false;
        }
        board[index] = marker;
        return true;
    };

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { getBoard, placeMarker, reset };
})();