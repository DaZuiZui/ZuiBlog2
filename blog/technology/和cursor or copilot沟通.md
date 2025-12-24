# 和cursor or copilot沟通

一切沟通尽量用英文。英文准确率最高

## 1. 对其需求

首先把需求文档给AI看，然后和ai说这是我的需求文档，说出来你的理解

{{brief requirement}} 是通过人是描述这个需求，给ai一个标准

{{document}} 是ai读取文档的位置，可以贴文件路径（支持的话），可以贴文档 但是注意格式

当ai说出他的理解以后，要仔细核对，查看是否满足我们的预期，如果无法满足需要在会话里面做出纠正或者更改{{brief requirement}} 和{{document}} 
和他纠正可以大白话说，也是尽量用英语

~~~java
My brief requirement is:
{{brief requirement}}

Below is the full Product Requirement Document (PRD).
Please read it carefully.
{{document}}

This is a requirement understanding phase ONLY.
Treat this as a requirement review task, not a brainstorming task.

This document is a Product Requirement Document (PRD) and is the single source of truth.
All future design and implementation must strictly follow it.

Your task is strictly to analyze WHAT needs to be done according to the PRD,
not to suggest HOW it should be done.

Do not act as a product manager.
Do not refine, improve, or reinterpret the product requirements.
Do not add, infer, or invent any content beyond what is explicitly stated.

Please do NOT:
- Propose solutions
- Suggest implementations
- Design APIs or data models
- Optimize or extend the requirement
- Infer priorities unless explicitly stated

After reading, please ONLY:
1. Restate the requirement in your own words
2. Break it down into clear functional rules or expectations
3. List any assumptions you are making
4. Identify unclear, ambiguous, or missing parts that need confirmation
5. Verify whether all parts of the PRD are covered in your understanding

Do not include any code or technical design.

~~~

## 2. 与 AI 确定需求

当最终和ai纠正完毕以后，和ai说一句请说出你最终。然后这句话要保存起来，在第三步项目代码理解的时候要用。

~~~java
We have finished clarifying the requirement.

Please output your FINAL and AUTHORITATIVE version of the requirement.

This version will be saved and reused in later phases.

Rules for your output:
- Include ONLY the requirement content (WHAT needs to be done)
- Be complete, precise, and unambiguous
- Reflect all confirmed clarifications in this conversation
- Do NOT add assumptions, explanations, or interpretations
- Do NOT suggest solutions or implementations

Output format:
- A concise summary of the requirement
- A structured list of explicit requirements / rules

This output must be treated as the frozen requirement.
~~~

## 3. 代码理解阶段

首先告诉AI这个代码要写在哪里比如com.xxx.xxxx.client.TtsClient#uploadVideo.让他学习这块代码，然后让他说出他的理解，方便后续开发。 并且携带{{第二步的最终确认需求}}

~~~c
We are now in the code understanding phase.

The code to focus on is located at:
com.xxx.xxxx.client.TtsClient#uploadVideo

Your task is to study and understand the existing code in this scope.

Below is the FINAL and FROZEN requirement that was previously confirmed.
You must use it as the authoritative reference.
{{final requirement from step 2}}

Rules:
- Focus ONLY on understanding the existing code
- Do NOT modify the code
- Do NOT propose changes or implementations
- Do NOT optimize or refactor
- Do NOT infer missing behavior beyond what the code explicitly does

After analyzing the code, please ONLY:
1. Explain what this code currently does (behavior and responsibilities)
2. Describe how it relates to the frozen requirement (which parts are covered, which are not)
3. Identify any gaps, mismatches, or missing logic relative to the frozen requirement
4. Point out any assumptions the code appears to be making

Do not write or suggest any code.
~~~

## 4. 人工把开发步骤分析好

人工把一个需求拆分为多个步骤 如

然后喂给AI，让ai遵守你的步骤去开发，并且让ai说出每一步的做法， 然后看ai说的是否正确，如果不正确要及时修改

{{paste your manually defined steps and implementation thoughts here}} 这个是你分析出来所有的步骤还有每一步的实现方式。

提示词

~~~java
We are now in the implementation phase.

Below is the FINAL and FROZEN requirement:
{{final requirement from step 2}}

The requirement has already been split into multiple steps,
and the implementation approach for each step has been defined manually.

Your task:
1. Study the following step-by-step implementation plan carefully.
2. Learn and internalize the approach for each step.
3. Follow these steps exactly when performing further development tasks.
4. Do NOT modify, optimize, or add to these steps.
5. Do NOT propose solutions beyond what is already defined.

Step-by-step implementation plan:
{{paste your manually defined steps and implementation thoughts here}}

After reviewing, please summarize your understanding of each step,
confirming that you fully grasp the intended implementation approach.

~~~

## 5. ai开发阶段

让ai一步一步去开发，并且每一步都写好测试案例，ai每做一步，然后我们人工去手动通过他的测试案例里去测试，如果符合标准就开始下一步，不符合就要明确告诉ai这里有问题，为什么有问题。

{{your manually defined steps with implementation thoughts}}  这边是我们告诉ai要做的第几步还有这步的实现方案

~~~java
We are now in the AI Development Phase.

Below is the FINAL and FROZEN requirement:
{{final requirement from step 2}}

Below is the step-by-step implementation plan:
{{your manually defined steps with implementation thoughts}}

Instructions for this session:

1. You will implement **only the step we command you to do** (e.g., Step 1).
2. For the current step, provide:
   - Implementation Plan Summary: Brief description of what this step does
   - Implementation Approach: How you would implement it, using the frozen requirement and step plan
   - Test Cases: Detailed test cases for this step, including inputs, expected outputs, and validations
3. Wait for human testing feedback before proceeding.
4. If the test cases fail:
   - Do NOT proceed to the next step
   - Analyze the failure
   - Provide corrections for the current step
5. Only after human confirms all test cases pass, proceed to the next step.
6. Do NOT implement steps beyond the current one
7. Do NOT add, remove, or alter any functionality beyond the frozen requirement

Output format per step:

Step N:
- Implementation Plan Summary:
- Implementation Approach:
- Test Cases:

After human testing feedback:
- Analysis of results:
- Corrections (if any):
~~~

人工分析结果格式给ai

理论上大白话就可以。只需要围绕

Analysis of results:

Corrections (if any):

## 如果没有问题就和ai说开启下一步或者直接重新发送第五步指令把内容调为下一步

## 总结

其实最关键的就是1-4步，第五步完全可以用大白话沟通。尽量让ai少猜，把需求和代码结构描述清楚就可以，如果代码不好描述就让ai先自己学习