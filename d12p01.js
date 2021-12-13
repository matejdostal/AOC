const input = `
start-YY
av-rz
rz-VH
fh-av
end-fh
sk-gp
ae-av
YY-gp
end-VH
CF-qz
qz-end
qz-VG
start-gp
VG-sk
rz-YY
VH-sk
rz-gp
VH-av
VH-fh
sk-rz
YY-sk
av-gp
rz-qz
VG-start
sk-fh
VG-av
`;

const connections = input.trim().split("\n");
const caves = {};

const isSmall = (caveName) => caveName === caveName.toLowerCase();

for (let i = 0; i < connections.length; i++) {
    const [c1, c2] = connections[i].split("-");
    if (c1 !== "end" && !caves[c1]) caves[c1] = [];
    if (c2 !== "end" && !caves[c2]) caves[c2] = [];
    if (c1 !== "end" && c2 !== "start") caves[c1].push(c2);
    if (c2 !== "end" && c1 !== "start") caves[c2].push(c1);
}
// console.log(caves);

const paths = [];

const findPaths = (node, path = []) => {
    if (node === "end") {
        paths.push([...path, "end"]);
        return;
    }
    if (isSmall(node) && path.indexOf(node) !== -1) {
        return;
    }
    for (let i = 0; i < caves[node].length; i++) {
        findPaths(caves[node][i], [...path, node]);
    }
};

findPaths("start");

// console.log(paths.map((path) => path.join(",")));
console.log(paths.length);
