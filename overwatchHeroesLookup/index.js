"use strict";
const Alexa = require("alexa-sdk"); // import the library

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

// =====================================================================================================
// --------------------------------- Section 1. Data and Text strings  ---------------------------------
// =====================================================================================================
//TODO: Replace this data with your own.
//======================================================================================================

var data=[
	{codeName:"doomfist",realName:"akande ogundimu",role:"offense hero",nationality:"nigeria",occupation:"formerly martial artist currently mercenary and cheif executive",sayoccupation:"mercenary",base:"oyo nigeria",saybase:"oyo nigeria",affiliation:"talon",sayaffiliation:"talon",age:"45",gender:"m"},
	{codeName:"genji",realName:"genji shimada",role:"offense hero",nationality:"japan",occupation:"adventurer",sayoccupation:"adventurer",base:"formerly hanamura japan currently shambail monastery nepal",saybase:"formerly hanamura japan currently shambail monastery nepal",affiliation:"formerly shimada clan overwatch and black watch",sayaffiliation:"formal shimada clan overwatch and black watch",age:"35",gender:"m"},
	{codeName:"mccree",realName:"jesse mccree",role:"offense hero",nationality:"america",occupation:"bounty hunter",sayoccupation:"bounty hunter",base:"santa fe new mexico united states of america",saybase:"santa fe new mexico united states",affiliation:"formerly deadlock gang and overwatch ",sayaffiliation:"formerly deadlock gang and overwatch",age:"37",gender:"m"},
	{codeName:"pharah",realName:"fareeha amari",role:"offense hero",nationality:"egypt",occupation:"security chief",sayoccupation:"security chief",base:"giza egypt",saybase:"giza egypt",affiliation:"formerly egyptian army currently helix security international",sayaffiliation:"formerly egyptian army currently helix security international",age:"32",gender:"f"},
	{codeName:"reaper",realName:"gabriel reyes",role:"offense hero",nationality:"america",occupation:"mercenary",sayoccupation:"mercenary",base:"unknown",saybase:"unkown",affiliation:"formerly united states military and overwatch currently talon",sayaffiliation:"formerly united states military and overwatch currently talon",age:"unknown",gender:"m"},
	{codeName:"soldier-76",realName:"jack morrison",role:"offense hero",nationality:"america",occupation:"formerly soldier and overwatch commander currently vigilante",sayoccupation:"formerly soldier and overwatch commander currently vigilante",base:"bloomington indiana united states",saybase:"bloomington indiana united states",affiliation:"formerly united states military and overwatch",sayaffiliation:"formerly united states military and overwatch",age:"unknown",gender:"m"},
	{codeName:"sombra",realName:"olivia colomar",role:"offense hero",nationality:"mexico",occupation:"hacker",sayoccupation:"hacker",base:"dorado mexico",saybase:"dorado mexico",affiliation:"formerly los muertos currently talon",sayaffiliation:"formerly los muertos currently talon",age:"30",gender:"f"},
	{codeName:"tracer",realName:"lena oxton",role:"offense hero",nationality:"england",occupation:"formerly pilot and overwatch agent currently adventurer",sayoccupation:"formerly pilot and overwatch agent currently adventurer",base:"london england",saybase:"london england",affiliation:"formerly overwatch",sayaffiliation:"formerly overwatch",age:"26",gender:"f"},
    {codeName:"bastion",realName:"sst laboratories siege automaton e54",role:"defense hero",nationality:"germany",occupation:"battle automaton",sayoccupation:"battle automaton",base:"formerly black forest germany",saybase:"formerly black forest germany",affiliation:"",sayaffiliation:"none",age:"30",gender:"m"},
	{codeName:"hanzo",realName:"hanzo shimada",role:"defense hero",nationality:"japan",occupation:"mercenary and assassin",sayoccupation:"mercenary and assassin",base:"formerly hanamura japan",saybase:"formerly hanamura japan",affiliation:"formerly shimada clan",sayaffiliation:"formerly shimada clan",age:"38",gender:"m"},
	{codeName:"junkrat",realName:"jamison fawkes",role:"defense hero",nationality:"australia",occupation:"anarchist thief demolitionist mercenary and scavanger",sayoccupation:"anarchist thief demolitionist mercenary and scavanger",base:"formerly junktown australia",saybase:"formerly junktown	australia",affiliation:"formerly junkers",sayaffiliation:"formerly junkers",age:"25",gender:"m"},
	{codeName:"mei",realName:"mei ling zhou",role:"defense hero",nationality:"china",occupation:"climatologist and adventurer",sayoccupation:"climatologist and adventurer",base:"formerly xian china",saybase:"formerly xian china",affiliation:"formerly overwatch",sayaffiliation:"formerly overwatch",age:"biologically 31 and chronogically 40",gender:"f"},
	{codeName:"torbjorn",realName:"torbjorn lindholm",role:"defense hero",nationality:"sweden",occupation:"weapon designer",sayoccupation:"weapon designer",base:"gothenburg sweden",saybase:"gothenburg sweden",affiliation:"formerly ironclad guild and overwatch",sayaffiliation:"formerly ironclad guild and overwatch",age:"57",gender:"m"},
	{codeName:"widowmaker",realName:"amelie lacroix nee guillard",role:"defense hero",nationality:"france",occupation:"assassin",sayoccupation:"assassin",base:"annecy france",saybase:"annecy france",affiliation:"talon",sayaffiliation:"talon",age:"33",gender:"f"},
	{codeName:"dva",realName:"hana song",role:"tank hero",nationality:"korea",occupation:"formerly competitive starcraft player currently mech pilot and actress",sayoccupation:"formerly competitive starcraft player currently mech pilot and actress",base:"busan south korea",saybase:"busan south korea",affiliation:"mobile exo force",sayaffiliation:"mobile exo force",age:"19",gender:"f"},
	{codeName:"orisa",realName:"orisa",role:"tank hero",nationality:"numbani",occupation:"guardian robot",sayoccupation:"guardian robot",base:"numbani",saybase:"numbani",affiliation:"none",sayaffiliation:"none",age:"1 month",gender:"f"},
	{codeName:"reinhardt",realName:"reinhardt wilhelm",role:"tank hero",nationality:"germany",occupation:"adventurer",sayoccupation:"adventurer",base:"stuttgart germany",saybase:"stuttgart germany",affiliation:"formerly crusaders and overwatch",sayaffiliation:"formerly crusaders and overwatch",age:"61",gender:"m"},
	{codeName:"roadhog",realName:"mako rutledge",role:"tank hero",nationality:"australia",occupation:"formerly enforcer currently bodyguard",sayoccupation:"formerly enforcer currently bodyguard",base:"formerly junkertown australia",saybase:"formerly junkertown australia",affiliation:"formerly australian liberation front and junkers",sayaffiliation:"formerly australian liberation front and junkers",age:"48",gender:"m"},
	{codeName:"winston",realName:"winston",role:"tank hero",nationality:"horizon lunar colony",occupation:"formerly test subject currently scientist and adventurer",sayoccupation:"formerly test subject currently scientist and adventurer",base:"formerly horizon lunar colony currently watchpoint gibraltar",saybase:"formerly lunar colony currently watchpoint gibraltar",affiliation:"formerly lucheng interstellar currently overwatch",sayaffiliation:"formerly lucheng interstellar currently overwatch",age:"29",gender:"m"},
	{codeName:"zarya",realName:"aleksandra zaryanova",role:"tank hero",nationality:"russia",occupation:"soldier",sayoccupation:"soldier",base:"krasnoyarsk front russia",saybase:"krasnoyarsk front russia",affiliation:"russian defense hero forces and volskaya industries",sayaffiliation:"russian defense hero forces and volskaya industries",age:"28",gender:"f"},
	{codeName:"ana",realName:"ana amari",role:"support hero",nationality:"egypt",occupation:"formerly sharpshooter and overwatch second in command currently bounty hunter",sayoccupation:"formerly sharpshooter and overwatch second in command currently bounty hunter",base:"cairo egypt",saybase:"cairo egypt",affiliation:"formerly egyptian security forces and overwatch",sayaffiliation:"formerly egyption security forces and overwatch",age:"60",gender:"f"},
	{codeName:"lucio",realName:"lucio correia dos santos",role:"support hero",nationality:"brazil",occupation:"dj and freedom fighter",sayoccupation:"dj and freedom fighter",base:"rio de janeiro brazil",saybase:"rio de janeiro brazil",affiliation:"none",sayaffiliation:"none",age:"26",gender:"m"},
	{codeName:"mercy",realName:"angela ziegler",role:"support hero",nationality:"swiss",occupation:"field medic and first responder",sayoccupation:"field medic and first responder",base:"zurich switzerland",saybase:"zurich switzerland",affiliation:"formerly overwatch",sayaffiliation:"formerly overwatch",age:"37",gender:"f"},
	{codeName:"symmetra",realName:"satya vaswani",role:"support hero",nationality:"india",occupation:"architech",sayoccupation:"architech",base:"utopaea india",saybase:"utopaea india",affiliation:"vishkar corporation",sayaffiliation:"vishkar corporation",age:"28",gender:"f"},
	{codeName:"zenyatta",realName:"tekhartha zenyatta",role:"support hero",nationality:"nepal",occupation:"wandering guru and adventurer",sayoccupation:"wandering guru and adventurer",base:"formerly shambali monastery nepal",saybase:"formerly shambali monastery nepal",affiliation:"formerly shambali",sayaffiliation:"formerly shambali",age:"20",gender:"m"}
];

