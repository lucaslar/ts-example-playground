import { Bakery } from './model/bakery';
import * as trace_events from 'node:trace_events';

console.log('### TypeScript Demo ###');

function letConstDifference(): void {
    let a = 123;
    const b = 456;

    console.log('We just created two variables! a = ', a, '& b =', b);
    console.log('One of them is let, the other is const. What does that mean regarding reassigning values?');
}

function implicitVsExplicitTyping(): void {
    let explicitlyTyped: string = 'Hello there!';
    let implicitlyTyped = 123; // This is implicitly a number
    console.log('Type of explicitly typed variable:', typeof explicitlyTyped);
    console.log('Type of implicitly typed variable:', typeof implicitlyTyped);
    console.log(
        "Let's test something: What if you tried to re-assign a value with a different type to either of the two variables? What would happen in JS?",
    );
    // explicitlyTyped = 123;
    // implicitlyTyped = 'some string';
}

function objectTyping(): void {
    const pizza1 = { name: 'Margherita', vegetarian: true, diameter: 26 };
    console.log('We just created a pizza object!', pizza1);

    console.log('How can we specifically set a type for this object?');
    const pizza2: object = { name: 'Margherita', vegetarian: true, diameter: 26 };
    console.log('... object is an option ... but then we "lose" our properties, e.g., try to write `pizza2.name`');
    const pizza3: { name: string; vegetarian: boolean; diameter: number } = {
        name: 'Margherita',
        vegetarian: true,
        diameter: 26,
    };
    console.log(
        '... another option is to set each key/value type of the attributes inside of "{ }"; check out pizza3 ... but does that seem convenient?',
    );

    console.log("Let's define a custom type! Check out pizza4");
    type PizzaName = string; // just an example
    type PizzaType = { name: PizzaName; vegetarian: boolean; diameter: number };
    const pizza4: PizzaType = { name: 'Margarita', vegetarian: true, diameter: 26 };

    console.log('... or an interface! Check out pizza5');
    interface PizzaInterface {
        name: string;
        vegetarian: boolean;
        diameter: number;
    }
    const pizza5: PizzaInterface = { name: 'Margarita', vegetarian: true, diameter: 26 };

    console.log(
        'By the way, in a real project, you should think about extracting interfaces, types etc. to separate classes!',
    );
}

function objectFromClass(): void {
    console.log("Let's create an object from a class!");
    console.log('. o O (This feels very Java-like and is not too common in TypeScript, to my mind)');
    console.log('Check out the bakery class in ./model');

    const bakery = new Bakery('Meine Bäckerei', 2024);
    console.log('We just created a bakery!', bakery);

    bakery.name = 'Deine Bäckerei';
    console.log("... and just set a different name! Now it's", bakery.name);

    console.log(
        'How does getting and setting values work with the special get and set methods we created in the class?',
    );
    console.log('What would it look like to read/change the values of public attributes? Test it yourself');
}

function structuralTyping(): void {
    console.log('Types are compatible based on their structure in TypeScript, i.e., based on their properties');
    console.log('How are types compared in Java? (hint: differently, structural typing is most likely new to you)');

    interface Pizza {
        name: string;
        vegetarian: boolean;
        diameter: number;
    }

    interface Pasta {
        name: string;
        vegetarian: boolean;
    }

    const pizza: Pizza = { name: 'Margherita', vegetarian: true, diameter: 26 };
    const pasta: Pasta = { name: 'Carbonara', vegetarian: false };
    console.log('We just created two objects, the type of either is a special interface. Check it out in the code!');

    interface Dish {
        name: string;
        vegetarian: boolean;
    }

    function prepareDish(dish: Dish): void {
        console.log('The following object, regardless of its type, seems to be compatible with interface Dish!', dish);
    }

    console.log(
        'Now what happens if we have a function accepting a param of type `Dish`? (a third interface, check it out in the code!)',
    );

    prepareDish(pizza);
    prepareDish(pasta);

    console.log(
        "By the way, you may have noticed that in this code, there is a function inside of a function. JavaScript is lawless indeed compared to Java, isn't it?",
    );
}

