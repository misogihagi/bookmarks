import yaml from 'js-yaml';

function yamlToBookmarks(yamlString) {
    const jsonData = yaml.load(yamlString);
    
    function generateBookmarks(items) {
        let html = '';
        if (Array.isArray(items)) {
            for (const item of items) {
                if (typeof item === 'object' && item !== null) {
                    for (const [folderName, links] of Object.entries(item)) {
                        html += `\n<DT><H3>${folderName}</H3>`;
                        html += `\n<DL><p>`;
                        html += generateBookmarks(links);
                        html += `\n</DL><p>`;
                    }
                }
            }
        } else if (typeof items === 'object' && items !== null) {
            for (const [title, url] of Object.entries(items)) {
                html += `\n<DT><A HREF="${url}">${title}</A>`;
            }
        }
        return html;
    }
    
    let bookmarksHtml = `<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>`;
    bookmarksHtml += generateBookmarks(jsonData);
    bookmarksHtml += `\n</DL><p>`;
    
    return bookmarksHtml;
}

// Example usage:
const yamlInput = `
- import:
    - Mozilla Firefox:
        Get Help: https://support.mozilla.org/en-US/products/firefox
        Customize Firefox: >-
          https://support.mozilla.org/en-US/kb/customize-firefox-controls-buttons-and-toolbars?utm_source=firefox-browser&utm_medium=default-bookmarks&utm_campaign=customize
        Get Involved: https://www.mozilla.org/en-US/contribute/
        About Us: https://www.mozilla.org/en-US/about/
`;

const bookmarksHtml = yamlToBookmarks(yamlInput);
console.log(bookmarksHtml);
