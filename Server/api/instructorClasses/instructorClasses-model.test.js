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

        let validId; // Variable to hold a valid UUID

        // Seed the database with initial data before each test
        beforeEach(async () => {
            await db("instructor_classes").del();
            await db("users").del();

            // Create a new user with instructor role
            const { id: instructorId } = await Users.create({
                email: "test@lan.com",
                password: "test123",
                isInstructor: true
            });

            // Create a class entry
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

            // Check if create method returns an array or single object
            if (Array.isArray(createdClasses)) {
                validId = createdClasses[0].newInstructorClassId; // Assuming it returns an array of created records
            } else {
                validId = createdClasses.newInstructorClassId; // If it returns a single object
            }
        });

        it("Should update the record successfully", async () => {
            // Define the updates
            const updatedData = {
                class_name: "Updated Crossfit",
                class_size: 10
            };
            const instructorClass = await InstructorClasses.getInstructorClassById(validId)
            // Perform the update
            const updatedRecord = await InstructorClasses.update({ ...instructorClass, ...updatedData });

            // Retrieve the updated record
            // const updatedRecord = await InstructorClasses.getInstructorClassById(validId);


            // Assert the update was successful
            expect(updatedRecord).toBeDefined();
            expect(updatedRecord.class_name).toBe(updatedData.class_name);
            expect(updatedRecord.class_size).toBe(updatedData.class_size);
        });

        it("Should not update non-existent records", async () => {
            // Define an ID that doesn't exist (but still in UUID format)
            const nonExistentId = "00000000-0000-0000-0000-000000000000";

            // Attempt the update with the non-existent ID
            const updatedData = { class_name: "Should Not Update" };

            try {
                await InstructorClasses.update(nonExistentId, updatedData);
            } catch (error) {
                // Assert that an error is thrown (you may need to adjust based on your implementation)
                expect(error).toBeDefined();
            }

            // Retrieve all records
            const result = await InstructorClasses.findAll();

            // Assert no records were updated
            expect(result).toHaveLength(1);
            expect(result[0].class_name).not.toBe(updatedData.class_name);
        });

    });



})