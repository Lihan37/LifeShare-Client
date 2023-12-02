import React, { useState } from 'react';
import Modal from 'react-modal';

const DonationDetailsPage = () => {
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Your donation details information here...

  return (
    <div>
      <h2>Donation Details</h2>

      {/* Donation details information here... */}
      {/* You can display the donation details information here */}

      {/* Donate button */}
      <button onClick={openModal}>Donate</button>

      {/* Donation modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Donation Modal"
      >
        <h2>Donation Modal</h2>

        {/* Donation modal form and confirm button here... */}
        {/* You can add your form fields for donor name and email here */}

        <p>Donor Name: {/* Display donor name here */}</p>
        <p>Donor Email: {/* Display donor email here */}</p>

        {/* Confirm button */}
        <button onClick={closeModal}>Confirm Donation</button>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default DonationDetailsPage;
