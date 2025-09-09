// main.js for Correlating Branch Prediction Experiment
// Merged from sim/simulation.js and React logic from Experiment2.jsx
// Provides interactive simulation for correlating branch predictor

// --- Branch Trace Generation ---
function generateBranchTrace(code) {
  // Parses assembly, simulates execution, and generates branch traces
  const lines = code
    .split(/\n+/)
    .map(l => l.trim())
    .filter(Boolean);

  const registers = Array(10).fill(0);
  const labelMap = {};
  const program = [];
  const branchColors = [
    '#ff6b6b','#4ecdc4','#45b7d1','#96ceb4',
    '#feca57','#ff9ff3','#54a0ff','#5f27cd'
  ];
  const branchColorMap = {};
  let branchIdCounter = 0;

  // First pass: build labelMap and assign branch IDs
  lines.forEach(line => {
    const m = line.match(/^(\w+):/);
    let instr = line;
    if (m) {
      labelMap[m[1]] = program.length;
      const rest = line.replace(/^(\w+):/, '').trim();
      if (!rest) return;
      instr = rest;
    }
    const op = instr.split(/[ ,]+/)[0].toUpperCase();
    if (op === 'BEQ' || op === 'BNE') {
      branchColorMap[program.length] = {
        color: branchColors[branchIdCounter % branchColors.length],
        id: branchIdCounter++
      };
    }
    program.push(instr);
  });

  // Colorize program for display
  let idx = 0;
  let coloredProgramHTML = '';
  lines.forEach(line => {
    const m = line.match(/^(\w+):/);
    let disp = line;
    if (m) {
      const rest = line.replace(/^(\w+):/, '').trim();
      if (rest) {
        const op = rest.split(/[ ,]+/)[0].toUpperCase();
        if (op === 'BEQ' || op === 'BNE') {
          const info = branchColorMap[idx];
          disp = `${m[0]} <span class="branch-highlight" style="background:${info.color};color:#fff">${rest}</span>`;
        }
        idx++;
      }
    } else {
      const op = line.split(/[ ,]+/)[0].toUpperCase();
      if (op === 'BEQ' || op === 'BNE') {
        const info = branchColorMap[idx];
        disp = `<span class="branch-highlight" style="background:${info.color};color:#fff">${line}</span>`;
      }
      idx++;
    }
    coloredProgramHTML += disp + '\n';
  });

  // Execute program
  let pc = 0;
  const output = [];
  let safety = 10000;
  while (pc < program.length && safety-- > 0) {
    const parts = program[pc].split(/[ ,]+/);
    const op = parts[0].toUpperCase();

    switch(op) {
      case 'MOV': {
        const rd = +parts[1].slice(1);
        const imm = parseInt(parts[2], 10);
        registers[rd] = imm;
        pc++;
        break;
      }
      case 'ADD': {
        const rd = +parts[1].slice(1),
              rs1 = +parts[2].slice(1),
              rs2 = +parts[3].slice(1);
        registers[rd] = registers[rs1] + registers[rs2];
        pc++;
        break;
      }
      case 'SUB': {
        const rd = +parts[1].slice(1),
              rs1 = +parts[2].slice(1),
              rs2 = +parts[3].slice(1);
        registers[rd] = registers[rs1] - registers[rs2];
        pc++;
        break;
      }
      case 'AND': {
        const rd = +parts[1].slice(1),
              rs1 = +parts[2].slice(1),
              rs2 = +parts[3].slice(1);
        registers[rd] = registers[rs1] & registers[rs2];
        pc++;
        break;
      }
      case 'BEQ':
      case 'BNE': {
        const r1 = +parts[1].slice(1),
              r2 = +parts[2].slice(1),
              lbl = parts[3];
        const taken = op === 'BEQ'
          ? registers[r1] === registers[r2]
          : registers[r1] !== registers[r2];
        const info = branchColorMap[pc];
        output.push(`B${info.id}:${taken ? 'T' : 'N'}`);
        pc = taken && labelMap[lbl] != null ? labelMap[lbl] : pc + 1;
        break;
      }
      default:
        // Unrecognized op: skip
        pc++;
    }
  }

  const trace = output.join(',');
  const coloredTraceHTML = output
    .map(item => {
      const idNum = +item.match(/^B(\d+)/)[1];
      const color = Object.values(branchColorMap).find(b => b.id === idNum).color;
      return `<span class="branch-highlight" style="background:${color};color:#fff">${item}</span>`;
    })
    .join(' ');

  return { trace, coloredProgramHTML, coloredTraceHTML };
}

