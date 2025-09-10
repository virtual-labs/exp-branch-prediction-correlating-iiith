### Books and Textbooks

1. **Hennessy, J. L., & Patterson, D. A.** (2019). _Computer Architecture: A Quantitative Approach_ (6th ed.). Morgan Kaufmann.

   - Chapter 3: Instruction-Level Parallelism and Its Exploitation
   - Section 3.3: Branch Prediction
   - Section 3.9: Advanced Techniques for Branch Prediction

2. **Shen, J. P., & Lipasti, M. H.** (2013). _Modern Processor Design: Fundamentals of Superscalar Processors_. Waveland Press.

   - Chapter 4: Branch Prediction and Speculative Execution
   - Section 4.4: Two-Level Adaptive Branch Predictors

3. **Stallings, W.** (2018). _Computer Organization and Architecture: Designing for Performance_ (11th ed.). Pearson.

   - Chapter 14: Instruction-Level Parallelism and Superscalar Processors
   - Section 14.4: Branch Prediction

4. **Sohi, G. S.** (1990). _Instruction Issue Logic for Pipelined Supercomputers_. IEEE Transactions on Computers, 39(11), 1443-1455.

### Foundational Research Papers

5. **Yeh, T. Y., & Patt, Y. N.** (1991). Two-level adaptive branch prediction. _Proceedings of the 24th Annual International Symposium on Microarchitecture_, 51-61.

   - Seminal paper introducing correlating branch predictors

6. **Yeh, T. Y., & Patt, Y. N.** (1993). A comparison of dynamic branch predictors that use two levels of branch history. _Proceedings of the 20th Annual International Symposium on Computer Architecture_, 257-266.

7. **McFarling, S.** (1993). Combining branch predictors. _DEC WRL Technical Note TN-36_, Digital Equipment Corporation.

   - Introduction of the gshare predictor and tournament predictors

8. **Pan, S. T., So, K., & Rahmeh, J. T.** (1992). Improving the accuracy of dynamic branch prediction using branch correlation. _Proceedings of the Fifth International Conference on Architectural Support for Programming Languages and Operating Systems_, 76-84.

### Advanced Research

9. **Michaud, P., Seznec, A., & Uhlig, R.** (1997). Trading conflict and capacity aliasing in conditional branch predictors. _Proceedings of the 24th Annual International Symposium on Computer Architecture_, 292-303.

10. **Jiménez, D. A., & Lin, C.** (2001). Dynamic branch prediction with perceptrons. _Proceedings of the 7th International Symposium on High-Performance Computer Architecture_, 197-206.

11. **Seznec, A.** (2007). The L-TAGE branch predictor. _Journal of Instruction-Level Parallelism_, 9, 1-10.

12. **Tarjan, D., & Skadron, K.** (2005). Merging path and gshare indexing in perceptron branch prediction. _ACM Transactions on Architecture and Code Optimization_, 2(3), 280-300.

### Implementation Studies

13. **Sprangle, E., Chappell, R. S., Alsup, M., & Patt, Y. N.** (1997). The agree predictor: A mechanism for reducing negative branch history interference. _Proceedings of the 24th Annual International Symposium on Computer Architecture_, 284-291.

14. **Driesen, K., & Hölzle, U.** (1998). The cascaded predictor: Economical and adaptive branch target prediction. _Proceedings of the 31st Annual ACM/IEEE International Symposium on Microarchitecture_, 249-258.

15. **Eden, A. N., & Mudge, T.** (1998). The YAGS branch prediction scheme. _Proceedings of the 31st Annual ACM/IEEE International Symposium on Microarchitecture_, 69-77.

### Modern Processor Implementations

16. **Kessler, R. E.** (1999). The Alpha 21264 microprocessor. _IEEE Micro_, 19(2), 24-36.

    - Tournament predictor implementation in Alpha 21264

17. **Yeager, K. C.** (1996). The MIPS R10000 superscalar microprocessor. _IEEE Micro_, 16(2), 28-40.

    - Hybrid branch prediction in R10000

18. **Intel Corporation.** (2019). _Intel 64 and IA-32 Architectures Optimization Reference Manual_.

    - Chapter 3: Branch Prediction
    - Modern Intel branch prediction techniques

