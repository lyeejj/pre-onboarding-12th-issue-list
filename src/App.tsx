import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import Spinner from './components/layout/Spinner';

const IssueList = lazy(() => import('./pages/IssueList'));
const IssueDetail = lazy(() => import('./pages/IssueDetail'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
	return (
		<Layout>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<IssueList />} />
					<Route path="/issue/:issue_number" element={<IssueDetail />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</Layout>
	);
}
export default App;
