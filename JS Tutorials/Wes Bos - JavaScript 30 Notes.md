# Wes Bos - JavaScript 30 Notes

## Drum Kit Lesson

[HTML data-* Attributes](https://www.w3schools.com/tags/att_global_data.asp)

Sometimes we may want to use our own attributes for the html element, we can use the `data-*yournaming*`

example:

``` html
<li data-animal-type="bird">Owl</li>

<audio data-key="65" src="sounds/clap.wav"></audio>

<!-- then we can select them -->

<script>
    // this is how to select element with attributes using square bracket
    element = document.querySelector('audio[data-key="65"]')
</script>
```

Part 2 on [Playing with CSS Variables and JS](#playing-with-css-variables-and-js)

---

When working with `audio.play`, the corresponding audio cannot be play not until the first audio has done playing. To tackle this, we'll need to set the current audio playtime to zero

``` js
audio.currentTime = 0;
audio.play();
```

---

Quick Note

After select elements using `querySelectorAll`, the returned data will be a Nodelist. As for older browser, NodeList doesn't have `forEach` function, so we'll need to conver it into an array using `Array.from`

`Array.from(document.querySelector(`audio[data-key="${e.keyCode}"]`));`

or using ES6's spread operator

``[...document.querySelector(`audio[data-key="${e.keyCode}"]`)]``

---

It's always a bad practice to hard code everything, especially timing, let's say if the function only invoke if the transition ends, instead of setting 2s on both CSS and JS file, we can work `addEventListener` to elements corresponding to css property using `transitionend`.

``` js
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
```

---

## Playing with CSS Variables and JS

We can create variables in pure CSS just like SASS

``` css
/* declaration */
:root {
    --base: #ffc600;
    --spacing: 10px;
    --blur: 10px;
}

/* using the variables */
img {
    padding: var(--spacing);
    background: var(--background);
    filter: blur(var(--blur));
}
```

- Dataset Part 2 here

Using variable declaration in CSS can be great when working with JS. Consider the following code:

``` html
<input type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">
```

``` js
function handleUpdate() {
    // this will return the value of data-sizing from the input
    const suffix = this.dataset.sizing;

    // now we can set the value of the variables that applies to page elements
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}
```

To invoke function when there's a change to input, we can use `addEventListener('change', handleUpdate);`

but often for sliders, the function only invoke when user release their mouse(only take the final input). So we can use `addEventListener('mousemove', handleUpdate);` instead

---

## [Array Cardio Day(Check out the video for best explaination)](https://courses.wesbos.com/account/access/59ccaa7b056a0c552688725b/view/194130346)

### Filter

`Filter`, the default function by the array can be very powerful.

Example:

``` js
// inventors stores an array of objects

const fifteen = inventors.filter(function(inventor) {
    if (inventor.year >= 1500 && inventor.year < 1600) {
        return true; // return true means to keep it
    }
});
```

refactored ES6 version

``` js
const fifteen = inventors.filter(inventor => inventor.year >= 1500 && inventor.year < 1600)
```

Whenver that particular object that loop through in the array meet the if statement in the function and a true is return, that object will remain in the array while others will be `filter` out.

Instead of `console.log` on an object, we can use `console.table` for a better visual presentation.

---

### Map

`Map` is like `forEach`, it takes an array with same amount and return the same amount

``` js
const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`)
console.log(fullNames); // ["Albert Einstein", "Isaac Newton", "Max Planck"]
```

---

### Sort

`Sort` will sort your item in array accordingly to your condition

``` js
const ordered = inventors.sort(function(a, b) {
    if (a.year > b.year) {
        return 1;
    } else {
        return -1;
    }
});

console.table(ordered);
// now the objects in the array will sort from oldest to newe
// ie. 1473 all the way to 1897
```

refactored ES6

``` js
const ordered = inventors.sort((a, b) => a.year > b.year ? 1 : -1);
```

Another better example. Sort the inventors by years fixed.

``` js
// this will return largest value to smallest
const oldest = inventors.sort((a, b) => {
    // think of a as last guy, and b as next guy
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;

    if (lastGuy > nextGuy) {
        return -1;
    } else {
        return 1;
    }
});
```

---

### Reduce

`Reduce` accumulates the value from an array and return those values into a single value.

``` js
// total is the value that stores the accumulators
const totalYear = inventors.reduce((total, inventor) => {
    return total + (inventors.passed - inventors.year);
    // ie. first inventor: passed : 1543 - year : 1473, so and so inventors
}, 0);
// the 0 is to initialize the total of undefined value to zero
```

The keyword `total` can be anything else, accordingly to your datatype. ie. `obj` with empty object `{}` as initialization.

---

### More Example Codes

Filter array

``` js
// Consider that there's a div that contain many links and we need to
// filter out those links that contain 'de' keyword
const category = document.querySelector('.mw-category');

// need to convert into to an array since NodeList's prototype doesn't have map function
const links = Array.from(category.querySelectorAll('a'));

const de = links.map(link => link.textContent)
                .filter(streetName => streetName.includes('de'));
```

Sort the people's last name alphabetically

```js
// inventors: ["Albert, Einstein", "Isaac, Newton"]
const inventors = inventors.sort((lastOne, nextOne) => {
    // split converts string to array
    // split is use here to separate first and last name
    // notice the declaration of aLast and aFirst
    const [aFirst, aLast] = lastOne.split(', '); // ["Albert", "Einstein"]
    const [bFirst, bLast] = nextOne.split(', '); // ["Isaac", "Newton"]

    return aLast > bLast ? 1 : -1;
});
```

Use reduce to total up the instances in an array

```js
// a long list array of repetitive strings
const data = ['car', 'truck', 'truck', 'bike', 'bike', 'bike', ......];

const totalTransportation = data.reduce((obj, item) => {
    if (!obj[item]) {
        // initialize the key as value starts with undefined
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
}, {})
// initialize the obj with empty object

// goal is to calculate and insert accordingly into the obj
// ie: { car: 3, truck: 5, bike: 11 }
```

---

## AJAX Type Ahead

`fetch` is a new API to the browser that help to make AJAX request.

``` js
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

fetch(endpoint)
// fetch will return a promise instead of the data itself
// we can use .then to work with it (blob)
    .then(blob => {
        console.log(blob);
        // now the data is still unknown, as data can be an image, music etc.
        // so we'll need to JSON the received data
        // calling JSON.parse(blob) will not work but to use it's own prototype function
        blob.json();
        // which then will return a promise
    })
    // there we'll receive the raw data
    .then(data => console.log(data))
```

### Working with Regex

``` js
// example
function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // define our regex here
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}
```

---

## Fun with HTML5 Canvas

[Mothereffing HSL](http://mothereffinghsl.com/)

`event.offsetX` & `event.offsetY` is cursor's coordinate.

ES6 Destructuring

``` js
let lastX = lastY = 0;

// initialize both value at the same time
[lastX, lastY] = [e.offsetX, e.offsetY];
```

## 14 Must Know Dev Tools Tricks

``` js
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

function makeGreen() {
    const p = document.querySelector('p');
    p.style.color = '#BADA55';
    p.style.fontSize = '50px';
}

// Regular
console.log('hello');

// Interpolated
console.log('Hello I am a %s string!', '💩');

// Styled
console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 10px 10px 0 blue')

// warning!
console.warn('OH NOOO');

// Error :|
console.error('Shit!');

// Info
console.info('Crocodiles eat 3-4 people per year');

// Testing
const p = document.querySelector('p');

// the error will be invoke only when the statement passed in is false
console.assert(p.classList.contains('ouch'), 'That is wrong!');

// clearing
console.clear();

// Viewing DOM Elements in more details
console.dir(p);

console.clear();

// Grouping together
dogs.forEach(dog => {
    console.groupCollapsed(`${dog.name}`); // or console.group
    console.log(`This is ${dog.name}`);
    console.log(`${dog.name} is ${dog.age} years old`);
    console.log(`${dog.name} is ${dog.age * 7} dog years old`);
    console.groupEnd(`${dog.name}`);
});

// counting

console.count('Wes');   // Wes: 1
console.count('Wes');   // Wes: 2
console.count('Steve'); // Steve: 1
console.count('Steve'); // Steve: 2
console.count('Wes');   // Wes: 3
console.count('Steve'); // Steve: 3
console.count('Wes');   // Wes: 4
console.count('Steve');
console.count('Steve');
console.count('Steve');
console.count('Steve'); // ...
console.count('Steve'); // Steve: 8

// timing
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
    .then(data => data.json())
    .then(data => {
    // the argument must be the same of console.time
    console.timeEnd('fetching data');
    console.log(data);
    });

console.table(dogs);
```

---

## Custom HTML5 Video Player

Practical example of bracket notation

``` js
const method = video.paused ? 'play' : 'pause'

video[method]();

// or even shorter

video[video.paused ? 'play' : 'pause']();
```

``` js
// example 2

// when two individual slider handles different function but using same method
function handleUpdate() {
    // this.name can refer to volume and playbackRate depending on the
    // name attribute of the input element.
    // ie. <input type='range' name='volume' ...>
    video[this.name] = this.value;
}
```

`play`, `pause`, `timeupdate` can be use on `addEventListener` function with video element type.

More JS tricks!

``` js
// in this statement, the function 'scrub` will not run unless isMouseDown is equal to true
progress.addEventListener('mousedown', (e) => isMouseDown && scrub(e));
```

## Slide in on Scroll

Some event like `scroll` can invoke a lot in a second. To prevent this from happening, we can use library or declare function `debounce`.

```js
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
    var context = this, args = arguments;
    var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
    };
}