function typeUnion(): void {
    console.log(
        "In TypeScript, we can also create type unions, for example, let's just use `Dish` from the previous example as our basis",
    );
    console.log(
        "... and create a type with all properties of dish + a property `diameter`. It's a pizza! Check it out in the code",
    );

    interface Dish {
        name: string;
        vegetarian: boolean;
    }
    type Pizza = Dish & { diameter: number };

    const pasta: Dish = { name: 'Spaghetti aglio e olio', vegetarian: true };
    const pizza: Pizza = { name: 'Primavera', vegetarian: true, diameter: 26 };
}

function typeIntersections(): void {
    console.log('We just defined a type using intersection. Variables of this type can be a boolean or a number');
    type CouldBeBoolOrNr = boolean | number;
    console.log("Ha! Even better, let's restrict the numbers to one and zero. This is possible in TypeScript as well");
    type CouldBeBoolOrZeroOrOne = boolean | 0 | 1;

    console.log('Check out the variables using these types and try to change the values. What do you see?');

    const a: CouldBeBoolOrNr = false;
    const b: CouldBeBoolOrNr = 42;
    const c: CouldBeBoolOrZeroOrOne = true;
    const d: CouldBeBoolOrZeroOrOne = 0;
}

function optionalAttributes() {
    interface Dish {
        name: string;
        vegetarian: boolean;
        diameter?: number;
    }

    console.log(
        'We just defined an interface with an optional attribute! Both of the objects below have the same type',
    );

    const pasta: Dish = { name: 'Spaghetti aglio e olio', vegetarian: true };
    const pizza: Dish = { name: 'Primavera', vegetarian: true, diameter: 26 };

    console.log(pasta);
    console.log(pizza);
}

function optionalParams(): void {
    function example(a: number, b?: number, c?: number) {}

    console.log('We just defined a function accepting optional params');
    console.log('Remember that overloading is not possible in JavaScript, but not passing all params is.');
    console.log(
        'Check it out in TS and JS, what happens if you call the function below with 0-4 params? What is the difference and what do you think about it?',
    );

    // example();
    example(1);
    example(1, 2);
    example(1, 2, 3);
    // example(1, 2, 3, 4);
}

function higherOrderFunctions(): void {
    console.log(
        "Let's skip the somehow theoretical introduction of arrow functions and jump to higher-order functions directly! Check out the slides for more information",
    );

    const menu = [
        { name: 'Pizza Margherita', price: 12.5, vegetarian: true },
        { name: 'Pizza Prosciutto e Funghi', price: 16, vegetarian: false },
        { name: 'Spaghetti Carbonara', price: 15, vegetarian: false },
        { name: 'Spaghetti Aglio e Olio', price: 13.5, vegetarian: true },
    ];
    console.log('In the following, examples, we consider the following array (menu):', menu);

    console.log("1) Let's log all of the dishes in a specific format using `forEach`");
    menu.forEach((dish, index) => {
        console.log(`${index + 1}. ${dish.name}`);
    });

    console.log("2) Let's create a second list only containing vegetarian options using `filter`");
    const vegetarianOnly = menu.filter((dish) => dish.vegetarian);
    console.log('Vegetarian options:', vegetarianOnly);

    console.log("3) Let's check if any of the dishes is vegetarian using `some`");
    const anyVegetarianOption = menu.some((dish) => dish.vegetarian);
    console.log('Is there any vegetarian option?', anyVegetarianOption ? 'Yes' : 'No');

    console.log("4) Let's create a new list containing all prices using `map`");
    const prices = menu.map((dish) => dish.price);
    console.log('Prices:', prices, '-- the cheapest option is', Math.min(...prices));

    console.log(
        "5) Let's create a list of all required cutlery using `flatMap`. Assume all dishes are ordered exactly once and Pizza => [Fork, Knife], Pasta => Fork only (otherwise the Italians might kill us)",
    );
    const requiredCutlery = menu.flatMap((dish) => (dish.name.startsWith('Pizza') ? ['Fork', 'Knife'] : 'Fork'));
    console.log(
        'Required cutlery:',
        requiredCutlery,
        'What would have happened if we had used `map` instead? Try it yourself',
    );

    console.log("6) Let's sort the array by price using `sort`!");
    menu.sort((a, b) => a.price - b.price);
    console.log('Sorted list (in-place):', menu);

    console.log(
        "7) Finally, let's discover `reduce` using two examples. Admittedly the hardest higher-order function to understand, but very useful! We can do this!",
    );
    const totalPrice = menu.reduce((p, c) => p + c.price, 0);
    console.log('7a) Assume we are very hungry and want to order everything. The total price is', totalPrice);

    const initialValue: { vegetarian: any[]; notVegetarian: any[] } = { vegetarian: [], notVegetarian: [] };
    const grouped = menu.reduce((previousValue, currentValue) => {
        if (currentValue.vegetarian) previousValue.vegetarian.push(currentValue);
        else previousValue.notVegetarian.push(currentValue);
        return previousValue;
    }, initialValue);

    console.log('7b) Or assume we want to group the dishes by vegetarian, non vegetarian. The result is', grouped);
}

