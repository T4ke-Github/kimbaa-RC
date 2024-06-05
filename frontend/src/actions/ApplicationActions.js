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
function getApplicationSuccess(){ return { type: APPLICATION_SUCCESS, payload: 'Landing' } }

export function saveApplicationAction(studentId, department,bachelor, master, practicalDone, practicalAcknowlegded, reqMet, att1, att2, noTopicProposition ){
    return dispatch => {
        dispatch(getSaveApplicationPending());
        saveApplicationReal(studentId, department, bachelor, master, practicalDone, practicalAcknowlegded, reqMet, att1, att2, noTopicProposition  )
            .then(() => {
                Cookies.set('currentPage', 'Landing')
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