// --- Correlating Simulation ---
function runCorrelatingSimulation(input, historyBits = 2) {
  const outcomes = input.split(',').map(x => x.trim().toUpperCase());

  // Global History Register, initialize to 0
  let history = 0;
  const HISTORY_MASK = (1 << historyBits) - 1;

  // Pattern History Table: 2^historyBits entries, init to weak NT "01"
  const phtSize = 1 << historyBits;
  const pht = Array(phtSize).fill('01');

  // Color mapping per branch ID
  const branchColors = [
    '#ff6b6b','#4ecdc4','#45b7d1','#96ceb4',
    '#feca57','#ff9ff3','#54a0ff','#5f27cd'
  ];
  const branchColorMap = {};
  let colorIdx = 0;
  outcomes.forEach(o => {
    const id = o.split(':')[0];
    if (!branchColorMap[id]) {
      branchColorMap[id] = branchColors[colorIdx++ % branchColors.length];
    }
  });

  let correct = 0;
  const rows = outcomes.map((o, i) => {
    const [id, actual] = o.split(':');

    // Read counter from PHT using global history
    const counterBefore = parseInt(pht[history], 2);
    const prediction = counterBefore >= 2 ? 'T' : 'N';
    const match = prediction === actual;
    if (match) correct++;

    // Update counter (saturating)
    let counterAfter = counterBefore;
    if (actual === 'T') {
      counterAfter = Math.min(counterBefore + 1, 3);
    } else {
      counterAfter = Math.max(counterBefore - 1, 0);
    }
    pht[history] = counterAfter.toString(2).padStart(2, '0');

    // Shift in the actual outcome bit
    history = ((history << 1) | (actual === 'T' ? 1 : 0)) & HISTORY_MASK;

    return {
      step: i + 1,
      id,
      actual,
      prediction,
      correct: match,
      stateBefore: counterBefore.toString(2).padStart(2, '0'),
      stateAfter: counterAfter.toString(2).padStart(2, '0'),
      color: branchColorMap[id]
    };
  });

  const summaryText = `Accuracy: ${correct}/${outcomes.length} = ${((100 * correct) / outcomes.length).toFixed(2)}%`;
  return { rows, summaryText };
}

// --- UI Logic ---
document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const programInput = document.getElementById('programInput');
  const generateBtn = document.getElementById('generateBtn');
  const clearBtn = document.getElementById('clearBtn');
  const coloredProgramDiv = document.getElementById('coloredProgram');
  const coloredTraceDiv = document.getElementById('coloredTrace');
  const sequenceInput = document.getElementById('sequenceInput');
  const historyBitsSelect = document.getElementById('historyBits');
  const runBtn = document.getElementById('runBtn');
  const resultsTable = document.getElementById('resultsTable');
  const summaryDiv = document.getElementById('summary');
  const resetBtn = document.getElementById('resetBtn');

  // Generate Trace
  generateBtn.addEventListener('click', function() {
    const code = programInput.value;
    if (!code.trim()) {
      alert('Please enter assembly code first.');
      return;
    }
    
    generateBtn.classList.add('is-loading');
    
    setTimeout(() => {
      try {
        const { trace, coloredProgramHTML, coloredTraceHTML } = generateBranchTrace(code);
        coloredProgramDiv.innerHTML = '<strong>Highlighted Program:</strong><br>' + coloredProgramHTML.replace(/\n/g, '<br>');
        coloredTraceDiv.innerHTML = '<strong>Generated Trace:</strong><br>' + coloredTraceHTML;
        sequenceInput.value = trace;
        generateBtn.classList.remove('is-loading');
      } catch (error) {
        alert('Error generating trace: ' + error.message);
        generateBtn.classList.remove('is-loading');
      }
    }, 100);
  });

  // Clear button
  clearBtn.addEventListener('click', function() {
    programInput.value = '';
    coloredProgramDiv.innerHTML = '';
    coloredTraceDiv.innerHTML = '';
    sequenceInput.value = '';
  });

  // Run Simulation
  runBtn.addEventListener('click', function() {
    const sequence = sequenceInput.value;
    const historyBits = parseInt(historyBitsSelect.value, 10);
    
    if (!sequence.trim()) {
      alert('Please enter a branch sequence first.');
      return;
    }
    
    runBtn.classList.add('is-loading');
    
    setTimeout(() => {
      try {
        const { rows, summaryText } = runCorrelatingSimulation(sequence, historyBits);
        
        // Render table
        let html = `
          <thead>
            <tr>
              <th>Step</th>
              <th>Branch</th>
              <th>Actual</th>
              <th>Predicted</th>
              <th>Correct?</th>
              <th>Counter Before</th>
              <th>Counter After</th>
            </tr>
          </thead>
          <tbody>`;
        
        rows.forEach(r => {
          html += `
            <tr>
              <td>${r.step}</td>
              <td><span class="branch-highlight" style="background:${r.color};color:#fff;padding:4px 8px;border-radius:3px;">${r.id}</span></td>
              <td>${r.actual}</td>
              <td>${r.prediction}</td>
              <td style="color:${r.correct ? 'green' : 'red'};font-weight:bold;">${r.correct ? 'Yes' : 'No'}</td>
              <td>${r.stateBefore}</td>
              <td>${r.stateAfter}</td>
            </tr>`;
        });
        
        html += '</tbody>';
        resultsTable.innerHTML = html;
        
        summaryDiv.textContent = summaryText;
        summaryDiv.style.display = 'block';
        
        runBtn.classList.remove('is-loading');
      } catch (error) {
        alert('Error running simulation: ' + error.message);
        runBtn.classList.remove('is-loading');
      }
    }, 100);
  });

  // Reset All
  resetBtn.addEventListener('click', function() {
    programInput.value = '';
    coloredProgramDiv.innerHTML = '';
    coloredTraceDiv.innerHTML = '';
    sequenceInput.value = '';
    resultsTable.innerHTML = '';
    summaryDiv.style.display = 'none';
    historyBitsSelect.value = '2';
  });
});

// --- Example Loader ---
function loadExample(code) {
  document.getElementById('programInput').value = code;
  // Auto-generate trace for convenience
  setTimeout(() => {
    document.getElementById('generateBtn').click();
  }, 100);
}

// --- Expose for HTML ---
window.loadExample = loadExample;