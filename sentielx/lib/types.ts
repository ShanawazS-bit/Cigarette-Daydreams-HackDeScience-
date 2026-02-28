export interface Issue {
  line?:    number;
  col?:     number;
  severity: 'critical' | 'high' | 'error' | 'warning' | 'info' | 'ok';
  msg:      string;
  fix:      string;
}

export interface FunctionComplexity {
  fn:         string;
  complexity: number;
  lines:      number;
  status:     'ok' | 'medium' | 'high';
}

export interface Report {
  language:   string;
  confidence: number;
  score:      number;
  grade:      string;
  bugs:       Issue[];
  lint:       Issue[];
  security:   Issue[];
  complexity: FunctionComplexity[];
}