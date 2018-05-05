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

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
'An Arctic Fox is a mammal.',
'They are part of the canid family like wolves, other species of fox and dogs.',
'Arctic Fox live in Alaska, Canada, Greenland, Russia, Norway, Scandinavia and Iceland.',
'An Arctic Fox is Iceland’s only native land mammal.',
'An Arctic Fox average livspand in he wild is 3-6 years.',
'Arctic Fox live in tundra habitats. A tundra is a vast, flat land with no trees and is mostly frozen.',
'An Arctic Fox can survive in extremely low temperatures, sometimes reach as low as -58 degrees!',
'Arctic Fox are omnivores meaning they eat plants and meat.',
'Since plants are scarce, Arctic Fox mostly eat lemmings, voles, squirrels, small birds and eggs, fish, seal pups.  They eat berries when they are available.',
'Sometimes to get food an Arctic Fox will follow behind a polar bear and eat their scraps.',
'Arctic Fox have an excellent sense of smell and hearing.',
'When they search for food they listen for their prey beneath the snow.',
'Their hearing is so good that they can locate the exact position of their prey under the snow.',
'When they locate their prey they pounce through the snow and grab their prey from under the snow.',
'An Arctic Fox is usually between 18-26 inches long with a 13 inch tail sometimes called a brush.',
'They weigh between 6 1/2-21 pounds.  The females a slightly smaller than the males.',
'Arctic Fox have thick fur all over their body, even on the bottom of their paws.',
'They use their thick bushy tail to wrap around themselves to keep warm.',
'An Arctic Fox fur changes with the seasons.  During Winter their fur can range from a white to a blue/white color to blend in with the ice and snow.  In the Spring they shed their Winter fur to reveal a new gray/brown coat of fur.',
'Arctic Fox have short pointy ears, short legs and a short muzzle.',
'Arctic Fox live in burrows. A burrow is a hole or tunnel dug by a small animal.',
'When an Arctic Fox finds a mate they usually stay with each other for life.',
'Arctic Fox Mates are often playful with each other.',
'A female Arctic Fox usually give birth to 6-8 baby Arctic Fox called pups. Sometimes they give birth to larger litters such as 13-16 pups',
'Both the mother and father Arctic Fox stay together to raise the babies.',
'Eagles, wolves and polar bears are all predators to the Arctic Fox.'
            ],
            SKILL_NAME: 'Arctic Fox Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me an arctic fox fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        }
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
