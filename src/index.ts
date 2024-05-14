import { Pizza } from './model/pizza';

// Interfaces etc. are extracted to separate files

console.log('### TypeScript Demo ###');

function implicitVsExplicitTyping() {
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

function interfaceExample() {
    const vegetarian = true;
    const pizza: Pizza = { name: 'Margarita', diameter: 24, vegetarian };
    console.log('Successfully created a pizza:', pizza);
    const { diameter } = pizza;
    console.log("We just extracted the diameter of the pizza (using a nice JS syntax)! It's:", diameter);
}

function classAndObjectExample() {
    // Lecture
}

implicitVsExplicitTyping();
interfaceExample();
classAndObjectExample();
