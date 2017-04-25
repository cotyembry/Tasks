//this will return what browser is being used
//http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser#
var detectBrowser = {
	_browser: {},
	start: function() {
		  var uagent = navigator.userAgent.toLowerCase(),
		      match = '';
    
		  //$("#browserResult").html("User agent string: <b>" + uagent + "</b>");
    
		  detectBrowser._browser.chrome  = /webkit/.test(uagent)  && /chrome/.test(uagent) && !/edge/.test(uagent);
		  detectBrowser._browser.firefox = /mozilla/.test(uagent) && /firefox/.test(uagent);
		  detectBrowser._browser.msie    = /msie/.test(uagent) || /trident/.test(uagent) || /edge/.test(uagent);
		  detectBrowser._browser.safari  = /safari/.test(uagent)  && /applewebkit/.test(uagent) && !/chrome/.test(uagent);
		  detectBrowser._browser.opr     = /mozilla/.test(uagent) && /applewebkit/.test(uagent) &&  /chrome/.test(uagent) && /safari/.test(uagent) && /opr/.test(uagent);
		  detectBrowser._browser.version = '';
    
		  for (x in detectBrowser._browser) {
		    if (detectBrowser._browser[x]) {
        
		      // microsoft is "special"
		      match = uagent.match(new RegExp("(" + (x === "msie" ? "msie|edge" : x) + ")( |\/)([0-9]+)"));
      
		      if (match) {
		        detectBrowser._browser.version = match[3];
		      } else {
		        match = uagent.match(new RegExp("rv:([0-9]+)"));
		        detectBrowser._browser.version = match ? match[1] : "";
		      }
            
		      $("#browserResult").append("<br/>The browser is <b>" + (x === "opr" ? "Opera" : x) +
		        "</b> v. <b>" + (detectBrowser._browser.version ? detectBrowser._browser.version : "N/A") + "</b>");
		      break;
		    }
		  }
		  detectBrowser._browser.opera = detectBrowser._browser.opr;
		  delete detectBrowser._browser.opr;
		  
		  return x === "opr" ? "Opera" : x;
		}
}

//usage: var browser = detectBrowser.start(); //msie, chrome, firefox, opera