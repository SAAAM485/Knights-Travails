function knightMoves(start, end) {
    // const tree = new Tree(start, end);

    const queue = [];
    queue.push(start);

    const rows = 8;
    const columns = 8;
    let visited = Array(rows)
        .fill()
        .map(() => Array(columns).fill(false));
    visited[start[0]][start[1]] = true;

    let moves = Array(rows)
        .fill()
        .map(() => Array(columns).fill(0));

    let current = start;
    while (queue.length) {
        current = queue.shift();
        if (current[0] === end[0] && current[1] === end[1]) {
            let path = getPath(
                moves,
                moves[current[0]][current[1]],
                start,
                end
            );
            let pathString = "";
            path = path.forEach((point) => {
                pathString += `[${point}]\n`;
            });
            return `> knightMoves(${start},${end})\n=> You made it in ${
                moves[current[0]][current[1]]
            } moves!  Here's your path:\n${pathString}`;
        }

        let currentGraph = graph(current);
        currentGraph.forEach((combo) => {
            if (!visited[combo[0]][combo[1]]) {
                visited[combo[0]][combo[1]] = true;
                moves[combo[0]][combo[1]] = moves[current[0]][current[1]] + 1;
                queue.push(combo);
            }
        });
    }
    return -1;
}

function graph(current) {
    let [x, y] = current;
    let currentGraph = [
        [x + 1, y + 2],
        [x + 1, y - 2],
        [x + 2, y + 1],
        [x + 2, y - 1],
        [x - 1, y + 2],
        [x - 1, y - 2],
        [x - 2, y + 1],
        [x - 2, y - 1],
    ];
    currentGraph = currentGraph.filter((combo) => {
        let [a, b] = combo;
        if (!(a < 0 || a > 7 || b < 0 || b > 7)) {
            return true;
        }
    });
    return currentGraph;
}

function getPath(movesArray, moves, start, end) {
    const steps = [[]];
    for (let i = 0; i <= moves; i++) {
        if (!steps[i]) {
            steps.push([]);
        }
        movesArray.forEach((arr, xindex) =>
            arr.filter((position, yindex) => {
                if (position === i) {
                    steps[i].push([xindex, yindex]);
                    return true;
                }
            })
        );
    }
    let queue = [];
    let target = end;
    queue.unshift(end);
    for (let i = steps.length - 2; i >= 0; i--) {
        let j = 0;
        while (steps[i][j]) {
            if (
                graph(steps[i][j]).some((combo) => {
                    if (combo[0] == target[0] && combo[1] == target[1]) {
                        return true;
                    }
                })
            ) {
                queue.unshift(steps[i][j]);
                target = steps[i][j];
                break;
            }
            j++;
        }
    }
    return queue;
}

console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([0, 0], [7, 7]));
