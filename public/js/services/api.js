/* global X2JS XMLHttpRequest */

app.service('Api', function ($http, $location, Globals) {
  // function tratarRetornoBlog (xml, cb) {
  //   let x2js = new X2JS()
  //   console.log(x2js.xml_str2json(xml))
  // }

  this.ultimasNoticias = function (cb) {
    $http.get(`${Globals.API}ciranda`)
      .then((sucesso) => {
        return cb(null, sucesso)
      }, (erro) => {
        console.log(erro)
      })
  }

  this.facebookFotos = function (cb) {
    $http.get(`https://graph.facebook.com/v2.12/tecnospeed?access_token=${Globals.FACEBOOK_TOKEN}&debug=all&fields=albums.fields(photos.fields(source))&format=json&method=get&pretty=0&suppress_http_code=1`)
      .then((sucesso) => {
        console.log(sucesso)
        let resposta = sucesso.data.albums.data[0].photos.data

        return cb(null, resposta)
      }, (erro) => {
        console.log(erro)
      })
  }
})
