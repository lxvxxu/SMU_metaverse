// 메인로비 Script
// 제작자: 공간환경학부 202210133 이채원

// 변수를 자바스크립트 문법에 맞게 생성
let mycat_sp = null;

//// q 키를 누르면 동작하는 함수
//// 한 번 누르면 화면의 줌 값이 커지고, 한 번 더 누르면 원래대로 돌아오는 키 함수 
//// App.addOnKeyDown 설명
//App.addOnKeyDown(81, function (p) {
//	if (App.displayRatio == 1) {
//		App.displayRatio = 0.3;
//	} else {
//		App.displayRatio = 1;
//	}
//	App.sendUpdated(); //* 앱의 Field값이 변경되면 App.sendUpdated()로 변경값을 적용
//})

//// showName 값을 바꾸는 키 함수
//App.addOnKeyDown(49, function (p) {
//	if (App.showName) {
//		App.showName = false;
//	} else {
//		App.showName = true;
//	}
//	App.sayToAll(`App.showName: ${App.showName}`)
//	App.sendUpdated(); //* 앱의 Field값이 변경되면 App.sendUpdated()로 변경값을 적용
//})

//App.onJoinPlayer.Add(function (player) {

//		if (App.storage == null) {
//			App.setStorage(JSON.stringify({ count: 0 }))
//		}
//})

//// 플레이어끼리 부딪힐 때 실행
//App.onPlayerTouched.Add(function (sender, target, x, y) {
//	App.showCenterLabel(
//		`${sender.name}님과 ${target.name}님이 좌표: (${x}, ${y}) 에서 부딪혔습니다.`
//	);
//});

// 변수에 SpriteSheet를 읽어 저장
mycat_sp = App.loadSpritesheet('Cat.png', 48, 48, {
	left: [6, 7, 8, 9, 10, 11], // left 라는 이미 정해진 왼쪽 방향으로 걸을 때의 애니메이션 이름
	up: [0, 1, 2, 3, 4, 5], // 그 이름에 쓰일 전체 파일에서의 인덱스 넘버들
	down: [6, 7, 8, 9, 10, 11],
	right: [0, 1, 2, 3, 4, 5],
}, 8); // 1초에 8장으로 한다.

//play.sprite = mycat_sp.sprite.image('')

App.onJoinPlayer.Add(function (player) {

	// 플레이어가 입장할 때 실행
	//App.sayToAll(`${player.name}님이 입장하셨습니다.`, 0x00ffff); // 하늘색으로 표시하기

	// player.showCenterLabel(`${player.name}님 환영합니다.`, 0x000000, 0xFFFF00, 500, 2000); // 노란색 배경, 검정색 글씨로 표시하기
	// 플레이어를 "test"라는 이름의 지정영역으로 왼쪽 방향을 바라보게 소환하기
	//player.spawnAtLocation("test", 2); //  왼쪽 : 1      위쪽 : 2        오른쪽 : 3     아래쪽 : 4  왼쪽위: 5   왼쪽아래: 6   오른쪽위: 7  오른쪽아래: 8

	//player.moveSpeed = 200 // 스피드 조작

	player.sendUpdated();
});

App.onSay.Add(function (player, text) {
    //let message2 = player.name + '님.' + text + '(이)라고 하셨나요? 조용히 하세요.';
    // App.showCenterLabel(message2);

	if (text == '야옹~') {
		App.sayToAll(`${player.name}님이 상냥해지셨습니다. 🐈`, 0x00ffff); // 하늘색으로 표시하기
		player.title = "상냥한";
        player.sprite = mycat_sp;
	    player.moveSpeed = 200 // 스피드 조작
	}
    player.sendUpdated();
}
)

let button_image = App.loadSpritesheet("고양이 버튼.png");
let button;

App.onStart.Add(function () {
	// button 추가
	button = App.addMobileButton(8, 145, 75, function (player) {
		//App.sayToAll(`${player.name}, 님이 🐈버튼을 눌렀습니다.`)
		App.sayToAll(`📱 야옹~`); // 하늘색으로 표시하기
		App.sayToAll(`${player.name}님이 상냥해지셨습니다. 🐈`, 0x00ffff); // 하늘색으로 표시하기
		player.title = "상냥한";
		player.moveSpeed = 200 // 스피드 조작	
		player.sprite = mycat_sp;
		player.sendUpdated();
	});

	button.image = button_image;
	button.sendUpdated();
});

