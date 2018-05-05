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
       { "node": 1, "message": "Thank you. We have so many things to see in this Alphabet Land. I see a tree with Apple. Apple stars with Alphabet A. A P P L E. Apple. A for Apple. I also see an ant under me. A N T. Ant. Does Ant start with Alphabet A? Yes or No?", "yes": 2, "no": 28 },
       { "node": 2, "message": "You are right! Ant also starts with Alphabet A. A for Apple. A for A N T. I see a boy playing. B O Y. Boy. Boy starts with Alphabet B. B for Boy. Boy is playing with a ball. B A L L. Ball. Does Ball start with Alphabet B? Yes or No?", "yes": 3, "no": 29 },
       { "node": 3, "message": "You are right! Ball also starts with Alphabet B. B for Boy. B for Ball. I see a bunny eating a carrot. Carrot starts with Alphabet C. C A R R O T. Carrot. C for Carrot. Carrot is being moved by Car. C A R. Car. Does Car start with Alphabet C? Yes or No?", "yes": 4, "no": 30 },
       { "node": 4, "message": "You are right! Car also starts with Alphabet C. C for Carrot. C for Car. I see a dog. Dog starts with Alphabet D. D O G. Dog. D for Dog. Dog is chasing a duck. D U C K. Duck. Does duck start with Alphabet D Yes or No??", "yes": 5, "no": 31 },
       { "node": 5, "message": "You are right! Duck also stars wtih Alphabet D. D for Dog. D for Duck. I see a duck laying an egg. Egg starts with Alphabet E. E G G. Egg. E for Egg. Egg is next to an elephant. E L E P H A N T. Elephant. Does elephant start with Alphabet E? Yes or No?", "yes": 6, "no": 32 },
       { "node": 6, "message": "You are right! Elephant also starts with Alphabet E. E for Egg. E for Elephant. I see a river and it has a fish. Fish starts with Alphabet F. F I S H. F for Fish. Fish has a flag. F L A G. Flag. Does flag start with Alphabet F? Yes or No?", "yes": 7, "no": 33 },
       { "node": 7, "message": "You are right! Flag also starts with Alphabet F. F for Fish. F for Flag. I see a girl playing her guitar. Guitar starts with Alphabet G. G U I T A R. G for Guitar. You see the guitar through a glass. G L A S S. Glass. Does glass start with Alphabet G? Yes or No?", "yes": 8, "no": 34 },
			 { "node": 8, "message": "You are right! Glass also starts with Alphabet G. G for Guitar. G for Glass. I see a boy with a hammer. Hammer starts with Alphabet H. H A M M E R. Hammer. I see a girl with a hat. H A T. Hat. Does hat start with Alphabet H? Yes or No?", "yes": 9, "no": 35 },
			 { "node": 9, "message": "You are right! Hat also starts with Alphabet H. H for Hammer. H for Hat. I see a green iguana. Iguana starts with Alphabet I. I G U A N A. Iguana. Iguana is in Igloo. I G L O O. Igloo. Does igloo start with Alphabet I? Yes or No?", "yes": 10, "no": 36 },
			 { "node": 10, "message": "You are right! Igloo also starts with Alphabet I. I for Iguana. I for Igloo. I see a cup of orange juice. Juice starts with Alphabet J. J U I C E. Juice. I see a jar of strawberry jam. J A M. Jam. Does jam start with Alphabet J? Yes or No?", "yes": 11, "no": 37 },
			 { "node": 11, "message": "You are right! Jam also starts with Alphabet J. J for Juice. J for Jam. I see a field and there is a kangaroo. Kangaroo starts with Alphabet K. K A N G A R O O. Kangaroo. Kangaroo is holding a key. K E Y. Key. Does key start with Alphabet K? Yes or No?", "yes": 12, "no": 38 },
			 { "node": 12, "message": "You are right! Key also starts with Alphabet K. K for Kangaroo. K for Key. I see a cat on a ladder. Ladder starts with Alphabet L. L A D D E R. Ladder. Cat is playing with a leaf. L E A F. Leaf. Does leaf start with Alphabet L? Yes or No?", "yes": 13, "no": 39 },
			 { "node": 13, "message": "You are right! Leaf also starts with Alphabet L. L for Ladder. L for Leaf. We are almost half way through our adventure. You are helping me a lot. Thank you and Keep it up! I see a tree and monkey. Monkey starts with Alphabet M. M O N K E Y. Monkey. Monkey has a friend mouse. M O U S E. Mouse. Does mouse start with Alphabet M? Yes or No?", "yes": 14, "no": 40 },
			 { "node": 14, "message": "You are right! Mouse also starts with Alphabet M. M for Monkey. M for Mouse. I see a mirror, I can see my nose. Nose starts with Alphabet N. N O S E. Nose. I also see a tie around my neck. N E C K. Neck. Does neck start with Alphabet N? Yes or No?", "yes": 15, "no": 41 },
			 { "node": 15, "message": "You are right! Neck also starts with Alphabet N. N for Nose. N for Neck. I see a sea. There is an octopus. Octopus starts with Alphabet O. O C T O P U S. Octopus. Octopus is eating an orange. O R A N G E. Orange. Does orange start with Alphabet O? Yes or No?", "yes": 16, "no": 42 },
			 { "node": 16, "message": "You are right! Orange also starts with Alphabet O. O for Octopus. O for Orange. I see a boy with a bucket of purple paint. Paint starts with Alphabet P. P A I N T. Paint. He is painting a popcorn. P O P C O R N. Popcorn. Does popcorn start with Alphabet P? Yes or No?", "yes": 17, "no": 43 },
			 { "node": 17, "message": "You are right! Popcorn also starts with Alphabet P. P for Paint. P for Popcorn. I see a beautiful queen. Queen starts with Alphabet Q. Q U E E N. Queen. Queen has many questions. Q U E S T I O N. Question. Does question start with Alphabet Q Yes or No??", "yes": 18, "no": 44 },
			 { "node": 18, "message": "You are right! Question also starts with Alphabet Q. Q for Queen. Q for Question. I see a Radio. Radio starts with Alphabet R. R A D I O. Radio. Radio is red. R E D. Red. Does red start with Alphabet R? Yes or No?", "yes": 19, "no": 45 },
			 { "node": 19, "message": "You are right! Red also starts with Alphabet R. R for Radio. R for Red. I see a sleeping snake. Snake starts with Alphabet S. S N A K E. Snake. Snake has a sock. S O C K. Sock. Does sock start with Alphabet S? Yes or No?", "yes": 20, "no": 46 },
			 { "node": 20, "message": "You are right! Sock also starts with Alphabet S. S for Snake. S for Sock. I see a tree. Tree starts with Alphabet T. T R E E. Tree. Tree is talking to a Train. T R A I N. Train. Does train start with Alphabet T? Yes or No?", "yes": 21, "no": 47 },
			 { "node": 21, "message": "You are right! Train also starts with Alphabet T. T for Tree. T for Train. I see a girl with umbrella. Umbrella starts with Alphabet U. U M B R E L L A. Umbrella. Girl is holding an umbrella for her unicorn. U N I C O R N. Unicorn. Does unicorn start with Alphabet U? Yes or No?", "yes": 22, "no": 48 },
			 { "node": 22, "message": "You are right! Unicorn also starts with Alphabet U. U for Umbrella. U for Unicorn. I see a vase. Vase starts with Alphabet V. V A S E. Vase. Vase is full with vegetables. V E G E T A B L E. Vegetable. Does vegetable start with Alphabet V? Yes or No?", "yes": 23, "no": 49 },
			 { "node": 23, "message": "You are right! Vegetable also starts with Alphabet V. V for Vase. V for Vegetable. I see a whale. Whale starts with Alphabet W. W H A L E. Whale. Whale is wearing a watch. W A T C H. Watch. Does watch start with Alphabet W? Yes or No?", "yes": 24, "no": 50 },
			 { "node": 24, "message": "You are right! Watch also stars with Alphabet W. W for Whale. W for Watch. I see a X Ray. X Ray starts with Alphabet X. X R A Y. X Ray. X Ray is showing a Xylophone. X Y L O P H O N E. Xylophone. Does xylophone start with Alphabet X? Yes or No?", "yes": 25, "no": 51 },
			 { "node": 25, "message": "You are right! Xylophone also starts with Alphabet X. X for X Ray. X for Xylophone. I see a yak. Yak starts with Alphabet Y. Y A K. Yak. Yak is playing with its Yo-yo. Y O Y O. Yo-yo. Does yo-yo also start with Alphabet Y?  Yes or No?", "yes": 26, "no": 52 },
       { "node": 26, "message": "You are right! Yo-yo also starts with Alphabet Y. Y for Yak. Y for Yo-yo. I see a zoo. Zoo starts with Alphabet Z. Z O O. Zoo. Zoo has a zebra. Z E B R A. Zebra. Does zebra also start with Alphabet Z?  Yes or No?", "yes": 27, "no": 53 },
       { "node": 27, "message": "You are right! Zebra also starts with Alphabet Z. Z for Zoo. Z for Zebra. Congratulation! We finished our adventure. Now you know your alphabet! Thank you so much for your help and I hope you can help me next time also!", "yes": 0, "no": 0, "description":"Thank you for playing." },

