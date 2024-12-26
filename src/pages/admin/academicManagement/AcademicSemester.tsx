import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagementApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);

  console.log(data);

  return <h1>This is Academic Semester</h1>;
};

export default AcademicSemester;
