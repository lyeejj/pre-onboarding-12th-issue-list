import React from 'react';
import { useEffect, useState } from 'react';
import { getIssueList } from '../api/api';
import { IssueListType } from '../utils/types/issueList.interface';
import Spinner from '../components/layout/Spinner';

function IssueList() {
	const [list, setList] = useState<IssueListType[]>([]);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getIssueList(pageNumber).then((issues: any) => {
			setList(issues);
			setLoading(false);
		});
	}, [pageNumber]);

	// eslint-disable-next-line no-unused-vars
	const loadMore = () => {
		setPageNumber(prev => prev + 1);
	};

	if (loading) return <Spinner />;

	return (
		<>
			<ul>
				{list.map(item => (
					<li>
						<div>
							<h2>
								<span>#{item.number}</span> {item.title}
							</h2>
							<span>
								작성자 : {item.user.login}, 작성일 : {item.created_at}
							</span>
						</div>
						<span>댓글수 : {item.comments} </span>
					</li>
				))}
			</ul>
		</>
	);
}
export default IssueList;
