import React, { useEffect, useState, useRef } from 'react';
import { getIssueList } from '../api/api';
import { IssueListType } from '../utils/types/issueList.interface';
import Spinner from '../components/layout/Spinner';
import IssueItem from '../components/IssueItem';
import { useNavigate } from 'react-router-dom';

function IssueList() {
	const [list, setList] = useState<IssueListType[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const navigate = useNavigate();

	const observerRef = useRef<any>(null);

	useEffect(() => {
		getIssueList(pageNumber)
			.then((issues: any) => {
				setList(prevList => [...prevList, ...issues]);
				setLoading(false);
			})
			.catch(error => {
				navigate('/error');
			});
	}, [pageNumber, navigate]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				if (entries[0].isIntersecting) {
					setPageNumber(prev => prev + 1);
				}
			},
			{ threshold: 1 },
		);
		if (observerRef.current) {
			observer.observe(observerRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [list]);

	if (loading) return <Spinner />;

	return (
		<>
			<ul>
				{list.map(item => (
					<IssueItem item={item} key={item.id} />
				))}
			</ul>
			<div ref={observerRef} style={{ height: '10px' }} />
		</>
	);
}

export default IssueList;