//======================================================================================================
//TODO: Replace these text strings to edit the welcome and help messages
//======================================================================================================

var skillName = "Overwatch Heroes Lookup";

//This is the welcome message for when a user starts the skill without a specific intent.
var WELCOME_MESSAGE = "Welcome to " + skillName + "Learn about Alexa Overwatch Heroes. For example, " + getGenericHelpMessage(data);

//This is the message a user will hear when they ask Alexa for help in your skill.
var HELP_MESSAGE = "I can help you find Overwatch Heroes. ";

//This is the message a user will hear when they begin a new search
var NEW_SEARCH_MESSAGE = getGenericHelpMessage(data);

//This is the message a user will hear when they ask Alexa for help while in the SEARCH state
var SEARCH_STATE_HELP_MESSAGE = getGenericHelpMessage(data);

var DESCRIPTION_STATE_HELP_MESSAGE = "Here are some things you can say: Tell me more, or give me his or her character info";

var MULTIPLE_RESULTS_STATE_HELP_MESSAGE = "Sorry, please say the code and real name of the person you'd like to learn more about";

// This is the message use when the decides to end the search
var SHUTDOWN_MESSAGE = "You know, the world could always use more heroes";

//This is the message a user will hear when they try to cancel or stop the skill.
var EXIT_SKILL_MESSAGE = "You know, the world could always use more heroes";

