import UpdateModal from 'components/UpdateModal';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connectSocket } from 'utils/socket';

const UpdateProvider = ({ children }) => {
  const { updatePopup } = useSelector((store) => store.popup);

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <UpdateModal {...updatePopup} />
      {children}
    </>
  );
};

export default UpdateProvider;
