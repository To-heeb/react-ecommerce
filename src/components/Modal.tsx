import { Button, Modal } from "react-bootstrap";

interface CustomModalProps {
  title: string;
  status: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
}

function CustomModal({
  title,
  status,
  children,
  onCloseModal,
}: CustomModalProps) {
  return (
    <>
      <Modal
        show={status}
        onHide={onCloseModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;