// =====================================================================================================
// ------------------------------ Section 2. Skill Code - Intent Handlers  -----------------------------
// =====================================================================================================
// CAUTION: Editing anything below this line might break your skill.
//======================================================================================================

var states = {
	SEARCHMODE: "_SEARCHMODE",
	DESCRIPTION: "_DESCRIPTION",
	MULTIPLE_RESULTS: "_MULTIPLE_RESULTS"
};

const newSessionHandlers = {
	"LaunchRequest": function() {
		this.handler.state = states.SEARCHMODE;
		this.emit(":ask", WELCOME_MESSAGE, getGenericHelpMessage(data));
	},
	"SearchByNameIntent": function() {
		console.log("SEARCH INTENT");
		this.handler.state = states.SEARCHMODE;
		this.emitWithState("SearchByNameIntent");
	},
	"TellMeMoreIntent": function() {
		this.handler.state = states.SEARCHMODE;
		this.emit(":ask", WELCOME_MESSAGE, getGenericHelpMessage(data));
	},
	"TellMeThisIntent": function() {
		this.handler.state = states.SEARCHMODE;
		this.emitWithState("SearchByNameIntent");
	},
	"SearchByInfoTypeIntent": function() {
		this.handler.state = states.SEARCHMODE;
		this.emitWithState("SearchByInfoTypeIntent");
	},
	"AMAZON.YesIntent": function() {
		this.emit(":ask", getGenericHelpMessage(data), getGenericHelpMessage(data));
	},
	"AMAZON.NoIntent": function() {
		this.emit(":tell", SHUTDOWN_MESSAGE);
	},
	"AMAZON.RepeatIntent": function() {
		this.emit(":ask", HELP_MESSAGE, getGenericHelpMessage(data));
	},
	"AMAZON.StopIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"AMAZON.CancelIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"AMAZON.StartOverIntent": function() {
		this.handler.state = states.SEARCHMODE;
		var output = "Ok, starting over." + getGenericHelpMessage(data);
		this.emit(":ask", output, output);
	},
	"AMAZON.HelpIntent": function() {
		this.emit(":ask", HELP_MESSAGE + getGenericHelpMessage(data), getGenericHelpMessage(data));
	},
	"SessionEndedRequest": function() {
		this.emit("AMAZON.StopIntent");
	},
	"Unhandled": function() {
		this.handler.state = states.SEARCHMODE;
		this.emitWithState("SearchByNameIntent");
	}
};
var startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
	"AMAZON.YesIntent": function() {
		this.emit(":ask", NEW_SEARCH_MESSAGE, NEW_SEARCH_MESSAGE);
	},
	"AMAZON.NoIntent": function() {
		this.emit(":tell", SHUTDOWN_MESSAGE);
	},
	"AMAZON.RepeatIntent": function() {
		var output;
		if(this.attributes.lastSearch){
			output = this.attributes.lastSearch.lastSpeech;
			console.log("repeating last speech");
		}
		else{
			output = getGenericHelpMessage(data);
			console.log("no last speech availble. outputting standard help message.");
		}
		this.emit(":ask",output, output);
	},
	"SearchByNameIntent": function() {
		searchByNameIntentHandler.call(this);
	},
	"SearchByNationalityIntent": function() {
		searchByNationalityIntentHandler.call(this);
	},
	"SearchByInfoTypeIntent": function() {
		searchByInfoTypeIntentHandler.call(this);
	},
	"TellMeThisIntent": function() {
		this.handler.state = states.DESCRIPTION;
		this.emitWithState("TellMeThisIntent");
	},
	"TellMeMoreIntent": function() {
		this.handler.state = states.DESCRIPTION;
		this.emitWithState("TellMeMoreIntent");
	},
	"AMAZON.HelpIntent": function() {
		this.emit(":ask", getGenericHelpMessage(data), getGenericHelpMessage(data));
	},
	"AMAZON.StopIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"AMAZON.CancelIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"AMAZON.StartOverIntent": function() {
		this.handler.state = states.SEARCHMODE;
		var output = "Ok, starting over." + getGenericHelpMessage(data);
		this.emit(":ask", output, output);
	},
	"SessionEndedRequest": function() {
		this.emit("AMAZON.StopIntent");
	},
	"Unhandled": function() {
		console.log("Unhandled intent in startSearchHandlers");
		this.emit(":ask", SEARCH_STATE_HELP_MESSAGE, SEARCH_STATE_HELP_MESSAGE);
	}
});
var multipleSearchResultsHandlers = Alexa.CreateStateHandler(states.MULTIPLE_RESULTS, {

	"AMAZON.StartOverIntent": function() {
		this.handler.state = states.SEARCHMODE;
		var output = "Ok, starting over." + getGenericHelpMessage(data);
		this.emit(":ask", output, output);
	},
	"AMAZON.YesIntent": function() {
		var output = "Hmm. I think you said - yes, but can you please say the name of the person you'd like to learn more about?";
		this.emit(":ask", output, output);
	},
	"AMAZON.NoIntent": function() {
		this.emit(":tell", SHUTDOWN_MESSAGE);
	},
	"AMAZON.RepeatIntent": function() {
		this.emit(":ask",this.attributes.lastSearch.lastSpeech, this.attributes.lastSearch.lastSpeech);
	},
	"SearchByNameIntent": function() {
		var slots = this.event.request.intent.slots;
		var codeName = isSlotValid(this.event.request, "codeName");
		var realName = isSlotValid(this.event.request, "realName");
		var nationality = isSlotValid(this.event.request, "nationality");
		var infoType = isSlotValid(this.event.request, "infoType");

		console.log("codeName:" + codeName);
		console.log("codeName:" + realName);
		console.log("codeName:" + nationality);
		console.log("codeName:" + infoType);
		console.log("Intent Name:" + this.event.request.intent.name);

		var canSearch = figureOutWhichSlotToSearchBy(codeName,realName,nationality);
		console.log("Multiple results found. canSearch is set to = " + canSearch);
		var speechOutput;

		if (canSearch)
			var searchQuery = slots[canSearch].value;
		var searchResults = searchDatabase(this.attributes.lastSearch.results, searchQuery, canSearch);
		var lastSearch;
		var output;

		if (searchResults.count > 1) { //multiple results found again
			console.log("multiple results were found again");
			this.handler.state = states.MULTIPLE_RESULTS;
			output = this.attributes.lastSearch.lastSpeech;
			this.emit(":ask",output);
		} else if (searchResults.count == 1) { //one result found
			this.attributes.lastSearch = searchResults;
			lastSearch = this.attributes.lastSearch;
			this.handler.state = states.DESCRIPTION;
			output = generateSearchResultsMessage(searchQuery,searchResults.results);
			this.attributes.lastSearch.lastSpeech = output;
			this.emit(":ask", output);

		} else { //no match found
			lastSearch = this.attributes.lastSearch;
			var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
			speechOutput = MULTIPLE_RESULTS_STATE_HELP_MESSAGE + ", " + listOfPeopleFound;
			this.emit(":ask", speechOutput);
		}
	},
	"SearchByNationalityIntent": function() {
		this.handler.state = states.SEARCHMODE;
		this.emitWithState("SearchByNationalityIntent");
	},
	"AMAZON.HelpIntent": function() {
		this.emit(":ask", MULTIPLE_RESULTS_STATE_HELP_MESSAGE, MULTIPLE_RESULTS_STATE_HELP_MESSAGE);
	},
	"AMAZON.StopIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"AMAZON.CancelIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"SessionEndedRequest": function() {
		this.emit("AMAZON.StopIntent");
	},
	"Unhandled": function() {
		console.log("Unhandled intent in multipleSearchResultsHandlers");
		this.emit(":ask", MULTIPLE_RESULTS_STATE_HELP_MESSAGE, MULTIPLE_RESULTS_STATE_HELP_MESSAGE);
	}
});
var descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTION, {
	"TellMeMoreIntent": function() {
		var person;
		var speechOutput;
		var repromptSpeech;
		var cardContent;

		if(this.attributes.lastSearch){
			person = this.attributes.lastSearch.results[0];
			cardContent = generateCard(person); //calling the helper function to generate the card content that will be sent to the Alexa app.
			speechOutput = generateTellMeMoreMessage(person);
			repromptSpeech = "Would you like to find another overwatch hero? Say yes or no";

			console.log("the character you're trying to find more info about is " + person.codeName);
			this.handler.state = states.SEARCHMODE;
			this.attributes.lastSearch.lastSpeech = speechOutput;
			this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.role, cardContent.body, cardContent.image);
		}
		else{
			speechOutput = getGenericHelpMessage(data);
			repromptSpeech = getGenericHelpMessage(data);
			this.handler.state = states.SEARCHMODE;
			this.emit(":ask", speechOutput, repromptSpeech);
		}
	},
	"TellMeThisIntent": function() {
		var slots = this.event.request.intent.slots;
		var person = this.attributes.lastSearch.results[0];
		var infoType = isSlotValid(this.event.request, "infoType");
		var speechOutput;
		var repromptSpeech;
		var cardContent;

		console.log(isInfoTypeValid("base"));

		if(this.attributes.lastSearch && isInfoTypeValid(infoType)){
			person =  this.attributes.lastSearch.results[0];
			cardContent = generateCard(person);
			speechOutput = generateSpecificInfoMessage(slots,person);
			repromptSpeech = "Would you like to find another overwatch hero? Say yes or no";
			this.handler.state = states.SEARCHMODE;
			this.attributes.lastSearch.lastSpeech = speechOutput;
			this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.role, cardContent.body, cardContent.image);
		} else {
			//not a valid slot. no card needs to be set up. respond with simply a voice response.
			speechOutput = generateSearchHelpMessage(person.gender);
			repromptSpeech = "You can ask me - what's " + genderize("his-her", person.gender) + " occupation, or give me " + genderize("his-her", person.gender) + " base";
			this.attributes.lastSearch.lastSpeech = speechOutput;
			this.handler.state = states.SEARCHMODE;
			this.emit(":ask", speechOutput, repromptSpeech);
		}
	},
	"SearchByNameIntent": function() {
		searchByNameIntentHandler.call(this);
	},
	"SearchByNationalityIntent": function() {
		searchByNationalityIntentHandler.call(this);
	},
	"AMAZON.HelpIntent": function() {
		var person = this.attributes.lastSearch.results[0];
		this.emit(":ask", generateNextPromptMessage(person,"current"), generateNextPromptMessage(person,"current"));
	},
	"AMAZON.StopIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"AMAZON.CancelIntent": function() {
		this.emit(":tell", EXIT_SKILL_MESSAGE);
	},
	"AMAZON.NoIntent": function() {
		this.emit(":tell", SHUTDOWN_MESSAGE);
	},
	"AMAZON.YesIntent": function() {
		this.emit("TellMeMoreIntent");
	},
	"AMAZON.RepeatIntent": function() {
		this.emit(":ask",this.attributes.lastSearch.lastSpeech, this.attributes.lastSearch.lastSpeech);
	},
	"AMAZON.StartOverIntent": function() {
		this.handler.state = states.SEARCHMODE;
		var output = "Ok, starting over." + getGenericHelpMessage(data);
		this.emit(":ask", output, output);
	},
	"SessionEndedRequest": function() {
		this.emit("AMAZON.StopIntent");
	},
	"Unhandled": function() {
		var person = this.attributes.lastSearch.results[0];
		console.log("Unhandled intent in DESCRIPTION state handler");
		this.emit(":ask", "Sorry, I don't know that" + generateNextPromptMessage(person,"general"), "Sorry, I don't know that" + generateNextPromptMessage(person,"general"));
	}
});

