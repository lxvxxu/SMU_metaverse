const STATE_INIT = 3000;
const STATE_READY = 3001;
const STATE_PLAYING = 3002;
const STATE_JUDGE = 3004;
const STATE_END = 3005;

const WORD_LINES = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

let WORDS = [];

let _state = STATE_INIT;
let _stateTimer = 0;
let _timer = 0;
let _choanswer = '';
let _answer = '';
let _start = false;
let _widget = null; // using for contents UI
let _players = App.player;
let _result = '';

let _myQ = '';
    
function StrToNum() {
    // + - / % 루트, 제곱(승수), !
    // -(- ), * + 

    let nth = Math.floor(Math.random() * 4); // 0~1 사이 랜덤값 * n
    let n1 = Math.floor(Math.random() * WORD_LINES.length); // 0~1 사이 랜덤값 * n
    let n2 = Math.floor(Math.random() * WORD_LINES.length); // 0~1 사이 랜덤값 * n
    let n3 = Math.floor(Math.random() * WORD_LINES.length); // 0~1 사이 랜덤값 * n
    let n4 = Math.floor(Math.random() * WORD_LINES.length); // 0~1 사이 랜덤값 * n

    // App.showCenterLabel("Hello sparta")
    // player.title = "초사이어인"// 2. 캐릭터 타이틀 바꾸기 + 랜덤하게
    //player.title = my_title[nth];

    if (nth == 0) {
        result = WORD_LINES[n1] + WORD_LINES[n2] + WORD_LINES[n3];
        _myQ = WORD_LINES[n1] + '+' +WORD_LINES[n2] + '+' + WORD_LINES[n3];
    }
    else if (nth == 1) {
        result = WORD_LINES[n1] - WORD_LINES[n2] + WORD_LINES[n3];
        _myQ = WORD_LINES[n1] + '-' + +WORD_LINES[n2] + '+' + WORD_LINES[n3];;
    }
    else if (nth == 2) {
        result = WORD_LINES[n1] * WORD_LINES[n2] + WORD_LINES[n3];
        _myQ = WORD_LINES[n1] + '*' + +WORD_LINES[n2] + '+' + WORD_LINES[n3];;
    }
    else if (nth == 3) {
        result = WORD_LINES[n1] / WORD_LINES[n2] * WORD_LINES[n3];
        _myQ = WORD_LINES[n1] + '/' + +WORD_LINES[n2] + '*' + WORD_LINES[n3];;
    }
    else if (nth == 4) {
        result = WORD_LINES[n1] * WORD_LINES[n2] * WORD_LINES[n3];
        _myQ = WORD_LINES[n1] + '*' + +WORD_LINES[n2] + '*' + WORD_LINES[n3];;
    }

    //result = eval(str);
    result = Math.round(result); // 계산된 값을 소수점 첫째 자리에서 반올림
    return result;
}

App.onStart.Add(function(){
    startState(STATE_INIT);
});

// when chatting event
// 채팅을 치면 호출되는 이벤트
// player : person who chatted
// text : chat text
// return : enter chatting box
// return false or true : not appear in chatting box
App.onSay.add(function(player, text) {
    if(_state == STATE_PLAYING)
    {
        if(_answer == text)
        {
            _result = player.name + '님 정답!\n정답은 ' + _answer + '였습니다 >___<';

            startState(STATE_JUDGE);
        }
    }
});

function startState(state) {
    _state = state;
    _stateTimer = 0;

    switch(_state)
    {
        case STATE_INIT:
            if(_widget)
            {
                _widget.destroy();
                _widget = null;
            }
            _timer = 60;

            _answer = StrToNum();
            _choanswer = _answer;
    
            // called html UI
            // param1 : file name
            // param2 : position 
            // [ top, topleft, topright, middle, middleleft, middleright, bottom, bottomleft, bottomright, popup ]
            // param3 : width size
            // param4 : height size
            _widget = App.showWidget('widget.html', 'top', 200, 300);
            
            _widget.sendMessage({
                state: _state,
                timer: _timer,
                answer: _myQ,
                //answer: _choanswer,
            });

            startState(STATE_READY);
            break;
        case STATE_READY:
            _start = true;
            startState(STATE_PLAYING);
            break;
        case STATE_PLAYING:
            App.showCenterLabel('누구보다 빠르게 계산하세요!! 🤩 (소수의 경우 소수점 첫째 자리에서 반올림하여 입력해주세요!)',0xFFFFFF, 0x000000, 115);
            _widget.sendMessage({
                state: _state,
                timer: _timer,
                answer: _myQ,
                //answer: _choanswer,
            });
            break;
        case STATE_JUDGE:
            break;
        case STATE_END:
            if(_widget)
            {
                _widget.destroy();
                _widget = null; // must to do for using again
            }

            _start = false;
            break;
    }
}

App.onLeavePlayer.Add(function(p) {
    p.title = null;
    p.sprite = null;
    p.moveSpeed = 80;
    p.sendUpdated();
});

App.onDestroy.Add(function() {
    _start = false;
    
    if(_widget)
    {
        _widget.destroy();
        _widget = null;
    }
});

App.onUpdate.Add(function(dt) {
    if(!_start)
        return;

    _stateTimer += dt;

    switch(_state)
    {
        case STATE_INIT:
            break;
        case STATE_READY:
            _start = true;
            break;
        case STATE_PLAYING:
            if(_stateTimer >= 1)
            {
                _stateTimer = 0;
                _timer -= 1;
            }

            if(_timer == 0)
            {
                _result = '아무도 정답을 못맞췄네요ㅉㅉ; ' + '정답은 ' + _answer + ' 입니다.';
                startState(STATE_JUDGE);
            }
            break;
        case STATE_JUDGE:
            App.showCenterLabel(_result, 0xFFFFFF, 0x000000, 115);

            if(_stateTimer >= 3)
                startState(STATE_END);
            break;
        case STATE_END:
            break;
    }
});
