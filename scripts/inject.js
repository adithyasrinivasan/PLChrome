
var token = "";
var friends = "";
var chatTextColor = "#ffffff";

function scrapVariablesOffExplore() {
	if (typeof  serverToken !== 'undefined' )
	{	
	//	$("#divTip").append("<p data-value='" + serverToken + "' id = 'serverToken'>asdsd</p>");
		token = serverToken;
		$("#tabs").append(" <div>Chat Background: <input type = 'color' id = 'chatBGColor'/>  &nbsp;&nbsp; Text Color: <input type = 'color' id = 'chatTextColor'/></div>");
		$("#tabs").append("<br> <div>Battle Loading: <button id = 'btnFixBattle' class='mws-button green small' >Fix</button> &nbsp;&nbsp; Menu/Option freeze: <button id = 'btnFixOption' class='mws-button green small' >Fix</button> </div>");
	}

}
scrapVariablesOffExplore();
$('#tab1,#tab2,#tab3').bind('DOMNodeInserted', function(e) {

	if (typeof  friendsList !== 'undefined' && friends == ""){
		friends = friendsList;
	}

	else if (typeof e.target.attributes["data-chat"] !== 'undefined')
	{
		if (parseInt(e.target.attributes["data-chat"].nodeValue) > 0)
		{ 
			//e.target.attributes["data-username"].nodeValue != 'System'
			if (e.target.children[0].children[0].attributes["style"].nodeValue == "color:#fff" || e.target.children[0].children[0].attributes["style"].nodeValue == "color:#ffffff;")
			{
						//wont affect mod
				if (friends.indexOf(e.target.childNodes[0].childNodes[0].attributes["href"].nodeValue.match(/id=([^&]*)/)[1]) > -1)
				{	
					e.target.attributes["style"].nodeValue ="color:#EA9A53;margin-bottom:2px;";	
					e.target.children[0].children[0].attributes["style"].nodeValue= "color:#EA9A53;";
				}
				else {
					
					e.target.attributes["style"].nodeValue = "color:" + chatTextColor + ";margin-bottom:2px;";
					e.target.children[0].children[0].attributes["style"].nodeValue= "color:" + chatTextColor + ";";			
				}
			}
			else if (e.target.children[0].children[0].attributes["style"].nodeValue.indexOf("#CE93D8") > -1)
			{
				var tmp = "#";
				var tmpTitle = "";
				if (e.currentTarget.id == 'tab2')
				{
					tmp += "tradeChat";
					tmpTitle = "Trade Chat";
					$("#TtxtUpdate").click(function(){
						$("#tradeChat").text("Trade Chat");
					});
				}
				else if ( e.currentTarget.id  == 'tab3')
				{
					tmp += "helpChat";
					tmpTitle = "Help Chat";
					$("#HtxtUpdate").click(function(){
						$("#HtxtUpdate").text("Help Chat");
					});
				}
				else 
				{
					tmp += "playerChat";
					tmpTitle = "Player Chat";

					$("#PtxtUpdate").click(function(){
						$("#playerChat").text("Player Chat");
					});

				}
				$(tmp).text(tmpTitle + " ☆");
			}	
		}

	}
});




$("#chatTextColor").on('input', function() {
	chatTextColor = $(this).val();
});
$("#chatBGColor").on('input', function() {
  $("#chat, #Hchat, #Tchat").css('background-color', $(this).val());
});

$("#btnFixBattle").click(function() {
	loadBattle();
});

$("#btnFixOption").click(function() {
	loadUtility();
});



$("#divPm").bind('DOMNodeInserted', function(e) {
	$(".grid_2").draggable( { cancel: 'p, input' } );

});


$(".grid_5").resizable();

$( "#tabs" ).draggable( { cancel: 'p, input' });



$('#mws-explore-encounter').bind("DOMSubtreeModified",function(){
  if ($(this).text().toLowerCase().indexOf("shiny") > -1)
  {
  	  $(this).css('color', '#EA9A53');
      new Audio('https://www.pokemonlegends.com/audio/hit.mp3').play();
  }
  else
  {
  	  	  $(this).css('color', '#ffffff');

  }
});


