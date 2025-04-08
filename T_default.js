// 경경대 코드
// 202210133 이채원

/////////////////////////////// 변수 선언 START ///////////////////////////
// 박스 이미지 불러오기
let my_box = App.loadSpritesheet('밀관_박스.png', 90, 83, [0], 16);

// 박스 존재 유무 확인 0: 없음, 1: 있음
let box_1 = 0;
let box_2 = 0;
let box_3 = 0;
let box_4 = 0;
let box_5 = 0;
let box_6 = 0;
let box_7 = 0;
let box_8 = 0;
/////////////////////////////// 변수 선언 END ///////////////////////////

////////////////////////////// On함수 선언 START //////////////////////////////
// 캐릭터가 접속했을 때
App.onJoinPlayer.Add(function (player) {

	// App.playSound(fileName: string, loop: boolean = false, overlap: boolean = false)
	// 불러올 파일 이름, true(반복), false(1번), 겹칩 가능?
	App.playSound("딸랑.mp3", false, true);

	let my_title = ["사장", "매니저", "손님", "택배 기사", "알바", "도둑"];
	//let my_title = ["사장", "도둑"];
	let nth = Math.floor(Math.random() * my_title.length);
	//player.showCenterLabel(`${player.name}님 환영합니다.`, 0x000000, 0xFFFF00, 500, 2000); // 노란색 배경, 검정색 글씨로 표시하기

	// 랜덤 타이틀 부여
	player.title = my_title[nth];

	// 타이틀별 색상 지정
	if (nth == 0) // 사장
		player.titleColor = ColorType.RED;
	else if (nth == 1) // 매니저
		player.titleColor = ColorType.ORANGE;
	else if (nth == 2) // 손님
		player.titleColor = 0x0bf431;
	else if (nth == 3) // 택배 기사
		player.titleColor = 0xb8ab97;
	else if (nth == 4) // 알바
		player.titleColor = 0xfff370;
	else if (nth == 5) // 도둑
		player.titleColor = 0xb370ff;
	// 정보 업데이트
	player.sendUpdated();

});

//App.onStart.Add(function () {
//	//startState(STATE_INIT);
//});

//App.onUpdate.Add(function (dt, player) {
//	switch (_state) {
//		case STATE_PLAYING:
//			break;
//		case STATE_JUDEG:
//			break;
//		case STATE_END:
//			break;
//	}
//});

//// [1] 키를 누르면 동작하는 함수
//App.addOnKeyDown(49, function (player) {
//	App.sayToAll(`현재 좌표: (${player.tileX}, ${player.tileY})`);
//});

//// Z 키로 플레이어를 공격할 때 실행
//App.onUnitAttacked.Add(function (sender, x, y, target) {
//	sender.tag = {
//		attack1: 0,
//		attack2: 0,
//		attack3: 0,
//		attack4: 0,
//		attack5: 0,
//	};

//	attack1 = 0;
//	attack2 = 0;
//	attack3 = 0;
//	attack4 = 0;
//	attack5 = 0;

//	sender.sendUpdated();

