import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as UpdateIcon } from 'assets/icons/update.svg';
import CloseIcon from '@mui/icons-material/Close';
import useUpdate from 'hooks/useUpdate';
import { useDispatch } from 'react-redux';
import { popupActions } from 'store/popup/popup.slice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: '#fff',
  borderRadius: '7px',
  p: '50px 20px 20px 73px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between'
};

const UpdateModal = ({ open, close, version = 'x.y.z' }) => {
  const dispatch = useDispatch();
  const { restartAfterInstall } = useUpdate();

  const handleClick = () => {
    restartAfterInstall(null, {
      onSuccess: () => {
        dispatch(
          popupActions.toggleStorePopup({
            key: 'updatePopup',
            res: { open: false, version: null }
          })
        );
      }
    });
  };

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <CloseIcon
          onClick={close}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            color: '#D9D9D9',
            cursor: 'pointer'
          }}
        />
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          pt="40px"
        >
          <UpdateIcon />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          ml="63px"
        >
          <Typography fontSize="22px" fontWeight="700">
            App Update Required!
          </Typography>
          <Typography fontSize="15px" sx={{ mt: 1, width: '80%' }}>
            We have added new features and fix some bugs to make your experience
            seamless.
          </Typography>
          <Typography color="#F12A5A" fontWeight={700} m="27px 0 13px 0">
            v{version}
          </Typography>
          <Box>
            <Button
              style={{
                padding: '16px 40px'
              }}
              variant="containedPrimary"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              style={{
                padding: '16px 40px',
                marginLeft: '9px'
              }}
              onClick={handleClick}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
