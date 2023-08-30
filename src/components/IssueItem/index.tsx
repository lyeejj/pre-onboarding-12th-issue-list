import React from 'react';
import { IssueListType } from '../../utils/types/issueList.interface';
import { useNavigate } from 'react-router-dom';

function IssueItem({ item }: { item: IssueListType }) {
	const navigate = useNavigate();
	const showIssueDetail = (issue_number: number) => {
		navigate(`/issue/${issue_number}`);
	};
	return (
		<>
			<li
				key={item.number}
				onClick={() => {
					showIssueDetail(item.number);
				}}
			>
				<div>
					<h2>
						<span>#{item.number}</span> {item.title}
					</h2>
					<span>
						작성자: {item.user.login}, 작성일: {item.created_at}
					</span>
				</div>
				<span>댓글수: {item.comments}</span>
			</li>
		</>
	);
}
export default IssueItem;