// Answers & descriptions
			 { "node": 28, "message": "Ant also starts with Alphabet A.", "yes": 0, "no": 0, "description":"A for Apple. A for Ant." },
			 { "node": 29, "message": "Ball also starts with Alphabet B.", "yes": 0, "no": 0, "description":"B for Boy. B for Ball." },
			 { "node": 30, "message": "Car also starts with Alphabet C.", "yes": 0, "no": 0, "description":"C for Carrot. C for Car" },
			 { "node": 31, "message": "Duck also stars with Alphabet D.", "yes": 0, "no": 0, "description":"D for Dog. D for Duck." },
			 { "node": 32, "message": "Elephant also starts with Alphabet E.", "yes": 0, "no": 0, "description":"E for Egg. E for Elephant." },
			 { "node": 33, "message": "Flag also starts with Alphabet F.", "yes": 0, "no": 0, "description":"F for Fish. F for Flag." },
			 { "node": 34, "message": "Glass also starts with Alphabet G.", "yes": 0, "no": 0, "description":"G for Guitar. G for Glass." },
			 { "node": 35, "message": "Hat also starts with Alphabet H.", "yes": 0, "no": 0, "description":"H for Hammer. H for Hat." },
			 { "node": 36, "message": "Igloo also starts with Alphabet I.", "yes": 0, "no": 0, "description":"I for Iguana. I for Igloo." },
			 { "node": 37, "message": "Jam also starts with Alphabet J.", "yes": 0, "no": 0, "description":"J for Juice. J for Jam." },
			 { "node": 38, "message": "Key also starts with Alphabet K.", "yes": 0, "no": 0, "description":" K for Kangaroo. K for Key." },
			 { "node": 39, "message": "Leaf also starts with Alphabet L.", "yes": 0, "no": 0, "description":"L for Ladder. L for Leaf." },
			 { "node": 40, "message": "Mouse also starts with Alphabet M.", "yes": 0, "no": 0, "description":"M for Monkey. M for Mouse." },
			 { "node": 41, "message": "Neck also starts with Alphabet N.", "yes": 0, "no": 0, "description":"N for Nose. N for Neck." },
			 { "node": 42, "message": "Orange also starts with Alphabet O.", "yes": 0, "no": 0, "description":"O for Octopus. O for Orange." },
			 { "node": 43, "message": "Popcorn also starts with Alphabet P.", "yes": 0, "no": 0, "description":"P for Paint. P for Popcorn." },
			 { "node": 44, "message": "Question also starts with Alphabet Q.", "yes": 0, "no": 0, "description":"Q for Queen. Q for Question." },
			 { "node": 45, "message": "Red also starts with Alphabet R.", "yes": 0, "no": 0, "description":"R for Radio. R for Red." },
			 { "node": 46, "message": "Sock also starts with Alphabet S.", "yes": 0, "no": 0, "description":"S for Snake. S for Sock." },
			 { "node": 47, "message": "Train also starts with Alphabet T.", "yes": 0, "no": 0, "description":"T for Tree. T for Train." },
			 { "node": 48, "message": "Unicorn also starts with Alphabet U.", "yes": 0, "no": 0, "description":"U for Umbrella. U for Unicorn." },
			 { "node": 49, "message": "Vegetable also starts with Alphabet V.", "yes": 0, "no": 0, "description":"V for Vase. V for Vegetable." },
			 { "node": 50, "message": "Watch also stars with Alphabet W.", "yes": 0, "no": 0, "description":"W for Whale. W for Watch." },
       { "node": 51, "message": "Xylophone also starts with Alphabet X.", "yes": 0, "no": 0, "description": "X for X Ray. X for Xylophone." },
       { "node": 52, "message": "Yo-yo also starts with Alphabet Y.", "yes": 0, "no": 0, "description":"Y for Yak. Y for Yo-yo." },
       { "node": 53, "message": "Zebra also starts with Alphabet Z.", "yes": 0, "no": 0, "description":"Z for Zoo. Z for Zebra" }

];

// this is used for keep track of visted nodes when we test for loops in the tree
var visited;

// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
var welcomeMessage = "Welcome to Alphabet Adventure. My name is Alexa and I would like to explore the Alphabet Land, but I can't do it alone. Will you be my friend and help me explore?";

// This is the message that is repeated if the response to the initial welcome message is not heard
var repeatWelcomeMessage = "Say yes to start the adventure or no to quit.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
var promptToStartMessage = "Say yes to continue, or no to end the adventure.";

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
var promptToSayYesNo = "Say yes or no to answer the question.";

// This is the response to the user after the final question when Alex decides on what group choice the user should be given
var decisionMessage = "Well, ";

// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again
var playAgainMessage = "Say 'tell me more' to hear why, or do you want to adventure again?";

// this is the help message during the setup at the beginning of the game
var helpMessage = "This skill will teach children about the alphabet. It will ask you 26 questions to teach 26 letters of the alphabet. Want to start now?";

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
