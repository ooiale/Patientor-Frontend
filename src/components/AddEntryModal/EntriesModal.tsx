import { Dialog, DialogTitle, DialogContent, Divider, Alert, Button } from '@mui/material';

import { useState } from 'react';

import EntriesForm from './EntriesForm';

interface Props {
  setDummy: React.Dispatch<React.SetStateAction<number>>
}

const EntriesModal = ({setDummy}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button sx={{ paddingLeft: 0, paddingTop: 2 }}  onClick={handleOpenModal}> Add new entry</Button>
      <Dialog fullWidth={true} open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add a new Entry</DialogTitle>
        <Divider />
        <DialogContent>
          <EntriesForm 
            handleCloseModal = {handleCloseModal} 
            setError={setError}
            setDummy={setDummy}
            />
            {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
    </Dialog>
    </div>
  );
};

export default EntriesModal;
