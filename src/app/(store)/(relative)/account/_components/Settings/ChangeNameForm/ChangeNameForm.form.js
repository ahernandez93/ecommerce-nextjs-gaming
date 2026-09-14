import * as Yup from "yup";

export function initialValues(firstname, lastname) {
    return {
        firstname,
        lastname,
    };
}

export function validationSchema() {
    return Yup.object({
        firstname: Yup.string()
            .trim()
            .max(50, "El nombre es demasiado largo")
            .required("Ingresa tu nombre"),

        lastname: Yup.string()
            .trim()
            .max(80, "Los apellidos son demasiado largos")
            .required("Ingresa tus apellidos"),
    });
}
