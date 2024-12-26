import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemisterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);

  console.log(data);

  return <h1>This is Academic Semester</h1>;
};

export default AcademicSemester;
