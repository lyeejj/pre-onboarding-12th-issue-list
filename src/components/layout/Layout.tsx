import React from 'react';
import { API_INFO } from '../../utils/constants';

type LayoutProps = {
	children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
	const OWNER = API_INFO.OWNER;
	const REPO = API_INFO.REPO;
	return (
		<div>
			<header>
				<h1>
					{OWNER} / {REPO}
				</h1>
			</header>
			<main>{children}</main>
		</div>
	);
}
export default Layout;
