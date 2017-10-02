# Circle
A Utility for round progress bars

### Usage

To use Circle, include ``Circle.css`` in your HTML file, and add this

```html
<div class="set-size charts-container"></div>
```

Inside this div, add your progress bars like so

```html
<div class="pie-wrapper progress-25">
  <span class="label" id="cirlL">25<span class="smaller">%</span></span>
  <div class="pie">
  	<div class="left-side half-circle"></div>
 	<div class="right-side half-circle"></div>
  </div>
</div>
```

Replace the number ``25`` with a number from 1 to 100