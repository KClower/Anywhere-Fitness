import CreateClassForm from '../ClassForms/CreateClassForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';




export default function CreateClassModal(onSuccess, onHide, ...props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create a New Class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CreateClassForm onSuccess={onSuccess} onHide={onHide} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}




