# Portfolio Website Optimization

## Table of Contents

- Running the portfolio
- Performance improvements overview
- Index.html changes
- Views/js/main.js and other JS changes
- Views/pizza.html changes
- Utilities used

### Running the portfolio

The provided index.html file in the main folder is ready for use.  Simply open the index.html file in any browser and browse the website.

### Performance Improvements Overview

**Index.html**

|Measure |Original |Improved |Percent Improved |
|--------|:-------:|:-------:|:---------------:|
|Scripts exectued |~336.5ms |~81.75ms |411.6% Faster |
|Ready State Compl |~697.25ms |~512.25ms |126.11% Faster |
|Scripting Time|~1209.8ms |~81.7ms |1480% Faster |
|Rendering Time |~958.7ms |~187.1ms |512% Faster |
|Total Load Time |~2.46s |~1.22s |201% Faster |

~ denotes an average of 4 test loads of the page

**Pizza.html**

|Measure |Original |Improved |Percent Improved |
|--------|:-------:|:-------:|:---------------:|
|Time to generate Pizzas on Load|~40.84ms |~0.029ms | - |
|Time to generate last 10 frames |~20.37ms |~.927ms |2197% Faster |
|Time to resize pizzas |~91.35ms |~.59ms | - |

~ denotes an average of 4 test loads of the page

### Index.html Changes

- Inline critical CSS using grunt
- Use a script to load remaining CSS, implemented by grunt
- Use a script to load google fonts
- Defered loading of google analytics
- Optimized pizzeria image, including resizing and compressing
- Added a .htaccess file to the directory to enable caching and gzip compression.

### Views/js/main.js and other JS changes
- Moved everything to generate the random pizza recipes into a worker.js file.  Worker.js uses all the same functions to replace the random ingredients and name into a formatted string, which is retrieved from helper.js.  This strings are all concatenated to each other and then set ass the inner HTML of the random pizzas section.  All of this is below the fold is all views, so I decided it best to do all this work in its own scope.
- Changed determineDx to determineSize for the pizza slider.  Instead of using offsetWidth and a querySelector to retrieve layout information and alter the sizes, I simply returned the new width of the div's as a float and used it to set the width as a percentage.  This avoided the forced reflow when sizing the pizzas.
- Added a function generateAllPizzas to implement worker.js and build the pizza recipes below the fold
- Changed updatePositions to retrieve teh scrollTop position before entering the loop to move pizzas in background.  I then used a loop to set up an array of the 5 repeating values generated to move the pizzas relative to their original position, as to avoid doing repeated mathetmatical operations.  Finally a loop goes through all of the background pizzas and cycling through the 5 values, adjusted their postiion left or right relative to their original position.

### Views/pizza.html Changes
- Inlince critical CSS and generate script to load remaining CSS via grunt
- Established viewport
-Removed the two sample random pizzas that were initially in the HTML, since worker.js generates all pizzas.

### Utilities Used
Grunt was used to inline critical CSS and resize images.

The included package.json and gruntfile.js, located in the main repository, have everything needed to make the same modifications to the original repositiroy from Udacity.  If you do not have grunt installed globally, you can go [here](http://gruntjs.com/getting-started) to do so.  After, simply install the grunt dependencies to the working directory by running:
```
$npm install
```

After that running `$grunt` will run both the responsive images and critical CSS modules.  You can run them individualy by typing `$grunt responsive_images` and `$grunt critical`.