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