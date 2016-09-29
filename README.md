# react-native-shape-image-view

## Getting started

`$ npm install react-native-shape-image-view --save`

### Mostly automatic installation

`$ react-native link react-native-shape-image-view`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-shape-image-view` and add `RNShapeImageView.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNShapeImageView.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNShapeImageViewPackage;` to the imports at the top of the file
  - Add `new RNShapeImageViewPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-shape-image-view'
  	project(':react-native-shape-image-view').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-shape-image-view/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-shape-image-view')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNShapeImageView.sln` in `node_modules/react-native-shape-image-view/windows/RNShapeImageView.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Cl.Json.RNShapeImageView;` to the usings at the top of the file
  - Add `new RNShapeImageViewPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import React, { PropTypes } from 'react';
import { HexagonImage } from 'react-native-shape-image-view';

export const Example = () => (
  <HexagonImage
    borderWidth={5}
    borderColor={'red'}
    backgroundColor={'blue'}
    src={require('./something.png')} // or { uri: 'https://.....' }
    setDefaultSize={true} // set image default width and height, it's works only with local assets
    style={{
      // some styles here
    }}
    onLoad={() => console.log('hexagon image loaded')}
  />
);
```
