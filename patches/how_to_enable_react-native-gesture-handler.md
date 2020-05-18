# To enable react-native-gesture-handler

**Add this 2 line in android\gradle.properties inorder to avoid error at compile time**
```
android.useAndroidX=true
android.enableJetifier=true
```

## To enable swipe gesture

**In the index.js**
```
//Add this line
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

// Edit AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
```