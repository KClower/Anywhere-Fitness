const db = require('../../data/db-config.js');
const InstructorClasses = require('./instructor-classes-model.js');
const Users = require('../users/users-model.js');


describe('environment', () => {
    it("Should be using testing environment", () => {
        expect(process.env.Node_ENV).toBe("testing");
    });
});

describe('Instructor Class Model', () => {
    afterAll(() => {
        return db.destroy;
    });
    beforeEach(async () => {
        await db("instructor_classes").del();
        await db("users").del();
    });

    describe('Create()', () => {
        it("Should create instructor class in database", async () => {
            const { id: instructorId } = await Users.create({
                email: "test@lan.com",
                password: "test123",
                isInstructor: true
            })
            let date = new Date()
            await InstructorClasses.create({
                instructor_id: instructorId,
                class_name: "Zilker Crossfit",
                class_type_id: "1978d738-3bdc-4f9c-8bd3-36ff864c235a",
                intensity_id: "83bd5147-773e-4108-b9a5-e6c21fcb190c",
                start_time: date.toISOString(),
                duration: 60,
                location: "Zilker Park",
                class_size: 5,
                class_capacity: 15
            });
            const classes = await db('instructor_classes');
            console.log(classes)
            expect(classes).toHaveLength(1);

        })
    })
})

