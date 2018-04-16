const cheerio = require('cheerio')
const fs = require('fs')
const LOCAL_FILE = "/tmp/ethresear.ch"
const html = fs.readFileSync(LOCAL_FILE)
const $ = cheerio.load(html)

$('head').find('link').each(replaceIfAbsoluteLink)
$('head').find('script').each(replaceIfAbsoluteLink)
$('body').find('a').each(replaceIfAbsoluteLink)

function replaceIfAbsoluteLink(i,el) {
  let srcObj = el.attribs.href ?
    { type: 'href', item: el.attribs.href }
  :
    { type: 'src', item: el.attribs.src }

  if (srcObj.item && srcObj.item.indexOf('/') === 0) {
    let replacedSrc = 'https://ethresear.ch'+srcObj.item
    $(el).attr(srcObj.type, replacedSrc)
  }
}

let replacedHtml = $.html()
fs.writeFileSync(LOCAL_FILE, replacedHtml)
