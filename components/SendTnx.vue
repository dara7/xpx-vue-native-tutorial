<template>
  <view>
    <view class="header">
      <text class="title">SEND TRANSACTION</text>
    </view>
    <view class="body">
      <view>
        <Dropdown
          label='Sendername'
          baseColor="#1565C0"
          :data="userNames"
          :onChangeText="text => ChangeSenderName(text)"
        />
      </view>
      <view>
        <Dropdown
          label='Receivername'
          baseColor="#1565C0"
          :data="userNames"
          :onChangeText="text => changeReceiverName(text)"
        />
      </view>
      <view>
        <text class="label">Amount XPX</text>
        <text-input 
          class="textInput" 
          placeholder="0"
          v-model="amtXPX"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>
        <text class="label">Message (optional)</text>
        <text-input 
          class="textInput" 
          placeholder="Say something"
          v-model="message"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>
        <touchable-opacity class="btn" :on-press="sendTxn">
          <text class="btn-label">SEND</text>
        </touchable-opacity>
      </view>
    </view>
  </view>
</template>

<script>

import { Dropdown } from 'react-native-material-dropdown';
import { AsyncStorageProvider } from '../providers/async_storage';
import { SirusProvider } from '../providers/sirus';

export default {
    data () { return getDataBinding() },
    methods: {
      sendTxn,
      ChangeSenderName,
      changeReceiverName
    },
    components: {
      Dropdown
    }
  }

  let senderName, receiverName;
  const asynStore = new AsyncStorageProvider();

  function getDataBinding() {
      getAllData();
      return appData;
  }

  const appData = {
    userNames:  [],
    amtXPX:     "",
    message:    ""
  }

    async function getAllData() {
    let keys = await asynStore.getAllKeys();
    keys.map(key => appData.userNames.push({ value: key }));
  }

  function ChangeSenderName(name) {
    senderName = name;
  }

  function changeReceiverName(name) {
    receiverName = name;
  }

  async function sendTxn() {

    if (!appData.amtXPX) { alert("Please enter amount!"); return};

    try {
      const senderPk       = await asynStore.getData(senderName); 
      const sender         = await SirusProvider.recoveryAccount(senderPk);
      const senderInfo     = await SirusProvider.getAccountInfo(sender.address);
      const senderMosaicId = senderInfo.mosaics[0].toDTO().id;
  
      const receiverPk     = await asynStore.getData(receiverName);
      const receiver       = await SirusProvider.recoveryAccount(receiverPk);
  
      SirusProvider.sendTxn(sender, receiver.address, senderMosaicId, Number(appData.amtXPX), appData.message);
    } catch(err) {
      alert(err);
    }

  }


</script>


<style>
.body {
  margin: 25px;
}

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

.label {
  color: #1565C0;
}

.textInput {
  padding: 5px;
  margin-bottom: 10px;
  border-color: #1E88E5;
  border-width: 1px;
  border-radius: 5px;
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

</style>