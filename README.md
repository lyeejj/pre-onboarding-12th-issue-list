# Issue-list Assignment

특정 Github Repository([facebook/react](https://github.com/facebook/react/issues))의 이슈목록과 상세내용을 확인하는 웹사이트

## 실행 방법

```jsx
npm install
npm start
```

## 실행 화면

<img width='680px' src='https://github.com/lyeejj/pre-onboarding-issue-list/assets/72495998/176c9c90-8a73-4d27-95e0-90fc071bdfb2' alt='과제 실행 화면' />

## 주요 기능

- 이슈 목록 및 상세 화면 기능 구현
- 데이터 요청 중 로딩 표시 및 무한스크롤 기능 구현
- 지정된 조건에 맞게 데이터 요청 및 표시 (open 상태, 코멘트 많은 순으로 정렬)
- 상세 화면에서의 markdown 변환
- 이슈 개수마다 광고 배너 표시

## 기술 스택 및 사용한 라이브러리

기술 스택 :
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=Sass&logoColor=white"/>
<img src="https://img.shields.io/badge/eslint-4B32C3?style=flat-square&logo=eslint&logoColor=white"/>
<img src="https://img.shields.io/badge/prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white"/>

추가 라이브러리 : react-router-dom, octokit, react-markdown

## 폴더 구조

```
📦src
 ┣ 📂api // Octokit을 사용한 api 관리
 ┃ ┗ 📜api.ts
 ┣ 📂components // 공통 컴포넌트 관리
 ┃ ┣ 📂AdBanner // 광고 배너 컴포넌트
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂IssueItem // 이슈 아이템 컴포넌트
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂layout // 레이아웃, 로딩스피너 컴포넌트
 ┃ ┃ ┣ 📜Layout.tsx
 ┃ ┃ ┗ 📜Spinner.tsx
 ┣ 📂pages // 페이지 관리
 ┃ ┣ 📜ErrorPage.tsx
 ┃ ┣ 📜IssueDetail.tsx
 ┃ ┣ 📜IssueList.tsx
 ┃ ┗ 📜NotFoundPage.tsx
 ┣ 📂styles // 스타일 관리
 ┃ ┣ 📜AdBanner.module.scss
 ┃ ┣ 📜IssueDetail.module.scss
 ┃ ┣ 📜IssueItem.module.scss
 ┃ ┣ 📜Layout.module.scss
 ┃ ┣ 📜Spinner.module.scss
 ┃ ┗ 📜reset.scss
 ┣ 📂types // 타입 관리
 ┃ ┗ 📜issueList.interface.ts
 ┣ 📂utils // 상수, 유틸함수 관리
 ┃ ┣ 📜constants.ts
 ┃ ┗ 📜getDate.ts
 ┣ 📜App.tsx // 라우터 관리
 ┣ 📜declaration.d.ts
 ┗ 📜index.tsx
```

## 구현 코드

### 1. API

```ts
import { Octokit } from 'octokit';
import { API_INFO } from '../utils/constants';

const octokit = new Octokit();

export const getIssueList = async (page: number) => {
	const res = await octokit.request('GET /repos/{owner}/{repo}/issues', {
		owner: API_INFO.OWNER,
		repo: API_INFO.REPO,
		state: 'open',
		sort: 'comments',
		per_page: 30,
		page,
	});
	return res.data;
};

export const getIssueDetail = async (issue_number: number) => {
	const res = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
		owner: API_INFO.OWNER,
		repo: API_INFO.REPO,
		issue_number,
	});
	return res.data;
};
```

- Github 리포지토리와 상호작용하기 위해 Octokit API 기반 비동기 통신
- getIssueList, getIssueDetail로 함수를 모듈화하여 관리

### 2. 무한 스크롤

```tsx
function IssueList() {
	// 생략...
	const observerRef = useRef<any>(null);

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
				{list.map((item, index) => (
					<Fragment key={item.id}>
						<IssueItem item={item} />
						{(index + 1) % 4 === 0 && <AdBanner />}
					</Fragment>
				))}
			</ul>
			<div ref={observerRef}>
				<Spinner scroll />
			</div>
		</>
	);
}
```

- IntersectionObserver API를 이용하여 무한 스크롤 기능 구현
- 마지막 요소가 관찰이 되었을때 필요한 다음 요청을 보내는 방식

### 3. 마크다운 표시

```tsx
import ReactMarkdown from 'react-markdown';
// 생략...
function IssueDetail() {
	const [detail, setDetail] = useState<IssueListType>();
	const [loading, setLoading] = useState<boolean>(true);
	const { issue_number } = useParams();
	const navigate = useNavigate();

	// 생략...

	return (
		<>
			{detail && (
				<>
					<div className={styles['detail-info']}>
						<img src={detail.user?.avatar_url} alt="user-avatar-img" />
						<IssueItem item={detail} key={detail.id} />
					</div>
					<div className={styles['markdown-container']}>
						<ReactMarkdown>{detail.body}</ReactMarkdown>
					</div>
				</>
			)}
		</>
	);
}
```

- react-markdown 라이브러리를 사용하여 마크다운 형식의 스타일로 변환
