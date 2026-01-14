import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import CampaignLandingPage from './components/CampaignLandingPage';
import SocialMediaPostsMain from './components/SocialMediaPostsMain';
import SocialMediaPosts from './components/SocialMediaPosts';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter basename="/SEO-Business-Plan">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/course/:courseId" element={<CampaignLandingPage />} />
        <Route path="/social-media-posts" element={<SocialMediaPostsMain />} />
        <Route path="/social-media-posts/course/:courseId" element={<SocialMediaPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
