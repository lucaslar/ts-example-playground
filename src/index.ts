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

function structuralTyping() {
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

function typeUnion() {
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

function typeIntersections() {
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

function optionalParams() {
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

function higherOrderExample() {
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
higherOrderExample();
