// 서버에서 가족 구성원 데이터를 받아옵니다.
fetch('/main/get_family_members/')
.then(response => response.json())
.then(data => {
    // 가족 구성원 이름을 동적으로 추가
    const familyMembersContainer = document.getElementById('family-members');
    data.forEach((member, index) => {
        const div = document.createElement('div');
        div.classList.add('person-name');
        div.textContent = member.name;
        div.onclick = () => {
            // 선택된 구성원의 감정 그래프 로드
            loadEmotionGraph(member.id);
            
            // 모든 이름 글씨를 기본 상태로 설정
            const allMembers = document.querySelectorAll('.person-name');
            allMembers.forEach(item => {
                item.style.fontWeight = 'normal';  // 기본 글씨 두께로 설정
                item.style.color = '#999';  // 기본 글씨 두께로 설정
            });
            
            // 선택된 구성원 글씨를 bold로 설정
            div.style.fontWeight = 'bold';
            div.style.color = 'black';
        };

        familyMembersContainer.appendChild(div);

        // 첫 번째로 내 감정 그래프 자동 로드
        if (index === 0) {
					loadEmotionGraph(member.id);  // 페이지 로드 시 첫 번째로 감정 그래프 자동 로드
					div.style.fontWeight = 'bold';  // 내 이름을 첫 번째로 표시하며 글씨를 bold로 설정
					div.style.color = 'black';  // 내 이름의 글씨 색상을 black으로 설정
				} else {
						div.style.fontWeight = 'normal';  // 나머지 이름은 기본 글씨 두께
						div.style.color = '#999';  // 나머지 이름은 기본 글씨 색상
				}
    });
})
.catch(error => console.error('Error fetching family members:', error));


// 감정 그래프를 그리는 함수 (D3.js 활용)
function drawBarChart({ selector, data, barColor, lineColor, useLabels = false, customYScale = false, barBottomPadding = -30 }) {
	const container = document.querySelector(selector);
	const padding = 30;
	const commonHeight = 348; // 그래프 높이
	const svg = d3.select(container).select("svg");

	svg.selectAll("*").remove();

	const width = container.offsetWidth;
	svg.attr("width", width).attr("height", commonHeight);

	const xScale = d3.scaleBand()
									.rangeRound([padding, width - padding])
									.padding(0.5)
									.domain(data.map(d => d.name));

	const yMax = customYScale ? 100 : 100;
	const yScale = d3.scaleLinear()
									.domain([0, yMax])
									.range([commonHeight - padding - 20 + barBottomPadding, padding]);  // 그래프가 상단으로 오게

	const xAxis = d3.axisBottom(xScale).tickSize(0);
	svg.append("g")
			.attr("transform", `translate(0,${commonHeight - padding + barBottomPadding})`)  // barBottomPadding 반영
			.call(xAxis);

	svg.selectAll(".tick text")
			.each(function (d) {
					if (useLabels) {
							const datum = data.find(item => item.name === d);
							const text = d3.select(this);
							text.text("");
							text.append("tspan")
									.text(datum.name)
									.attr("x", 0)
									.attr("dy", "0em")
									.attr("class", "value-text")
									.style("font-size", "15px")
									.style("font-weight", "normal");
							text.append("tspan")
									.text(datum.label)
									.attr("x", 0)
									.attr("dy", "1.2em")
									.style("font-size", "16px")
									.style("font-weight", "bold");
					}
			})
			.attr("transform", "translate(0, 5)");

	svg.selectAll("path.domain").remove();

	// 막대 그리기
	svg.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", d => xScale(d.name))
			.attr("y", d => d.value > 0 ? yScale(d.value) : yScale(0))  // 0 값 처리
			.attr("width", xScale.bandwidth())
			.attr("height", d => d.value > 0 ? Math.max(yScale(0) - yScale(d.value), 0) : 0)  // 0값 처리, 아래로 길어지지 않도록 수정
			.attr("fill", barColor)
			.attr("rx", 15)
			.attr("ry", 15);

	// 라인 그리기
	if (lineColor) {
			const line = d3.line()
					.x(d => xScale(d.name) + xScale.bandwidth() / 2)
					.y(d => yScale(d.value));

			svg.append("path")
					.datum(data)
					.attr("fill", "none")
					.attr("stroke", lineColor)
					.attr("stroke-width", 1)
					.attr("d", line);
	}
}

// 감정 그래프를 그리는 함수 (D3.js 활용)
function loadEmotionGraph(memberId) {
    const graphContainer = document.getElementById('emotion-graph'); // 그래프를 렌더링할 div
    fetch(`/main/get_emotion_graph/${memberId}/`)  // 서버에서 감정 데이터 요청
        .then(response => response.json())
        .then(data => {
            // 그래프 컨테이너 초기화
            graphContainer.innerHTML = '<svg></svg>';
            drawBarChart({
                selector: "#emotion-graph",
                data: data,
                barColor: "#7D7D7D",
                lineColor: "#001DFF", // 원하는 라인 색상
                useLabels: true,
                customYScale: true
            });
        })
        .catch(error => console.error('Error fetching emotion data:', error));
}
