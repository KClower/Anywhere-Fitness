import * as yup from "yup";







const formSchema = yup.object().shape({
    classType: yup.string().required("Class type is required"),
    className: yup.string().required("Class name is required").min(3),
    intensity: yup.string().required("Intensity level is required"),
    startTime: yup.date()
        .required("Start time is required")
        .typeError("Start time must be a valid date"),

    duration: yup.number().required("Duration is required")
        .positive("Duration must be a positive amount")
        .test(
            'is-multiple-of-30',
            'Duration must be a multiple of 30',
            value => value % 30 === 0)
        .max(120),
    location: yup.string().required("Location is required"),
    price: yup.number().required("Price is required")
        .positive("Price must be a positive amount").test(
            'is-decimal',
            'Price must have at most 2 decimal places',
            value => value && /^\d+(\.\d{1,2})?$/.test(value)
        )
        .min(10)
        .max(40),
    classCapacity: yup.number()
        .required("Class capacity is required")
        .positive()
        .min(1)
        .max(20)
})


export const validateForm = (e) => {
    let value = e.target.value;

    // If the field is 'startTime', convert the value to ISO format
    if (e.target.name === 'startTime') {
        const date = new Date(value);
        if (!isNaN(date)) {  // Ensure the date is valid
            value = date.toISOString(); // Convert to ISO format
        }
    }
    return yup.reach(formSchema, e.target.name).validate(e.target.value)

};


export const handleInputChange = (e) => {
    console.log("input change", e.target.value)

    let value = e.target.value;
    const numericField = [
        "classType",
        "intensity"

    ]
    if (e.target.name === "startTime") {
        value = new Date(e.target.value).toISOString()
    }
    if (numericField.includes(e.target.name)) {
        value = new Number(e.target.value)
    }
    return value
};



