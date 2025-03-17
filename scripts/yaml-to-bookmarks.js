import fs from 'fs';
import yaml from 'js-yaml';

function generateBookmarks(items) {
    let html = '';
    if (Array.isArray(items)) {
        for (const item of items) {
            html += generateBookmarks(item);
        }
    } else if (typeof items === 'object' && items !== null) {
        for (const [title, item] of Object.entries(items)) {
            if (typeof item === 'string') {
                html += `\n<DT><A HREF="${item}">${title}</A>`;
            } else {
                html += `\n<DT><H3>${title}</H3>`;
                html += `\n<DL><p>`;
                html += generateBookmarks(item);
                html += `\n</DL><p>`;
            }
        }
    }
    return html;
}

function yamlToBookmarks(yamlString) {
    const jsonData = yaml.load(yamlString);
    
    let bookmarksHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>`;
    bookmarksHtml += generateBookmarks(jsonData['Imported']);
    bookmarksHtml += `\n</DL><p>`;
    
    return bookmarksHtml;
}

const sampleYamlInput = `
Imported:
    - Mozilla Firefox:
        Get Help: https://support.mozilla.org/en-US/products/firefox
        Customize Firefox: >-
          https://support.mozilla.org/en-US/kb/customize-firefox-controls-buttons-and-toolbars?utm_source=firefox-browser&utm_medium=default-bookmarks&utm_campaign=customize
        Get Involved: https://www.mozilla.org/en-US/contribute/
        About Us: https://www.mozilla.org/en-US/about/
`;

if (!process.argv[2]) {
    console.log(`File Argument not found. Give me bookmarks yaml like:${sampleYamlInput}`)
} else {
    const bookmarksHtml = yamlToBookmarks(fs.readFileSync(process.argv[2], 'utf-8'));

    console.log(bookmarksHtml);
}

