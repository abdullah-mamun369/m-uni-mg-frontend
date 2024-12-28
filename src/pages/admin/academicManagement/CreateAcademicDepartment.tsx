/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { academicDepartmentsOptions } from "../../../constants/academicDepartment";
import { TAcademicDepartment } from "../../../types/academicManagement.type";
import { TResponse } from "../../../types";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicFacultysOptions } from "../../../constants/academicFaculty";

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: academicFaculty } = useGetAcademicFacultiesQuery(undefined);

  const facultyList = academicFaculty?.data || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Department");

    try {
      if (!facultyList.length) {
        throw new Error("No academic faculties available");
      }

      const academicFacultyName = data.academicFaculty;

      const academicFacultyId = facultyList.find(
        (faculty) => faculty.name === academicFacultyName
      )?._id;

      if (!academicFacultyId) {
        throw new Error("Academic Faculty ID not found");
      }

      const departmentData = {
        name: data.name,
        academicFaculty: academicFacultyId, // Use the resolved ID here
      };

      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHSelect
            label="Name of Department"
            name="name"
            options={academicDepartmentsOptions}
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultysOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
