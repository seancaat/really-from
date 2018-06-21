
// NAV
window.URLS = ["1-solitude.html",
           "2-inheritance.html",
           "3-another-mind.html",
           "4-lucid.html",
           "5-in-flight.html"];
window.URL_COUNTER = 0;
window.MAX_URLS = window.URLS.length;


// FULLSCREEN
//document.onclick = function (argument) {
//    var conf = confirm("Fullscreen mode?");
//    var docelem = document.documentElement;
//
//    if (conf == true) {
//        if (docelem.requestFullscreen) {
//            docelem.requestFullscreen();
//        }
//        else if (docelem.mozRequestFullScreen) {
//            docelem.mozRequestFullScreen();
//        }
//        else if (docelem.webkitRequestFullScreen) {
//            docelem.webkitRequestFullScreen();
//        }
//        else if (docelem.msRequestFullscreen) {
//            docelem.msRequestFullscreen();
//        }
//    }
//}




// OPS
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}