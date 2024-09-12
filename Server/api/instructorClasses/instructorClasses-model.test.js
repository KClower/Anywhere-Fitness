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

    describe("FindAll()", () => {
        beforeEach(async () => {
            await db("instructor_classes").del();
            await db("users").del();

            const { id: instructorId } = await Users.create({
                email: "test@lan.com",
                password: "test123",
                isInstructor: true
            })
            let date = new Date()
            await InstructorClasses.create({
                instructor_id: instructorId,
                class_name: "Zilker Crossfit",
                class_type_id: 3,
                intensity_id: 2,
                start_time: date.toISOString(),
                duration: 60,
                location: "Zilker Park",
                class_size: 5,
                class_capacity: 15
            });
        });
        it("Should return an array", async () => {
            const result = await InstructorClasses.findAll()
            expect(Array.isArray(result)).toBe(true)
        });
        it("Should return all fields in Instructor Classes table", async () => {
            const result = await InstructorClasses.findAll();
            expect(result).toHaveLength(1);

            const expectedFields = [
                "id", "instructor_id", "class_name", "class_type_id",
                "intensity_id", "start_time", "duration", "location",
                "class_size", "class_capacity"
            ];
            result.forEach(item => {
                expectedFields.forEach(field => {
                    expect(item).toHaveProperty(field);
                });
            });
        });
    });


    describe('Create()', () => {
        beforeEach(async () => {
            await db("instructor_classes").del();
            await db("users").del();
        });
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
                class_type_id: 3,
                intensity_id: 2,
                start_time: date.toISOString(),
                duration: 60,
                location: "Zilker Park",
                class_size: 5,
                class_capacity: 15
            });
            const classes = await db('instructor_classes');
            expect(classes).toHaveLength(1);
        })
    })

    describe("Update()", () => {

        let validId;


        beforeEach(async () => {
            await db("instructor_classes").del();
            await db("users").del();


            const { id: instructorId } = await Users.create({
                email: "test@lan.com",
                password: "test123",
                isInstructor: true
            });


            let date = new Date();
            const createdClasses = await InstructorClasses.create({
                instructor_id: instructorId,
                class_name: "Zilker Crossfit",
                class_type_id: 3,
                intensity_id: 2,
                start_time: date.toISOString(),
                duration: 60,
                location: "Zilker Park",
                class_size: 5,
                class_capacity: 15
            });


            if (Array.isArray(createdClasses)) {
                validId = createdClasses[0].newInstructorClassId;
            } else {
                validId = createdClasses.newInstructorClassId;
            }
        });

        it("Should update the record successfully", async () => {

            const updatedData = {
                class_name: "Updated Crossfit",
                class_size: 10
            };
            const instructorClass = await InstructorClasses.getInstructorClassById(validId)

            const updatedRecord = await InstructorClasses.update({ ...instructorClass, ...updatedData });




            expect(updatedRecord).toBeDefined();
            expect(updatedRecord.class_name).toBe(updatedData.class_name);
            expect(updatedRecord.class_size).toBe(updatedData.class_size);
        });

        it("Should not update non-existent records", async () => {

            const nonExistentId = "00000000-0000-0000-0000-000000000000";


            const updatedData = { class_name: "Should Not Update" };

            try {
                await InstructorClasses.update(nonExistentId, updatedData);
            } catch (error) {

                expect(error).toBeDefined();
            }


            const result = await InstructorClasses.findAll();


            expect(result).toHaveLength(1);
            expect(result[0].class_name).not.toBe(updatedData.class_name);
        });

    });

    describe('getAllClassesByInstructorId', () => {
        beforeEach(async () => {
            await db("instructor_classes").del();
            await db("users").del();
        });
        it("Should return classses for the specific instructor", async () => {
            const { id: instructorId } = await Users.create({
                email: "test@lan.com",
                password: "test123",
                isInstructor: true
            })
            let date = new Date()
            await InstructorClasses.create({
                instructor_id: instructorId,
                class_name: "Zilker Crossfit",
                class_type_id: 3,
                intensity_id: 2,
                start_time: date.toISOString(),
                duration: 60,
                location: "Zilker Park",
                class_size: 5,
                class_capacity: 15
            });
            const result = await InstructorClasses.getAllClassesByInstructorId(instructorId);
            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                instructor_id: instructorId,
                class_name: "Zilker Crossfit",
            })
        })
    })


    describe('getInstructorClassById', () => {
        let instructorId;

        beforeEach(async () => {
            await db("instructor_classes").del();
            await db("users").del();

            const { id } = await Users.create({
                email: "test@lan.com",
                password: "test123",
                isInstructor: true
            })
            instructorId = id


        })
        it("Should return classs for the given instructorClassId", async () => {
            let date = new Date()
            const { newInstructorClassId } = await InstructorClasses.create({
                instructor_id: instructorId,
                class_name: "Zilker Crossfit",
                class_type_id: 3,
                intensity_id: 2,
                start_time: date.toISOString(),
                duration: 60,
                location: "Zilker Park",
                class_size: 5,
                class_capacity: 15
            });

            const result = await InstructorClasses.getInstructorClassById(newInstructorClassId)
            expect(result.id).toBe(newInstructorClassId)
        })
    });

    describe('remove()', () => {
        let instructorId;

        beforeEach(async () => {
            await db("instructor_classes").del();
            await db("users").del();

            const { id } = await Users.create({
                email: "test@lan.com",
                password: "test123",
                isInstructor: true
            })
            instructorId = id


        })
        it("Should delete class by instructorClasId", async () => {
            let date = new Date()
            const { newInstructorClassId } = await InstructorClasses.create({
                instructor_id: instructorId,
                class_name: "Zilker Crossfit",
                class_type_id: 3,
                intensity_id: 2,
                start_time: date.toISOString(),
                duration: 60,
                location: "Zilker Park",
                class_size: 5,
                class_capacity: 15
            });

            const result = await InstructorClasses.remove(newInstructorClassId)
            expect(result.id).toBe(newInstructorClassId)
        })
    });
})