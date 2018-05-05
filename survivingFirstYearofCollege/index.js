/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

var Alexa = require('alexa-sdk');

var states = {
    STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.
    ASKMODE: '_ASKMODE',                    // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE'     // Alexa is describing the final choice and prompting to start again or quit
};


// Questions
var nodes = [
       { "node": 1, "message": "Do you always go to class?", "yes": 2, "no": 45 },
       { "node": 2, "message": "Do you get involved in extra curricular activities?", "yes": 3, "no": 46 },
       { "node": 3, "message": "Do you always back up your assignment files?", "yes": 4, "no": 47 },
       { "node": 4, "message": "Do you create and stick to a budget?", "yes": 5, "no": 48 },
       { "node": 5, "message": "Do you get a credit card?", "yes": 6, "no": 49 },
       { "node": 6, "message": "Do you learn to do laundry?", "yes": 7, "no": 50 },
       { "node": 7, "message": "Do you drink all the caffeine you can get?", "yes": 51, "no": 8 },
			 { "node": 8, "message": "Do you leaver your clothes in a washer after the cycle is over?", "yes": 52, "no": 9 },
			 { "node": 9, "message": "Do you try to resolve issues with your roommate?", "yes": 10, "no": 53 },
			 { "node": 10, "message": "Do you get a part-time job preferably doing something that relates to your major?", "yes": 11, "no": 54 },
			 { "node": 11, "message": "Do you get to know your professors?", "yes": 12, "no": 55 },
			 { "node": 12, "message": "Do you avoid car?", "yes": 13, "no": 56 },
			 { "node": 13, "message": "Do you buy a parking pass on Campus?", "yes": 14, "no": 57 },
			 { "node": 14, "message": "Do you live in the campus residance halls your first year?", "yes": 15, "no": 58 },
			 { "node": 15, "message": "Do you be professional?", "yes": 16, "no": 59 },
			 { "node": 16, "message": "Do you study?", "yes": 17, "no": 60 },
			 { "node": 17, "message": "Do you get a tutor?", "yes": 18, "no": 61 },
			 { "node": 18, "message": "Do you wear flip-flops in the bathroom?", "yes": 19, "no": 62 },
			 { "node": 19, "message": "Do you register classes on time?", "yes": 20, "no": 63 },
			 { "node": 20, "message": "Do you take smart notes?", "yes": 21, "no": 64 },
			 { "node": 21, "message": "Do you try out as many clubs as you can?", "yes": 22, "no": 65 },
			 { "node": 22, "message": "Do you put your alarm clock somewhere you can reach it?", "yes": 66, "no": 23 },
			 { "node": 23, "message": "Do you get drunk?", "yes": 67, "no": 24 },
			 { "node": 24, "message": "Do you use a calendar?", "yes": 25, "no": 68 },
			 { "node": 25, "message": "Do you underestimate the value of a care package from mom?", "yes": 69, "no": 26 },
			 { "node": 26, "message": "Do you get out and explore your campus?", "yes": 27, "no": 70 },
			 { "node": 27, "message": "Do you find out what resources your school offers and use them?", "yes": 28, "no": 71 },
			 { "node": 28, "message": "Do you keep a journal?", "yes": 29, "no": 72 },
			 { "node": 29, "message": "Do you create a resume?", "yes": 30, "no": 73 },
			 { "node": 30, "message": "Do you go to every career fair?", "yes": 31, "no": 74 },
			 { "node": 31, "message": "Do you take a speech class?", "yes": 32, "no": 75 },
			 { "node": 32, "message": "Do you get out of your comfort zone and try new things?", "yes": 33, "no": 76 },
			 { "node": 33, "message": "Do you speak out in class?", "yes": 34, "no": 77 },
			 { "node": 34, "message": "Do you set a schedule?", "yes": 35, "no": 78 },
			 { "node": 35, "message": "Do you procrastinate?", "yes": 79, "no": 36 },
			 { "node": 36, "message": "Do you be proactive and not reactive?", "yes": 37, "no": 80 },
			 { "node": 37, "message": "Do you create goals?", "yes": 38, "no": 81 },
			 { "node": 38, "message": "Do you cling to high school friends?", "yes": 82, "no": 39 },
			 { "node": 39, "message": "Do you unplug your electronics during class?", "yes": 40, "no": 83 },
			 { "node": 40, "message": "Do you buy textbooks onine?", "yes": 41, "no": 84 },
			 { "node": 41, "message": "Do you create to do lists?", "yes": 42, "no": 85 },
			 { "node": 42, "message": "Do you read books?", "yes": 43, "no": 86 },
			 { "node": 43, "message": "Do you cram?", "yes": 87, "no": 44 },
			 { "node": 44, "message": "Do you multitask?", "yes": 88, "no": 89 },

// Answers & descriptions
       { "node": 45, "message": "You missed the pop quiz!", "yes": 0, "no": 0, "description": "You never know when the professor will drop a crucial test hint or extra credit for attendnace." },
			 { "node": 46, "message": "You didn't learn anything outside of your class!", "yes": 0, "no": 0, "description":"All the knowledge in the world won't help you if you come out of college with no experience or professional relationships" },
			 { "node": 47, "message": "Your assignment disappeared!", "yes": 0, "no": 0, "description":"If something can go wrong, it will." },
			 { "node": 48, "message": "You spent all your money!", "yes": 0, "no": 0, "description":"Over spending the first year can impact you for years to come." },
			 { "node": 49, "message": "You don't have any credits!.", "yes": 0, "no": 0, "description":"Build credit but never carry a balance. It is not free money." },
			 { "node": 50, "message": "You ruined all your clothes!.", "yes": 0, "no": 0, "description":"If you have new colored clothes, wash colors separately from whites the first few tiems you wear them. Other wise, toss them all in the same load if they will fit." },
			 { "node": 51, "message": "You can't sleep!", "yes": 0, "no": 0, "description":"It's really not good for you and you can get energy by staying well hydrated, eating healthy foods, and sleeping enough." },
			 { "node": 52, "message": "You lost your clothes!", "yes": 0, "no": 0, "description":"Be there to take them out a minute before the cycle ends. Not doing this is rude and people will pull your clothes out and set them somewhere else." },
			 { "node": 53, "message": "You are stuck with your roommate!.", "yes": 0, "no": 0, "description":"Talk and don't let them build up to the point where you can't stand each other." },
			 { "node": 54, "message": "You waste your time doing nothing!.", "yes": 0, "no": 0, "description":"A job actually helps with time management when you first start school." },
			 { "node": 55, "message": "Your professor doesn't know you at all!.", "yes": 0, "no": 0, "description":"College is just as much about networking as it is about sitting in class. Plus, most of them are bored out of their skulls during office hours because no one goes." },
			 { "node": 56, "message": "You spent your time and money for your car!", "yes": 0, "no": 0, "description":"Don't bring a car to campus if you don't need one. Many schools have great public transit systems and Facebook can net you rides when you need them." },
			 { "node": 57, "message": "You can't find a place to park!", "yes": 0, "no": 0, "description":"Even if it's a bit more expensive, it will save you a lot of time." },
			 { "node": 58, "message": "You can't build relationships!", "yes": 0, "no": 0, "description":"Much more social than apartments and you will be involved in a lot more cool things and build relationships that last a lifetime." },
			 { "node": 59, "message": "You are not professional!", "yes": 0, "no": 0, "description":"Realize that you are an adult now, dress the part and act the part." },
			 { "node": 60, "message": "You are failing!", "yes": 0, "no": 0, "description":"Find a go to place to study and develop a study method that works for you and make it a regular activity." },
			 { "node": 61, "message": "You are not getting any help!", "yes": 0, "no": 0, "description":"This does not make you look dumb. Not getting one when you need help does." },
			 { "node": 62, "message": "Your feets are gross!", "yes": 0, "no": 0, "description":"No exceptions. Those floors are gross." },
			 { "node": 63, "message": "You can't register for classes!", "yes": 0, "no": 0, "description":"You will thank yourself later when your friends are having to do an extra semester because they could not get into a required class." },
			 { "node": 64, "message": "You don't have any notes!", "yes": 0, "no": 0, "description":"You will want these later." },
			 { "node": 65, "message": "You can't find your club!", "yes": 0, "no": 0, "description":"Feel no obligation to them if you do not like them. College is about finding out what you love to do. Then stick with it when you find a good fit." },
			 { "node": 66, "message": "You overslept!", "yes": 0, "no": 0, "description":"Make yourself get out of bed to turn it off." },
			 { "node": 67, "message": "You are drunk!", "yes": 0, "no": 0, "description":"But be a good friend when others you knwo do." },
			 { "node": 68, "message": "You can't keep track of your schedule!", "yes": 0, "no": 0, "description":"Google Calendar is probably the best one there is to keep life scheduled." },
			 { "node": 69, "message": "Your mom hates you!", "yes": 0, "no": 0, "description":"Always try to keep good communication with your family at home." },
			 { "node": 70, "message": "You don't know your campus!", "yes": 0, "no": 0, "description":"Same goes for exploring the city your campus is in." },
			 { "node": 71, "message": "You can't find help!", "yes": 0, "no": 0, "description":"Many universities hvae free tech support centers, health centers, seminar, and more." },
			 { "node": 72, "message": "You don't know how much you progressed!", "yes": 0, "no": 0, "description":"It's great to be able to go back and see how you've progressed over the years." },
			 { "node": 73, "message": "You can't apply anywhere!", "yes": 0, "no": 0, "description":"Add to it throughout college and actually do cool things to put on it." },
			 { "node": 74, "message": "You don't know any recruiters!!", "yes": 0, "no": 0, "description":"You want to build relationships with recruiters and they will remember your face if you show up every time." },
			 { "node": 75, "message": "You don't know how to talk!", "yes": 0, "no": 0, "description":"Communication skills are among the more important things recruiters look for in students." },
			 { "node": 76, "message": "You are stuck in your comfort zone!", "yes": 0, "no": 0, "description":"College is the greatest opportunity you will ever have for personal development." },
			 { "node": 77, "message": "You are not participating!", "yes": 0, "no": 0, "description":"Ask questions and add your opinions to be active in your education." },
			 { "node": 78, "message": "Your life is a mess!", "yes": 0, "no": 0, "description":"Plan out your week and include clas time, study time, and social time." },
			 { "node": 79, "message": "You didn't get anything done!", "yes": 0, "no": 0, "description":"Procrastination catches up with you and can make you always feel behind." },
			 { "node": 80, "message": "You are being reactive!", "yes": 0, "no": 0, "description":"Take an active role in your experience." },
			 { "node": 81, "message": "You don't have any goals!", "yes": 0, "no": 0, "description":"Both long term and short term goals help align your activities." },
			 { "node": 82, "message": "You don't have new relationships!", "yes": 0, "no": 0, "description":"College is not an extension of high school, build new friendships and have new experiences" },
			 { "node": 83, "message": "You are distracted!", "yes": 0, "no": 0, "description":"Turn off your laptop and cellphone during class and actually pay attention." },
			 { "node": 84, "message": "You are wasting your money!", "yes": 0, "no": 0, "description":"This is a much more cost effective alternative to buying in the campus bookstore." },
			 { "node": 85, "message": "You don't know what to do!", "yes": 0, "no": 0, "description":"Lists can help you prioritize as well as make sure things do not fall through the cracks." },
			 { "node": 86, "message": "You can't read!", "yes": 0, "no": 0, "description":"Read your textbooks as well as set aside time for personal reading." },
			 { "node": 87, "message": "You don't learn anything!", "yes": 0, "no": 0, "description":"Life is about more than just a test, actually learn the material." },
			 { "node": 88, "message": "You can't focus!", "yes": 0, "no": 0, "description":"Multi-tasking leads to work that is of lower quality. Focus." },
       { "node": 89, "message": "Congratulation, you survived your first year of college!", "yes": 0, "no": 0, "description":"Now just keep it up until you graduate!"}

];

