name: Jennifer Robles
email: Jennifer_Robles@student.uml.edi
date: 12-07-2021 - 12/17/21
Homework 5:

Hello due to finals I'm currently turning this in late by 3 hours. It is 3 am.

For this homework, I implemented a single line from the scrabble board. I used Jquery's validator, Drag, and drop UI features. 
These were essentials for my programs because an item being dropped triggered a series of functions like a chain to update
scores, and the word, etc. I kept an object call Word that kept track of the current round. Word had features of the score, the word itself, 
whether it was a bonus word tile. I also left an isDefine property but did not have to figure out how to check a word if it is in the 
dictionary using javascript. The object Game keeps track of the overall score and tiles remaining. The object clears when a page is refreshed. 

To implement a random letter with Math.random with parameters of an integer and 0-26. This random number corresponded to a letter
in Alphabetical order, with an addition of a blank as the 26th number. The randomized functions do
check for letter count. This feature was used frequently within my program to replace letters that were submitted, a new round, and a new game.
 Also, I had to be very careful to check for the special case
of a blank tile. For the blank tile, there's a form where you can enter only one UpperCase letter to determine the value of the blank.
Until the blank tile showed up on the user's rack it is disabled. I used regex and jquery validator as additional methods to check 
user input. I used homework 4 to reference this feature. Also, the blank updates are properly too. If a blank is used its image
count will be decremented and its new letter count will be incremented. 

For the start of every game and round only the first tile is enabled. The rest is disabled. The next one won't be enabled, until the one before
has had a letter dropped. 

There is a restart button always available to the user to start a new game. There is also a randomize ALl letters to get a new hand.

When a tile is removed from the drop area the score and word will update to represent the new word. The score will decrement according to its
value and if it's a bonus tile will lose the bonus too. Word will lose a letter and be updated in real-time for the user to see.

When the user submits a word. The count available for each letter submitted will be updated and their Game score will be updated. Also, in submit
the tiles are replaced corresponding to the ones submitted.

To get more experience with web development I created a JSON file and used the data in my code. I also used Jessica's array for the 
values of each letter. My JSON file is 26 arrays of the letters plus blank with the distribution amount and the path file name. I used the property
of its file name to update to the corresponding letter. 

For styling the page I did use bootstrap for its row and buttons features. 

NOTE For self:: seeing how repetitive my makedroppableTiles() is I will try to update it to make it more concise soon. I will also want to 
implement a feature of swapping a letter too. Due to my peers being busy with finals I didn't have anyone to test. I know there's a
bug when one or more letters are removed for example -- MY  it can still submit.