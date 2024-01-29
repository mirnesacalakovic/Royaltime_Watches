import * as yup from 'yup';

export const validationShema = yup.object({
    name: yup.string().required("Name is required"),
    brand: yup.string().required("Brand is required"),
    type: yup.string().required("Type is required"),
    gender: yup.string().required("Gender is required"),
    model: yup.string().required("Model is required"),
    dialColor: yup.string().required("Dial Color is required"),
    strapType: yup.string().required("Strap Type is required"),
    price: yup.number().moreThan(100).required("Price is required"),
    quantityInStock: yup.number().required("Quantity in stock").min(0),
    description: yup.string().required("Description is required"),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: schema => schema.required('Please provide an image'),
        otherwise: schema => schema.notRequired()
    })
})