
//make a function that takes a game. 

randomly generate coordinates to fire on the game. 

save those coordinates for reference 

if the response from firing on the ship is not a hit, the computer will generate more random coordinates. 

however, if it is a hit, the computer will try to continue in that area until it receives a response that
a ship has been sunk.  

So with the above, we could have two modes for the computer, one of which is a random fire mode, 
and the other is a "hunter" mode. If the computer hits a target, the mode will switch to hunter, and the previous hit
coords will be stored. 

let mode = "hunter"

prevHitCoords = row, col

Now in the previous hit coords, we can probably store the previous hits in an array so that we can track in which direction to go. 

Scenarios for decision making: 
There are a few things to think about in terms of how we decide where to fire after hitting a target. 

First scenario: We hit a target initially, then randomly choose a square around that target to try and hit next. 
**This is always the first step after hitting a target. **

2a. We choose incorrectly and miss. We randomly choose a square from the remaining squares. We continue this step until we hit another target. Another array is needed here to keep track of the squares we are trying. In the first step, an array can be generated for the four sqares that are an option to hit next. In this step, we can take off each square's coordinate as we miss.  

2b If we choose corretly and hit another target, we now have an orientation for the ship, and we continue in a direction around the first two hit targets.  We continue hitting until the ship is sunk. 

2c. If we choose correctly and hit another target, we continue in a direction until we miss, but haven't sunk the ship.  If this is the scenario, then we have to go back to the initial hit and continue in the other direction until 
we sink the ship. 

2d. We choose correctly and hit another target, and continue in a direction until we miss, but haven't sunk the ship, as in 2c. However, when we go back in the other direction, we hit again, but then miss again without sinking any ships, as in this scenario: 

__ __  x  __ __ __ __
__ __ s3x s3 s3 __ __
__ __ s2x s2 __ __ __ 
__ __  x  __ __ __ __ 

where s3 and s2 are ships with a length of three an two, respectively, and "s3x" means that this part of the ship has been hit. Above, we hit first with, say, s3, and then move up to miss. Then we move down, hit s2, but miss again. 

now we know that we have two targets to hit! So we go back to s3 and repeat the process horizontally, until it is sunk. THEN we go to s2 and do the same process over again. 




# Getting Started with Create React App


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

//