// ------------------------- END of Intent Handlers  ---------------------------------

function searchDatabase(dataset, searchQuery, searchType) {
	var matchFound = false;
	var results = [];

	//beginning search
	for (var i = 0; i < dataset.length; i++) {
		if (sanitizeSearchQuery(searchQuery) == dataset[i][searchType]) {
			results.push(dataset[i]);
			matchFound = true;
		}
		if ((i == dataset.length - 1) && (matchFound == false)) {
			//this means that we are on the last record, and no match was found
			matchFound = false;
			console.log("no match was found using " + searchType);
			//if more than searchable items were provided, set searchType to the next item, and set i=0
			//ideally you want to start search with realName, then codename, and then nationality
		}
	}
	return {
		count: results.length,
		results: results
	};
}

function figureOutWhichSlotToSearchBy(codeName,realName,nationality) {
	if (realName){
		console.log("search by realName");
		return "realName";
	}
	else if (!realName && codeName){
		console.log("search by codeName");
		return "codeName";
	}
	else if (!realName && !codeName && nationality){
		console.log("search by nationality");
		return "nationality";
	}
	else{
		console.log("no valid slot provided. can't search.");
		return false;
	}
}

function searchByNameIntentHandler(){
	var codeName = isSlotValid(this.event.request, "codeName");
	var realName = isSlotValid(this.event.request, "realName");
	var nationality = isSlotValid(this.event.request, "nationality");
	var infoType = isSlotValid(this.event.request, "infoType");

	var canSearch = figureOutWhichSlotToSearchBy(codeName,realName,nationality);
	console.log("canSearch is set to = " + canSearch);

	if (canSearch){
		var searchQuery = this.event.request.intent.slots[canSearch].value;
		var searchResults = searchDatabase(data, searchQuery, canSearch);

		//saving lastSearch results to the current session
		var lastSearch = this.attributes.lastSearch = searchResults;
		var output;

		//saving last intent to session attributes
		this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

		if (searchResults.count > 1) { //multiple results found
			console.log("Search complete. Multiple results were found");
			var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
			output = generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
			this.handler.state = states.MULTIPLE_RESULTS; // change state to MULTIPLE_RESULTS
			this.attributes.lastSearch.lastSpeech = output;
			this.emit(":ask", output);
		} else if (searchResults.count == 1) { //one result found
			this.handler.state = states.DESCRIPTION; // change state to description
			console.log("one match was found");
			if (infoType) {
				//if a specific infoType was requested, redirect to specificInfoIntent
				console.log("infoType was provided as well");
				this.emitWithState("TellMeThisIntent");
			}
			else{
				console.log("no infoType was provided.");
				output = generateSearchResultsMessage(searchQuery,searchResults.results);
				this.attributes.lastSearch.lastSpeech = output;
				this.emit(":ask", output);
			}
		}
		else{//no match found
			console.log("no match found");
			console.log("searchQuery was  = " + searchQuery);
			console.log("searchResults.results was  = " + searchResults);
			output = generateSearchResultsMessage(searchQuery,searchResults.results);
			this.attributes.lastSearch.lastSpeech = output;
			// this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
			this.emit(":ask", output);
		}
	}
	else {
		console.log("no searchable slot was provided");
		console.log("searchQuery was  = " + searchQuery);
		console.log("searchResults.results was  = " + searchResults);

		this.emit(":ask", generateSearchResultsMessage(searchQuery,false));
	}
}

