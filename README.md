# INSTALLATION 
```
$ git clone https://github.com/dara7/xpx-vue-native-tutorial.git
$ cd xpx-vue-native-tutorial
$ npm i
```
# Additional hacks to make it work
1. flatbuffers
- In
```node_modules/flatbuffers/js/flatbuffers.js
```
replace
```
this.flatbuffers = flatbuffers;
```
with
```
export { flatbuffers };
```
2. tsjs-xpx-chain-sdk
- file
```
node_modules/tsjs-xpx-chain-sdk/dist/src/core/format/Utilities.js
```
replace all **this** to **export**

For more detail in **patches folder** in **xpx-vue-native-tutorial/patches**
# Run on devices
- Android
```
$ react-native run-android
```
Or 
- IOS
```
$ react-native run-ios
```