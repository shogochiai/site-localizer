const cheerio = require('cheerio')
const fs = require('fs')
var HOST = ''
var LOCAL_FILE = ""

HOST = 'https://ethresear.ch'
LOCAL_FILE = "/tmp/ethresear.ch"
const DEST_FILE = "/tmp/current.html"
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
    let replacedSrc = HOST+srcObj.item
    $(el).attr(srcObj.type, replacedSrc)
  }
}

let replacedHtml = $.html()
fs.writeFileSync(DEST_FILE, replacedHtml)
