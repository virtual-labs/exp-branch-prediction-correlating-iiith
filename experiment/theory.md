### Introduction to Branch Prediction

In modern pipelined processors, branch instructions pose a significant challenge to maintaining high instruction throughput. When a branch instruction is encountered, the processor must decide which instruction to fetch next before the branch condition is resolved. **Branch Prediction** is a critical technique that attempts to guess the outcome of branch instructions before they are actually executed, enabling the processor to continue fetching and executing instructions speculatively.

The impact of branch prediction on performance is substantial:

- Modern processors can have pipelines with 10-20+ stages
- Branch mispredictions can cause pipeline flushes, wasting 10-20+ cycles
- Branches occur frequently in programs (every 4-7 instructions on average)
- Accurate branch prediction is essential for maintaining high IPC (Instructions Per Cycle)

### Evolution of Branch Prediction

#### Simple Predictors

1. **Static Prediction**

   - Always predict taken or not-taken
   - Compiler hints can improve accuracy
   - Limited effectiveness (~60-70% accuracy)

2. **1-bit Predictor**

   - Remember the last outcome of each branch
   - Suffer from ping-pong effect in loops
   - Accuracy limited by simple state representation

3. **2-bit Saturating Counter (Bimodal)**
   - Use a 2-bit counter for each branch
   - Provides hysteresis to avoid ping-pong effect
   - Better accuracy (~80-85%) but still limited for complex patterns

### Correlating Branch Predictors

**Correlating Branch Predictors** (also known as **Two-Level Predictors**) represent a significant advancement in branch prediction technology. They are based on the key observation that the behavior of one branch is often correlated with the behavior of other recently executed branches.

#### Key Insights

1. **Branch Correlation**: The outcome of a branch often depends on the outcomes of previous branches
2. **Pattern Recognition**: Complex control flow patterns can be captured by considering branch history
3. **Context Sensitivity**: The same branch may behave differently in different execution contexts

#### Architecture of Correlating Predictors

A correlating predictor consists of two main components:

1. **Global History Register (GHR)**

   - Tracks the outcomes of the most recently executed branches
   - Typically 4-16 bits wide
   - Shifted left on each branch, with new outcome inserted at LSB
   - Provides context for prediction

2. **Pattern History Table (PHT)**
   - Array of 2-bit saturating counters
   - Indexed by the global history register
   - Each entry predicts taken/not-taken based on the specific history pattern
   - Size = 2^(history_bits) entries

### Two-Level Predictor Operation

#### Prediction Process

1. **Index Calculation**: Use current global history as index into PHT
2. **Counter Reading**: Read 2-bit counter from PHT[GHR]
3. **Prediction**: Predict taken if counter ≥ 2, not-taken if counter < 2
4. **Speculation**: Continue fetching based on prediction

#### Update Process

1. **Outcome Resolution**: Determine actual branch outcome
2. **Counter Update**: Update PHT[old_GHR] based on actual outcome
   - Increment (max 3) if taken
   - Decrement (min 0) if not-taken
3. **History Update**: Shift GHR and insert actual outcome

### Saturating Counter States

The 2-bit saturating counters used in the PHT have four states:

- **00 (Strongly Not-Taken)**: Predicts not-taken, requires two consecutive taken branches to change prediction
- **01 (Weakly Not-Taken)**: Predicts not-taken, one taken branch changes to weakly taken
- **10 (Weakly Taken)**: Predicts taken, one not-taken branch changes to weakly not-taken
- **11 (Strongly Taken)**: Predicts taken, requires two consecutive not-taken branches to change prediction

This hysteresis prevents prediction oscillation in the presence of occasional mispredictions.

### Design Considerations

#### History Length Selection

**Short History (1-4 bits)**:

- Advantages: Small PHT, fast access, low cost
- Disadvantages: Limited pattern recognition, higher aliasing

**Long History (8-16 bits)**:

- Advantages: Complex pattern recognition, lower aliasing
- Disadvantages: Large PHT, slower access, higher cost

#### Aliasing Effects

**Aliasing** occurs when different branch patterns map to the same PHT entry, causing interference:

- **Constructive Aliasing**: Different patterns with similar behavior share entries efficiently
- **Destructive Aliasing**: Conflicting patterns reduce prediction accuracy
- **Mitigation**: Larger PHT, better hash functions, or tagged entries

### Performance Analysis

#### Accuracy Metrics

- **Prediction Accuracy**: Percentage of correct predictions
- **Misprediction Rate**: Percentage of incorrect predictions
- **MPKI**: Mispredictions per 1000 instructions

#### Factors Affecting Performance

1. **Program Characteristics**

   - Branch frequency and distribution
   - Control flow complexity
   - Loop structures and nesting

2. **Predictor Configuration**

   - History register length
   - PHT size and organization
   - Counter initialization

3. **Workload Behavior**
   - Predictable vs. unpredictable branches
   - Regular vs. irregular patterns
   - Static vs. dynamic behavior

### Advanced Correlating Predictors

#### Local vs. Global History

- **Global History**: Uses outcomes of all recent branches
- **Local History**: Uses outcomes of the same branch
- **Hybrid**: Combines both global and local information

#### Gshare Predictor

An efficient implementation that XORs the program counter with global history:

- **Index = PC ⊕ GHR**
- Provides better distribution and reduces aliasing
- Widely used in practice

#### Tournament Predictors

Combine multiple prediction mechanisms:

- Use a meta-predictor to choose between different predictors
- Adapt to different program phases
- Examples: Alpha 21264, Intel P6 microarchitecture

### Real-World Implementation

#### Hardware Considerations

1. **Access Time**: Prediction must complete in one cycle
2. **Power Consumption**: Large tables consume significant power
3. **Area Cost**: PHT size affects chip area
4. **Update Bandwidth**: Multiple branches per cycle require parallel updates

#### Modern Processors

- **Intel Core**: Uses tournament predictors with local and global components
- **AMD Zen**: Implements perceptron-based predictors
- **ARM Cortex**: Uses hybrid predictors with multiple components
- **RISC-V**: Various implementations from simple to sophisticated

### Applications and Examples

#### Loop Prediction

Consider a simple counting loop:

```assembly
MOV R1, 0
MOV R2, 100
LOOP:
  // loop body
  ADD R1, R1, 1
  BNE R1, R2, LOOP  ; Branch taken 99 times, not-taken once
```

A correlating predictor can learn this pattern and predict accurately even for the final iteration.

#### Conditional Patterns

Complex conditional structures benefit from correlation:

```assembly
if (a > 0) {        ; Branch B1
  if (b > 0) {      ; Branch B2
    // code
  }
}
```

The outcome of B2 is correlated with B1 - if B1 is not-taken, B2 is never executed.

### Limitations and Challenges

1. **Cold Start**: No history available for new branches
2. **Capacity Limits**: Finite PHT size limits pattern storage
3. **Interference**: Aliasing reduces effectiveness
4. **Training Time**: Predictors need time to learn patterns
5. **Context Switches**: History may become irrelevant after context changes

### Conclusion

Correlating branch predictors represent a significant advancement in processor design, enabling high-performance instruction pipelines by accurately predicting complex branch behavior. Understanding their operation, benefits, and limitations is crucial for computer architects and performance engineers working on modern processor designs.

The key insight that branch outcomes are often correlated has led to a family of sophisticated predictors that form the foundation of branch prediction in contemporary processors, directly impacting the performance of virtually all modern computing systems.
