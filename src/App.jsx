import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import CampaignLandingPage from './components/CampaignLandingPage';
import SocialMediaPostsMain from './components/SocialMediaPostsMain';
import SocialMediaPosts from './components/SocialMediaPosts';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // Use basename for production (GitHub Pages), but not for development
  const basename = import.meta.env.PROD ? '/SEO-Business-Plan' : '';
  
  return (
    <BrowserRouter basename={basename}>
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
