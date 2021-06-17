console.log('Hello World!')

// typescript brings in an additional layer, static types on top of JavaScripts
// predefined dynamic types
function toString(num:number):string {
  return toString(num);
}
// typescript can often infer a static type if there is no type annotation

// there are typescript specific types - Array, any and etc

/*
typescript has two language levels

dynamic - managed by javascript and compiled at run time
static - managed by typescript and consists of static types at compile time

*/
const undef:undefined = undefined; // 2 language levels present

// we can create new names or aliases for existing types
type Age = number;
const age:Age = 82;

/*
There are two ways to express that the Array arr is used as a list 
whose elements are all numbers
*/
// with an empty array it cant determine the type of elements
let arr1: number[] = [];
let arr2: Array<number> = []

let point: [number,number] = [7,5];

/*
the type annotation is needed for Arrays as tuples, because for array literals,
Typescript infers list types, not tuple types
*/

// function types

const makeString: (num:number) => string = (num) => String(num);
/*
function stringify123(callback: (num:number) => string):string {
  return callback(123);
}

stringify123(String);
*/
// void is a special return type for a function, it tells 
// typescript that the function always returns undefined

function f1():void {
  return undefined;
}
/*
function f2():void {
  //this function cannot return values other than undefined
  return 'abc';
}
*/
//optional parameters
// a question mark after an identifier means that the parameter
// is optional

function stringify123(callback?: (num:number) => string){
  if (callback === undefined) {
    callback = String;
  }
  return callback(123); // typescript only lets us make this function call 
  // if we first check that the callback is not undefined (aka was passed in)
}

// typescript supports default values as well
// default values make parameters optional
function createPoint(x= 0, y = 0):[number,number] {
  return [x,y]
}

// we can also use rest parameters in typescript parameter defintions, their static types must be Arrays (lists or Arrays)

function joinNumbers(...nums: number[]):string {
  return nums.join('-');
}

/*
the values that are held by a variable (one value at a time) may be members of different types
in that case, we need a union type. For example, in the following code, stringOrNumber
is either of type string or type number
*/

function getScore(stringOrNumber:string|number):number {
  if (typeof stringOrNumber === 'string'
    && /^\*{1,5}$/.test(stringOrNumber)) {
      return stringOrNumber.length;
  } else if (typeof stringOrNumber === 'number'
    && stringOrNumber >= 1 && stringOrNumber <= 5) {
    return stringOrNumber
  } else {
    throw new Error('Illegal value: ' + JSON.stringify(stringOrNumber));
  }
}

// in typescript - undefined and null are handled by separate disjoint scripts
// if a particular parameter is optional, it can be ommitted. In that case it has the value undefined.

function fsample(x?:number) {return x}

// if the parameter has a default value, that value is used when the parameter is 
// either omitted or set to undefined

function f2sample(x = 456) {return x}
/*
assert.equal(f2(123), 123); // OK
assert.equal(f2(undefined), 456); // OK
assert.equal(f2(), 456); // can omit
*/
// interfaces describe objects as records
interface Point {
  x: number;
  y: number;
}
// can be separated via commas as well 
interface Point {
  x: number,
  y: number,
}

// typescripts type system works structurally not nominally 
// That is, interface Point matches all objects that have the appropriate structure:

function pointToString(pt: Point) {
  return `(${pt.x}, ${pt.y})`;
}

// object literal types are anonymous interfaces
type PointLiteral = {
  x:number,
  y:number
}
// benefit of object literal types is that they can be used inline

function pointToString2(pt: {x:number,y:number}){
  return `(${pt.x}, ${pt.y})`;
}
//if a property can be ommited we put a question mark after its name

interface Person {
  name: string,
  company?: string
}

// interfaces can also contain methods
interface PointNew {
  x:number;
  y:number;
  simpleMethod: (flag: boolean) => void;
}

// generic types exist at the static level, are factories for types and have parameters representing types.
// parameters are declared between angle brackets

//factory for types
interface ValueContainer<Value> {
  value: Value;
}

// Creating one type
type StringContainer = ValueContainer<string>;

class SimpleStack<Elem> {
  #data: Array<Elem> = [];
  push(x: Elem): void {
    this.#data.push(x);
  }
  pop(): Elem {
    const result = this.#data.pop();
    if (result === undefined) {
        throw new Error();
    }
    return result;
  }
  get length() {
    return this.#data.length;
  }
}
const stringStack = new SimpleStack<string>();

// arrow functions can also have type parameters
const identity = <Arg>(arg:Arg):Arg => arg;