// this is used for keep track of visted nodes when we test for loops in the tree
var visited;

// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
var welcomeMessage = "Welcome to Surviving First Year of College. Try to survive your first year of college by doing right things, are you ready to play?";

// This is the message that is repeated if the response to the initial welcome message is not heard
var repeatWelcomeMessage = "Say yes to start the game or no to quit.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
var promptToStartMessage = "Say yes to continue, or no to end the game.";

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
var promptToSayYesNo = "Say yes or no to answer the question.";

// This is the response to the user after the final question when Alex decides on what group choice the user should be given
var decisionMessage = "Well, ";

// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again
var playAgainMessage = "Say 'tell me more' to hear why, or do you want to play again?";

// this is the help message during the setup at the beginning of the game
var helpMessage = "You will be asked 44 questions to see if you can survive your first year of college. Want to start now?";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "Ok, see you next time!";

var speechNotFoundMessage = "Could not find speech for node";

var nodeNotFoundMessage = "In nodes array could not find node";

var descriptionNotFoundMessage = "Could not find description for node";

var utteranceTellMeMore = "tell me more";

var utterancePlayAgain = "play again";

// the first node that we will use
var START_NODE = 1;

// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler, startGameHandlers, askQuestionHandlers, descriptionHandlers);
    alexa.execute();
};

