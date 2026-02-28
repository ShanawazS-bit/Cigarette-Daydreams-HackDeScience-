import type { Report, Issue } from './types';

function getGrade(s: number) {
  return s>=90?'A':s>=80?'B+':s>=70?'B':s>=60?'C+':s>=50?'C':s>=40?'D':'F';
}
function detectLang(code: string) {
  if (/def |import |print\(|elif /.test(code))             return { language:'Python',     confidence:93 };
  if (/public\s+class|System\.out|void\s+main/.test(code)) return { language:'Java',       confidence:96 };
  if (/#include|std::|printf\(|->/.test(code))             return { language:'C/C++',      confidence:91 };
  if (/function|const |let |var |=>/.test(code))           return { language:'JavaScript', confidence:97 };
  return { language:'Unknown', confidence:40 };
}

export function analyzeCode(code: string): Report {
  const { language, confidence } = detectLang(code);
  const lines = code.split('\n');
  const bugs: Issue[] = [], lint: Issue[] = [], security: Issue[] = [];

  lines.forEach((line, idx) => {
    const n = idx + 1;
    if (/eval\s*\(/.test(line))
      security.push({ line:n, severity:'critical', msg:'Unsafe eval() detected', fix:'Use JSON.parse() or a safe parser' });
    if (/['"]\s*(SELECT|INSERT|UPDATE|DELETE).*\+/.test(line))
      security.push({ line:n, severity:'critical', msg:'SQL Injection via string concat', fix:'Use parameterized queries' });
    if (/(password|secret)\s*=\s*['"][^'"]{4,}['"]/i.test(line))
      security.push({ line:n, severity:'high', msg:'Hardcoded password detected', fix:'Move to environment variables' });
    if (/(api[_-]?key|token)\s*=\s*['"][^'"]{8,}['"]/i.test(line))
      security.push({ line:n, severity:'critical', msg:'Hardcoded API key detected', fix:'Use process.env.API_KEY' });
    if (/<=\s*\w+\.length/.test(line))
      bugs.push({ line:n, severity:'error', msg:'Off-by-one: loop uses <= length', fix:'Change <= to <' });
    if (/null\./.test(line))
      bugs.push({ line:n, severity:'error', msg:'Null dereference detected', fix:'Add null check before access' });
    if (/if\s*\(\s*true\s*\)/.test(line))
      bugs.push({ line:n, severity:'warning', msg:'Redundant if(true) condition', fix:'Remove or use real condition' });
    if (/^\s*var\s/.test(line))
      lint.push({ line:n, severity:'warning', msg:'Use const/let instead of var', fix:'Replace var with const or let' });
    if (/!=\s*null/.test(line) && !/!==/.test(line))
      lint.push({ line:n, severity:'info', msg:'Use !== instead of !=', fix:'Strict equality check' });
  });

  const fnMatches = [...code.matchAll(/function\s+(\w+)\s*\(/g)];
  fnMatches.forEach(m => {
    const calls = (code.match(new RegExp(`\\b${m[1]}\\s*\\(`, 'g')) || []).length;
    if (calls <= 1) lint.push({ severity:'info', msg:`Possibly unused: ${m[1]}()`, fix:'Remove or export if unused' });
  });

  let max=0, cur=0;
  for (const ch of code) { if(ch==='{'){cur++;max=Math.max(max,cur);}if(ch==='}')cur--; }
  if (max > 3) bugs.push({ severity:'warning', msg:`Deep nesting (${max} levels)`, fix:'Refactor with early returns' });

  const complexity = fnMatches.map(m => {
    const body = code.slice(m.index??0,(m.index??0)+600);
    const c = 1+(body.match(/\bif\b|\bfor\b|\bwhile\b|\bcase\b|\bcatch\b/g)||[]).length;
    return { fn:m[1], complexity:c, lines:Math.min(body.split('\n').length,40), status:(c>=7?'high':c>=4?'medium':'ok') as 'ok'|'medium'|'high' };
  });

  const penalty =
    security.filter(i=>i.severity==='critical').length*18 +
    security.filter(i=>i.severity==='high').length*10 +
    bugs.filter(i=>i.severity==='error').length*8 +
    bugs.filter(i=>i.severity==='warning').length*4 +
    lint.length*2;

  const score = Math.max(0,Math.min(100,100-penalty));
  return { language, confidence, score, grade:getGrade(score), bugs, lint, security, complexity };
}