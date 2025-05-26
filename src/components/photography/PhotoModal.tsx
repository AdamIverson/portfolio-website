import React from 'react';
import { Modal, Box } from '@mui/material';

interface PhotoModalProps {
  open: boolean;
  onClose: () => void;
  photoUrl: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ open, onClose, photoUrl }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          bgcolor: 'background.paper',
          padding: 2,
        }}
      >
        <img src={photoUrl} alt="Selected" style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </Box>
    </Modal>
  );
};

export default PhotoModal;