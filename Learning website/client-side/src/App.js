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
import Cart from './Pages/Cart';
import AdminPanelHome from './Pages/AdminPanelHome';
import AdminPanelUserList from './Pages/AdminPanelUserList';
import AdminPanelEducatorList from './Pages/AdminPanelEducatorList';
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
      <Route path='/chapter/:courseId/:chapterId' element={< ChapterPage/>}/>
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
      <Route path='/user/cart' element={< Cart/>}/>
      <Route path='/adminpanel' element={< AdminPanelHome/>}/>
      <Route path='/adminpanel/userlist' element={< AdminPanelUserList/>}/>
      <Route path='/adminpanel/educatorlist' element={< AdminPanelEducatorList/>}/>
     </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
