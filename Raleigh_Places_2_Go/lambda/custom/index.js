/* eslint-disable no-console */
/* eslint no-use-before-define: ["error", {"functions": false}] */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */

const Alexa = require('ask-sdk');

/*
    Static list of places across 3 categories that serve as
    the free and premium content served by the Skill
*/
const ALL_FACTS = [
  {
    type: 'food', place: 'Bida Manda. Hip, modern hideaway for Laotian fare & exotic cocktails in a slick, yet woodsy looking space. Located in 222 S Blount St, Raleigh, NC 27601. Phone number is 9 1 9 8 2 9 9 9 9 9'
  },
  {
    type: 'food', place: 'Saint Jacques French Cuisine. Unassuming strip-mall location serving elevated, classic French fare suitable for special occasions. Located in 6112 Falls of Neuse Rd, Raleigh, NC 27609. Phone number is 9 1 9 8 6 2 2 7 7 0'
  },
  {
    type: 'food', place: 'Neomonde Mediterranean. Cafe serving Lebanese light fare & a retail market selling fresh breads & other Mediterranean foods. Located in 3817 Beryl Rd, Raleigh, NC 27607. Phone number is 9 1 9 8 2 8 1 6 2 8'
  },
  {
    type: 'food', place: 'Second Empire Restaurant. Elegant American restaurant & more-casual tavern set in a historic, circa-1879 Second Empire house. Located in 330 Hillsborough St, Raleigh, NC 27603. Phone number is 9 1 9 8 2 9 3 6 6 3'
  },
  {
    type: 'food', place: 'Big Eds City Market Restaurant. Southern breakfast & lunch plates in a laid-back cafe with funky antiques hanging from the ceiling. Located in 220 Wolfe St, Raleigh, NC 27601. Phone number is 9 1 9 8 3 6 9 9 0 9'
  },
  {
    type: 'food', place: 'Glenwood Grill. Veteran destination for Southern coastal cooking presented against a sleek backdrop. Located in 2603 Glenwood Ave Suite 151, Raleigh, NC 27608. Phone number is 9 1 9 7 8 2 3 1 0 2'
  },
  {
    type: 'food', place: 'Winstons Grille. Standby for upmarket American fare & homemade ice cream in clubby yet relaxed environs with a patio. Located in 6401 Falls of Neuse Rd, Raleigh, NC 27615. Phone number is 9 1 9 7 9 0 0 7 0 0'
  },
  {
    type: 'food', place: 'Sitti. Modern versions of Lebanese dishes served in an airy room with a communal table & art deco bar. Loated in 137 S Wilmington St, Raleigh, NC 27601. Phone number is 9 1 9 2 3 9 4 0 7 0'
  },
  {
    type: 'food', place: 'J Betskis. Elegant restaurant uses local ingredients to create German & Polish dishes served with wine & beer. Located in 10 W Franklin St Suite 120, Raleigh, NC 27604. Phone nubmer is 9 1 9 8 3 3 7 9 9 9'
  },
  {
    type: 'food', place: 'Gonza Tacos y Tequila. Mexican-Colombian plates are served in a relaxed setting with eclectic decor. Located in 7713 Lead Mine Rd Suite 39, Raleigh, NC 27615. Phone number is 9 1 9 8 4 6 5 4 7 8'
  },
  {
    type: 'drink', place: 'Sola Coffee Cafe. Family-owned cafe & espresso bar serving up eats such as pizza & pastries, plus live entertainment. Located in 7705 Lead Mine Rd, Raleigh, NC 27615. Phone number is 9 1 9 8 0 3 8 9 8 3'
  },
  {
    type: 'drink', place: 'Clouds Brewing. Industrial-chic pub with a wide choice of global craft beers, New American bites & self-serve taps. Located in 126 N West St, Raleigh, NC 27603. Phone number is 9 1 9 3 0 7 8 3 3 5'
  },
  {
    type: 'drink', place: 'Morning Times. Bi-level coffeehouse serving light fare in a bohemian, exposed-brick space with an upstairs gallery. Located in 10 E Hargett St, Raleigh, NC 27601. Phone number is 9 1 9 8 3 6 1 2 0 4'
  },
  {
    type: 'drink', place: 'Jubala Coffee. Airy, hip & cosmopolitan cafe known for its espresso drinks, breakfast bites & sandwiches. Located in 8450 Honeycutt Rd, Raleigh, NC 27615. Phone number is 9 1 9 7 5 8 8 3 3 0'
  },
  {
    type: 'drink', place: 'Mitchs Tavern. Artisan beers, sandwiches & hearty gluten-free gumbos & chilis in a cozy old-world pub setting. Located in 2426 Hillsborough St, Raleigh, NC 27607. Phone number is 9 1 9 8 2 1 7 7 7 1'
  },
  {
    type: 'drink', place: 'Benelux Coffee. Low-key hangout featuring coffee & tea drinks, Belgian waffles & smoothies, plus complimentary WiFi. Located in 402 Oberlin Rd Suite 118, Raleigh, NC 27605. Phone number is 9 1 9 9 0 0 8 2 9 4'
  },
  {
    type: 'drink', place: 'Wakefield Tavern. Eclectic pub fare & cocktails served in a contemporary setting with sports on TV & live music. Located in 13200 Falls of Neuse Rd Suite 101, Raleigh, NC 27614. Phone number is 9 1 9 5 5 4 0 6 7 3'
  },
  {
    type: 'drink', place: 'Big Boss Brewery. Beer for people who appreciate the fact that while different styles of beer taste, well, different, a well-made beer always satisfies. Located in 1249 Wicker Dr, Raleigh, NC 27604. Phone number is 9 1 9 8 3 4 0 0 4 5'
  },
  {
    type: 'drink', place: 'OMalleys Pub and Restaurant. Classic pub serving Irish-American comfort food & full bar in tavern digs with live music & karaoke. Located in 5228 Hollyridge Dr, Raleigh, NC 27612. Phone number is 9 1 9 7 8 7 1 2 3 4'
  },
  {
    type: 'drink', place: 'Edible Art Bakery & Dessert Cafe. Cheery, long-running bakeshop with a cozy seating area, made-to-order cakes & seasonal pastries. Located in 4351-115 The Cir At N Hills St, Raleigh, NC 27609. Phone number is 9 1 9 8 5 6 0 6 0 4'
  },
  {
    type: 'nightlife', place: 'Tobacco Road Tours. The best guided tours in the Triangle. Pub crawls, sightseeing, historic and ghost tours. Located in 300 Fayetteville St Suite 1918, Raleigh, NC 27602. Phone number is 9 1 9 3 7 1 2 6 5 3'
  },
  {
    type: 'nightlife', place: 'Kings. Upscale bowling alley, the 30000 square-foot-facility has fancy lighting, red walls and a cocktail lounge feel. Located in 141 Park at N Hills St, Raleigh, NC 27609. Phone number is 9 1 9 6 0 0 5 7 0 0'
  },
  {
    type: 'nightlife', place: 'Boxcar Bar + Arcade. Lively industrial area hangout offering classic & modern arcade games, plus many TVs & beer choices. Located in 330 W Davie St, Raleigh, NC 27601. Phone number is 9 1 9 8 0 3 2 7 9 6'
  },
  {
    type: 'nightlife', place: 'C. Grace. Cocktail lounge with a Prohibition-era feel presenting live jazz & classic handcrafted drinks. Located in 407 Glenwood Ave, Raleigh, NC 27606. Phone number is 9 1 9 8 9 9 3 6 7 5'
  },
  {
    type: 'nightlife', place: 'Watts & Ward. Basement cocktail bar with a vintage library vibe, complete with tufted couches & artisanal drinks. Located in 200 S Blount St, Raleigh, NC 27601. Phone number is 9 1 9 8 9 6 8 0 1 6'
  },
  {
    type: 'nightlife', place: 'Vita Vite Wine Bar & Craft Beers. Refined, lounge-style wine bar doubling as an art gallery with homey furnishings & fixtures. Located in 313 W Hargett St, Raleigh, NC 27601. Phone number is 9 1 9 8 0 3 3 1 5 6'
  },
  {
    type: 'nightlife', place: 'Dram & Draught. Whiskey Bar Located in the Heart of Downtown Raleigh. Located in 623 Hillsborough St, Raleigh, NC 27603. Phone number is 9 1 9 6 0 7 8 5 0 1'
  },
  {
    type: 'nightlife', place: 'Gizmo Brew Works. Inherited a 2 barrel brewhouse, making it one of the smallest production breweries in North Carolina. Located in 5907 Triangle Dr, Raleigh, NC 27617. Phone number is 9 1 9 7 8 2 2 0 9 9'
  },
  {
    type: 'nightlife', place: 'Lincoln Theater. Live music acts from bluegrass to metal & DJ-driven dance parties behind an unassuming facade. Located in 126 E Cabarrus St, Raleigh, NC 27601. Phone number is 9 1 9 8 2 1 4 1 1 1'
  },
  {
    type: 'nightlife', place: 'Clockwork. Stylish indoor/outdoor eatery with mod decor touches offering creative takes on New American fare. Located in 519 W North St, Raleigh, NC 27603. Phone number is 9 1 9 3 0 7 3 2 1 5'
  },
];

