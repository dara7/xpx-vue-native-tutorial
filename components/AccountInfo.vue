<template>
  <view>
    <view class="header">
      <text class="title">MY ACCOUNT</text>
    </view>
    <view class="body">
      <view>
        <Dropdown
          label='Username'
          baseColor="#1565C0"
          :data="userNames"
          :onChangeText="text => changeUserName(text)"
        />
      </view>
      <view>
        <text class="label">Address</text>
        <text-input 
          class="textInput" 
          placeholder="xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx-xxxx"
          v-model="address"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>
        <text class="label">Amount XPX</text>
        <text-input 
          class="textInput" 
          placeholder="0"
          v-model="amtXpx"
          placeholderTextColor="#BBDEFB"
        />
      </view>
      <view>
        <text class="label">Status: {{status}}</text>
      </view>
      <view>
        <touchable-opacity class="btn" :on-press="getTxn" :disabled="disableBtn">
          <text class="btn-label">GET TRANSACTION</text>
        </touchable-opacity>
      </view>
      <view v-if="status == 'account is inactive'">
        <touchable-opacity class="btn btn-activate" :on-press="link">
          <text class="btn-label">ACTIVATE ACCOUNT</text>
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

  import { Linking } from 'react-native';
  import { Dropdown } from 'react-native-material-dropdown';
  import { AsyncStorageProvider } from '../providers/async_storage';
  import { SirusProvider } from '../providers/sirus';

  export default {
    data () { return getDataBinding() },
    methods: {
      changeUserName,
      getTxn,
      link
    },
    components: {
      Dropdown
    }
  }

  let accName;
  const asynStore = new AsyncStorageProvider();

  function getDataBinding() {
      getAllData();
      return appData;
  }

  const appData = {
    userNames:   [],
    address:     '',
    amtXpx:      '',
    status:      '',
    txnContent:  '',
    disableBtn:  true
  }

  async function getAllData() {
    const keys = await asynStore.getAllKeys();
    keys.map(key => appData.userNames.push({ value: key }));
  }

  async function changeUserName(name) {
    accName = name;
    appData.disableBtn = false;

    const acc = await recoverAcc(accName);

    try {
      const accInfo = await getAccInFo(acc.address);
      setDataToComponents(accInfo, acc.address.plain());
    } catch(err) {
      setDataToComponents(null, acc.address.plain());
    }
  }

  async function recoverAcc(name) {
    const pk  = await asynStore.getData(name);
    const acc = await SirusProvider.recoveryAccount(pk);
    return { publickey: acc.publicKey, address: acc.address };
  }

  async function getAccInFo(address) {
    let accountInfo = { amtXPX: 0, status: "account is active" };
    try {
      const accInfo = await SirusProvider.getAccountInfo(address);
      accountInfo.amtXPX = accInfo.mosaics[0].amount.compact() / Math.pow(10, 6);
      return accountInfo;
    } catch(err) {
      throw err;
    }
  }

  function setDataToComponents(accInfo, address) {
      appData.address = address;
      appData.amtXpx  = accInfo ? String(accInfo.amtXPX)  : '0';
      appData.status  = accInfo ? accInfo.status : "account is inactive";
  }

  async function getTxn() {
    const acc = await recoverAcc(accName);
    SirusProvider.getTxn(acc.publickey).subscribe(transactions => {appData.txnContent = transactions}, err => alert(err));
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

.block {
  font-size: 15px;
  margin: 15px;
}

</style>