function settingAndAccessingProperties(): void {
    const property5 = 'E';
    const thisWillBeUsedAsKey = 'property4';
    const someObject = {
        property1: 'A',
        2: 'B',
        'property 3': 'C',
        [thisWillBeUsedAsKey]: 'D',
        property5,
    };

    console.log('We just created an object:', someObject);
    console.log('... check out the code to see how key/value have been set in 5 different ways!');
    console.log(
        '... similarly, here are some examples of how to access values (you might also need to check out the code):',
        someObject.property1,
        someObject[2],
        someObject['property 3'],
        someObject[thisWillBeUsedAsKey],
        someObject.property5,
    );
}

function arrayMergeWithSpread() {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const merged = [...arr1, ...arr2];
    console.log('We have merged the following two arrays:', arr1, '&', arr2);
    console.log('... to this:', merged, '(check out the code to check out how easy it is using the spread operator!)');
}

function extractVariablesWithSpread() {
    const pizza = { name: 'Pizza Margherita', price: 12.5, vegetarian: true };
    const { name, ...pizzaWithoutName } = pizza;

    console.log('We have one object:', pizza);
    console.log('... and just extracted the name (', name, '); rest of the object is:', pizzaWithoutName);
    console.log('Again, we used the spread operator, check it out!');
}

function restOperator() {
    console.log(
        'We can also use the three dots in front of a function parameter in order to let it accept 0-n values. Check out how the following two three occurred:',
    );

    function greet(greeting: string, ...names: string[]): void {
        console.log(greeting + ' ' + names.join(', '));
    }

    greet('Hello there!');
    greet('Hi', 'Mary');
    greet('Hello', 'Mary', 'Markus');
}

function optionalChainin() {
    const data = [
        { name: 'Max', address: { city: { name: 'Berlin', zip: '10318' } } },
        { name: 'Moritz', address: undefined },
        { name: 'Marie', address: { city: { name: 'Berlin', zip: '10318' } } },
        { name: 'Mona', address: { city: { name: 'Berlin', zip: '10178' } } },
        { name: 'Markus', address: { city: { name: 'Rostock' } } },
    ];

    console.log('We have the following data and want to extract all zip codes (using map):');
    data.forEach((d) => console.log(d));

    const zips = data.map((d) => d.address?.city.zip);
    console.log('\nWhich differences do you notice? How could we safely access the zips? lots of if/else?');
    console.log(
        'No! We can use Optional Chaining! Check out how we collected these zips. What would have happened, if we had not used optional chaining?',
    );
    console.log('Zips:', zips);
}

