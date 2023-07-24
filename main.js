"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var musicMetadata = require("music-metadata-browser");
var sound_list = [];
var context = new AudioContext();
var gainNode = context.createGain();
gainNode.connect(context.destination);
var source = null;
var sound = null;
var startTime = 0;
var mus_id = 0;
var file_dom = document.getElementById("file");
var loading_dom = document.getElementById("loading");
file_dom.onchange = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blob, fileBufferArray, metadata, loopStart, loopLength, loopEnd, loopStartITag, loopLengthITag, loopEndITag, decodedBufferArray, new_snd, tr, td, inp, td, td, td, td, td, but;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                loading_dom.innerHTML = "loading...";
                file_dom.disabled = true;
                _b.label = 1;
            case 1:
                _b.trys.push([1, , 5, 6]);
                if (!file_dom.files)
                    return [2 /*return*/];
                blob = file_dom.files[0];
                return [4 /*yield*/, blob.arrayBuffer()];
            case 2:
                fileBufferArray = _b.sent();
                return [4 /*yield*/, musicMetadata.parseBlob(blob)];
            case 3:
                metadata = _b.sent();
                // console.log(blob);
                // console.log(metadata);
                if (metadata == null || metadata.native == null || metadata.format == null || metadata.format.sampleRate == null) {
                    alert("failed to read audio data.");
                    return [2 /*return*/];
                }
                loopStart = null;
                loopLength = null;
                loopEnd = null;
                if (metadata.native.vorbis != null) {
                    loopStartITag = metadata.native.vorbis.find(function (v) { return v.id.toUpperCase() === "LOOPSTART"; });
                    loopLengthITag = metadata.native.vorbis.find(function (v) { return v.id.toUpperCase() === "LOOPLENGTH"; });
                    loopEndITag = metadata.native.vorbis.find(function (v) { return v.id.toUpperCase() === "LOOPEND"; });
                    if (loopStartITag !== undefined)
                        loopStart = Number(loopStartITag.value);
                    if (loopLengthITag !== undefined)
                        loopLength = Number(loopLengthITag.value);
                    if (loopEndITag !== undefined)
                        loopEnd = Number(loopEndITag.value);
                    if (loopEnd == null && loopStart != null && loopLength != null)
                        loopEnd = loopStart + loopLength;
                    if (loopLength == null && loopStart != null && loopEnd != null)
                        loopLength = loopEnd - loopStart;
                }
                return [4 /*yield*/, context.decodeAudioData(fileBufferArray)];
            case 4:
                decodedBufferArray = _b.sent();
                new_snd = {
                    file: blob,
                    metadata: metadata,
                    loopStart: loopStart,
                    loopLength: loopLength,
                    loopEnd: loopEnd,
                    //??と?は違う動きをする
                    title: metadata.common.title ? metadata.common.title : blob.name,
                    artist: metadata.common.artist,
                    arrayBuffer: decodedBufferArray,
                    id: mus_id++,
                };
                sound_list.push(new_snd);
                tr = document.createElement("tr");
                {
                    td = document.createElement("td");
                    inp = document.createElement("input");
                    inp.type = "radio";
                    inp.name = "selected";
                    inp.value = String(new_snd.id);
                    td.appendChild(inp);
                    tr.appendChild(td);
                }
                {
                    td = document.createElement("td");
                    td.innerText = new_snd.title;
                    tr.appendChild(td);
                }
                {
                    td = document.createElement("td");
                    td.innerText = getFormattedTimeStr(new_snd.metadata.format.duration);
                    tr.appendChild(td);
                }
                {
                    td = document.createElement("td");
                    td.innerText = (new_snd.loopStart && new_snd.loopEnd) ? "Loop" : "";
                    tr.appendChild(td);
                }
                {
                    td = document.createElement("td");
                    td.innerText = (_a = new_snd.artist) !== null && _a !== void 0 ? _a : "";
                    tr.appendChild(td);
                }
                {
                    td = document.createElement("td");
                    but = document.createElement("button");
                    but.innerText = "Remove";
                    but.name = "Remove";
                    but.value = String(new_snd.id);
                    but.addEventListener('click', remove_list);
                    td.appendChild(but);
                    tr.appendChild(td);
                }
                document.getElementById("tbody").appendChild(tr);
                return [3 /*break*/, 6];
            case 5:
                file_dom.disabled = false;
                loading_dom.innerHTML = "";
                return [7 /*endfinally*/];
            case 6: return [2 /*return*/];
        }
    });
}); };
var play_dom = document.getElementById("button-play");
play_dom.onclick = function () {
    var selected = -1;
    var elements = document.getElementsByName("selected");
    for (var i = 0; i < elements.length; i++) {
        if (elements.item(i).checked) {
            selected = Number(elements.item(i).value);
            break;
        }
    }
    if (selected === -1) {
        alert("not selected");
        return;
    }
    sound = sound_list.find(function (snd) { return snd.id == selected; });
    if (!sound) {
        alert("file not found");
        return;
    }
    playStop();
    playStart(0);
    if (!source) {
        alert("internal error (source is undefined)");
        return;
    }
    if (context.state === "suspended") {
        context.resume();
    }
    var title_dom = document.getElementById("sound-title");
    if (title_dom)
        title_dom.innerHTML = "Title:" + sound.title + (sound.artist ? " / " + sound.artist : "");
    var loop_range_dom = document.getElementById("sound-loop-range");
    if (loop_range_dom)
        loop_range_dom.innerHTML = "LoopRange:" + getFormattedTimeStr(source.loopStart) + "-" + getFormattedTimeStr(source.loopEnd);
};
var pause_dom = document.getElementById("button-pause");
pause_dom.onclick = function () {
    if (context.state === "suspended") {
        context.resume();
    }
    else {
        context.suspend();
    }
};
var stop_dom = document.getElementById("button-stop");
stop_dom.onclick = function () {
    playStop();
};
var volume_dom = document.getElementById("range-volume");
volume_dom.oninput = function () {
    gainNode.gain.value = Number(volume_dom.value);
};
var seekbar_dom = document.getElementById("seekbar");
seekbar_dom.onmouseup = function (e) {
    if (!source || !sound)
        return;
    var canvas = seekbar_dom;
    var rect = e.target.getBoundingClientRect();
    var x = Math.max(Math.min(e.clientX - rect.left, canvas.width - 5), 5) - 5;
    var ratio = x / (canvas.width - 10);
    var offset = ratio * sound.metadata.format.duration;
    playStop();
    playStart(offset);
};
function playStart(offset) {
    if (!sound)
        return;
    source = context.createBufferSource();
    source.connect(gainNode);
    source.buffer = sound.arrayBuffer;
    source.start(0, offset);
    startTime = context.currentTime - offset;
    source.loop = true;
    if (sound.loopStart !== null && sound.loopEnd !== null) {
        source.loopStart = sound.loopStart / sound.metadata.format.sampleRate;
        source.loopEnd = sound.loopEnd / sound.metadata.format.sampleRate;
        if (offset >= source.loopEnd)
            source.loop = false;
    }
}
function playStop() {
    if (source) {
        source.stop(0);
        source.disconnect();
        source = null;
    }
}
function drawCall() {
    var canvas = document.getElementById("seekbar");
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(230, 230, 230)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(5, 5, canvas.width - 10, canvas.height - 10);
    if (source && sound) {
        if (sound.loopStart !== null && sound.loopEnd !== null && sound.loopLength !== null) {
            ctx.fillStyle = 'rgb(54, 132, 228)';
            ctx.fillRect((canvas.width - 10) * (sound.loopStart / sound.metadata.format.numberOfSamples) + 5, 5, (canvas.width - 10) * (sound.loopLength / sound.metadata.format.numberOfSamples), canvas.height - 10);
        }
        var current = getCurrentTime();
        var cr = ((current / sound.metadata.format.duration) * (canvas.width - 10));
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(cr, 0, 10, canvas.height);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(cr + 1, 1, 8, canvas.height - 2);
    }
}
function getFormattedTimeStr(time) {
    var hour = Math.floor(time / 3600);
    var min = Math.floor((time / 60) % 60);
    var sec = Math.floor(time % 60);
    var mili = Math.floor(time * 100) % 100;
    return (("0" + hour).slice(-2)) + ":" + (("0" + min).slice(-2)) + ":" + (("0" + sec).slice(-2)) + "." + (("0" + mili).slice(-2));
}
function getCurrentTime() {
    if (!sound || !source)
        return 0;
    var current = context.currentTime - startTime;
    if (sound.loopStart !== null && sound.loopEnd !== null && sound.loopLength !== null && source.loop === true) {
        var endTime = (sound.loopEnd / sound.metadata.format.sampleRate);
        while (current > endTime)
            current = current - (sound.loopLength / sound.metadata.format.sampleRate);
    }
    else if (source.loop === true) {
        var endTime = sound.metadata.format.duration;
        while (current > endTime)
            current = current - endTime;
    }
    else {
        current = Math.min(current, sound.metadata.format.duration);
    }
    return current;
}
function updateCurrentTime() {
    if (source) {
        var dom = document.getElementById("sound-current-time");
        if (dom) {
            dom.innerHTML = "CurrentTime:" + getFormattedTimeStr(getCurrentTime());
        }
    }
}
function remove_list(e) {
    sound_list = sound_list.filter(function (snd) { return snd.id != Number(e.target.value); });
    var tbl = document.getElementById("tbody");
    for (var i = 0; i < tbl.children.length; i++) {
        if (tbl.children[i].children[0].children[0].value == e.target.value) {
            tbl.deleteRow(i);
            break;
        }
    }
    // console.log(sound_list);
}
setInterval(drawCall, 50);
setInterval(updateCurrentTime, 100);
