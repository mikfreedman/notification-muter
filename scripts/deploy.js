#! /usr/bin/env node

const GoogleTokenProvider = require('refresh-token').GoogleTokenProvider;
const getStdin = require('get-stdin');
const fs = require('fs');
var Curl = require( 'node-libcurl' ).Curl;

var tokenProvider = new GoogleTokenProvider({
  refresh_token: process.env.REFRESH_TOKEN,
  client_id:     process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
});

tokenProvider.getToken(function (err, token) {
  getStdin().then(function(fileName) {
    uploadFile(token, fileName.trim(), function() {
      publishFile(token);
    });
  });
});

function publishFile(token) {
  var curl = new Curl();

  curl.setOpt( Curl.option.URL, 'https://www.googleapis.com/chromewebstore/v1.1/items/' + process.env.APP_ID + '/publish' );
  curl.setOpt( Curl.option.HTTPHEADER, ['Authorization: Bearer ' + token, 'x-goog-api-version: 2', 'Content-Length: 0'] );
  curl.setOpt( Curl.option.POSTFIELDS, '{}' );
  curl.setOpt( Curl.option.VERBOSE, 0 );

  curl.on( 'end', function( statusCode, body ) {
    console.log( body );
    this.close();
  });

  curl.on( 'error', function( err ) {
    console.log( err );
    this.close();
    process.exit(1);
  });

  curl.perform();
}

function uploadFile(token, fileName, success) {

  fs.open( fileName, 'r+', function( err, fd ) {
    if (err) {
      if (err.code === "ENOENT") {
        console.error('file does not exist', fileName);
        process.exit(1);
        return;
      } else {
        throw err;
      }
    }

    var curl = new Curl();
    curl.setOpt( Curl.option.URL, 'https://www.googleapis.com/upload/chromewebstore/v1.1/items/' + process.env.APP_ID );
    curl.setOpt( Curl.option.HTTPHEADER, ['Authorization: Bearer ' + token, 'x-goog-api-version: 2'] );
    curl.setOpt( Curl.option.VERBOSE, 0 );
    curl.setOpt( Curl.option.UPLOAD, 1 );
    curl.setOpt( Curl.option.READDATA, fd );

    curl.on( 'end', function( statusCode, body ) {
      console.log( body );
      fs.closeSync( fd );
      this.close();
      success();
    });

    curl.on( 'error', function( err ) {
      console.log( err );
      fs.closeSync( fd );
      this.close();
      process.exit(1);
    });

    curl.perform();
  });
}
