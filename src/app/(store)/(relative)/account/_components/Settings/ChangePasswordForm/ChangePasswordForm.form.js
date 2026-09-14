import * as Yup from "yup";

export function initialValues() {
    return {
        // currentPassword: "",
        password: "",
        passwordConfirmation: "",
    };
}

export function validationSchema() {
    return Yup.object({
        // currentPassword: Yup.string().required("Ingresa tu contraseña actual"),

        password: Yup.string()
            .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
            .required("Ingresa la nueva contraseña"),

        passwordConfirmation: Yup.string()
            .required("Repite la nueva contraseña")
            .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    });
}
