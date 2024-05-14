export class Bakery {
    // private _name: string,
    // private readonly _foundedIn: number,
    //
    // constructor(name: string, foundedIn: number) {
    //     this._name = name;
    //     this._foundedIn = foundedIn;
    // }

    // Shorter, doing the same as the code above:
    constructor(
        private _name: string,
        private readonly _foundedIn: number,
    ) {}

    // In TypeScript, you don't need to write getters/setters as known from Java.
    // Instead, use the syntax below - it's much easier to use when reading/setting
    // attributes!
    //
    // public getName(): string {
    //     return this._name;
    // }

    public get name() {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public bake(): void {
        // ...
    }
}
