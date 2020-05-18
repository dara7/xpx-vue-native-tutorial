<template>
  <view>
    <status-bar
      background-color="#0D47A1"
      bar-style="light-content"
    />
    <view class="header">
      <text class="title">CREATE ACCOUNT</text>
    </view>
    <view class="body">
      <view>
        <text class="label">Username</text>
        <text-input 
          class="textInput" 
          placeholder="Enter username"
          v-model="tname"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>      
        <text class="label">Address</text>
        <text-input 
          class="textInput" 
          placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxx"
          v-model="taddress"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>      
        <text class="label">Publickey</text>
        <text-input 
          class="textInput" 
          placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxx"
          v-model="tpublickey"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>      
        <text class="label">Privatekey</text>
        <text-input 
          class="textInput" 
          placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxx"
          v-model="tprivatekey"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>
        <touchable-opacity class="btn" :on-press="create">
          <text class="btn-label">CREATE</text>
        </touchable-opacity>
      </view>
      <view v-if="activateBtn">
        <touchable-opacity class="btn btn-activate" :on-press="link">
          <text class="btn-label">ACTIVATE ACCOUNT</text>
        </touchable-opacity>
      </view>
    </view>
  </view>
</template>

<script>
import { Linking } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { AsyncStorageProvider } from '../providers/async_storage';
import { SirusProvider } from '../providers/sirus';



export default {
    data () { return getDataBinding() },
    methods: {
      create,
      link
    },
    components: {
      Dropdown 
    }
  }

  const asynStore = new AsyncStorageProvider();

  function getDataBinding() {
      return appData;
  }

  const appData = {
    tname:       "",
    taddress:    "",
    tpublickey:  "",
    tprivatekey: "",
    activateBtn:    false
  }

  function create() {
    if (!appData.tname) { alert("Please enter username!"); return };

    const newAcc = SirusProvider.createAccount();

    appData.taddress    = newAcc.address.plain();
    appData.tpublickey  = newAcc.publicKey;
    appData.tprivatekey = newAcc.privateKey;

    save(appData.tname, appData.tprivatekey);
  }

  function save(key, val) {
    asynStore.setData(key, val).then(() => {
      appData.activateBtn = true;
      alert("Account is not Activated in Blockchain. Please send some xpx from your Testnet Wallet to this Account.");
    });
  }

  function link() {
    Linking.openURL('https://bctestnetfaucet.xpxsirius.io/#/');
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

.btn-activate {
  margin-top: 10px;
  background-color: #00BCD4;
}
</style>