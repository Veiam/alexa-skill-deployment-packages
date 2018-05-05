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
'Turtles belong to one of the oldest reptile groups in the world – beating snakes, crocodiles and alligators.',
'Turtles have a hard shell that protects them like a shield, this upper shell is called a carapace.',
'Turtles also have a lower shell called a plastron.',
'Many turtle species can hide their heads inside their shells when attacked by predators.',
'These creatures date back to the time of the dinosaurs, over 200 million years ago – woah!',
'Like other reptiles, turtles are cold blooded and they lay eggs.',
'The largest turtle is the leatherback sea turtle, it can weigh over 900 kilograms or 2000 pounds.',
'In some species of turtle the temperature determines if the egg will develop into a male or female, lower temperatures lead to a male while higher temperatures lead to a female.',
'Some turtles lay eggs in the sand and leave them to hatch on their own. The young turtles make their way to the top of the sand and scramble to the water while trying to avoid predators.',
'Sea turtles have special glands which help remove salt from the water they drink.',
'Sadly, many species of turtle are endangered! 129 of approximately 300 species of turtle and tortoise on Earth today are either vulnerable, endangered, or critically endangered, according to the IUCN. Threats include loss of habitat, poaching and the illegal pet trade.',
'Contrary to popular belief, a turtle cannot come out of its shell. The turtle shell grows with them, so its impossible for them to grow too big for it!',
'Turtles are easily recognized by their bony, cartilaginous shell. This super-tough casing acts like a shield to protect them from predators – some turtles can even tuck their head up inside their shell for extra protection!',
'Just like your bones, a turtles shell is actually part of its skeleton. It is made up of over 50 bones which include the turtls rib cage and spine.',
'What a turtle eats depends on the environment it lives in. Land-dwelling turtles will munch on beetles, fruit and grass, whereas sea dwellers will gobble everything from algae to squid and jellyfish.',
'Some turtles are carnivores (meat eaters), others are herbivores (plant eaters) and some are omnivores (a mixture of the two!). Many baby turtles start life as carnivores but grow to eat more plants as they mature.',
'Turtles are ‘mniotes – they breathe air and lay their eggs on land, although many species live in or around water.',
'These cold-blooded creatures have an incredibly long life span. The oldest ever recorded, named Tui Malila, of Tonga Island, passed away at the grand old age of 188!'
            ],
            SKILL_NAME: 'Fun Turtle Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a turtle fact, or, you can say exit... What can I help you with?',
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
