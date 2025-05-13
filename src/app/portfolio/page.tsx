const PortfolioPDF = () => {
  return (
    <div id="pdf-template" className="w-full bg-white p-6 border border-gray-200 shadow-lg">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold">이혜린</h2>
          <p className="text-gray-600">프론트엔드 개발자</p>
          <p className="text-blue-600">sitree.com/mypage</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">건국대학교 시각영상디자인학과</p>
          <p className="text-gray-600">du.duck.917@gmail.com</p>
          <p className="text-gray-600">010-8689-1254</p>
        </div>
      </div>

      <div className="mt-6 bg-white-100">
        <h3 className="text-xl font-bold">프로젝트 3</h3>

        <div className="mt-4">
          <h4 className="font-bold text-lg">토스증권 - 금융 데이터 시각화 대시보드 디자인</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>
              복잡한 금융 데이터를 한눈에 이해할 수 있도록 정보 계층화 및 시각적 우선순위 정립
            </li>
            <li>사용자 흐름 분석을 기반으로 인터랙션 설계, 데이터 탐색 시간 단축</li>
            <li>AI 추천 모델 결과를 신뢰도 기반으로 가시화하여 사용자의 이해도 증가</li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-bold text-lg">뉴닉 - AI 기반 맞춤형 뉴스 큐레이션 앱</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>추천 시스템 UX 연구를 통해 사용자 신뢰를 높이는 UI 패턴 도출</li>
            <li>사용자 피드백을 반영해 카드형 vs 리스트형 UI 테스트 및 최적화</li>
            <li>AI 모델 오작동 케이스 대비 사용자 컨트롤 기능 (필터링, 피드백) 추가</li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-bold text-lg">아임웹 - 소규모 비즈니스 맞춤형 웹사이트 빌더</h4>
          <ul className="list-disc pl-5 text-gray-700">
            <li>비기술 사용자도 쉽게 웹사이트를 제작할 수 있도록 모듈형 UI 구성</li>
            <li>템플릿 기반 UX 전략 수립으로 제작 시간 및 학습 부담 감소</li>
            <li>UI 직관성을 높이기 위해 온보딩 및 실시간 미리보기 기능 설계</li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">기술 스택 00</h3>
        <p className="text-gray-700">{`{Tech Name}, ReactJS, {Tech Name}, Typescript, {Tech Name}, {Tech Name}, Javascript`}</p>
      </div>
    </div>
  );
};

export default PortfolioPDF;
