import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import Spinner from './components/layout/Spinner';
import './styles/reset.scss';

const IssueList = lazy(() => import('./pages/IssueList'));
const IssueDetail = lazy(() => import('./pages/IssueDetail'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

function App() {
	return (
		<Layout>
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="/" element={<IssueList />} />
					<Route path="/issue/:issue_number" element={<IssueDetail />} />
					<Route path="/error" element={<ErrorPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>
		</Layout>
	);
}
export default App;
