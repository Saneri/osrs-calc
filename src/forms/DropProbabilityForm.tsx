import { useFormik } from "formik";
import * as Yup from "yup";

export type FormValues = {
  integer1: number;
  integer2: number;
};

type DropProbabilityForm = {
  onSubmit: (values: FormValues) => void;
  sum: number | null;
};

const SumForm = ({ onSubmit }: DropProbabilityForm) => {
  const initialValues = {
    integer1: 0,
    integer2: 0,
  };

  const validationSchema = Yup.object({
    integer1: Yup.number().required("Required"),
    integer2: Yup.number().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="integer1">Integer 1</label>
          <input
            id="integer1"
            name="integer1"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.integer1}
          />
          {formik.touched.integer1 && formik.errors.integer1 && (
            <div>{formik.errors.integer1}</div>
          )}
        </div>
        <div>
          <label htmlFor="integer2">Integer 2</label>
          <input
            id="integer2"
            name="integer2"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.integer2}
          />
          {formik.touched.integer2 && formik.errors.integer2 && (
            <div>{formik.errors.integer2}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SumForm;
