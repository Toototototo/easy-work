import {
    createIndexFile,
    getFileContent,
    processRequests,
    tdClassId,
    writeHTMLFooter,
    writeHTMLRow,
} from './fileProcess';

const moment = require('moment');
//TODO:: 自动根据路径，输出日志，合并日志
//TODO:: 自动计算工作日
//TODO:: 查看哪一天工作日没有日志
//TODO:: 自动将节假日填写到工作日
declare global {
    interface String {
        replaceBy(searchValue: string | RegExp, replaceValue: string): string;
    }
}

String.prototype.replaceBy = function (searchValue: string | RegExp, replaceValue: string): string {
    if (this.includes(replaceValue)) {
        return this.replace(searchValue, '')
    }
    return this.replace(searchValue, replaceValue);
}

function run() {
    const content = getFileContent('./asset/git.log');
    const lines = content.split('\n');

    const requests = {};

    let beginTag = false;
    let pageId = 1;

    let goodLine = {0: '', 1: '', 2: '', 3: '', 4: ''};

    createIndexFile();
    writeHTMLRow(0, 'commit', 'Merge', 'Author', 'Date', 'Comment');
    // lines
    let num = 1;
    for (let line of lines) {
        if (line.length < 2) {
            continue;
        }
        if (line.startsWith('commit')) {
            beginTag = true;
            goodLine[0] = `${num}   ${line.slice(6)}`;
            num += 1;
            pageId = tdClassId(pageId);
            continue;
        }
        if (beginTag) {
            if (line.startsWith('Merge: ')) {
                goodLine[1] = line.slice(7);
            } else if (line.startsWith('Author: ')) {
                goodLine[2] = line.slice(8);
            } else if (line.startsWith('Date: ')) {
                goodLine[3] = line.slice(6);
            } else {
                goodLine[4] = line;
                beginTag = false;
                // 处理goodLine
                new RegExp('/[FIX/]', 'g');
                goodLine[4] = goodLine[4]
                    .replaceBy(/\[FIX\]/g, '修复')
                    .replaceBy(/\[ADD\]/g, '新增')
                    .replaceBy(/\[TEST\]/g, '测试')
                    .replaceBy(/\[CHANGE\]/g, '修改')
                    .replaceBy(/\[UPDATE\]/g, '更新')
                    .replaceBy(/\[DELETE\]/g, '删除')
                    .replaceBy(/\[COMPLETE\]/g, '完成');
                const date = moment(new Date(goodLine[3]));
                if (!goodLine[4].includes('Merge')) {
                    if (!requests[date.format('YYYY-MM-DD')]) {
                        requests[date.format('YYYY-MM-DD')] = [goodLine[4]];
                    } else {
                        requests[date.format('YYYY-MM-DD')].push(goodLine[4]);
                    }
                    const dateTime = date.format('YYYY-MM-DD HH:mm:ss');
                    writeHTMLRow(pageId, goodLine[0], goodLine[1], goodLine[2], dateTime, goodLine[4]);
                }
                goodLine = {0: '', 1: '', 2: '', 3: '', 4: ''};
            }
        }
    }

    writeHTMLFooter();

    processRequests(requests);
}

run();
