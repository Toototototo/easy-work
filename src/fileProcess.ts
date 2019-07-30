const fs = require('fs');
import request = require('request');

const filePath = './asset/index.html';

export function getFileContent(filePath: string): string {
    try {
        const buffer = fs.readFileSync(filePath);
        return buffer.toString();
    } catch (e) {
        console.error(e);
    }
    return '';
}

// 创建index.html文件并添加html头信息
export function createIndexFile() {
    const htmlHeader =
        '<!DOCTYPE HTML PUBLIC -//W3C//DTD HTML 4.01 Transitional//EN "http://www.w3.org/TR/html4/loose.dtd">\n' +
        '        <html><head><title>Statistics Report for gitcheck.</title>\n' +
        '        <meta http-equiv="content-type" content="text/html; charset=utf-8">\n' +
        '        <style type=text/css><!--\n' +
        '        body {\n' +
        '         font-family: arial, helvetica, sans-serif;\n' +
        '         font-size: 12px;\n' +
        '         font-weight: normal;\n' +
        '         color: black;\n' +
        '         background: white;\n' +
        '        }\n' +
        '        th,td {\n' +
        '         font-size: 10px;\n' +
        '        }\n' +
        '        h1 {\n' +
        '         font-size: x-large;\n' +
        '         margin-bottom: 0.5em;\n' +
        '        }\n' +
        '        h2 {\n' +
        '         font-family: helvetica, arial;\n' +
        '         font-size: x-large;\n' +
        '         font-weight: bold;\n' +
        '         font-style: italic;\n' +
        '         color: #6020a0;\n' +
        '         margin-top: 0em;\n' +
        '         margin-bottom: 0em;\n' +
        '        }\n' +
        '        h3 {\n' +
        '         font-family: helvetica, arial;\n' +
        '         font-size: 16px;\n' +
        '         font-weight: bold;\n' +
        '         color: #b00040;\n' +
        '         background: #e8e8d0;\n' +
        '         margin-top: 0em;\n' +
        '         margin-bottom: 0em;\n' +
        '        }\n' +
        '        li {\n' +
        '         margin-top: 0.25em;\n' +
        '         margin-right: 2em;\n' +
        '        }\n' +
        '        .hr {margin-top: 0.25em;\n' +
        '         border-color: black;\n' +
        '         border-bottom-style: solid;\n' +
        '        }\n' +
        '        .in    {color: #6020a0; font-weight: bold; text-align: left;}\n' +
        '        .frontend {background: #e8e8d0;}\n' +
        '        .s   {background: #e0e0e0;}\n' +
        '        .a0  {background: #FF99CC; font-weight: bold;}\n' +
        '        .a1  {background: #CCFF99;}\n' +
        '        .a2  {background: #CCFFFF;}\n' +
        '        .a3  {background: #CCCCFF;}\n' +
        '        .a4  {background: #66CCCC;}\n' +
        '        .a5  {background: #CCFF66;}\n' +
        '        .a6  {background: #FFCC99;}\n' +
        '        .maintain {background: #c07820;}\n' +
        '        .rls      {letter-spacing: 0.2em; margin-right: 1px;}\n' +
        '\n' +
        '        a.px:link {color: #ffff40; text-decoration: none;}\n' +
        '        a.px:visited {color: #ffff40; text-decoration: none;}\n' +
        '        a.px:hover {color: #ffffff; text-decoration: none;}\n' +
        '        a.lfsb:link {color: #000000; text-decoration: none;}\n' +
        '        a.lfsb:visited {color: #000000; text-decoration: none;}\n' +
        '        a.lfsb:hover {color: #505050; text-decoration: none;}\n' +
        '\n' +
        '        table.tbl { border-collapse: collapse; border-style: none;}\n' +
        '        table.tbl td { text-align: right; border-width: 1px 1px 1px 1px; border-style: solid solid solid solid; padding: 2px 3px; border-color: gray; white-space: nowrap;}\n' +
        '        table.tbl td.ac { text-align: center;}\n' +
        '        table.tbl th { border-width: 1px; border-style: solid solid solid solid; border-color: gray;}\n' +
        '        table.tbl th.pxname { background: #b00040; color: #ffff40; font-weight: bold; border-style: solid solid none solid; padding: 2px 3px; white-space: nowrap;}\n' +
        '        table.tbl th.empty { border-style: none; empty-cells: hide; background: white;}\n' +
        '        table.tbl th.desc { background: white; border-style: solid solid none solid; text-align: left; padding: 2px 3px;}\n' +
        '\n' +
        '        table.lgd { border-collapse: collapse; border-width: 1px; border-style: none none none solid; border-color: black;}\n' +
        '        table.lgd td { border-width: 1px; border-style: solid solid solid solid; border-color: gray; padding: 2px;}\n' +
        '        table.lgd td.noborder { border-style: none; padding: 2px; white-space: nowrap;}\n' +
        '        u {text-decoration:none; border-bottom: 1px dotted black;}\n' +
        '        -->\n' +
        '        </style></head><body><h1>GitCheck Center</h1><hr><h3>> General git information</h3>\n' +
        '        <table border=0>';
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
    fs.appendFileSync(filePath, htmlHeader);
}

export function writeHTMLFooter() {
    const footHtml = '</table></body></html>';
    fs.appendFileSync(filePath, footHtml);
}

export function writeHTMLRow(index, var1, var2, var3, var4, var5) {
    const rowHtml = `<tr class=a${ index }><td>${ var1 }</td><td>${ var2 }</td><td>${ var3 }</td><td>${ var4 }</td><td>${ var5 }</td></tr>\n`;
    fs.appendFileSync(filePath, rowHtml);
}

export function tdClassId(pageId) {
    pageId += 1;
    if (pageId >= 7)
        pageId = 1;
    return pageId;
}

const headers = {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    Connection: 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Cookie: 'ASP.NET_SessionId=pah2a4g2eowlqwvhuqtyx22w',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
};
const url = 'http://10.9.41.3/WeeklyManagement/CreateWeekly';

export function processRequests(requestList = {}) {
    if (!Object.keys(requestList).length) {
        return;
    }

    Object.keys(requestList).forEach((time: string) => {
        let random = Math.random().toFixed(16);

        let sleepTime = parseFloat(Math.random().toFixed(2)) * 10;
        if (sleepTime < 2) {
            sleepTime = sleepTime + 1.5;
        }
        console.log(random, sleepTime);
        if (requestList[time].length) {
            const str = requestList[time].map((item, index) => `${ index + 1 }.${ item }`).join(';');
            setTimeout(() => { // 等待時間
                request({
                    url,
                    headers,
                    method: 'POST',
                    query: {rnd: random},
                    formData: {
                        CostTime: 8,
                        JobContent: str,
                        ProjectId: 64,
                        beginTime: time,
                    },
                }, (error, response, body) => {
                    console.log(time, body);
                });
            }, sleepTime * 1000);
        }
    });

}
