import UpdateClassForm from '../ClassForms/UpdateClassForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function UpdateClassModal({ onSuccess, classData, ...props }) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Pass the class data to the UpdateClassForm */}
                <UpdateClassForm onSuccess={onSuccess} classData={classData} onHide={props.onHide} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}




