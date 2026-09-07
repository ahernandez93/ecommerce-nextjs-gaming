import * as Yup from "yup";

export function initialValues() {
    return {
        email: "",
        username: "",
        // firstName: "",
        password: "",
    };
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .trim()
            .email("Introduce un correo electrónico válido")
            .required("El correo electrónico es obligatorio"),

        username: Yup.string()
            .trim()
            .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
            .required("El nombre de usuario es obligatorio"),

        /* firstName: Yup.string()
            .trim()
            .min(2, "Introduce tu nombre y apellidos")
            .required("El nombre y los apellidos son obligatorios"), */

        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La contraseña es obligatoria"),
    });
}
