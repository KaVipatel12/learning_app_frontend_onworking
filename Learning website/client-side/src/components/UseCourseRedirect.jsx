import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Function which takes provider info and courseId, If provider doesn't own that course then he will be redirected to other page (Another provider shouldn't access another course or any other page which is restricted to it)

const UseCourseRedirect = (Provider, courseId, direction) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (Provider && courseId) {
      if (!Provider.courses.some((item) => item === courseId)) {
        navigate(direction);
      }
    } else if(Provider && !courseId){
     navigate(direction)
    }
  }, [Provider, courseId, navigate, direction]);
};

export default UseCourseRedirect;
