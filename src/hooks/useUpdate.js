import { useMutation } from 'react-query';

const { api } = window;

const useUpdate = () => {
  const { mutate: restartAfterInstall } = useMutation(async (mnmcs) => {
    const data = await api.restartAfterInstall(mnmcs);

    return data;
  });

  return { restartAfterInstall };
};

export default useUpdate;
