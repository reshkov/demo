import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

const contractAddress = "0x470262646B6F68017AB8D866b0869690c34cE334";
const abi = `[{"inputs":[{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"name":"addSubscription","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"createUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"userID","type":"uint256"}],"name":"getMySubscriptions","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"userID","type":"uint256"}],"name":"getMySubscriptionsAvailable","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"subsciptionID","type":"uint256"}],"name":"getSubsctiption","outputs":[{"components":[{"internalType":"uint256","name":"subscriptionID","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"price","type":"uint256"}],"internalType":"struct Demo.Subscription","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"subscriptionID","type":"uint256"}],"name":"subscribe","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"subscribedList","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"subscription_user","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"subscriptions_available","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userIDs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]`
function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [userID, setUserID] = useState(null);
  const [availableSubscriptions, setAvailableSubscriptions] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      await setCurrentAccount(account);
      readUserID(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const readUserID = async (account) =>{
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const demoContract = new ethers.Contract(contractAddress, abi, signer);
        console.log(account)
        let userid = await demoContract.userIDs(account);

        console.log(userid.toString());
        setUserID(userid.toString());
        if (userid.toString() != "0"){
          let tx1 = await demoContract.getMySubscriptionsAvailable(userid);
          setAvailableSubscriptions(tx1);
        }
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const readMySubscriptions = async () =>{
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const demoContract = new ethers.Contract(contractAddress, abi, signer);
        let userid = await demoContract.userIDs(currentAccount);
        if (userid.toString() != "0"){
          let tx1 = await demoContract.getMySubscriptionsAvailable(userid);
          console.log(tx1);
          setAvailableSubscriptions(tx1);
        }
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const readSubscribedTo = async () =>{
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const demoContract = new ethers.Contract(contractAddress, abi, signer);
        let userid = await demoContract.userIDs(currentAccount);
        if (userid.toString() != "0"){
          let tx1 = await demoContract.getMySubscriptions(userid);
          console.log(tx1);
        }
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      await readUserID(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const mintNftHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const demoContract = new ethers.Contract(contractAddress, abi, signer);

        let nftTxn = await demoContract.userIDs(currentAccount);

        console.log(nftTxn.toString());

      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const createUser = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const demoContract = new ethers.Contract(contractAddress, abi, signer);

        let nftTxn = await demoContract.createUser()
        await nftTxn.wait();
        readUserID(currentAccount);
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const addSubscription = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const demoContract = new ethers.Contract(contractAddress, abi, signer);

        let nftTxn = await demoContract.addSubscription(10,10);
        await nftTxn.wait();
        readMySubscriptions();
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }

  const subscribe = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const demoContract = new ethers.Contract(contractAddress, abi, signer);

        let nftTxn = await demoContract.subscribe(1,{value: 10});
        await nftTxn.wait();
        readSubscribedTo();
      } else {
        console.log("Ethereum object does not exist");
      }

    } catch (err) {
      console.log(err);
    }
  }


  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const createUserButton = () => {
    return (
      <button onClick={createUser} className='cta-button mint-nft-button'>
        create user
      </button>
    )
  }

  const createUserSubscriptionButton = () => {
    return (
      <button onClick={addSubscription} className='cta-button mint-nft-button' style={{margin:20}}>
        create subscription
      </button>
    )
  }

  const createUserSubscribeButton = () => {
    return (
      <button onClick={subscribe} className='cta-button mint-nft-button' style={{margin:20}}>
        subscribe
      </button>
    )
  }

  const checkUserSubscribeButton = () => {
    return (
      <button onClick={readSubscribedTo} className='cta-button mint-nft-button' style={{margin:20}}>
        check where am i subscribed
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Demo</h1>

      <div>
        {currentAccount ? <div style={{padding:20}}>{userID == 0 ? createUserButton() : <h2>UserID: {userID}</h2>} </div> : connectWalletButton()}
        {currentAccount && userID != 0 ? [createUserSubscriptionButton(),createUserSubscribeButton()]  : ""}
        {currentAccount && userID != 0 ? checkUserSubscribeButton()  : ""}
      </div>
    </div>
  )
}

export default App;