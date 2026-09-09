import * as Yup from "yup";

export function initialValues() {
    return {
        email: "",
        repeatEmail: "",
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .trim()
            .email("Ingresa un correo electrónico válido")
            .required("Ingresa el nuevo correo electrónico"),

        repeatEmail: Yup.string()
            .trim()
            .email("Ingresa un correo electrónico válido")
            .required("Repite el nuevo correo electrónico")
            .oneOf([Yup.ref("email")], "Los correos electrónicos no coinciden"),
    });
}
