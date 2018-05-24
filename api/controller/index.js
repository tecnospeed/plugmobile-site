const request = require('request')
const moment = require('moment')
moment.locale('pt-br')
const cheerio = require('cheerio')
const decode = require('unescape')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()

exports.ultimasPublicacoes = (req, res) => {
  var options = {
    method: 'GET',
    url: 'http://ciranda.me/api/activities/timeline',
    qs: {
      blog: '425',
      limit: '3',
      entity_api_key: '626069f87c7befda7a0f8a50390e25bd3ba62d3a'
    },
    headers: {
      'postman-token': 'eed2f234-c83b-243b-e65d-01eeb515a2d1',
      'cache-control': 'no-cache',
      authorization: 'Basic dGVzdGV2ZWxvY2l0aTp0ZXN0ZSFAIw==',
      'content-type': 'application/json'
    },
    json: true
  }

  request(options, function (error, response, body) {
    if (error) throw new Error(error)
    tratarRetorno(body, (err, result) => {
      res.send(result)
    })
  })
}
// moment().format("MMM Do YY")
function tratarRetorno (xml, cb) {
  let retorno = xml.data
  let publicacoes = []

  for (let i = 0; i < retorno.length; i++) {
    let html = decode(retorno[i].value).replace(/&nbsp;/g, ' ').replace(/&ccedil;/g, 'ç').replace(/&otilde;/g, 'õ').replace(/&aacute;/g, 'á').replace(/&ecirc;/g, 'ê').replace(/&atilde;g/, 'ã').replace(/&oacute;/g, 'ó').replace(/\r/g, '').replace(/\n/g, '').replace(/\t/g, '')
    capturarTexto(html, (err, conteudo) => {
      console.log((retorno[i]))
      publicacoes.push({
        data: moment(retorno[i].created_at).format('DD [de] MMMM [de] YYYY'),
        titulo: retorno[i].title,
        conteudo: conteudo,
        url: `http://tsdn.tecnospeed.com.br/blog-da-tecnospeed/post/${retorno[i].slug}`,
        img: JSON.parse(retorno[i].media_in_text) !== null ? JSON.parse(retorno[i].media_in_text)[0].url : ''
      })
    })

    if (i + 1 === retorno.length) return cb(null, publicacoes)
  }

  // parser.parseString(xml, (err, result) => {
  //   let publicacoes = []
  //   console.log(xml)
  //   let resultado = result.response.data[0].data
  //   // console.log(result)
  //   for (let i = 0; i < resultado.length; i++) {

  //     // publicacoes.push({
  //     //   data: retorno[i].created_at[0],
  //     //   titulo: retorno[0].title[0],
  //     //   conteudo: `${.substring(0, 117)}...`
  //     // })
  //   }
  // })
}

function capturarTexto (html, cb) {
  const $ = cheerio.load(html)

  return cb(null, `${$('span').eq(0).text().trim().substring(0, 117)}...`)
}
