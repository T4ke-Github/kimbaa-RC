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
function getApplicationSuccess(applicationForm){ return { type: APPLICATION_SUCCESS, playTestApplication: applicationForm, payload: 'landing' } }

export function saveApplicationAction(studentId, department,bachelor, master, practicalDone, practicalAcknowlegded, reqMet, att1, att2, noTopicProposition ){
    return dispatch => {
        dispatch(getSaveApplicationPending());
        saveApplicationReal(studentId, department, bachelor, master, practicalDone, practicalAcknowlegded, reqMet, att1, att2, noTopicProposition)
            .then(applicationForm => {
                Cookies.set('currentPage', 'Landing')
                dispatch(getApplicationSuccess(applicationForm))
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
export const REFRESH_SUCCESS = "REFRESH_SUCCESS";
export const REFRESH_FAILURE = "REFRESH_FAILURE";


function getSaveUserPending(){ return { type: USER_PENDING } }
function getSaveUserFail(err){ return { type: USER_FAILURE, err: err } }
function getSaveUserSuccess(){ return { type: USER_SUCCESS} }

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

function getRefreshResourceFailure(){ return { type: REFRESH_FAILURE, payload: 'landing' } }
function getRefreshResourceSuccess(userResource){ return { type: REFRESH_SUCCESS, userResource: userResource, payload: 'landing' } }

export function refreshUE(studentId){
    return dispatch => {
        refreshUserResource(studentId)
            .then(resource => {
                Cookies.set('currentPage', 'landing');
                dispatch(getRefreshResourceSuccess(resource));
            })
            .catch(err => {
                dispatch(getRefreshResourceFailure(err));
            })
    }
}
function refreshUserResource(studentId){
    const requestOptions = {
        method: 'GET',
    }

    return fetch(`http://localhost:8081/api/user/`+studentId, requestOptions)
        .then(response => {
            if(!response.ok){
                throw new Error('Error while refreshing userResource');
            }
            return response.json();
        })
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