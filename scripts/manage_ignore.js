	
	chrome.storage.sync.get('iusername', function(res) {
	  	// Notify that we saved.
	  	var users = [];
	    for (var i = 0; i < res.iusername.length; i++)
	    {
	    	users.push( {'username': res.iusername[i].username });
	       $("#tblIgnoredUsers").append("<tr><td>" + res.iusername[i].username + "</td><td><a class = 'removeAnc' data-username = '" + res.iusername[i].username + "' href=#>Remove</a></td></tr>");
	    }

	    if (res.iusername.length == 0)
	    {
	    	$("#tblIgnoredUsers").append("<tr><td>You seem like a nice person. Here's a gift.</td><td><a target = _blank href=https://www.youtube.com/watch?v=dQw4w9WgXcQ>Mewtwo!</a></td></tr>");

	    }

	    	$(".removeAnc").click(function() {
	    		for (var i = 0; i < users.length; i++)
	    		{
	    			if (users[i].username == $(this).attr('data-username'))
    				{
    					users.splice(i, 1);
    				}
	    		}
		    	chrome.storage.sync.set( {iusername: users});
		    	location.reload();

			});

	});	

	