19. **AMD Corporation.** (2020). _Software Optimization Guide for AMD Family 17h Processors_.
    - Chapter 2: Branch Prediction and Optimization Guidelines

### Theoretical Analysis

20. **Evers, M., Chang, P. Y., & Patt, Y. N.** (1996). Using hybrid branch predictors to improve branch prediction accuracy in the presence of context switches. _Proceedings of the 23rd Annual International Symposium on Computer Architecture_, 3-11.

21. **Chen, I. C. K., Coffey, J. T., & Mudge, T. N.** (1996). Analysis of branch prediction via data compression. _Proceedings of the Seventh International Conference on Architectural Support for Programming Languages and Operating Systems_, 128-137.

22. **Young, C., Gloy, N., & Smith, M. D.** (1995). A comparative analysis of schemes for correlated branch prediction. _Proceedings of the 22nd Annual International Symposium on Computer Architecture_, 276-286.

### Online Resources and Standards

23. **Intel Corporation.** (2021). _Intel Architecture Instruction Set Extensions and Future Features Programming Reference_.

    - Latest developments in branch prediction technology

24. **ARM Limited.** (2020). _ARM Cortex-A Series Programmer's Guide for ARMv8-A_.

    - Chapter 5: Branch Prediction in ARM Processors

25. **RISC-V International.** (2019). _The RISC-V Instruction Set Manual, Volume II: Privileged Architecture_.
    - Branch prediction considerations in RISC-V implementations

### Survey Papers and Books

26. **Mittal, S., & Zhang, Y.** (2018). A survey of techniques for dynamic branch prediction. _Concurrency and Computation: Practice and Experience_, 30(1), e4666.

27. **Lee, J. K., & Smith, A. J.** (1984). Branch prediction strategies and branch target buffer design. _Computer_, 17(1), 6-22.

    - Early comprehensive survey of branch prediction techniques

28. **Mudge, T. N.** (1995). Power: A first-class architectural design constraint. _Computer_, 28(4), 52-58.
    - Power considerations in branch predictor design

### Academic Course Materials

29. **University of California, Berkeley.** CS152 Computer Architecture Course Materials.

    - Lecture notes on Advanced Branch Prediction
    - Available at: https://inst.eecs.berkeley.edu/~cs152/

30. **Carnegie Mellon University.** 18-447 Introduction to Computer Architecture.

    - Course materials on branch prediction and speculation
    - Available at: https://www.ece.cmu.edu/~ece447/

31. **MIT OpenCourseWare.** 6.823 Computer System Architecture.
    - Advanced topics in branch prediction and control flow prediction
    - Available at: https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/

### Technical Reports

32. **Conte, T. M., Banerjia, S., Loh, S. Y., Menezes, K. N., & Sathaye, S. S.** (1995). _Instruction fetch mechanisms for superscalar microprocessors_. Technical Report, Department of Electrical and Computer Engineering, North Carolina State University.

33. **Calder, B., Grunwald, D., Lindsay, D., Martin, J., Mozer, M., & Zorn, B.** (1997). _Corpus-based static branch prediction_. Technical Report CU-CS-845-97, University of Colorado at Boulder.

34. **Pierce, J., & Mudge, T.** (1996). _Wrong-path instruction prefetching_. Technical Report CSE-TR-260-95, University of Michigan.

### Conference Proceedings

35. **International Symposium on Computer Architecture (ISCA)** - Various years

    - Premier venue for computer architecture research including branch prediction

36. **International Symposium on Microarchitecture (MICRO)** - Various years

    - Key conference for microarchitectural innovations

37. **International Symposium on High-Performance Computer Architecture (HPCA)** - Various years
    - Important venue for performance-oriented architectural research

### Industrial Whitepapers

38. **Koomey, J., Berard, S., Sanchez, M., & Wong, H.** (2011). _Implications of historical trends in the electrical efficiency of computing_. IEEE Annals of the History of Computing, 33(3), 46-54.

39. **Boggs, D., Baktha, A., Hawkins, J., Marr, D. T., Miller, J. A., Roussel, P., ... & Nallapati, G.** (2004). The microarchitecture of the Intel Pentium 4 processor on 90nm technology. _Intel Technology Journal_, 8(1), 1-17.
