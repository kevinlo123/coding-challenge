# Rebet Frontend Coding Challenge

Welcome to the **Rebet Frontend Coding Challenge!**

---

## Instructions

Please follow the step-by-step instructions below and upload your solution to a **public GitHub repository** within 7 days of receiving this challenge.

Once done, **email the repository link to [edwin@rebet.app](mailto:edwin@rebet.app)**.

In the same zip file as this README, you will find a video titled `RebetP2PSliderDemo.mov`. The core of this challenge is to **recreate the component** shown in that video.

---

## Objective

Recreate the UI/UX of the **P2P slider** shown in the video, paying close attention to the following features (ordered by importance):

1. **Draggable orb** that can move left or right and **returns to center** when released.
2. A **track** that defines the orb's path and visibility.
3. A **color scheme** that changes depending on whether the orb is dragged left or right.
4. **Animated bidirectional arrows** and a **glowing shadow**.
5. **Accept** and **decline** indicators.
6. An **action trigger** when the orb is dragged completely to one side and released.
7. Use of **various color gradients**.

Use any **JavaScript framework** of your choice.

---

## Submission

Please ensure the solution includes **executable JavaScript files** that can be run locally with:

```bash
npm install
npm run start
```

When the server is running, a web page should open displaying a **centered slider**.

---

## Useful Notes

### Colors

```js
// Slider base colors
sliderOrangeLight:       'rgba(37, 37, 47, 1)',
sliderOrangeDark:        'rgba(20, 20, 27, 1)',

// Orange border gradients
sliderOrangeBorderLight: 'rgba(252, 66, 51, 0.5)',
sliderOrangeBorderDark:  'rgba(255, 238, 146, 1)',

// Red gradients
sliderRedLight:          'rgba(98, 22, 49, 1)',
sliderRedDark:           'rgba(255, 90, 139, 1)',
sliderRedBorderLight:    'rgba(98, 22, 49, 1)',
sliderRedBorderDark:     'rgba(218, 73, 108, 1)',

// Green gradients
sliderGreenLight:        'rgba(27, 125, 67, 1)',
sliderGreenDark:         'rgba(108, 231, 150, 1)',
sliderGreenBorderLight:  'rgba(26, 80, 62, 1)',
sliderGreenBorderDark:   'rgba(64, 198, 134, 1)',

// Text colors
redText:                 'rgba(128, 32, 55, 1)',
greenText:               'rgba(7, 110, 73, 1)',
```

### Assets

* **Static Assets** can be found in the `StaticAssets/` folder.
* **Animated Assets** can be found in the `AnimatedAssets/` folder.

---

## Questions?

Feel free to reach out to [edwin@rebet.app](mailto:edwin@rebet.app) if you have any questions.

Good luck!
