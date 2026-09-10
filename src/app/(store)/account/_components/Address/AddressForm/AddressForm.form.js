import * as Yup from "yup";

export function initialValues(address) {
    return {
        title: address?.title ?? "",
        name: address?.name ?? "",
        address: address?.address ?? "",
        state: address?.state ?? "",
        city: address?.city ?? "",
        postal_code: address?.postal_code ?? "",
        phone: address?.phone ?? "",
    };
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string()
            .trim()
            .max(50, "El título es demasiado largo")
            .required("Ingresa un título para la dirección"),

        name: Yup.string()
            .trim()
            .max(100, "El nombre es demasiado largo")
            .required("Ingresa el nombre y los apellidos"),

        address: Yup.string()
            .trim()
            .max(200, "La dirección es demasiado larga")
            .required("Ingresa la dirección"),

        state: Yup.string()
            .trim()
            .max(80, "La provincia es demasiado larga")
            .required("Ingresa la provincia o departamento"),

        city: Yup.string()
            .trim()
            .max(80, "La ciudad es demasiado larga")
            .required("Ingresa la ciudad"),

        postal_code: Yup.string()
            .trim()
            .max(12, "El código postal es demasiado largo")
            .required("Ingresa el código postal"),

        phone: Yup.string()
            .trim()
            .matches(/^[+\d][\d\s()-]{6,19}$/, "Ingresa un teléfono válido")
            .required("Ingresa el teléfono"),
    });
}