// set state to start up and  welcome the user
var newSessionHandler = {
  'LaunchRequest': function () {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
  },'AMAZON.HelpIntent': function () {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', helpMessage, helpMessage);
  },
  'Unhandled': function () {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', promptToStartMessage, promptToStartMessage);
  }
};

// --------------- Functions that control the skill's behavior -----------------------

// Called at the start of the game, picks and asks first question for the user
var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    'AMAZON.YesIntent': function () {
        // set state to asking questions
        this.handler.state = states.ASKMODE;

        // ask first question, the response will be handled in the askQuestionHandler
        var message = helper.getSpeechForNode(START_NODE);

        // record the node we are on
        this.attributes.currentNode = START_NODE;

        // ask the first question
        this.emit(':ask', message, message);
    },
    'AMAZON.NoIntent': function () {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function () {
         this.emit(':ask', promptToStartMessage, promptToStartMessage);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', helpMessage, helpMessage);
    },
    'Unhandled': function () {
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    }
});


// user will have been asked a question when this intent is called. We want to look at their yes/no
// response and then ask another question. If we have asked more than the requested number of questions Alexa will
// make a choice, inform the user and then ask if they want to play again
var askQuestionHandlers = Alexa.CreateStateHandler(states.ASKMODE, {

    'AMAZON.YesIntent': function () {
        // Handle Yes intent.
        helper.yesOrNo(this,'yes');
    },
    'AMAZON.NoIntent': function () {
        // Handle No intent.
         helper.yesOrNo(this, 'no');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function () {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'Unhandled': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    }
});

// user has heard the final choice and has been asked if they want to hear the description or to play again
var descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTIONMODE, {

 'AMAZON.YesIntent': function () {
        // Handle Yes intent.
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'AMAZON.NoIntent': function () {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function () {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'DescriptionIntent': function () {
        //var reply = this.event.request.intent.slots.Description.value;
        //console.log('HEARD: ' + reply);
        helper.giveDescription(this);
      },

    'Unhandled': function () {
        this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
    }
});

// --------------- Helper Functions  -----------------------

var helper = {

    // gives the user more information on their final choice
    giveDescription: function (context) {

        // get the speech for the child node
        var description = helper.getDescriptionForNode(context.attributes.currentNode);
        var message = description + ', ' + repeatWelcomeMessage;

        context.emit(':ask', message, message);
    },

    // logic to provide the responses to the yes or no responses to the main questions
    yesOrNo: function (context, reply) {

        // this is a question node so we need to see if the user picked yes or no
        var nextNodeId = helper.getNextNode(context.attributes.currentNode, reply);

        // error in node data
        if (nextNodeId == -1)
        {
            context.handler.state = states.STARTMODE;

            // the current node was not found in the nodes array
            // this is due to the current node in the nodes array having a yes / no node id for a node that does not exist
            context.emit(':tell', nodeNotFoundMessage, nodeNotFoundMessage);
        }

        // get the speech for the child node
        var message = helper.getSpeechForNode(nextNodeId);

        // have we made a decision
        if (helper.isAnswerNode(nextNodeId) === true) {

            // set the game state to description mode
            context.handler.state = states.DESCRIPTIONMODE;

            // append the play again prompt to the decision and speak it
            message = decisionMessage + ' ' + message + ' ,' + playAgainMessage;
        }

        // set the current node to next node we want to go to
        context.attributes.currentNode = nextNodeId;

        context.emit(':ask', message, message);
    },

    // gets the description for the given node id
    getDescriptionForNode: function (nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].description;
            }
        }
        return descriptionNotFoundMessage + nodeId;
    },

    // returns the speech for the provided node id
    getSpeechForNode: function (nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].message;
            }
        }
        return speechNotFoundMessage + nodeId;
    },

    // checks to see if this node is an choice node or a decision node
    isAnswerNode: function (nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                if (nodes[i].yes === 0 && nodes[i].no === 0) {
                    return true;
                }
            }
        }
        return false;
    },

    // gets the next node to traverse to based on the yes no response
    getNextNode: function (nodeId, yesNo) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                if (yesNo == "yes") {
                    return nodes[i].yes;
                }
                return nodes[i].no;
            }
        }
        // error condition, didnt find a matching node id. Cause will be a yes / no entry in the array but with no corrosponding array entry
        return -1;
    },

    // Recursively walks the node tree looking for nodes already visited
    // This method could be changed if you want to implement another type of checking mechanism
    // This should be run on debug builds only not production
    // returns false if node tree path does not contain any previously visited nodes, true if it finds one
    debugFunction_walkNode: function (nodeId) {

        // console.log("Walking node: " + nodeId);

        if( helper.isAnswerNode(nodeId) === true) {
            // found an answer node - this path to this node does not contain a previously visted node
            // so we will return without recursing further

            // console.log("Answer node found");
             return false;
        }

        // mark this question node as visited
        if( helper.debugFunction_AddToVisited(nodeId) === false)
        {
            // node was not added to the visited list as it already exists, this indicates a duplicate path in the tree
            return true;
        }

        // console.log("Recursing yes path");
        var yesNode = helper.getNextNode(nodeId, "yes");
        var duplicatePathHit = helper.debugFunction_walkNode(yesNode);

        if( duplicatePathHit === true){
            return true;
        }

        // console.log("Recursing no");
        var noNode = helper.getNextNode(nodeId, "no");
        duplicatePathHit = helper.debugFunction_walkNode(noNode);

        if( duplicatePathHit === true){
            return true;
        }

        // the paths below this node returned no duplicates
        return false;
    },

    // checks to see if this node has previously been visited
    // if it has it will be set to 1 in the array and we return false (exists)
    // if it hasnt we set it to 1 and return true (added)
    debugFunction_AddToVisited: function (nodeId) {

        if (visited[nodeId] === 1) {
            // node previously added - duplicate exists
            // console.log("Node was previously visited - duplicate detected");
            return false;
        }

        // was not found so add it as a visited node
        visited[nodeId] = 1;
        return true;
    }
};
