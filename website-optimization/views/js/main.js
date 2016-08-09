// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) {
    window.performance.mark("mark_start_resize"); // User Timing API function

    // Changes the value for the size of the pizza above the slider
    function changeSliderLabel(size) {
        switch (size) {
            case "1":
                document.querySelector("#pizzaSize").innerHTML = "Small";
                return;
            case "2":
                document.querySelector("#pizzaSize").innerHTML = "Medium";
                return;
            case "3":
                document.querySelector("#pizzaSize").innerHTML = "Large";
                return;
            default:
                console.log("bug in changeSliderLabel");
        }
    }

    changeSliderLabel(size);

    // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
    function determineSize(size) {
        // Changes the slider value to a percent width
        function sizeSwitcher(size) {
            switch (size) {
                case "1":
                    return 0.25;
                case "2":
                    return 0.3333;
                case "3":
                    return 0.5;
                default:
                    console.log("bug in sizeSwitcher");
            }
        }

        //Simply return the percentage for width according to the slider
        return sizeSwitcher(size);

    }

    // Iterates through pizza elements on the page and changes their widths
    function changePizzaSizes(size) {

        //select all pizzas in randomPizzaContainer
        var items = document.querySelectorAll(".randomPizzaContainer");

        //Find the new size according to the slider
        var newSize = determineSize(size);

        //Loop through and adjust the sizes of all pizzas
        for (var i = 0; i < items.length; i++) {
            items[i].style.width = newSize * 100 + "%";
        }
    }

    changePizzaSizes(size);

    // User Timing API is awesome
    window.performance.mark("mark_end_resize");
    window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
    var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
    console.log("Time to resize pizzas: " + timeToResize[timeToResize.length - 1].duration + "ms");
};

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads

//function to generate random pizzas via worker.js
function generateAllPizzas() {
    var worker = new Worker("js/worker.min.js");
    var allRandomPizzas = "";
    if (window.Worker) {
        worker.postMessage(allRandomPizzas);
    }

    worker.onmessage = function(e) {

        var pizzasDiv = document.getElementById("randomPizzas");
        pizzasDiv.innerHTML = e.data;
    };

}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) { // times is the array of User Timing measurements from updatePositions()
    var numberOfEntries = times.length;
    var sum = 0;
    for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
        sum = sum + times[i].duration;
    }
    console.log("Average scripting time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
    frame++;
    window.performance.mark("mark_start_frame");

    //Array of all .mover items
    var items = document.querySelectorAll('.mover');

    //Find the scrollTop position.
    var scrollTop = parseFloat(document.body.scrollTop / 1250);

    //Array used to hold 5 results from Math.sin operation
    var scrollPos = [];

    //use this loop to establish array of 5 numbers used to adjust all positions, as to not repeate mathematical operations
    for (var i = 0; i < 5; i++) {
        scrollPos[i] = Math.sin(scrollTop + (i % 5));
    }

    //This loop actually goes and adjusts the positions
    for (var j = 0; j < items.length; j++) {
        phase = (j % 5);
        items[j].style.left = items[j].basicLeft + 100 * scrollPos[phase] + 'px';
    }


    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
    if (frame % 10 === 0) {
        var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
        logAverageFrame(timesToUpdatePosition);
    }
}

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
    var cols = 8;
    var s = 256;

    for (var i = 0; i < 28; i++) {
        var elem = document.createElement('img');
        elem.className = 'mover';
        elem.src = "images/1x/pizza.png";
        elem.style.height = "100px";
        elem.style.width = "73.333px";
        elem.basicLeft = (i % cols) * s;
        elem.style.top = (Math.floor(i / cols) * s) + 'px';
        document.querySelector("#movingPizzas1").appendChild(elem);
    }


    updatePositions();

    generateAllPizzas();
});