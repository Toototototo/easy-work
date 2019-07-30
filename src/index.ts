const fs = require('fs');

function getFile(filePath: string): string {
    try {
        const buffer = fs.readFileSync(filePath);
        return buffer.toString();
    } catch (e) {
        console.error(e);
    }
    return '';
}

console.log(getFile('./asset/git.log'));
