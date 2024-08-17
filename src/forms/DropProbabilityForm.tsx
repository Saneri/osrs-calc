import { useFormik } from "formik";
import * as Yup from "yup";

export type FormValues = {
  successes: number;
  trials: number;
  successProbability: number;
};

type DropProbabilityForm = {
  onSubmit: (values: FormValues) => void;
};

const SumForm = ({ onSubmit }: DropProbabilityForm) => {
  const initialValues = {
    successes: 0,
    trials: 0,
    successProbability: 0,
  };

  const validationSchema = Yup.object({
    successes: Yup.number().required("Required").min(0),
    trials: Yup.number().required("Required").min(0),
    successProbability: Yup.number().required("Required").min(0).max(1),
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
          <label htmlFor="successes">Successes</label>
          <input
            id="successes"
            name="successes"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.successes}
          />
          {formik.errors.successes && <div>{formik.errors.successes}</div>}
        </div>
        <div>
          <label htmlFor="trials">Trials</label>
          <input
            id="trials"
            name="trials"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.trials}
          />
          {formik.errors.trials && <div>{formik.errors.trials}</div>}
        </div>
        <div>
          <label htmlFor="successProbability">Success Probability</label>
          <input
            id="successProbability"
            name="successProbability"
            type="number"
            step="0.01"
            onChange={formik.handleChange}
            value={formik.values.successProbability}
          />
          {formik.errors.successProbability && (
            <div>{formik.errors.successProbability}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SumForm;
