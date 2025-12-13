import { useState } from "react";

/**
 * useForm hook
 * @param {Object} options
 * @param {Object} options.initialValues - valores iniciales del formulario
 * @param {Object} options.validations - funciones de validación por campo
 */
export function useForm({ initialValues, validations = {} }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };

      if (validations[name]) {
        const error = validations[name](value, newValues);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error || "",
        }));
      }

      return newValues;
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    Object.keys(validations).forEach((key) => {
      const value = values[key];
      const error = validations[key]?.(value, values);

      if (error) {
        valid = false;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const isFormValid = () => {
    return Object.values(errors).every((error) => !error);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    setValues,
    handleChange,
    validateForm,
    isFormValid,
    resetForm,
  };
}
