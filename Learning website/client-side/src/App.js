import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Chapters from './Pages/Chapters';
import ChapterPage from './Pages/ChapterPage';
import CoursePage from './Pages/CoursePage';
import UserProfile from './Pages/UserProfile';
import ProviderProfile from './Pages/ProviderProfile';
import AddCourse from './Pages/AddCourse';
import FetchCoursesProvider from './Pages/FetchCoursesProvider';
import ProviderCourseMainPage from './Pages/ProviderCourseMainPage';
import ProviderChapters from './Pages/ProviderChapters';
import ProviderChapterMain from './Pages/ProviderChapterMain';
import AddChapter from './Pages/AddChapter';
import UpdateCourse from './Pages/UpdateCourse';
import UpdateChapter from './Pages/UpdateChapter';
function App() {
  return (
    <>
    <BrowserRouter >
     <Routes>
      <Route path='/home' element={< Home/>}/>
      <Route path='/' element={< Home/>}/>
      <Route path='/register' element={< Register/>}/>
      <Route path='/login' element={< Login/>}/>
      <Route path='/chapters/:courseId' element={< Chapters/>}/>
      <Route path='/chapter/:chapterId' element={< ChapterPage/>}/>
      <Route path='/course/:courseId' element={< CoursePage/>}/>
      <Route path='/user/profile' element={< UserProfile/>}/>
      <Route path='/educator/profile' element={< ProviderProfile/>}/>
      <Route path='/educator/AddCourse' element={< AddCourse/>}/>
      <Route path='/educator/fetchMyCourse' element={< FetchCoursesProvider/>}/>
      <Route path='/mycourse/:courseId' element={< ProviderCourseMainPage/>}/>
      <Route path='/mycourse/chapters/:courseId' element={< ProviderChapters/>}/>
      <Route path='/mycourse/chapter/:chapterId' element={< ProviderChapterMain/>}/>
      <Route path='/mycourse/addchapter/:courseId' element={< AddChapter/>}/>
      <Route path='/mycourse/udpatecourseinfo/:courseId' element={< UpdateCourse/>}/>
      <Route path='/mycourse/updatechapterinfo/:chapterId' element={< UpdateChapter/>}/>
     </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