//display location of Pokemon top of map
var location_data;
location_data = { "1" : "Caterpie",
"2": "cherubi, scyther, cubone, shinx, sentret, starly, abra, meditite, poochyena, snubbull, wurmple, jigglypuff",
"5": "ralts, seedot, pineco, heracross, sableye, gulpin, venonat, nincada, sunkern, pidove, blitzle, kricketot, sewaddle, wooper, ekans, rattata, whismur, trapinch, yanma",
"9": "geodude, rhyhorn, zubat, onix",
"8": "dunsparce, girafarig, magnemite, mareep, paras, surskit, budew, lotad, corphish, wingull, stunky, bronzor, shellos, munchlax, jigglypuff, vulpix, oddish, diglett, slakoth, wurmple, slugma, teddiursa",
"10": "doduo, spinarak, tangela, machop, weedle, bellsprout, krabby, taillow, spoink, murkrow, ponyta, aipom, hoothoot, exeggcute",
"222": "Venonat, Dunsparce, Abra, Bellsprout, Exeggcute, Rattata",
"19": "hoppip, spearow, voltorb, grimer, pidgey, natu, swinub, plusle",
"22": "pidgey, rattata, dratini, gible",
"20": "meowth, sandshrew, drowzee, mankey, magikarp, poliwag, tentacool, goldeen, horsea, remoraid, seel, koffing, ledyba",
"23": "zigzagoon, lotad, corphish, krabby, wingull",
"27": "nidoran M, nidoran f, taillow, tangela, trapinch, psyduck, snubbull, spoink, tropius",
"28": "nincada, spinarak, makuhita, tyrogue, nosepass, sneasel, diglett, geodude, zubat, onix, shuckle, wynaut",
"32": "larvitar, delibird, spoink",
"33": "ledyba, growlithe, gastly, duskull, shuppet",
"42": "spinarak, mawile, aron, whismur, nosepass, spinda, teddiursa, zubat, wynaut, rhyhorn",
"44": "electrike, shroomish, mareep, elekid, ledyba, togepi, pichu, igglybuff, skitty, wurmple",
"48": "krabby, wingull",
"62": "sentret, zigzagoon, sunkern, furret, zangoose",
"63": "sunkern, zangoose, silcoon, zigzagoon",
"64": "numel, furret, gligar, seviper, cacnea",
"65": "in entire area of Sunrock Desert are numel, houndour, cacnea, phanpy, cascoon, silcoon, castform, solrock, magby, skarmory, slugma, lunatone, baltoy, electabuzz",
"71": "Phanpy, Cacnea, Numel, Houndour, Slugma",
"103": "numel, houndour, slakoth, bagon",
"67": "Cacnea, Numel",
"110": "cascoon, silcoon, magikarp, lotad, lombre, pineco, qwilfish, azurill",
"112": "magikarp, lotad, qwilfish, carvanha, pineco, azurill",
"116": "stantler, mr.mime, minun, beautifly, dustox, absol",
"117": "wynaut, minun, miltank, lickitung, wooper, magikarp, lotad, shellder, carvanha, staryu",
"119": "minun, lotad, clefairy, fafetch'd, smeargle, kangaskhan, dustox, beautifly",
"118": "wynaut, wobbuffet, snorunt, seel",
"113": "slowpoke, wooper, pineco, stantler, carvanha, lombre, lotad, magikarp, qwilfish",
"125": "pidgey, wingull",
"158": "wingull, yanma, jigglypuff, shellos, munchlax, scyther, magikarp, carvanha",
"159": "magikarp, carvanha, shellos, finneon, feebas, poliwag",
"191": "Meowth, Sudowoodo during <b>day</b> and Misdreavus, Paras at <b>night</b>",
"190": " Cubone, Spearow, Meowth, Sudowoodo during <b>day</b> and Misdreavus at <b>night</b>",
"204": "in entire area of Blackfell are Zubat, Gastly, Misdreavus, Numel, Slugma, Torkoal, Magikarp, Smoochum, Lapras",
"181": "Mareep, Oddish, Flaaffy, Luvdisc, Beedrill during <b>day</b> and Volbeat, Hoothoot, Chimecho at <b>night</b>",
"182": "Mareep, Flaaffy, Oddish, Butterfree during <b>day</b> and Hoothoot, Illumise Chimecho at <b>night</b>"



};

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
var html_location = '<br><div class="mws-panel grid_8" id = "location_data_grid">								<div class="mws-panel-header">							<span class="mws-i-24 i-chart-2">Pokemon</span>						</div>						<div class="mws-panel-body" >	<div class="mws-panel-content" id = "location_data">	</div>														</div>					</div>';
$("#mws-container").prepend(html_location);


function location_pokemon(){
	if (location_data[mapID] != null) {
		$("#location_data_grid").css('display', 'block');
		var sunrock = [65,66,68,69,70,72,73,75,76,77,78,79,80,81,82,83,84];
		var tmpMapID = mapID;
		if (sunrock.indexOf(mapID) > -1)
			tmpMapID = 65;
		else if (mapID >= 204 && mapID <= 208)
			tmpMapID = 204;
	    $("#location_data").html("Pokemon found in this map are <i>" + location_data[tmpMapID].capitalize() + "</i>. <br> Credits to Location guide on forum..");

	}
	else {
			$("#location_data_grid").css('display', 'none');
	}
}
location_pokemon();
loadMapEventsCallback = (function() {
    var cached_function = loadMapEventsCallback;

    return function() {
        // your code

        var result = cached_function.apply(this, arguments); // use .apply() to call it
        // more of your code
        location_pokemon();
        return result;
    };
})();



var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-77921068-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();