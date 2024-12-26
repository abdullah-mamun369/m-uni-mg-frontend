import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button } from "antd";
import PHSelect from "../../../components/form/PHSelect";

const CreateAcademicSemeste = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <PHForm onSubmit={onSubmit}>
      <PHInput type="text" name="year" label="Year" />
      <PHSelect
        label="Name"
        name="name"
        options={[{ value: "1", label: "1st Semester", disabled: false }]}
      />
      ;<Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default CreateAcademicSemeste;
