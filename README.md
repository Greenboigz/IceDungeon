# IceDungeon
Fun Javascript game I want to work on

In this project I worked on a fun 2d game that I wanted to make in JavaScript. The project 
is a 2d maze game where you navigate our an icy world avoiding enemies and collecting 
tokens. I made all of the classes in this project by scratch, so they are really optomized
to how I wanted this project to function. Some of my proudest parts of the project are the 
image handler and the key handlers. 

The key handler was really fun to work on because I had to consider user-input and ease of 
use. At first the key handler and move handler was a little clunky to work with because 
when you tried to change keys very quickly, whichever key you pressed first has preference 
so the key presses might always be handled correctly. To solve this problem I put the key 
handlers in a queue so that when you press two keys, the first key function call is made, 
and then when you release that key, the second key press function call is made.

The image handler was also really exciting to make. I started from the bottom up, making a 
simple image handler that was able to place a single image on the canvas. I added function-
ality that allowed me to move images across the screen, rotate images, and also use gifs. 
I was really excited to make this part of the project, but when I was finished, I noticed a
problem - the size of the maps built was limited by the size of the screen since the map was
fairly stagnant. To pivot from this I changed the view to be centered around the protagonist
and as the protagonist moves, the map moves accordingly to keep the protagonist centered. 
This was very exciting to make because it was really difficult to figure out all the math to
make this change happen, and because once finished the game looked so awesome!

In the future I'd love to make some improvements to the product. Currently the maps are hard
codded into the JavaScript because I never got around to making a function that would read a
text file representing the maps. Once I make that I also want to add the functionality of 
outputing a text file from the map builder. On top of that, there is a very limitted number 
of map tiles and enemies and I'd like to make new enemies and tiles that behave a little 
differently.
