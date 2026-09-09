import * as Yup from "yup";

export function initialValues() {
    return {
        identifier: "",
        password: "",
    };
}

export function validationSchema() {
    return Yup.object({
        identifier: Yup.string()
            .trim()
            .required("Ingresa tu correo electrónico o nombre de usuario"),

        password: Yup.string().required("Ingresa tu contraseña"),
    });
}
