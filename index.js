/*!
 * cheerio-tableparser
 * https://github.com/misterparser/cheerio-tableparser
 * https://www.npmjs.com/package/cheerio-tableparser
 *
 * Copyright (c) 2011 Francis Chong
 * Copyright (c) 2016 Mister Parser
 * Licensed under the MIT licenses.
 *
 */
module.exports = function ($) {
  $.prototype.parsetable = function (dupCols, dupRows, textMode) {
    if (dupCols === undefined) dupCols = false
    if (dupRows === undefined) dupRows = false
    if (textMode === undefined) textMode = false

    var columns = []
    var currX = 0
    var currY = 0

    $('tr', this).each(function (rowIdx, row) {
      currY = 0
      $('td, th', row).each(function (colIdx, col) {
        var rowspan = $(col).attr('rowspan') || 1
        var colspan = $(col).attr('colspan') || 1
        var content = textMode === true
            ? $(col).text().trim() || ''
            : $(col).html() || ''

        var x = 0
        var y = 0
        for (x = 0; x < rowspan; x++) {
          for (y = 0; y < colspan; y++) {
            if (columns[currY + y] === undefined) {
              columns[currY + y] = []
            }

            while (columns[currY + y][currX + x] !== undefined) {
              currY += 1
              if (columns[currY + y] === undefined) {
                columns[currY + y] = []
              }
            }

            if ((x === 0 || dupRows) && (y === 0 || dupCols)) {
              columns[currY + y][currX + x] = content
            } else {
              columns[currY + y][currX + x] = ''
            }
          }
        }
        currY += 1
      })
      currX += 1
    })

    return columns
  }
}
