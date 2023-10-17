import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

const { api } = window;

const useWallet = () => {
  const [mnemonics, setMnemonics] = useState();

  const { data: result } = useQuery('GENERATE_MNEMONICS', async () => {
    const data = await api.generateMnemonics();

    return data;
  });

  useEffect(() => {
    if (!mnemonics) setMnemonics(result);
  }, [result]);

  const { mutate: createWallet } = useMutation(async (mnmcs) => {
    const data = await api.createWalletAddress(mnmcs);

    return data;
  });

  const { mutate: createWalletByPrivateKey } = useMutation(async (privKey) => {
    const data = await api.importAccountByPrivateKey(privKey);

    return data;
  });

  const normalized = useMemo(() => mnemonics?.data.split(' '), [mnemonics]);

  return {
    mnemonics: normalized,
    stringifiedMnemonics: mnemonics?.data,
    createWallet,
    createWalletByPrivateKey
  };
};

export default useWallet;
