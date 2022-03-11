# Description

Hello, 
we experience some problem with the use of buttons inside the Toolbar and we tried to recreate them. This project uses the angular example project you provide on your website.

The problems are the following:
1. If i add a button that toggles a boolean, the change is not recognized. I created a simple button and a button inside the toolbar that both execute the toggle function. 
The function gets executed both times but the view does not update, if i use the button from the toolbar.

2. I also have 2 buttons, one plain html button and one inside the toolbar, that should open up a modal. If i use the plain button, the modal opens as expected, but if i use the toolbar one, the modal gets put into the dom but is not displayed correctly (The backdrop is disabled but nothing is visible).

These problem are not 100% what we experience in our application, because there after 3-8 seconds the view updates and shows/hides the component/modal. But i still think this is related.
Maybe this has something todo with changedetection, because if i hit the button to toggle the variable and trigger the changedetection manually,  the view updates and hides the pdftron component.

Looking forward hearing from you :)
