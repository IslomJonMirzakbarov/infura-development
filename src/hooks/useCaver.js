import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ERC20_ABI } from 'utils/ABI/ERC20ABI';
import Caver from 'caver-js';

export const conAddress = '0xaa5542ABBd8047Df38231818c49d23A47c930Ed2';
export const symbol = 'CONX';
export const tokenImg =
  'https://dexpo.s3.ap-northeast-2.amazonaws.com/1662393423341_con-token.png';
export const chainId = 1001;
export const chainName = 'Klaytn Testnet Baobab';
export const rpcUrl = 'https://api.baobab.klaytn.net:8651';
export const conName = 'KLAY';

const caver = new Caver(rpcUrl);

const useCaver = () => {
  const { walletAddress: account } = useSelector((store) => store.auth);

  const [balance, setBalance] = useState();

  useEffect(() => {
    if (!account) return;

    getUserBalance(account);
  }, [account]);

  const getUserBalance = async (acc) => {
    try {
      const contractERC20 = new caver.klay.Contract(ERC20_ABI, conAddress);
      const balance = await contractERC20.methods.balanceOf(acc).call();
      const res = caver.utils.fromWei(balance);

      setBalance(res);
      return res;
    } catch (err) {
      console.log(err);
    }
    return 0;
  };

  const getGasPrice = async (fromAddress) => {
    caver.klay.defaultAccount = fromAddress;
    const gasPrice = await caver.klay.getGasPrice();

    return gasPrice;
  };

  const getGasLimit = async ({ from, to, amount }) => {
    const contract = new caver.klay.Contract(ERC20_ABI, conAddress, {
      from
    });

    const myData = contract.methods
      .transfer(to, caver.utils.toWei(amount))
      .encodeABI();

    var getEstimateGas = await caver.klay.estimateGas({
      from,
      to: conAddress,
      data: myData
    });

    return getEstimateGas;
  };

  async function getTransactionFee({ from, to, amount }) {
    let data = {
      gasLimit: null,
      gasPrice: null
    };

    data.gasLimit = await getGasLimit({ from, to, amount });

    await caver.klay.getGasPrice().then((result) => {
      data.gasPrice = caver.utils.fromWei(result, 'gwei');
    });

    // return {
    //   CMD: 'RES_ESTIMATE_NETWORK_FEE',
    //   slow: {
    //     gas_price: String(data.gasPrice),
    //     gas_limit: data.gasLimit,
    //     total: (data.gasPrice * data.gasLimit) / 1000000000
    //   },
    //   average: {
    //     gas_price: String(2 * data.gasPrice),
    //     gas_limit: data.gasLimit,
    //     total: (data.gasPrice * 2 * data.gasLimit) / 1000000000
    //   },
    //   fast: {
    //     gas_price: String(3 * data.gasPrice),
    //     gas_limit: data.gasLimit,
    //     total: (data.gasPrice * 3 * data.gasLimit) / 1000000000
    //   }
    // };
    return (data.gasPrice * data.gasLimit) / 1000000000;
  }

  const sendCoin = async ({
    fromAddress,
    toAddress,
    amount,
    private_key,
    onTxHash,
    onReceipt
  }) => {
    let response;
    caver.klay.defaultAccount = fromAddress;
    try {
      const contractERC20 = new caver.klay.Contract(ERC20_ABI, conAddress, {
        from: fromAddress
      });
      var myData = contractERC20.methods
        .transfer(toAddress, caver.utils.toWei(amount))
        .encodeABI();

      const gasPrice = await getGasPrice(fromAddress);

      const gasLimit = await getGasLimit({
        from: fromAddress,
        to: conAddress,
        amount
      });

      caver.klay.getTransactionCount(fromAddress, async (err, txCount) => {
        // Build the transaction
        var txObject = {
          from: fromAddress,
          nonce: caver.utils.toHex(txCount),
          to: conAddress,
          value: '0x0',
          gasLimit: caver.utils.toHex(gasLimit),
          gasPrice: caver.utils.toHex(gasPrice),
          data: myData
        };

        // Sign the transaction
        const resTx = await caver.klay.accounts.signTransaction(
          txObject,
          private_key
        );

        caver.klay
          .sendSignedTransaction(resTx.rawTransaction)
          .on('transactionHash', (hash) => {
            response = {
              tx: hash,
              ...txObject,
              date: new Date(),
              account: fromAddress,
              status: 'pending',
              amount
            };
            onTxHash(response);
          })
          .on('receipt', (newTx) => {
            response = {
              ...newTx,
              tx: newTx.transactionHash,
              date: new Date(),
              account: fromAddress,
              status: 'completed',
              amount
            };
            onReceipt(response);
          });
      });
    } catch (err) {
      console.log(err);
    }
    return response;
  };

  return {
    getUserBalance,
    balance,
    sendCoin,
    getTransactionFee
  };
};

export default useCaver;
