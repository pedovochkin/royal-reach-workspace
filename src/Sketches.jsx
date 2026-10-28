import React from 'react';

export function ConversationSketch() {
  return <div className="conversation-sketch" aria-hidden="true">
    <svg viewBox="0 0 330 290" fill="none">
      <g stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M39 45c41-10 101-12 160-5l-3 76-42 1-29 23 3-22-84 3Z" fill="#fff8e9" transform="rotate(-7 120 80)" />
        <path d="M46 49c47-9 104-10 149-5M48 124l76-5" strokeWidth=".7" opacity=".5" />
        <path d="M114 158c49-9 106-7 163 2l-2 78-29-5 5 23-32-26-107-3Z" fill="#f6e376" transform="rotate(5 195 200)" />
        <path d="M120 164c54-7 105-5 151 3" strokeWidth=".7" opacity=".5" />
        <path d="M226 71c39 8 56 32 44 66m-11-12 11 16 14-15" />
        <path d="M72 225c-40-8-55-29-46-56m-10 9 11-13 7 15" />
        <path d="m269 30 4 16m-12-8 20 1m-6-10-10 16" />
        <path d="m48 256-3 17m-6-10 18 4m-14-14 9 20" />
        <path d="M232 258c-20 9-42 10-68 7" strokeWidth="1.3" />
        <path d="M58 88c28-3 54-5 85-3M59 97l57-2" strokeWidth="1" opacity=".35" />
      </g>
      <text x="58" y="76" transform="rotate(-7 58 76)" className="sketch-type">А что, если…</text>
      <text x="133" y="194" transform="rotate(5 133 194)" className="sketch-type">Давайте</text>
      <text x="130" y="219" transform="rotate(5 130 219)" className="sketch-type">обсудим!</text>
      <text x="140" y="284" className="sketch-caption">сначала — услышать</text>
      <circle cx="289" cy="96" r="4" fill="currentColor" />
      <circle cx="83" cy="207" r="2" fill="currentColor" />
    </svg>
  </div>;
}

export function RouteSketch({ completed, current }) {
  const nodes = [{x:48,y:226},{x:117,y:168},{x:195,y:115},{x:271,y:53}];
  return <div className="route-sketch" aria-hidden="true"><svg viewBox="0 0 330 280" fill="none">
    <path d="M37 242c-5-58 22-29 56-49s-26-35 22-51 29 11 54-13-10-37 33-39 67-4 67-42" stroke="currentColor" strokeWidth="2" strokeDasharray="5 6" />
    {nodes.map((n,i) => <g key={i} transform={`translate(${n.x} ${n.y}) rotate(${i%2 ? 6 : -7})`}>
      <path d="M-25-24c15-5 42-4 51 3 5 11 4 38-2 45-12 6-38 7-49-1-5-13-6-35 0-47Z" fill={completed.includes(i) ? '#ff825c' : current === i ? '#f6e376' : '#fff9e9'} stroke="#292b37" strokeWidth="1.8" />
      {completed.includes(i) ? <path d="m-11 1 8 9 17-23" stroke="#292b37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /> : <text y="9" textAnchor="middle" className="route-number">{i+1}</text>}
    </g>)}
    <path d="m286 14 4 14m-11-5 20-3m-17-10 12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <text x="27" y="56" className="route-note" transform="rotate(-8 27 56)">Шаг за шагом.</text>
    <text x="27" y="84" className="route-note" transform="rotate(-8 27 84)">Каждый день.</text>
    <path d="M153 233c28 18 61 10 73-24m-11 3 13-9 3 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg></div>;
}
