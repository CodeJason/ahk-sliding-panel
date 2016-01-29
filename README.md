## ahk sliding panel

######A small javascript library that lets you have touch responsive menu panels on a mobile browser

###Live demo [here](http://www.allenhashkey.com/wp-content/uploads/2016/01/index.html)

###### Note - must be on a mobile browser or touch enabled mobile emulator

### 1 Simply download, save and import the script onto your webpage: (min or normal)
```
<script src="ahk-sliding-panel.js"></script>
```

### 2 Create a html element to be your panel:
```
<div id="left-menu">

</div>
```
### 3 Write script that initialises it:
```
var leftMenu = new ahk_slideout({
	id:"left-panel"
});
```
### That's all. :)

### Available options:

######Required
- id - string - the id of the menu

######Optional
- side - on the left or right side - string - "left" or "right" - default "left"
- width - the width of the menu - string - e.g. "50%", "300px" - default "50%"
- slide_time - the amount of time it takes to appear (in seconds) - string - e.g. "1", "0.4" - default "0.5"
- z-index - the z-index of the menu - string - eg "1", "99" - default "999"
- touch_boundary - the amount of distance from the edge of the document that the user starts touching to be able to drag out the menu, gets translated to pixels - eg 10, 50 - default 100

###Available methods:

- toggleMenu() - toggles the menu
- closeMenu() - closes the menu
- openMenu() - opens the menu
