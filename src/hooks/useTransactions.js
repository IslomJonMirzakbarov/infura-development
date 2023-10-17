import { useMemo } from 'react';
import { useQuery, useMutation } from 'react-query';
import { truncateAddress } from 'utils';
import moment from 'moment';
import { Box } from '@mui/material';
import { ReactComponent as MoneyIcon } from 'assets/icons/money.svg';
import { txLabels } from 'consts/txTypes';

const { api } = window;

const putTransaction = async (data) => await api?.putTransaction(data);

const normalize = (item) => ({
  id: item?.tx,
  status: txLabels[item.status],
  date: moment(item.date).format('YYYY.MM.DD HH:mm:ss'),
  amount: (
    <Box display="flex" alignItems="center">
      <MoneyIcon style={{ marginRight: '10px' }} /> {item.amount} CYCON
    </Box>
  )
});

const useTransactions = ({ account, page = 0, limit = 20 }) => {
  const { data, isLoading, refetch } = useQuery(
    'GET_TRANSACTIONS',
    async () => {
      const res = await api?.getTransactions({
        account,
        pagination: { page, limit }
      });

      return res;
    }
  );

  const normalized = useMemo(() => {
    const list = data?.data?.docs?.map((doc) => normalize(doc));

    return list;
  }, [data]);

  // data => { account: walletAddress, data: {id,name,tx,account,status, ...etc} }
  const mutation = useMutation((data) => putTransaction(data));

  return {
    data: normalized,
    isLoading,
    refetch,
    mutation
  };
};

export default useTransactions;
