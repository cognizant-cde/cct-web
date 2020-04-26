# Create React App example with Material-UI, TypeScript, Redux and Routing

This is a new version with React Hooks, Material-UI 4 and React-Redux 7 (with hooks!). We use this template for all our new projects. If you want to bootstrap a project with the classic approach without hooks but with class components, you are welcome to use the [previous version](https://github.com/innFactory/create-react-app-material-typescript-redux/tree/v1).

<img width="100%" src="screenshot.png" alt="example"/>

Inspired by:

- [Material-UI](https://github.com/mui-org/material-ui)
- [react-redux-typescript-boilerplate](https://github.com/rokoroku/react-redux-typescript-boilerplate)

## Contains

- [x] [Material-UI](https://github.com/mui-org/material-ui)
- [x] [Typescript](https://www.typescriptlang.org/)
- [x] [React](https://facebook.github.io/react/)
- [x] [Redux](https://github.com/reactjs/redux)
- [x] [Redux-Thunk](https://github.com/gaearon/redux-thunk)
- [x] [Redux-Persist](https://github.com/rt2zz/redux-persist)
- [x] [React Router](https://github.com/ReactTraining/react-router)
- [x] [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)
- [x] [TodoMVC example](http://todomvc.com)
- [x] PWA Support

## Roadmap

- [x] Make function based components and use hooks for state etc.
- [x] Implement [Material-UIs new styling solution](https://material-ui.com/css-in-js/basics/) based on hooks
- [x] use react-redux hooks
- [ ] Hot Reloading -> Waiting for official support of react-scripts

## How to use

Download or clone this repo

```bash
git https://git-codecommit.ap-southeast-1.amazonaws.com/v1/repos/covid19-web
cd covid19-web
```

Install it and run:

```bash
npm i
npm start
```

## Enable PWA ServiceWorker [OPTIONAL]

Just comment in the following line in the `index.tsx`:

```javascript
// registerServiceWorker();
```

to

```javascript
registerServiceWorker();
```

## Enable Prettier [OPTIONAL]

1.  Step: Install the Prettier plugin (e.g. the one of Esben Petersen)
2.  Add the following snippet to your settings in VSCode:

```json
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
       "source.organizeImports": true // optional
   },
```

## Git Work Flow

1. Before starting on a story (on your local machine):
   - please make sure you are on master branch
   - make sure master branch is the latest

```bash
git pull origin master
```

2. Branch out to a new feature branch:
   - replace "featureName" with your current feature name

```bash
git checkout -b feature-"featureName"
```

3. Start with coding your feature on the newly created branch

4. Once done with coding or time to do a commit:
   - either add all files or specific file to staging
   - replace "fileName" with the file you want to stage

```bash
git add .
or
git add "fileName"
```

5. Commit your code:

```bash
git commit -m "your commit message"
```

6. Once your code has been committed, its time to do a rebase
   - this rebase will ensure ur changes be on top of the remote branch
   - resolve any merge conflict if you need to

```bash
git pull -r origin master
```

7. Once everything is good, we will then do a push to remote:
   - please replace "featureName" with the current feature name

```bash
git push origin feature-"featureName"
```

8. Once you have push your branch to the remote, go to AWS codeCommit:

```
https://ap-southeast-1.console.aws.amazon.com/codesuite/codecommit/repositories/covid19-web/browse?region=ap-southeast-1#
```

9. Create a pull request:
   - Click on pull request at the left nav bar
   - Click on the orange pull request button on the top right of the screen
   - Destination set to Master
   - Source set to your feature branch
   - Click Compare
   - Add a title to the pull request (usually same as the commit message)
   - Add a description to the pull request
   - Scroww down to view the changes in the files that you committed
   - Click the orange button: create pull request
   - Let someone else in the team review the code first before merging the code
   - Make sure that there is no merge conflict before merging the branch
   - Click the orange Merge button
   - Select default merge and click the merge button
   - Make sure u delete branch after merging (can enable this feature at the merging screen)



## IBM Cloud Deployment

