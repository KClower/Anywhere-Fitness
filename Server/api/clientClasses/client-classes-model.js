
const db = require('../../data/db-config.js');

module.exports = {

    findClassById,
    isClientSignedUp,
    signUpClientForClass,
    getClientClasses,
    removeClientClass,
}



function findClassById(classId) {
    return db('instructor_classes')
        .where('id', classId)
        .first();
}

function isClientSignedUp(clientId, classId) {
    return db('client_classes')
        .where({
            client_id: clientId,
            class_id: classId,
        })
        .first();
}

async function signUpClientForClass(clientId, classId) {
    await db.transaction(async (trx) => {
        await trx('client_classes').insert({
            client_id: clientId,
            class_id: classId,
        });
        await trx('instructor_classes')
            .where('id', classId)
            .increment('class_size', 1);
    })
}


function getClientClasses(clientId) {
    return db('client_classes as cc')
        .join('instructor_classes as ic', 'cc.class_id', 'ic.id')
        .join('rf_class_type as ct', 'ic.class_type_id', 'ct.id')
        .join('rf_class_intensity as ci', 'ic.intensity_id', 'ci.id')
        .select(
            'ic.id as class_id',
            'ic.class_name',
            'ic.start_time',
            'ic.duration',
            'ic.location',
            'ic.class_size',
            'ic.class_capacity',
            'ct.class_type',
            'ci.intensity'
        )
        .where('cc.client_id', clientId);
}

async function removeClientClass(clientId, classId) {
    const result = await isClientSignedUp(clientId, classId)
    if (result === undefined) {
        throw new Error('Client is not signed up for this class');
    }
    return db.transaction(async trx => {
        // Delete the client from the class within the transaction
        await trx('client_classes')
            .where({
                client_id: clientId,
                class_id: classId
            })
            .del();


        // Decrement class size within the same transaction
        await trx('instructor_classes')
            .where('id', classId)
            .decrement('class_size', 1);

    });
}

// function removeClientClass(clientId, classId) {
//     return db('client_classes')
//         .where({
//             client_id: clientId,
//             class_id: classId
//         })
//         .del()
//         .then((rowsDeleted) => {
//             if (rowsDeleted > 0) {
//                 return db('instructor_classes')
//                     .where('id', classId)
//                     .decrement('class_size', 1);
//             } else {
//                 throw new Error('Client is not signed up for this class');
//             }
//         })
// }