window.addEventListener('scroll', debounce(checkSlide));
// now that the function will call every 20ms
```

## LocalStorage and Event Delegation

`form.reset()` will reset all your input within that form.

We can trace the value of an element right away after selecting it

``` js
// assuming it's a input element
const text = (document.querySelector('[name=item]')).value;
```

Just like `Ruby`, we can perform logic within the ES6's string literal

``` js
// ps: checked="false" will still check the checkbox as long 'checked' is within the element
// so we have to perform a logic check for the 'checked' value
<input type="checkbox" data-index=${i} id="item${i}" ${item.done ? 'checked' : '' }
// ps: put ''(empty string) instead of null as null might appear in as HTML 
```

We can also store data within our browser(JSON form) using `localStorage`

``` js
// let's say we've updated our item list
items.push(item);
populateList(items, itemsList);

// we then can store within local storage
// we must JSON.stringify those object before storing
// or "(Object, Object)" as string will be store
localStorage.setItem('items', JSON.stringify(items));
// we're saving all the objects as 'itmes'

// setItem literally is the setter, it sets every time and not add item to it
```

``` js
// We can retrieve item by parsing the JSON
const items = JSON.parse(localStorage.getItem('items')) || [];
```

[random article on localstorage](https://www.rdegges.com/2018/please-stop-using-local-storage/)

---

## CSS Text Shadow Mouse Move Effect

More ES6 destructuring

``` js
// original code
const width = hero.offsetWidth;
const height = hero.offsetHeight;