function searchByNationalityIntentHandler(){
	var slots = this.event.request.intent.slots;
	var nationality = isSlotValid(this.event.request, "nationality");

	if (nationality){
		var searchQuery = slots.nationality.value;
		console.log("will begin search with  " + slots.nationality.value + " in nationality");
		var searchResults = searchDatabase(data, searchQuery, "nationality");

		//saving lastSearch results to the current session
		var lastSearch = this.attributes.lastSearch = searchResults;
		var output;

		//saving last intent to session attributes
		this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

		if (searchResults.count > 1) { //multiple results found
			console.log("Search completed by city. Multiple results were found");
			var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
			output = generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
			this.handler.state = states.MULTIPLE_RESULTS; // change state to MULTIPLE_RESULTS
			this.attributes.lastSearch.lastSpeech = output;
			this.emit(":ask", output);
		} else if (searchResults.count == 1) { //one result found
			console.log("one match found");
			this.handler.state = states.DESCRIPTION; // change state to description
			output = generateSearchResultsMessage(searchQuery,searchResults.results);
			this.attributes.lastSearch.lastSpeech = output;
			// this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
			this.emit(":ask", output);

		}
		else{//no match found
			console.log("no match found");
			console.log("searchQuery was  = " + searchQuery);
			console.log("searchResults.results was  = " + searchResults);
			output = generateSearchResultsMessage(searchQuery,searchResults.results);
			this.attributes.lastSearch.lastSpeech = output;
			// this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
			this.emit(":ask", output);

		}
	}
	else {
		console.log("no searchable slot was provided");
		console.log("searchQuery was  = " + searchQuery);
		console.log("searchResults.results was  = " + searchResults);

		this.emit(":ask", generateSearchResultsMessage(searchQuery,false));
	}
}