const skillName = 'Raleigh Places 2 Go';

/*
    Function to demonstrate how to filter inSkillProduct list to get list of
    all entitled products to render Skill CX accordingly
*/
function getAllEntitledProducts(inSkillProductList) {
  const entitledProductList = inSkillProductList.filter(record => record.entitled === 'ENTITLED');
  return entitledProductList;
}

function getRandomPlace(places) {
  const placeIndex = Math.floor(Math.random() * places.length);
  return places[placeIndex
  ].place;
}

function getRandomYesNoQuestion() {
  const questions = ['Would you like another place?', 'Can I tell you another place?', 'Do you want to hear another place?'
  ];
  return questions[Math.floor(Math.random() * questions.length)
  ];
}

function getRandomGoodbye() {
  const goodbyes = ['OK.  Goodbye!', 'Have a great day!', 'Come back again soon!'
  ];
  return goodbyes[Math.floor(Math.random() * goodbyes.length)
  ];
}
/*
    Helper function that returns a speakable list of product names from a list of
    entitled products.
*/
function getSpeakableListOfProducts(entitleProductsList) {
  const productNameList = entitleProductsList.map(item => item.name);
  let productListSpeech = productNameList.join(', '); // Generate a single string with comma separated product names
  productListSpeech = productListSpeech.replace(/_([^_
  ]*)$ /, 'and $1'); // Replace last comma with an 'and '
  return productListSpeech;
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    console.log('IN LAUNCHREQUEST');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(
      function reportPurchasedProducts(result) {
        const entitledProducts = getAllEntitledProducts(result.inSkillProducts);
        if (entitledProducts && entitledProducts.length > 0) {
          // Customer owns one or more products

          return handlerInput.responseBuilder
            .speak(`Welcome to ${skillName
              }. You currently own ${getSpeakableListOfProducts(entitledProducts)
              }` +
              ' products. To hear a random place, you could say, \'Tell me a place\' or you can ask' +
              ' for a specific category you have purchased, for example, say \'Tell me a food place\'. ' +
              ' To know what else you can buy, say, \'What can i buy?\'. So, what can I help you' +
              ' with?')
            .reprompt('I didn\'t catch that. What can I help you with?')
            .getResponse();
        }
        // Not entitled to anything yet.
        console.log('No entitledProducts');
        return handlerInput.responseBuilder
          .speak(`Welcome to ${skillName
            }. To hear a random place you can say 'Tell me a place',` +
            ' or to hear about the premium categories for purchase, say \'What can I buy\'. ' +
            ' For help, say , \'Help me\'... So, What can I help you with?')
          .reprompt('I didn\'t catch that. What can I help you with?')
          .getResponse();
      },
      function reportPurchasedProductsError(err) {
        console.log(`Error calling InSkillProducts API: ${err
          }`);

        return handlerInput.responseBuilder
          .speak('Something went wrong in loading your purchase drink')
          .getResponse();
      },
    );
  },
}; // End LaunchRequestHandler


const GetPlaceHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'GetPlaceIntent';
  },
  handle(handlerInput) {
    console.log('In GetPlaceHandler');

    const placeText = getRandomPlace(ALL_FACTS);
    return handlerInput.responseBuilder
      .speak(`Here's your random place: ${placeText
        } ${getRandomYesNoQuestion()
        }`)
      .reprompt(getRandomYesNoQuestion())
      .getResponse();
  },
};

// IF THE USER SAYS YES, THEY WANT ANOTHER FACT.
const YesHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    console.log('In YesHandler');

    const speakResponse = `Here's your random place: ${getRandomPlace(ALL_FACTS)
      } ${getRandomYesNoQuestion()
      }`;
    const repromptResponse = getRandomYesNoQuestion();

    return handlerInput.responseBuilder
      .speak(speakResponse)
      .reprompt(repromptResponse)
      .getResponse();
  },
};

// IF THE USER SAYS NO, THEY DON'T WANT ANOTHER FACT.  EXIT THE SKILL.
const NoHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
  },
  handle(handlerInput) {
    console.log('IN NOHANDLER');

    const speakResponse = getRandomGoodbye();
    return handlerInput.responseBuilder
      .speak(speakResponse)
      .getResponse();
  },
};


const GetCategoryPlaceHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'GetCategoryPlaceIntent';
  },
  handle(handlerInput) {
    console.log('In GetCategoryPlaceHandler');

    const placeCategory = getResolvedValue(handlerInput.requestEnvelope, 'placeCategory');
    console.log(`FACT CATEGORY = XX ${placeCategory
      } XX`);
    let categoryPlaces = ALL_FACTS;

    // IF THERE WAS NOT AN ENTITY RESOLUTION MATCH FOR THIS SLOT VALUE
    if (placeCategory === undefined) {
      const slotValue = getSpokenValue(handlerInput.requestEnvelope, 'placeCategory');
      let speakPrefix = '';
      if (slotValue !== undefined) speakPrefix = `I heard you say ${slotValue
        }. `;
      const speakResponse = `${speakPrefix
        } I don't have places for that category.  You can ask for food, nightlife, or drink places.  Which one would you like?`;
      const repromptResponse = 'Which place category would you like?  I have food, nightlife, or drink.';

      return handlerInput.responseBuilder
        .speak(speakResponse)
        .reprompt(repromptResponse)
        .getResponse();
    }
    // IF THERE WAS AN ENTITY RESOLUTION MATCH FOR THIS SLOT VALUE
    categoryPlaces = ALL_FACTS.filter(record => record.type === placeCategory);
    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function checkForProductAccess(result) {
      const subscription = result.inSkillProducts.filter(record => record.referenceName === 'all_access');
      const categoryProduct = result.inSkillProducts.filter(record => record.referenceName === `${placeCategory
        }_pack`);

      // IF USER HAS ACCESS TO THIS PRODUCT
      if (isEntitled(subscription) || isEntitled(categoryProduct)) {
        const speakResponse = `Here's your ${placeCategory
          } place: ${getRandomPlace(categoryPlaces)
          } ${getRandomYesNoQuestion()
          }`;
        const repromptResponse = getRandomYesNoQuestion();

        return handlerInput.responseBuilder
          .speak(speakResponse)
          .reprompt(repromptResponse)
          .getResponse();
      }
      const upsellMessage = `You don't currently own the ${placeCategory
        } pack. ${categoryProduct[
          0
        ].summary
        } Want to learn more?`;

      return handlerInput.responseBuilder
        .addDirective({
          type: 'Connections.SendRequest',
          name: 'Upsell',
          payload: {
            InSkillProduct: {
              productId: categoryProduct[
                0
              ].productId,
            },
            upsellMessage,
          },
          token: 'correlationToken',
        })
        .getResponse();
    });
  },
};


