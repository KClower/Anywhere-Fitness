
import axios from 'axios';
import { getBaseUrl } from './URL-Config';

const api = axios.create({
    baseURL: getBaseUrl()
})


export function userLogOut() {
    return api
        .post('/api/auth/logout', {}, { withCredentials: true })
}

export function userLogIn(userCredentials) {
    return api
        .post('/api/auth/login', userCredentials, { withCredentials: true })
}

export function registerUser(newUserDetails) {
    return api
        .post('/api/auth/register', newUserDetails, { withCredentials: true })

}

export function getClassTypes() {
    return api
        .get('/api/type/class')
}

export function getInstructorNames() {
    return api
        .get('/api/instructors/names')
}

export function getClassIntensityTypes() {
    return api
        .get('/api/intensity/type')
}

export function createNewClass(newClassDetails) {
    return api
        .post('/api/instructor/class', newClassDetails)
}

export function updateInstructorClassById(classId, classDetails) {
    return api
        .put(`/api/instructor/class/${classId}`, classDetails)
}

export function getInstructorClasses() {
    return api
        .get('/api/instructor/classes')
}

export function getInstructorClassesByInstructorId(instructorId) {
    return api
        .get(`/api/instructor/classes/${instructorId}`)
}

export function deleteInstructorClassByClassId(classId) {
    return api.delete(`/api/instructor/class/${classId}`);
}

export function registerForWorkoutById(workoutId, userId) {
    return api
        .put(`/api/client/signup/${workoutId}`, { userId })
}

export function getClassesByUserId(user) {
    return api
        .get(`/api/client/classes/${user}`)
}

export function removeClassByUserId(userId, classId) {
    return api
        .delete('/api/client/class', {
            data: { clientId: userId, classId }
        })
}