//	///////////////////////// 도둑 채팅 START //////////////////////////
//	if (sender.title == "도둑") { // "사장", "매니저", "손님", "택배 기사", "알바", "도둑"
//		if (target.title == "사장") {
//			App.sayToAll(sender.tag.attack1++);
//			if (sender.tag.attack1 >= 7) {
//				App.sayToAll(`${sender.name}(도둑) : 어이 사장 ! 뭘 봐 !`);
//				sender.tag.attack1 = 0;
//			}
//		}
//		else if (target.title == "매니저") {
//			sender.tag.attack2++;
//			if (sender.tag.attack2 >= 7) {
//				App.sayToAll(`${sender.name}(도둑) : 어이 매니저 ! 뭘 봐!`);
//				sender.tag.attack2 = 0;
//			}
//		}
//		else if (target.title == "손님") {
//			sender.tag.attack3++;
//			if (sender.tag.attack3 >= 7) {
//				App.sayToAll(`${sender.name}(도둑) : 어이 ${target.name}! 뭘 봐!`);
//				sender.tag.attack3 = 0;
//			}
//		}
//		else if (target.title == "택배 기사") {
//			sender.tag.attack4++;
//			if (sender.tag.attack4 == 7) {
//				App.sayToAll(`${sender.name}(도둑) : 어이 ${target.name}! 뭘 봐 !`);
//				sender.tag.attack4 = 0;
//			}
//		}
//		else if (target.title == "알바") {
//			sender.tag.attack5++;
//			if (sender.tag.attack5 == 7) {
//				App.sayToAll(`${sender.name}(도둑) : 알바야 ! 뭘 보냐 !`);
//				sender.tag.attack5 = 0;
//			}
//		}
//		///////////////////////// 도둑 채팅 END //////////////////////////
//	}
//	//App.showCenterLabel(`${sender.name}님이 ${target.name}님을 공격했습니다.`);
//	// (${x}, ${y})
//	sender.sendUpdated();

//});

//////////////////////////////// On함수 선언 END //////////////////////////////
//// 	App.sayToAll(`도둑이 재고를 훔쳐 갔습니다.`);

//function startState(state) {
//	_state = state;
//	switch (_state) {
//		case STATE_ON1:
//			break;
//		case STATE_ON2:
//			break;
//    }
//}

//// box 1
App.addOnLocationTouched("1", function (player) {
	if (player.title == "택배 기사" || player.title == "알바") {
		App.addOnKeyDown(70, function (player) {
			if (box_1 == 0) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(6, 3, my_box);
				box_1 = 1;
			} // if box가 없으면 놓기
		}); // Q
	} // title 검사
	else if (player.title == "도둑") {
		App.addOnKeyDown(70, function (player) {
		if (box_1 == 1) {
				// 오브젝트를 삭제
				Map.putObject(6, 3, null);
				box_1 = 0;
			} // if box가 있으면 가져가기
		}); // Q

	} // title 검사
});

// box 2
App.addOnLocationTouched("2", function (player) {
	//App.showCenterLabel(`${player.name}님이 (8, 4) 좌표에 도착!`);
	if (player.title == "택배 기사" || player.title == "알바") {
		if (box_2 == 0) {
			App.addOnKeyDown(70, function (player) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(8, 3, my_box);
				box_2 = 1;
			});
	}
		if (player.title == "도둑") {
			if (box_2 == 1) {
				App.addOnKeyDown(70, function (player) {
					// 5, 5 좌표에 있는 오브젝트를 삭제
					Map.putObject(8, 3, null);
					box_2 = 0;
				});
			}
		}
	}
});

// box 3
App.addOnLocationTouched("3", function (player) {
	//App.showCenterLabel(`${player.name}님이 (8, 4) 좌표에 도착!`);
	if (player.title == "택배 기사" || player.title == "알바") {
		if (box_3 == 0) {
			App.addOnKeyDown(70, function (player) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(10, 3, my_box);
				box_3 = 1;
			});
		}
	}
	else if (player.title == "도둑") {
		if (box_3 == 1) {
			App.addOnKeyDown(70, function (player) {
				// 5, 5 좌표에 있는 오브젝트를 삭제
				Map.putObject(10, 3, null);
				box_3 = 0;
			});
		}
	}
});

// box 4
App.addOnLocationTouched("4", function (player) {
	//App.showCenterLabel(`${player.name}님이 (8, 4) 좌표에 도착!`);
	if (player.title == "택배 기사" || player.title == "알바") {
		if (box_4 == 0) {
			App.addOnKeyDown(70, function (player) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(12, 3, my_box);
				box_4 = 1;
			});
		}
	}
	else if (player.title == "도둑") {
		if (box_4 == 1) {
			App.addOnKeyDown(70, function (player) {
				// 5, 5 좌표에 있는 오브젝트를 삭제
				Map.putObject(12, 3, null);
				box_4 = 0;
			});
		}
	}
});

