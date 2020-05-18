<template>
  <view>
    <view class="header">
      <text class="title">SETTING</text>
    </view>
    <view class="body">
      <view>
        <touchable-opacity class="btn" :on-press="clear">
          <text class="btn-label">CLEAR STORE</text>
        </touchable-opacity>
      </view>
      <view>
        <touchable-opacity class="btn" :on-press="displayData">
          <text class="btn-label">VIEW DATA</text>
        </touchable-opacity>
      </view>
      <view>
        <scroll-view :content-container-style="{contentContainer: {paddingVertical: 20}}">
          <text class="block">{{txnContent}}</text>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>

import { AsyncStorageProvider } from '../providers/async_storage';

export default {
    data () { return getDataBinding() },
    methods: {
      clear,
      displayData
    }
  }

  const asynStore = new AsyncStorageProvider();

  function getDataBinding() {
      return appData;
  }

  const appData = {
    txnContent: ""
  }

  async function displayData() {
    appData.txnContent = await asynStore.getAllKeys();
  }

  function clear() {
    asynStore.clearData();
  }

</script>

<style>
.header {
  padding: 15px 10px;
  background-color: #1565C0;
}

.title {
  color: aliceblue;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.body {
  margin: 25px;
}

.btn {
  height: 45px;
  margin-top: 20px;
  border-radius: 5px;
  justify-content: center;
  background-color: #1565C0;
}

.btn-label {
  text-align: center; 
  color: aliceblue;
}


.block {
  font-size: 15px;
  margin: 15px;
}

</style>