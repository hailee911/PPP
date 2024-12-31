// 서버에서 가족 구성원 데이터를 받아옵니다.
fetch('/get_family_members/')
.then(response => response.json())
.then(data => {
		// 가족 구성원 이름을 동적으로 추가
		const familyMembersContainer = document.getElementById('family-members');
		data.forEach(member => {
				const div = document.createElement('div');
				div.classList.add('person-name');
				div.textContent = member.name;
				div.onclick = () => loadEmotionGraph(member.id);  // 이름 클릭 시 감정 그래프 로드
				familyMembersContainer.appendChild(div);
		});
})
.catch(error => console.error('Error fetching family members:', error));

// 클릭된 가족 구성원의 감정 그래프를 로드하는 함수
function loadEmotionGraph(memberId) {
fetch(`/get_emotion_graph/${memberId}/`)  // 서버에서 감정 데이터 요청
		.then(response => response.json())
		.then(data => {
				drawEmotionGraph(data);
		})
		.catch(error => console.error('Error fetching emotion data:', error));
}

// 감정 그래프를 그리는 함수 (D3.js 활용)
function drawEmotionGraph(data) {
const graphContainer = document.getElementById('emotion-graph');
graphContainer.innerHTML = '';  // 기존 그래프 내용 초기화

const width = 500, height = 300;
const svg = d3.select(graphContainer)
		.append("svg")
		.attr("width", width)
		.attr("height", height);

// 그래프 데이터를 기반으로 차트 생성
const xScale = d3.scaleBand().domain(data.map(d => d.date)).range([0, width]).padding(0.1);
const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([height, 0]);

svg.selectAll(".bar")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", d => xScale(d.date))
		.attr("y", d => yScale(d.value))
		.attr("width", xScale.bandwidth())
		.attr("height", d => height - yScale(d.value))
		.attr("fill", "#344BFD");

svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xScale));

svg.append("g")
		.call(d3.axisLeft(yScale));
}