function searchByInfoTypeIntentHandler(){
	var slots = this.event.request.intent.slots;
	var codeName = isSlotValid(this.event.request, "codeName");
	var realName = isSlotValid(this.event.request, "realName");
	var nationality = isSlotValid(this.event.request, "nationality");
	var infoType = isSlotValid(this.event.request, "infoType");

	var canSearch = figureOutWhichSlotToSearchBy(codeName,realName,nationality);
	console.log("canSearch is set to = " + canSearch);

	if (canSearch){
		var searchQuery = slots[canSearch].value;
		var searchResults = searchDatabase(data, searchQuery, canSearch);

		//saving lastSearch results to the current session
		var lastSearch = this.attributes.lastSearch = searchResults;
		var output;

		//saving last intent to session attributes
		this.attributes.lastSearch.lastIntent = "SearchByNameIntent";

		if (searchResults.count > 1) { //multiple results found
			console.log("multiple results were found");
			var listOfPeopleFound = loopThroughArrayOfObjects(lastSearch.results);
			output = generateSearchResultsMessage(searchQuery,searchResults.results) + listOfPeopleFound + ". Who would you like to learn more about?";
			this.handler.state = states.MULTIPLE_RESULTS; // change state to MULTIPLE_RESULTS
			this.attributes.lastSearch.lastSpeech = output;
			this.emit(":ask", output);
		} else if (searchResults.count == 1) { //one result found
			this.handler.state = states.DESCRIPTION; // change state to description
			console.log("one match was found");
			if (infoType) {
				//if a specific infoType was requested, redirect to specificInfoIntent
				console.log("infoType was provided as well");
				var person = this.attributes.lastSearch.results[0];
				var cardContent = generateCard(person);
				var speechOutput = generateSpecificInfoMessage(slots,person);
				var repromptSpeech = "Would you like to find another overwatch hero? Say yes or no";
				this.attributes.lastSearch.lastSpeech = speechOutput;
				this.handler.state = states.SEARCHMODE;
				this.emit(":askWithCard", speechOutput, repromptSpeech, cardContent.role, cardContent.body, cardContent.image);
				// this.emitWithState("TellMeThisIntent");
			}
			else{
				console.log("no infoType was provided.");
				output = generateSearchResultsMessage(searchQuery,searchResults.results);
				this.attributes.lastSearch.lastSpeech = output;
				// this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
				this.emit(":ask", output);
			}
		}
		else{//no match found
			console.log("no match found");
			console.log("searchQuery was  = " + searchQuery);
			console.log("searchResults.results was  = " + searchResults);
			output = generateSearchResultsMessage(searchQuery,searchResults.results);
			this.attributes.lastSearch.lastSpeech = output;
			// this.emit(":ask", generateSearchResultsMessage(searchQuery,searchResults.results));
			this.emit(":ask", output);
		}
	}
	else {
		console.log("no searchable slot was provided");
		console.log("searchQuery was  = " + searchQuery);
		console.log("searchResults.results was  = " + searchResults);

		this.emit(":ask", generateSearchResultsMessage(searchQuery,false));
	}
}
// =====================================================================================================
// ------------------------------- Section 3. Generating Speech Messages -------------------------------
// =====================================================================================================

