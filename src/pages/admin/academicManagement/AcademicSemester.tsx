import { useGetAllSemestersQuery } from "../../../redux/features/academicSemester/academicSemisterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);

  console.log(data);

  return <div>This is Academic Semester</div>;
};

export default AcademicSemester;
