/* The MAIN component. Starting structure of web UI.
 * Also handle routing urls to components!
 */

import { LocationProvider, Router, Route, ErrorBoundary } from 'preact-iso';

import Home from './routes/home';
import NavBar from "./components/nav-bar"
import NotFound from './404';
import Blog from './routes/blog/blog';
import Post from './routes/blog/post';
import About from './routes/about';
import Oular from './routes/oular/oular';
import Projects from './routes/projects';
import Footer from './components/footer';

export default function App() {
	return (        
		<LocationProvider>
			<ErrorBoundary>
				{/* this NavBar will render first on every page */}
				<NavBar/>

				<Router>
					<Route path="/" component={Home} />
					<Route path="/blog" component={Blog} />
					{/* path segment match posts */}
					<Route path="/blog/:id" component={Post} />
					<Route path="/about" component={About} />
					<Route path="/oular" component={Oular} />
					<Route path="/projects" component={Projects} />
					<Route default component={NotFound} />
				</Router>

				<Footer/>
			</ErrorBoundary>
		</LocationProvider>
	);
}
