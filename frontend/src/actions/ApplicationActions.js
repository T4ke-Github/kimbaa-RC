import Cookies from "js-cookie";



export const APPLICATION_SAVE = "APPLICATION_SAVE";

function getSaveApplicationAction(application){ return { type: APPLICATION_SAVE, application: application, payload: 'landing' }};

export function saveApplication(summer, studentId, department, name, email, phone, street, place, postal, course, master, reqMet, att1, att2, noTopicProposition, practicalDone, practicalAcknowlegded){
    let semesterParsed = "winter";
    if (summer){
        semesterParsed = "summer";
    }

    let addressParsed = street + ", " + postal + " " + place;

    let degreeParsed = "b";
    if(master){
        degreeParsed = "m";
    }
    
    let application = {
        semester: semesterParsed,
        studentId: studentId,
        department: department,
        name: name,
        email: email,
        phone: phone,
        address: addressParsed,
        course: course,
        degree: degreeParsed,
        reqMet: reqMet,
        att1: att1,
        att2: att2,
        noTopicProposition: noTopicProposition,
        practicalDone: practicalDone,
        practicalAcknowlegded: practicalAcknowlegded
    }

    console.log("Saved the application: ", application);

    return dispatch => { dispatch(getSaveApplicationAction(application)) };
}


export const APPLICATION_PENDING = "APPLICATION_PENDING";
export const APPLICATION_FAILURE = "APPLICATION_FAILURE";
export const APPLICATION_SUCCESS = "APPLICATION_SUCCESS";


function getSaveApplicationPending(){ return { type: APPLICATION_PENDING } }
function getApplicationFail(err){ return { type: APPLICATION_FAILURE, err: err } }
function getApplicationSuccess(){ return { type: APPLICATION_SUCCESS, payload: 'landing' } }

export function saveApplicationAction(studentId, department,bachelor, master, practicalDone, practicalAcknowlegded, reqMet, att1, att2, noTopicProposition ){
    return dispatch => {
        dispatch(getSaveApplicationPending());
        saveApplicationReal(studentId, department, bachelor, master, practicalDone, practicalAcknowlegded, reqMet, att1, att2, noTopicProposition  )
            .then(() => {
                Cookies.set('currentPage', 'landing')
                dispatch(getApplicationSuccess())
            })
            .catch(err => {
                dispatch(getApplicationFail(err))
            })
    }
}

function saveApplicationReal( studentId, department,bachelor, master, practicalDone, practicalAcknowlegded, reqMet, att1, att2, noTopicProposition ){
    const ApplicationForm = {
        //creator?:  , // Ersteller
        //attach1id?: ; // Anlage 1 ID
        //attach2id?: ; // Anlage 2 ID
        studentid: studentId, // Matrikelnummer
        department: department, // Fachbereich
        bachelor: bachelor, // Bachelor
        master: master, // Master
        //userDetails?: ; // Benutzerdaten
        internshipCompleted: practicalDone, // Praxisphase abgeschlossen
        recognitionApplied: practicalAcknowlegded, // Anerkennung beantragt
        //internshipCompletedFrom: dateFrom, // Praxisphase abgeleistet von
        //internshipCompletedTo: dateTo, // Praxisphase abgeleistet bis
        modulesCompleted: reqMet, // Module abgeschlossen
        modulesPending: att1, // Module ausstehend
        attachment2Included: att2, // Anlage 2 beigefügt
        topicSuggestion: noTopicProposition, // Thema vorgeschlagen
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ApplicationForm)
    }

    return fetch('http://localhost:8081/api/antragzulassung/'+ studentId, requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error while saving Application');
            }
            return response.json();
        })
}


export const USER_PENDING = "USER_PENDING";
export const USER_FAILURE = "USER_FAILURE";
export const USER_SUCCESS = "USER_SUCCESS";


function getSaveUserPending(){ return { type: USER_PENDING } }
function getSaveUserFail(err){ return { type: USER_FAILURE, err: err } }
function getSaveUserSuccess(){ return { type: USER_SUCCESS, payload: 'landing' } }

export function saveUserAction(studentId, name, email, course , id){
    return dispatch => {
        dispatch(getSaveUserPending());
        saveUser(studentId, name, email, course, id )
            .then(() => {
                Cookies.set('currentPage', 'landing');
                dispatch(getSaveUserSuccess())
            })
            .catch(err => {
                dispatch(getSaveUserFail(err))
            })
    }
}

function saveUser( studentId, name, email, course , id){
    const ApplicationForm = {
        id: id,
        name: name,
        //password: string,
        //admin: boolean,
        studentId: studentId,
        //application: string,
        email: email,
        //createdAt: string,
        //updatedAt: string,
        //course: course,
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ApplicationForm)
    }

    return fetch('http://localhost:8081/api/user/'+ studentId, requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error while saving User');
            }
            return response.json();
        })
}