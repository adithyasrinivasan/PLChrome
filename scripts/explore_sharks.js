
function injectJs(link, callback) {

  $('<script type="text/javascript" src="'+link+'"/>').appendTo($('head'));
//document.body.appendChild(scr);
  
}

injectJs(chrome.extension.getURL("scripts/inject.js"));


var ignoredUsernames = [];
//adds to list, first retrieve, add and merge
$("#btnIgnoreUser").click(function() {
      chrome.storage.sync.get({iusername: []}, function(res) {
          var entireList = res.iusername;
          if ($("#txtIgnoreUser").val() == '')
            $("#ignoredMessage").text("Please do not leave the field empty");
          else {
            entireList.push({'username': $("#txtIgnoreUser").val()});
                  chrome.storage.sync.set( {iusername: entireList}, function() {		  
             	  $("#ignoredMessage").text($("#txtIgnoreUser").val() + " has been added to your ignore list.");
             	  $("#txtIgnoreUser").val('');
  				      loadIgnoredUsernames();
            });
              }

      });
  });

$('#manageIgnoreList').click(function() {
  	chrome.tabs.create({'url': chrome.extension.getURL('manageignore.html')}, function(tab) {
	  // Tab opened.
 });
});

function loadIgnoredUsernames(){
 
	 chrome.storage.sync.get('iusername', function(res) {
  // Notify that we saved.
    ignoredUsernames = [];
    if (res.iusername != null)
    {
	    for (var i = 0; i < res.iusername.length; i++)
	    {
	       ignoredUsernames.push(res.iusername[i].username);
	    }
	}

});
}

loadIgnoredUsernames();
$('#tab1,#tab2,#tab3').bind('DOMNodeInserted', function(e) {
  if (typeof e.target.attributes["data-username"] !== 'undefined')
  {
  	if ("ignoredUsernames".indexOf(e.target.attributes["data-username"].nodeValue) > -1)
  	{
  		e.target.remove();
  	}
  }
});