// destructured code
const { offsetWidth: width, offsetHeight: height } = hero;
```

The problem with `mouseover` event is that whenever we `addEventListener` to the parent's element, the children will also have this event and can be a pain when working with coordinate because coordinate will reset whenever we hover the children's element. To fix this, we'll need to check for the hovered object and add the offset into the coordinate.

``` js
// let say the parent has mouseover listener
function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = parentDiv;
    let { offsetX: x, offsetY: y } = e;

    // target will change when hovering over parentDiv's child element
    // and the coordinate will change accordingly to child's offset
    // (0, 0) from child's element left top corner
    if (this !== e.target) {
        // so we'll need to add the offset to 'actual' coordinate
        // Note that e.target still targeting parentDiv
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }
}
```

---

## Sorting Band Names without articles

More regex

``` js
// please notice the space after the article or words starting with a, the, an will be replace
function strip(bandName) {
    return bandName.replace(/^(a |the |an )/i, '').trim();
}
```

---

## Tally String Times with Reduce

``` js
// assign the value after split then parse the item in the array to float
const [minutes, seconds] = time.dataset.time.split(':').map(parseFloat);
```

---

## Follow Along Links

To get the width, height, coordinate of a DOM element, we can use `.getBoundingClientRect()`

``` js
const linkCoords = this.getBoundingClientRect();
console.log(linkCoords);
const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
};
```

---

## Event Capture, Propagation, Bubbling and Once

`e.stopPropagation();` this will stop bubbling.

To change the bubbling direction, we can pass in the third arguement in `.addEventListener`

``` js
// capture: false is default value
divs.forEach(div => div.addEventListener('click', logText, { capture: true }));
```

To make an event that only trigger once, ie the event only invoke once when click

``` js
divs.forEach(div => div.addEventListener('click', logText, { once: true }));
```

## Strip Follow Along Nav

Again, arrow functions

``` js
function handleEnter() {
    setTimeout(function() {
        this.classList.add('trigger-enter-active');
    }, 150)
}

// the timeout will not add the class to 'this' and it's because
// 'this' is referring to the window object
// that's why arrow function is important

function handleEnter() {
    setTimeout(() => {
        this.classList.add('trigger-enter-active');
    }, 150)
}
```

again, some hacky way
if the first statement is valid, then proceed to second function

``` js
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```

---

## Click and Drag to Scroll

Using `.preventDefault()` within a `mousemove` event will prevent user from highlighting text

To track the scrolled value of scroll-able DOM element, we can use `.scrollLeft` to return the scrolled range.