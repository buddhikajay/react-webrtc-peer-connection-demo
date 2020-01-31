import { isSrflx } from './WebRTCUtils';

test('Filter host candidates', ()=>{
  const hostCandidate = {
    candidate: '3022624816 1 udp 2122260223 192.168.1.4 53325 typ host generation 0 ufrag BdGq network-id 1 network-cost 10'
  }
  expect(isSrflx(hostCandidate)).toEqual(false);
})

test('Filter relay candidates', ()=>{
  const hostCandidate = {
    candidate: '3022624816 1 udp 2122260223 192.168.1.4 53325 typ relay generation 0 ufrag BdGq network-id 1 network-cost 10'
  }
  expect(isSrflx(hostCandidate)).toEqual(false);
})


test('Accept srflx candidates', ()=>{
  const srflxCandidate = {
    candidate: '494278629 1 udp 1686052607 194.193.131.110 57856 typ srflx raddr 192.168.1.4 rport 57856 generation 0 ufrag lWmB network-id 1 network-cost 10'
  }
  expect(isSrflx(srflxCandidate)).toEqual(true);
})