// Following handler demonstrates how skills can hanlde user requests to discover what
// products are available for purchase in-skill.
// Use says: Alexa, ask Premium places what can i buy
const ShoppingHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ShoppingIntent';
  },
  handle(handlerInput) {
    console.log('In Shopping Handler');

    // Inform the user aboutwhat products are available for purchase

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function fetchPurchasableProducts(result) {
      const purchasableProducts = result.inSkillProducts.filter(record => record.entitled === 'NOT_ENTITLED' && record.purchasable === 'PURCHASABLE');

      return handlerInput.responseBuilder
        .speak(`Products available for purchase at this time are ${getSpeakableListOfProducts(purchasableProducts)
          }` +
          '. To learn more about a product, say \'Tell me more about\' followed by the product name. ' +
          ' If you are ready to buy say \'Buy\' followed by the product name. So what can I help you with?')
        .reprompt('I didn\'t catch that. What can I help you with?')
        .getResponse();
    });
  },
};

// Following handler demonstrates how skills can hanlde user requests to discover what
// products are available for purchase in-skill.
// Use says: Alexa, ask Premium places what can i buy
const ProductDetailHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ProductDetailIntent';
  },
  handle(handlerInput) {
    console.log('IN PRODUCT DETAIL HANDLER');

    // Describe the requested product to the user using localized information
    // from the entitlements API

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function fetchProductDetails(result) {
      let productCategory = getResolvedValue(handlerInput.requestEnvelope, 'productCategory');

      // NO ENTITY RESOLUTION MATCH
      if (productCategory === undefined) {
        return handlerInput.responseBuilder
          .speak('I don\'t think we have a product by that name.  Can you try again?')
          .reprompt('I didn\'t catch that. Can you try again?')
          .getResponse();
      }

      if (productCategory !== 'all_access') productCategory += '_pack';

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

      if (isProduct(product)) {
        const speakResponse = `${product[
          0
        ].summary
          }. To buy it, say Buy ${product[
            0
          ].name
          }. `;
        const repromptResponse = `I didn't catch that. To buy ${product[
          0
        ].name
          }, say Buy ${product[
            0
          ].name
          }. `;
        return handlerInput.responseBuilder
          .speak(speakResponse)
          .reprompt(repromptResponse)
          .getResponse();
      }
      return handlerInput.responseBuilder
        .speak('I don\'t think we have a product by that name.  Can you try again?')
        .reprompt('I didn\'t catch that. Can you try again?')
        .getResponse();
    });
  },
};

