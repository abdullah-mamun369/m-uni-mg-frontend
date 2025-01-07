import { Button } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);

    const formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    console.log(Object.fromEntries(formData));
  };
  return (
    <PHForm onSubmit={onSubmit}>
      <PHInput type="text" label="First Name" name="firstName" />
      <PHInput type="text" label="Middle Name" name="midName" />
      <PHInput type="text" label="Last Name" name="lastName" />
      <Button htmlType="submit">Submit</Button>
    </PHForm>
  );
};

export default CreateStudent;
