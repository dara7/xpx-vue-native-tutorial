<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator
} from "vue-native-router";

import CreateAccount from "./components/CreateAccount";
import AccountInfo   from "./components/AccountInfo";
import SendTnx       from "./components/SendTnx";
import Setting       from "./components/Setting";

const pages = {
  "Create Account":   CreateAccount,
  "My Account":       AccountInfo,
  "Send Transaction": SendTnx,
  "Setting":          Setting
}

const DrawerNavigator = createDrawerNavigator(pages, {initialRouteName: "Create Account"});
const StackNavigator  = createStackNavigator({Drawer: DrawerNavigator}, {headerMode: "none"});
const AppNavigator    = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator }
}
</script>
