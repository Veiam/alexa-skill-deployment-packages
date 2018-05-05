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
                "Did You Know? Polar bears have black skin to absorb heat, but their fur appears white to blend in with their environment.",
    "Did You Know? The polar bear is the largest and most carnivorous member of the bear family.",
    "Did You Know? At birth, polar bear cubs are 12 to 14 inches long and weigh around one pound.",
    "Did You Know? Male polar bears may grow 10 feet tall and weigh over 1400 pounds, while females reach seven feet and weight 650 pounds.",
    "Did You Know? In the wild polar bears live up to age 25",
    "Did You Know? Around the age of four or five the female polar bear can start having babies.",
    "Did You Know? The babies can grow to full man size in a year if they have lots of food.",
    "Did You Know? Polar bears primarily eat seals.",
    "Did You Know? Humans are the polar bears only predator.",
    "Did You Know? A polar bear's liver contains 10 times more vitamin A than any other animal on earth",
    "Did You Know? They have a special liver that allows them to process all of the seal fat they eat",
    "Did You Know? Polar bears have been known to swim 100 miles or 161 kilometers at a stretch.",
    "Did You Know? Underneath the fur, a polar bear's skin is actually black",
	"Did You Know? Polar bear fur is oily and water repellent. The hairs don't mat when wet, allowing the polar bears to easily shake free of water and any ice that may form after swimming. ",
	"Did You Know? Despite what we think, a polar bear's fur is not white.  Each hair is a clear hollow tube.  Polar bears look white because each hollow hair reflects the light.",
	"Did You Know? Today, 25,000 to 40,000 polar bears roam the Arctic.",
	"Did You Know? They usually only have two cubs and they have these babies in a cave they've dug in a large snow drift. They stay there over winter and come out in spring with the babies.",
	"Did You Know? Polar bears have wide front paws with slightly webbed toes that help them swim.",
	"Did You Know? Polar bears also have a 4 inch layer of fat underneath their skin.",
	"Did You Know? If you look at a polar bear with an infared camera, they are pretty close to invisible",
	"Did You Know? Polar Bears are considered marine mammals."
            ],
            SKILL_NAME: 'Polar Bear Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
    "Did You Know? Polar bears have black skin to absorb heat, but their fur appears white to blend in with their environment.",
    "Did You Know? The polar bear is the largest and most carnivorous member of the bear family.",
    "Did You Know? At birth, polar bear cubs are 12 to 14 inches long and weigh around one pound.",
    "Did You Know? Male polar bears may grow 10 feet tall and weigh over 1400 pounds, while females reach seven feet and weight 650 pounds.",
    "Did You Know? In the wild polar bears live up to age 25",
    "Did You Know? Around the age of four or five the female polar bear can start having babies.",
    "Did You Know? The babies can grow to full man size in a year if they have lots of food.",
    "Did You Know? Polar bears primarily eat seals.",
    "Did You Know? Humans are the polar bears only predator.",
    "Did You Know? A polar bear's liver contains 10 times more vitamin A than any other animal on earth",
    "Did You Know? They have a special liver that allows them to process all of the seal fat they eat",
    "Did You Know? Polar bears have been known to swim 100 miles or 161 kilometers at a stretch.",
    "Did You Know? Underneath the fur, a polar bear's skin is actually black",
	"Did You Know? Polar bear fur is oily and water repellent. The hairs don't mat when wet, allowing the polar bears to easily shake free of water and any ice that may form after swimming. ",
	"Did You Know? Despite what we think, a polar bear's fur is not white.  Each hair is a clear hollow tube.  Polar bears look white because each hollow hair reflects the light.",
	"Did You Know? Today, 25,000 to 40,000 polar bears roam the Arctic.",
	"Did You Know? They usually only have two cubs and they have these babies in a cave they've dug in a large snow drift. They stay there over winter and come out in spring with the babies.",
	"Did You Know? Polar bears have wide front paws with slightly webbed toes that help them swim.",
	"Did You Know? Polar bears also have a 4 inch layer of fat underneath their skin.",
	"Did You Know? If you look at a polar bear with an infared camera, they are pretty close to invisible",
	"Did You Know? Polar Bears are considered marine mammals."
            ],
            SKILL_NAME: 'American Polar Bear Facts',
        },
    },
    'en-GB': {
        translation: {
            FACTS: [
                   "Did You Know? Polar bears have black skin to absorb heat, but their fur appears white to blend in with their environment.",
    "Did You Know? The polar bear is the largest and most carnivorous member of the bear family.",
    "Did You Know? At birth, polar bear cubs are 12 to 14 inches long and weigh around one pound.",
    "Did You Know? Male polar bears may grow 10 feet tall and weigh over 1400 pounds, while females reach seven feet and weight 650 pounds.",
    "Did You Know? In the wild polar bears live up to age 25",
    "Did You Know? Around the age of four or five the female polar bear can start having babies.",
    "Did You Know? The babies can grow to full man size in a year if they have lots of food.",
    "Did You Know? Polar bears primarily eat seals.",
    "Did You Know? Humans are the polar bears only predator.",
    "Did You Know? A polar bear's liver contains 10 times more vitamin A than any other animal on earth",
    "Did You Know? They have a special liver that allows them to process all of the seal fat they eat",
    "Did You Know? Polar bears have been known to swim 100 miles or 161 kilometers at a stretch.",
    "Did You Know? Underneath the fur, a polar bear's skin is actually black",
	"Did You Know? Polar bear fur is oily and water repellent. The hairs don't mat when wet, allowing the polar bears to easily shake free of water and any ice that may form after swimming. ",
	"Did You Know? Despite what we think, a polar bear's fur is not white.  Each hair is a clear hollow tube.  Polar bears look white because each hollow hair reflects the light.",
	"Did You Know? Today, 25,000 to 40,000 polar bears roam the Arctic.",
	"Did You Know? They usually only have two cubs and they have these babies in a cave they've dug in a large snow drift. They stay there over winter and come out in spring with the babies.",
	"Did You Know? Polar bears have wide front paws with slightly webbed toes that help them swim.",
	"Did You Know? Polar bears also have a 4 inch layer of fat underneath their skin.",
	"Did You Know? If you look at a polar bear with an infared camera, they are pretty close to invisible",
	"Did You Know? Polar Bears are considered marine mammals.",
            ],
            SKILL_NAME: 'British Polar Bear Facts',
        },
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