// box 5
App.addOnLocationTouched("5", function (player) {
	//App.showCenterLabel(`${player.name}님이 (8, 4) 좌표에 도착!`);
	if (player.title == "택배 기사" || player.title == "알바") {
		if (box_5 == 0) {
			App.addOnKeyDown(70, function (player) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(14, 3, my_box);
				box_5 = 1;
			});
		}
	}
	else if (player.title == "도둑") {
		if (box_5 == 1) {
			App.addOnKeyDown(70, function (player) {
				// 5, 5 좌표에 있는 오브젝트를 삭제
				Map.putObject(14, 3, null);
				box_5 = 0;
			});
		}
	}
});

// box 6
App.addOnLocationTouched("6", function (player) {
	//App.showCenterLabel(`${player.name}님이 (8, 4) 좌표에 도착!`);
	if (player.title == "택배 기사" || player.title == "알바") {
		if (box_6 == 0) {
			App.addOnKeyDown(70, function (player) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(16, 3, my_box);
				box_6 = 1;
			});
		}
	}
	else if (player.title == "도둑") {
		if (box_6 == 1) {
			App.addOnKeyDown(70, function (player) {
				// 5, 5 좌표에 있는 오브젝트를 삭제
				Map.putObject(16, 3, null);
				box_6 = 0;
			});
		}
	}
});

// box 7
App.addOnTileTouched(18, 4, function (player) {
	//App.showCenterLabel(`${player.name}님이 (8, 4) 좌표에 도착!`);
	if (player.title == "택배 기사" || player.title == "알바") {
		if (box_7 == 0) {
			App.addOnKeyDown(70, function (player) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(18, 3, my_box);
				box_7 = 1;
			});
		}
	}
	else if (player.title == "도둑") {
		if (box_7 == 1) {
			App.addOnKeyDown(70, function (player) {
				// 5, 5 좌표에 있는 오브젝트를 삭제
				Map.putObject(18, 3, null);
				box_7 = 0;
			});
		}
	}
});

// box 6
App.addOnTileTouched(20, 4, function (player) {
	//App.showCenterLabel(`${player.name}님이 (8, 4) 좌표에 도착!`);
	if (player.title == "택배 기사" || player.title == "알바") {
		if (box_8 == 0) {
			App.addOnKeyDown(70, function (player) {
				// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
				Map.putObject(20, 3, my_box);
				box_8 = 1;
			});
		}
	}
	else if (player.title == "도둑") {
		if (box_8 == 1) {
			App.addOnKeyDown(70, function (player) {
				// 5, 5 좌표에 있는 오브젝트를 삭제
				Map.putObject(20, 3, null);
				box_8 = 0;
			});
		}
	}
});

//App.onTriggerObject.Add(function (player, layerID, x, y) {
//	App.sayToAll(`playerName: ${player.name} / layer: ${layerID} / coordinates:(${x}, ${y})`);
//	//App.sayToAll(`Number = ${obj.text}, Value = ${obj.param1}`, 0xFFFFFF);
//	// hohyun love you

//	if (box_1 == 0) {
//		// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
//		//Map.putObject(6, 2, my_box);
//	}

//});w

//App.onObjectTouched.Add(function (sender, x, y, tileID, obj) {
//	if (obj !== null) {
//		if (obj.type == ObjectEffectType.INTERACTION_WITH_ZEPSCRIPTS) {

//			App.sayToAll(`Number = ${obj.text}, Value = ${obj.param1}`, 0xFFFFFF);
//			// hohyun love you

//	// 지정된 좌표에 오브젝트를 놓음 (기준 좌표 : Left-Top)
//			Map.putObject(21, 24, my_box);
//		}
//	} else {
//		App.sayToAll(`obj is null`, 0xFFFFFF); // yuja princess
//		//“조아 사랑해”/: 
//	}
//});