function generateNextPromptMessage(person,mode){
	var infoTypes = ["base","occupation","affiliation"];
	var prompt;

	if (mode == "current"){
		// if the mode is current, we should give more informaiton about the current character
		prompt = ". You can say - tell me more, or  tell me " + genderize("his-her", person.gender) + " " + infoTypes[getRandom(0,infoTypes.length-1)];
	}
	//if the mode is general, we should provide general help information
	else if (mode == "general"){
		prompt = ". " + getGenericHelpMessage(data);
	}
	return prompt;
}

function generateSendingCardToAlexaAppMessage(person,mode){
	var sentence = "I have sent " + person.codeName + "'s character card to your Alexa app" + generateNextPromptMessage(person,mode);
	return sentence;
}

function generateSearchResultsMessage(searchQuery,results){
	var sentence;
	var details;
	var prompt;

	if (results){
		switch (true) {
		case (results.length == 0):
			sentence = "Hmm. I couldn't find " + searchQuery + ". " + getGenericHelpMessage(data);
			break;
		case (results.length == 1):
			var person = results[0];
			details = person.codeName + " " + person.realName + " is " + person.role + ", from " + person.nationality;
			prompt = generateNextPromptMessage(person,"current");
			sentence = details + prompt;
			console.log(sentence);
			break;
		case (results.length > 1):
			sentence = "I found " + results.length + " matching results";
			break;
		}
	}
	else{
		sentence = "Sorry, I didn't quite get that. " + getGenericHelpMessage(data);
	}
	return sentence;
}

