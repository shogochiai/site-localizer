const cheerio = require('cheerio')
const fs = require('fs')
const LOCAL_FILE = "/tmp/todo"
const html = fs.readFileSync(LOCAL_FILE)
const $ = cheerio.load(html)

$('body').find('a.dynamiclink').each(replaceIfAbsoluteLink)
$('body').find('a.attrlink').each(replaceIfAbsoluteLink)
$('body').find('.dmc-button-styleless').remove()

function replaceIfAbsoluteLink(i,el) {
  let src = el.attribs.href

  let replacedSrc = (src.indexOf('?url=') > -1) ? src.split('?url=')[1].split('&')[0] : "";

  $(el).attr('href', decodeURIComponent(replacedSrc))
}

let replacedHtml = $.html()
fs.writeFileSync(LOCAL_FILE, replacedHtml)
