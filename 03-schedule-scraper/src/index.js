const cheerio = require('cheerio')

const fetch = require('./get-promise')

const SCHEDULE_URL = 'http://rozklad.kpi.ua/Schedules/ViewSchedule.aspx?g=26d47cdd-5e07-4c1a-9ae1-0ff5f5ceced9'

async function main() {
  const html = await fetch(SCHEDULE_URL)
  const $ = cheerio.load(html)
  const rows = $(`
    table[id$="FirstScheduleTable"] >
    tbody
  `)

  const days = rows
    .children()
    .first()
    .children(':not(:first-child)')
    .map((idx, td) => $(td).text())
    .get()

  const scheduleRows = rows
    .children(':not(:first-child)')
    .get()
    .map((tr) => $(tr)
      .children()
      .map((_idx, td) =>
        $(td).children('a').length
      )
      .get()
    )

  // const schedule = (new Array(scheduleRows[0].length)).fill([])
  // scheduleRows.forEach((row) => {
  //   row.forEach((val, idx) => {
  //     schedule[idx].push(val)
  //   })
  // })
  const schedule = scheduleRows


  console.log(days)
  console.log(schedule)
}

main()