// Following handler demonstrates how Skills would recieve Buy requests from customers
// and then trigger a Purchase flow request to Alexa
const BuyHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'BuyIntent';
  },
  handle(handlerInput) {
    console.log('IN BUYINTENTHANDLER');

    // Inform the user about what products are available for purchase

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function initiatePurchase(result) {
      let productCategory = getResolvedValue(handlerInput.requestEnvelope, 'productCategory');

      // NO ENTITY RESOLUTION MATCH
      if (productCategory === undefined) {
        productCategory = 'all_access';
      } else {
        productCategory += '_pack';
      }

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

      return handlerInput.responseBuilder
        .addDirective({
          type: 'Connections.SendRequest',
          name: 'Buy',
          payload: {
            InSkillProduct: {
              productId: product[
                0
              ].productId,
            },
          },
          token: 'correlationToken',
        })
        .getResponse();
    });
  },
};

// Following handler demonstrates how Skills would receive Cancel requests from customers
// and then trigger a cancel request to Alexa
// User says: Alexa, ask <skill name> to cancel <product name>
const CancelSubscriptionHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'CancelSubscriptionIntent';
  },
  handle(handlerInput) {
    console.log('IN CANCELINTENTHANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();

    return ms.getInSkillProducts(locale).then(function initiateCancel(result) {
      let productCategory = getResolvedValue(handlerInput.requestEnvelope, 'productCategory');

      if (productCategory === undefined) {
        productCategory = 'all_access';
      } else {
        productCategory += '_pack';
      }

      const product = result.inSkillProducts
        .filter(record => record.referenceName === productCategory);

      return handlerInput.responseBuilder
        .addDirective({
          type: 'Connections.SendRequest',
          name: 'Cancel',
          payload: {
            InSkillProduct: {
              productId: product[
                0
              ].productId,
            },
          },
          token: 'correlationToken',
        })
        .getResponse();
    });
  },
};

