require('nw.gui').Window.get().maximize()
var http = require('http');
var config = require("./config.js");
var fs = require('fs');
var jade = require("jade");
var custFile = "public/custid.txt" ;
var currentCust = fs.readFileSync(custFile , {encoding:'utf-8'});
var currentCustName = ""
var displayLogo = true;
var logs = console.log;
var d = new Date();
$(document).ready(function(){
	http.get(config.apiHost + 'api/custName/'+currentCust+'/0/0', (res) => {
      var resContent="";
      res.on('data',(d) =>{
        resContent+=d;
        //$("#message").html(news[0].F_MESSAGE);
      });
      res.on('end',function(){
        var cust = JSON.parse(resContent);
        $("#companyName").html(cust[0].F_CU_NAME)
        currentCustName = cust[0].F_CU_NAME
      });
      res.resume();
    });
  if(currentCust.substr(0,1) == "W"){
    displayLogo = false;
  }
	var navHtml = fs.readFileSync("views/nav.html", {encoding:'utf-8'});
	$("nav").html(navHtml);
  var footerJade = jade.compileFile("views/footer.jade");
  var footerHtml = footerJade({year: d.getFullYear()});
  $("footer").html(footerHtml);
  var timerVar = setInterval(myTimer, 1000);

  function myTimer() {
    var d = new Date();
    document.getElementById("globalTimer").innerHTML = d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")+" "+d.toLocaleTimeString();
  }
});
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}