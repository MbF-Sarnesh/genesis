/////////////////////////
// Library CSS Files
// Add your library css files here
///////////////////////////////////////////////
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('../src/scss/css/line-awesome-font-awesome.css');
require('../src/scss/css/animate.css');
//require('../src/scss/css/magnific-popup.css');
require('../src/scss/css/ripple.min.css');
require('../src/scss/css/slick.css');
require('../src/scss/css/nProgress.css');


//////////////////
// LIBRARY FILES
// Add your custom library js requires here
// use: expose-loader  to expose a library to public access
////////////////////////////////////////////////////////////
require('expose-loader?$!expose-loader?jQuery!jquery');
require('expose-loader?window.Tether!tether');
require("expose-loader?jqueryUi!../src/js/lib/jquery-ui.js");
require("expose-loader?ripple!../src/js/lib/ripple.min.js");
require("expose-loader?slick!../src/js/lib/slick.min.js");
//require("expose-loader?wow!../src/js/lib/wow.min.js");
// require('bootstrap');
//////////////////  
// APP SCSS FILES
// do not change this 
// Imports custom js modules in JS folder
//////////////////////////////////////////
var requireSCSS = require.context('./scss', false, /\.scss$/);
requireSCSS.keys().forEach(requireSCSS); 

////////////////// 
// APP JS FILES
// do not change this 
// Imports custom js modules in JS folder
//////////////////////////////////////////
// var requireJS = require.context('./js', true, /\.js$/);
// requireJS.keys().forEach(requireJS);
require('../src/js/main.js'); 
 
//////////////////
// APP INIT
// Application Init module. 
////////////////////////////////////////////////////////////