// load sprite
let face = App.loadSpritesheet('face.png', 48, 43, [0], 16);

// load sprite
let tomb = App.loadSpritesheet('tomb.png', 32, 48, {
    left: [0],  // defined base anim 
    right: [0], // defined base anim 
    up: [0],    // defined base anim 
    down: [0],  // defined base anim 
});

const STATE_INIT = 3000;
const STATE_READY = 3001;
const STATE_PLAYING = 3002;
const STATE_JUDGE = 3004;
const STATE_END = 3005;

let _level = 1;
let _levelTimer = 15;
let _levelAddTimer = 0;

let _start = false;
let _timer = 90;

let _face = [];
let _stateTimer = 0;

let _genTime = 0;
let _dropTime = 0;

let _live = 0;

let _players = App.players; // App.players : get total players

function startApp()
{
    _start = true;
    _stateTimer = 0;
    _genTime = 0;
    _dropTime = 0;
    _timer = 90;

    for(let i in _players) {
        let p = _players[i];
         // create and utilize option data using tags.
        p.tag = {
            alive : true,
        };
    }
}

function startState(state)
{
    _state = state;
    _stateTImer = 0;
    switch(_state)
    {
        case STATE_INIT:
            startApp();
            break;
        case STATE_READY:
            break;
        case STATE_PLAYING:
            // Show Label
            App.showCenterLabel("게임 시작!");
            break;
        case STATE_JUDGE:
            for(let i in _face) {
                let b = _face[i];
                Map.putObject(b[0], b[1], null);
            }
            break;
        case STATE_END:
            _start = false;
            for(let i in _players) {
                let p = _players[i];
                p.sprite = null;
                p.moveSpeed = 80;
                p.sendUpdated();
            }
            break;
    }
}

function checkSuvivors() {
    if(!_start)
        return;

    let alive = 0;
    for(let i in _players) {
        let p = _players[i];
        if(!p.sprite) {
            lastSurvivor = p;
            ++alive;
        }
    }

    return alive;
}

App.onStart.Add(function() {
    startState(STATE_INIT);
});

// when player join the space event
// 플레이어가 스페이스에 입장 했을 때 이벤트
App.onJoinPlayer.Add(function(p) {
    // create and utilize option data using tags.
    if(_start)
    {
        p.tag = {
            alive : false,
        };

        // change move speed
        p.moveSpeed = 20;
        // change sprite image
        p.sprite = tomb;
        // when player property changed have to call this method
        // 플레이어 속성 변경 시 반드시 호출하여 업데이트 한다.
        p.sendUpdated();
    }
    _players = App.players;
});

// when player leave the space event
// 플레이어가 스페이스를 나갔을 때 이벤트
App.onLeavePlayer.Add(function(p) {
    p.title = null;
    p.sprite = null;
    p.moveSpeed = 80;
    p.sendUpdated();

    _players = App.players; // App.players : get total players
});

// when player touched objects event
// 플레이어가 오브젝트와 부딪혔을 때 
App.onObjectTouched.Add(function(sender, x, y, tileID) {
    if(!_start)
        return;

    if(!sender.tag.alive)
        return;

    sender.tag.alive = false;
    sender.sprite = tomb;
    sender.moveSpeed = 40;
    sender.sendUpdated();

    _live = checkSuvivors();

    if(_live == 1 || _live == 0)
    {
        startState(STATE_JUDGE);
    }
    else
    {
        if(_stateTimer >= 1)
        {   
            _stateTimer = 0;
            _timer--;
            if(_timer <= 0)
            {
                startState(STATE_JUDGE);
            }
        }
    }
});

// when the game block is pressed event
// 게임 블록을 밟았을 때 호출되는 이벤트
App.onDestroy.Add(function() {
    for (let i in _face) {
        let b = _face[i];
        Map.putObject(b[0], b[1], null);
    }
});

// called every 20ms
// 20ms 마다 호출되는 업데이트
// param1 : deltatime ( elapsedTime )
App.onUpdate.Add(function(dt) {
    if(!_start)
        return;

    _stateTimer += dt;
    switch(_state)
    {
        case STATE_INIT:
            App.showCenterLabel(``);

            if(_stateTimer >= 5)
            {
                startState(STATE_READY);
            }
            break;
        case STATE_READY:
            App.showCenterLabel(`게임이 곧 시작됩니다.`);

            if(_stateTimer >= 3)
            {
                startState(STATE_PLAYING);
            }
            break;
        case STATE_PLAYING:
            _genTime -= dt;
            if(_genTime <= 0) {
                _genTime = Math.random() * (0.5 - (_level * 0.05));
                
                let b = [Math.floor(Map.width * Math.random()),-1];

                _face.push(b);
                if(b[1] >= 0)
                    Map.putObject(b[0], b[1], face, {
                        overlap: true,
                    });
            }

            _dropTime -= dt;
            if(_dropTime <= 0) {
                _dropTime = Math.random() * (0.5 - (_level * 0.08));
                
                for(let i in _face) {
                    let b = _face[i];
                    Map.putObject(b[0], b[1], null);
            
                    b[1]++;
                    if(b[1] < Map.height) {
                        Map.putObject(b[0], b[1], face, {
                            overlap: true,
                        });
                    }
                }

                for(let k = _face.length - 1;k >= 0;--k) {
                    let b = _face[k];
                    if(b[1] >= Map.height)
                        _face.splice(k, 1);
                }
            }

            _levelAddTimer += dt;
            if(_levelAddTimer >= _levelTimer)
            {
                _level++;
                _levelAddTimer = 0;

                if(_level > 6)
                {
                    _level = 6;
                }
            }
            break;
        case STATE_JUDGE:
            if(_live == 1)
            {
                App.showCenterLabel(`승자는 ${lastSurvivor.name}! 다들 축하해주세요~ 🎉🎉`);
            }
            else if(_live == 0)
            {
                App.showCenterLabel(`아무도 살아남지 못했어요 😏 다음 게임 땐 분발해보도록 해요~`);
            }
            else
            {
                App.showCenterLabel(`최종 승자는 ` + _live + '명입니다! 축하드려요👍💨');
            }

            if(_stateTimer >= 5)
            {
                startState(STATE_END);
            }
            break;
        case STATE_END:
            break;
    }
});
