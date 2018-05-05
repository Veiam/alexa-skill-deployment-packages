/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'Dwarf Hamster Care Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a dwarf hamster care fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
'There are two types of dwarf hamster that are commonly kept as pets - Russian and Roborovski.',
'Chinese hamsters are sometimes referred to as dwarf hamsters.',
'Dwarf hamsters will grow to be around 4 to 12cm long, depending on the type. Roborovski hamsters are the smallest of the three.',
'Dwarf hamsters usually live for between one and three years.',
'They are not too fussy, so just feed your dwarf hamster a good quality hamster muesli with a little bit of fresh fruit or veg every so often.',
'As a treat, they love a bit of unsalted, unflavoured or unsweetened popcorn.',
'A mineral stone will also provide essential minerals and gnawing opportunities for your hamster.',
'Dwarf hamsters can be kept in same sex pairs, but keep an eye out for signs that they have fallen out; you might need to separate them if this happens.',
'Interestingly, female Chinese hamsters are most likely to fall out, so if you choose one as a pet, keep her on her own.',
'If you do choose two dwarf hamsters together, make sure you get them at the same time, so they will already be friends.',
'Your dwarf hamsters cage will need to be as large as possible, secure and suitable for their size – avoid cages with wide bars intended for larger Syrian hamsters, their small size means dwarf hamsters are very good escape artists!',
'Make sure you pop a little house with bedding into your hamster cage, along with a food bowl and water bottle.',
'A hamster wheel will keep him or her entertained and well-exercised too.',
'Dwarf hamsters are nocturnal, so bear in mind that they may be using their wheel, making nests, or otherwise being a little noisy, during the night.',
'They love to explore, so maze-like toys, hidey-holes and tunnels are perfect for dwarf hamsters.',
'Having natural wood toys or other suitable toys to gnaw on will keep their teeth in check, and stop them growing too long.',
'Their cheek pouches provide the perfect place for dwarf hamsters to stuff their food, so you will often see them looking extremely cute with puffed-up little faces!'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