// THIS HANDLES THE CONNECTIONS.RESPONSE EVENT AFTER A BUY OCCURS.
const BuyResponseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      handlerInput.requestEnvelope.request.name === 'Buy';
  },
  handle(handlerInput) {
    console.log('IN BUYRESPONSEHANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();
    const productId = handlerInput.requestEnvelope.request.payload.productId;

    return ms.getInSkillProducts(locale).then(function handlePurchaseResponse(result) {
      const product = result.inSkillProducts.filter(record => record.productId === productId);
      console.log(`PRODUCT = ${JSON.stringify(product)
        }`);
      if (handlerInput.requestEnvelope.request.status.code === '200') {
        if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'ACCEPTED') {
          let categoryPlaces = ALL_FACTS;
          if (product[
            0
          ].referenceName !== 'all_access') categoryPlaces = ALL_FACTS.filter(record => record.type === product[
            0
          ].referenceName.replace('_pack', ''));

          const speakResponse = `You have unlocked the ${product[
            0
          ].name
            }.  Here is your ${product[
              0
            ].referenceName.replace('_pack', '').replace('all_access', '')
            } place: ${getRandomPlace(categoryPlaces)
            } ${getRandomYesNoQuestion()
            }`;
          const repromptResponse = getRandomYesNoQuestion();
          return handlerInput.responseBuilder
            .speak(speakResponse)
            .reprompt(repromptResponse)
            .getResponse();
        }
        if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'DECLINED') {
          const speakResponse = `Thanks for your interest in the ${product[
            0
          ].name
            }.  Would you like another random place?`;
          const repromptResponse = 'Would you like another random place?';
          return handlerInput.responseBuilder
            .speak(speakResponse)
            .reprompt(repromptResponse)
            .getResponse();
        }
      }
      // Something failed.
      console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message
        }`);

      return handlerInput.responseBuilder
        .speak('There was an error handling your purchase request. Please try again or contact us for help.')
        .getResponse();
    });
  },
};

// THIS HANDLES THE CONNECTIONS.RESPONSE EVENT AFTER A CANCEL OCCURS.
const CancelResponseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      handlerInput.requestEnvelope.request.name === 'Cancel';
  },
  handle(handlerInput) {
    console.log('IN CANCELRESPONSEHANDLER');

    const locale = handlerInput.requestEnvelope.request.locale;
    const ms = handlerInput.serviceClientPlaceory.getMonetizationServiceClient();
    const productId = handlerInput.requestEnvelope.request.payload.productId;

    return ms.getInSkillProducts(locale).then(function handleCancelResponse(result) {
      const product = result.inSkillProducts.filter(record => record.productId === productId);
      console.log(`PRODUCT = ${JSON.stringify(product)
        }`);
      if (handlerInput.requestEnvelope.request.status.code === '200') {
        if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'ACCEPTED') {
          const speakResponse = `You have successfully cancelled your subscription. ${getRandomYesNoQuestion()
            }`;
          const repromptResponse = getRandomYesNoQuestion();
          return handlerInput.responseBuilder
            .speak(speakResponse)
            .reprompt(repromptResponse)
            .getResponse();
        }
        if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'NOT_ENTITLED') {
          const speakResponse = `You don't currently have a subscription to cancel. ${getRandomYesNoQuestion()
            }`;
          const repromptResponse = getRandomYesNoQuestion();
          return handlerInput.responseBuilder
            .speak(speakResponse)
            .reprompt(repromptResponse)
            .getResponse();
        }
      }
      // Something failed.
      console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message
        }`);

      return handlerInput.responseBuilder
        .speak('There was an error handling your purchase request. Please try again or contact us for help.')
        .getResponse();
    });
  },
};

