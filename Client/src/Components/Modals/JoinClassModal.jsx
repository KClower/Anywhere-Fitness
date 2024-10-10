
import WorkoutSignup from '../WorkoutSignup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



export default function JoinClassModal({ onSuccess, onError, onHide, workout, show }) {
    console.log("JoinClassModal:: workout: ", workout)
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Join {workout.class_name} Class
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <WorkoutSignup
                    workout={workout}
                    onSuccess={onSuccess}
                    onError={onError}
                /> {/* Pass workout data */}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

}