function getGenericHelpMessage(data){
	var sentences = ["ask - who is " + getRandomName(data),"say - find an overwatch hero in " + getRandomNationality(data)];
	return "You can " + sentences[getRandom(0,sentences.length-1)];
}

function generateSearchHelpMessage(gender){
	var sentence = "Sorry, I don't know that. You can ask me - what's " + genderize("his-her", gender) +" occupation, or give me " + genderize("his-her", gender) + " base";
	return sentence;
}

function generateTellMeMoreMessage(person){
	var sentence = person.codeName + " is " + person.age + "years old. " + genderize("his-her", person.gender) + " Occupation is " + person.sayoccupation + " . " + generateSendingCardToAlexaAppMessage(person,"general");
	return sentence;
}
function generateSpecificInfoMessage(slots,person){
	var infoTypeValue;
	var sentence;
	
	infoTypeValue = slots.infoType.value;
	
	sentence = person.codeName + "'s " + infoTypeValue.toLowerCase() + " is - " + person["say" + infoTypeValue.toLowerCase()] + " . Would you like to find another overwatch hero? " + getGenericHelpMessage(data);
	return sentence;
}

exports.handler = function(event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.appId = APP_ID;
	alexa.registerHandlers(newSessionHandlers, startSearchHandlers, descriptionHandlers, multipleSearchResultsHandlers);
	alexa.execute();
};

// =====================================================================================================
// ------------------------------------ Section 4. Helper Functions  -----------------------------------
// =====================================================================================================
// For more helper functions, visit the Alexa cookbook at https://base.com/alexa/alexa-cookbook
//======================================================================================================

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomNationality(arrayOfStrings) {
	return arrayOfStrings[getRandom(0, data.length - 1)].nationality;
}

function getRandomName(arrayOfStrings) {
	var randomNumber = getRandom(0, data.length - 1);
	return arrayOfStrings[randomNumber].codeName + " " + arrayOfStrings[randomNumber].realName;
}

function roleCase(str) {
	return str.replace(str[0], str[0].toUpperCase());
}

function generateCard(person) {
	var cardTitle = "Character Info for " + roleCase(person.codeName) + " " + roleCase(person.realName);
	var cardBody = "Occupation: " + person.occupation + " \n" + "Base: " + person.base + " \n" + "Affiliation: " + person.affiliation;
	var imageObj = {
		smallImageUrl: "https://d1u1mce87gyfbn.cloudfront.net/hero/" + person.codeName + "/hero-select-portrait.png",
		largeImageUrl: "https://d1u1mce87gyfbn.cloudfront.net/hero/" + person.codeName + "/hero-select-portrait.png",
	};
	return {
		"role": cardTitle,
		"body": cardBody,
		"image": imageObj
	};
}

function loopThroughArrayOfObjects(arrayOfStrings) {
	var joinedResult = "";
	// Looping through the each object in the array
	for (var i = 0; i < arrayOfStrings.length; i++) {
		//concatenating names (codeName + realName ) for each item
		joinedResult = joinedResult + ", " + arrayOfStrings[i].codeName + " " + arrayOfStrings[i].realName;
	}
	return joinedResult;
}

function genderize(type, gender) {
	var pronouns ={
		"m":{"he-she":"he","his-her":"his","him-her":"him"},
		"f":{"he-she":"she","his-her":"her","him-her":"her"}
	};
	return pronouns[gender][type];
}

function sanitizeSearchQuery(searchQuery){
	searchQuery = searchQuery.replace(/’s/g, "").toLowerCase();
	searchQuery = searchQuery.replace(/'s/g, "").toLowerCase();
	return searchQuery;
}

function isSlotValid(request, slotName){
	var slot = request.intent.slots[slotName];
	//console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
	var slotValue;

	//if we have a slot, get the text and store it into speechOutput
	if (slot && slot.value) {
		//we have a value in the slot
		slotValue = slot.value.toLowerCase();
		return slotValue;
	} else {
		//we didn't get a value in the slot.
		return false;
	}
}

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}

function isInfoTypeValid(infoType){
	var validTypes = ["base","occupation","affiliation"];
	return isInArray(infoType,validTypes);
}