// THIS HANDLES THE CONNECTIONS.RESPONSE EVENT AFTER A BUY OCCURS.
const UpsellResponseHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
      handlerInput.requestEnvelope.request.name === 'Upsell';
  },
  handle(handlerInput) {
    console.log('IN UPSELLRESPONSEHANDLER');

    if (handlerInput.requestEnvelope.request.status.code === '200') {
      if (handlerInput.requestEnvelope.request.payload.purchaseResult === 'DECLINED') {
        const speakResponse = `OK.  Here's a random place: ${getRandomPlace(ALL_FACTS)
          } Would you like another random place?`;
        const repromptResponse = 'Would you like another random place?';
        return handlerInput.responseBuilder
          .speak(speakResponse)
          .reprompt(repromptResponse)
          .getResponse();
      }
    }
    // Something failed.
    console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message
      }`);

    return handlerInput.responseBuilder
      .speak('There was an error handling your purchase request. Please try again or contact us for help.')
      .getResponse();
  },
};


const SessionEndedHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest' ||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent') ||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {
    console.log('IN SESSIONENDEDHANDLER');
    return handlerInput.responseBuilder
      .speak(getRandomGoodbye())
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${JSON.stringify(error.message)
      }`);
    console.log(`handlerInput: ${JSON.stringify(handlerInput)
      }`);
    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please try again.')
      .getResponse();
  },
};

function getResolvedValue(requestEnvelope, slotName) {
  if (requestEnvelope &&
    requestEnvelope.request &&
    requestEnvelope.request.intent &&
    requestEnvelope.request.intent.slots &&
    requestEnvelope.request.intent.slots[slotName
    ] &&
    requestEnvelope.request.intent.slots[slotName
    ].resolutions &&
    requestEnvelope.request.intent.slots[slotName
    ].resolutions.resolutionsPerAuthority &&
    requestEnvelope.request.intent.slots[slotName
    ].resolutions.resolutionsPerAuthority[
    0
    ] &&
    requestEnvelope.request.intent.slots[slotName
    ].resolutions.resolutionsPerAuthority[
      0
    ].values &&
    requestEnvelope.request.intent.slots[slotName
    ].resolutions.resolutionsPerAuthority[
      0
    ]
      .values[
    0
    ] &&
    requestEnvelope.request.intent.slots[slotName
    ].resolutions.resolutionsPerAuthority[
      0
    ].values[
      0
    ]
      .value &&
    requestEnvelope.request.intent.slots[slotName
    ].resolutions.resolutionsPerAuthority[
      0
    ].values[
      0
    ]
      .value.name) {
    return requestEnvelope.request.intent.slots[slotName
    ].resolutions
      .resolutionsPerAuthority[
      0
    ].values[
      0
    ].value.name;
  }
  return undefined;
}

function getSpokenValue(requestEnvelope, slotName) {
  if (requestEnvelope &&
    requestEnvelope.request &&
    requestEnvelope.request.intent &&
    requestEnvelope.request.intent.slots &&
    requestEnvelope.request.intent.slots[slotName
    ] &&
    requestEnvelope.request.intent.slots[slotName
    ].value) {
    return requestEnvelope.request.intent.slots[slotName
    ].value;
  }
  return undefined;
}

function isProduct(product) {
  return product &&
    product.length > 0;
}

function isEntitled(product) {
  return isProduct(product) &&
    product[
      0
    ].entitled === 'ENTITLED';
}
/*
function getProductByProductId(productId) {
  var product_record = res.inSkillProducts.filter(record => record.referenceName == productRef);
}
*/

const RequestLog = {
  process(handlerInput) {
    console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)
      }`);
  },
};

const ResponseLog = {
  process(handlerInput) {
    console.log(`RESPONSE BUILDER = ${JSON.stringify(handlerInput)
      }`);
  },
};

exports.handler = Alexa.SkillBuilders.standard()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetPlaceHandler,
    YesHandler,
    NoHandler,
    GetCategoryPlaceHandler,
    BuyResponseHandler,
    CancelResponseHandler,
    UpsellResponseHandler,
    ShoppingHandler,
    ProductDetailHandler,
    BuyHandler,
    CancelSubscriptionHandler,
    SessionEndedHandler,
)
  .addRequestInterceptors(RequestLog)
  .addResponseInterceptors(ResponseLog)
  .addErrorHandlers(ErrorHandler)
  .lambda();