function nullishCoalescing() {
    console.log(
        "Let's consider the zip example above again. It was pretty cool, but instead of undefined, we would like to provide a default value",
    );

    const data = [
        { name: 'Max', address: { city: { name: 'Berlin', zip: '10318' } } },
        { name: 'Moritz', address: undefined },
        { name: 'Marie', address: { city: { name: 'Berlin', zip: '10318' } } },
        { name: 'Mona', address: { city: { name: 'Berlin', zip: '10178' } } },
        { name: 'Markus', address: { city: { name: 'Rostock' } } },
    ];

    const zipsWithDefault = data.map((d) => d.address?.city.zip ?? 'XXXXX');
    console.log('To this end, we used Nullish Coalescing and provided "XXXXX":', zipsWithDefault);
    console.log(
        '(BONUS) By the way, we could also make sure to have every value exactly once using a Set and re-converting to array:',
        [...new Set(zipsWithDefault)],
    );
}

function truthyAndFalsy() {
    console.log("In JavaScript, we don't simply have true and false, but truthy and falsy values.");
    console.log(
        'true and false are booleans as known from Java. But truthy and falsy values are often much easier, e. g. in an "if"',
    );
    console.log(
        'The following function will log whether a value is truthy or falsy, check out what its if-statement looks like',
    );

    function logTruthyOrFalsy(p: any) {
        if (p) console.log('-', p, 'is truthy!');
        else console.log('-', p, 'is falsy!');
    }

    [
        'someString',
        '(the next param is an empty string)',
        '',
        -1,
        0,
        1,
        389829131283,
        -389829131283,
        undefined,
        null,
        { some: 'object' },
        {},
        true,
        false,
    ].forEach(logTruthyOrFalsy);

    const data = [
        { name: 'Max', friends: ['Moritz'] },
        { name: 'Moritz', friends: ['Max', 'Marie'] },
        { name: 'Marie', friends: ['Moritz', 'Mona'] },
        { name: 'Mona', friends: ['Marie'] },
        { name: 'Markus', friends: [] },
    ];
    console.log('\nWe can also use this in a filter condition. For example consider the following data:', data);
    console.log("Let's only see people who have friends using a number in the filter condition instead of a boolean!");

    const peopleWithFriendsOnly = data.filter((d) => d.friends.length);
    console.log('That would be:', peopleWithFriendsOnly);

    console.log(
        '\nFinally, we can also negate truthy/falsy values and will have a boolean. For example, check out how these values were created:',
        !0,
        !123,
        !'',
        !'some string',
        !null,
    );

    console.log(
        'Or, conversely negated twice, which will practically convert any value to a boolean saying whether its truthy or falsy. Hava a look at how these values were created, too:',
        !!0,
        !!123,
        !!'',
        !!'some string',
        !!null,
    );
}

// This is an arrow function :-)
const logNyanHeadline = (text: string) => console.log('\x1b[36m%s\x1b[0m', `\n## ${text}\n`);

logNyanHeadline('Difference between let and const');
letConstDifference();

logNyanHeadline('Implicit vs. explicit typing');
implicitVsExplicitTyping();

logNyanHeadline('Typing for objects');
objectTyping();

logNyanHeadline('Generating objects using classes');
objectFromClass();

logNyanHeadline('Structural typing');
structuralTyping();

logNyanHeadline('Type unions');
typeUnion();

logNyanHeadline('Type intersections');
typeIntersections();

logNyanHeadline('Optional attributes');
optionalAttributes();

logNyanHeadline('Optional params');
optionalParams();

logNyanHeadline('Higher-order functions');
higherOrderFunctions();

logNyanHeadline('Setting and accessing object properties');
settingAndAccessingProperties();

logNyanHeadline('Things to do with "..." (Spread): Merge Arrays');
arrayMergeWithSpread();

logNyanHeadline('Things to do with "..." (Spread): Extract variables from object');
extractVariablesWithSpread();

logNyanHeadline('Things to do with "...": Rest');
restOperator();

logNyanHeadline('Optional chaining');
optionalChainin();

logNyanHeadline('Nullish Coalescing');
nullishCoalescing();

logNyanHeadline('Truthy and falsy');
truthyAndFalsy();
