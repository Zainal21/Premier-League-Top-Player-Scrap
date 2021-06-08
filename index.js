const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'

axios(url).then(response => {
  const html = response.data
  const $ = cheerio.load(html)
  const TableContainer = $('.statsTableContainer > tr')
  const TopScoreItem = [];

  // console.log(TableContainer.length)
  let i = 1;
  TableContainer.each(function () {
    // get rank value from element tr.rank
    const id =  i++
    const rank = $(this).find('.rank > strong').text()
    const playersName = $(this).find('.playerName > strong').text()
    const Nationality = $(this).find('.playerCountry').text()
    const goals = $(this).find('.mainStat').text();

    TopScoreItem.push({
      id,
      rank,
      playersName,
      Nationality,
      goals
    })
  })
  // store in to json
  fs.writeFile('./api/TopPlayer.json', JSON.stringify(TopScoreItem), err => {
    if (err) {
      console.log(err)
      return
    }
  })
}).catch((error) => {
  console.log(error)
})