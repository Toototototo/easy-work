const fs = require('fs');

const path = './asset';
const finalPath = './asset/git.log';

fs.readdir(path, (err, files) => {
    if (err) throw err;
    const processList = files.filter(f => f.endsWith('.log') && f !== 'git.log');
    if (fs.existsSync(finalPath)) {
        fs.unlinkSync(finalPath);
    }
    processList.forEach(file => {
        const filePath = `${ path }/${ file }`;
        fs.appendFileSync(finalPath, fs.readFileSync(filePath));
    });
});
