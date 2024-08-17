import { useFormik } from "formik";
import * as Yup from "yup";

export type FormValues = {
  successes: number;
  trials: number;
  successProbabilityNumerator: number;
  successProbabilityDenominator: number;
};

type DropProbabilityForm = {
  onSubmit: (values: FormValues) => void;
};

const SumForm = ({ onSubmit }: DropProbabilityForm) => {
  const initialValues = {
    successes: 0,
    trials: 0,
    successProbabilityNumerator: 0,
    successProbabilityDenominator: 1,
  };

  const validationSchema = Yup.object({
    successes: Yup.number().integer().required("Required").min(0),
    trials: Yup.number().integer().required("Required").min(0),
    successProbabilityNumerator: Yup.number()
      .integer()
      .required("Required")
      .min(0),
    successProbabilityDenominator: Yup.number()
      .integer()
      .required("Required")
      .min(1),
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
          <label htmlFor="successProbabilityNumerator">drop chance</label>
          <input
            id="successProbabilityNumerator"
            name="successProbabilityNumerator"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.successProbabilityNumerator}
          />{" "}
          /{" "}
          <input
            id="successProbabilityDenominator"
            name="successProbabilityDenominator"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.successProbabilityDenominator}
          />
          {formik.errors.successProbabilityNumerator && (
            <div>{formik.errors.successProbabilityNumerator}</div>
          )}
          {formik.errors.successProbabilityDenominator && (
            <div>{formik.errors.successProbabilityDenominator}</div>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SumForm;
