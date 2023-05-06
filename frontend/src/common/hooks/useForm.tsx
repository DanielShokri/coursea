import { useState, useCallback } from "react";
import { ZodObject } from "zod";

interface Values {
  [key: string]: any;
}

interface Errors {
  [key: string]: string | undefined;
}

interface Props<T extends Values> {
  initialValues: T;
  schema: ZodObject<any>;
  onSubmit: (values: T) => void;
}

const useForm = <T extends Values>(props: Props<T>) => {
  const { initialValues, schema, onSubmit } = props;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    },
    [values]
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validatedData = schema.safeParse(values);
      setIsSubmitting(true);
      setErrors({});
      if (!validatedData.success) {
        const errors: { [key: string]: any } = {};
        for (const error of validatedData.error?.issues) {
          errors[error.path[0]] = error;
        }
        return setErrors(errors);
      } else {
        await onSubmit(values);
        setIsSubmitting(false);
      }
    },
    [values, errors, onSubmit, schema]
  );

  const resetForm = useCallback(
    () => setValues(initialValues),
    [initialValues]
  );

  const setValue = useCallback((key: keyof T, value: T[keyof T]) => {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setValue,
  };
};

export default useForm;
