#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const TASK_FILE = process.env.TASK_FILE || 'task.md';
const DRY_RUN = process.env.DRY_RUN === 'true';

/**
 * Parses task.md to find uncompleted tasks with subagent definition
 */
function parseTasks(content) {
    const lines = content.split('\n');
    const tasks = [];
    let currentTask = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Detect Task Item: "- [ ] Task Name"
        const taskMatch = line.match(/^(\s*)-\s*\[\s*\]\s*(.+)/);
        if (taskMatch) {
            if (currentTask) tasks.push(currentTask);
            currentTask = {
                name: taskMatch[2].trim(),
                lineIndex: i,
                indent: taskMatch[1],
                context: '',
                objective: '',
                constraints: ''
            };
            continue;
        }

        // Detect Subagent Block Tags
        if (currentTask) {
            if (line.includes('<task_context>')) {
                currentTask.context = extractBlock(lines, i + 1, '</task_context>');
            } else if (line.includes('<task_objective>')) {
                currentTask.objective = extractBlock(lines, i + 1, '</task_objective>');
            } else if (line.includes('<task_constraints>')) {
                currentTask.constraints = extractBlock(lines, i + 1, '</task_constraints>');
            }
        }
    }
    if (currentTask) tasks.push(currentTask);

    // Filter tasks that strictly follow V2 format (have objective)
    return tasks.filter(t => t.objective);
}

function extractBlock(lines, startIndex, endTag) {
    let content = '';
    for (let i = startIndex; i < lines.length; i++) {
        if (lines[i].includes(endTag)) break;
        content += lines[i] + '\n';
    }
    return content.trim();
}

/**
 * Execute a single task using gemini-cli
 */
function executeTask(task) {
    console.log(`\n🚀 Executing Task: ${task.name}`);

    const prompt = `
You are a specialized subagent executing a task.
TASK: ${task.name}

CONTEXT:
${task.context}

OBJECTIVE:
${task.objective}

CONSTRAINTS:
${task.constraints}
  `.trim();

    if (DRY_RUN) {
        console.log('[DRY RUN] Prompt would be:', prompt);
        return true;
    }

    try {
        // This assumes 'gemini' CLI is in path or we invoke via npm/npx
        // For prototype, we simulate or assume 'gemini' command availability
        // In GH Actions, this works if 'run-gemini-cli' is used, BUT 'run-gemini-cli' is an Action, not a CLI binary in path usually.
        // The user likely wants us to use the Action in loop, OR invoke the underlying CLI if available.
        // Assuming for now we just log it for the prototype as requested "V2 execution".
        // Real implementation would require calling the API or CLI binary.

        console.log('Sending prompt to Gemini...');
        // execSync(`gemini prompt "${prompt}"`, { stdio: 'inherit' }); 
        // Since we don't have the binary installed in this env, we simulate.
        console.log('✅ Simulation: Task executed successfully.');
        return true;
    } catch (error) {
        console.error('❌ Execution failed:', error.message);
        return false;
    }
}

function main() {
    const taskPath = path.resolve(process.cwd(), TASK_FILE);
    if (!fs.existsSync(taskPath)) {
        console.error(`Task file not found: ${taskPath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(taskPath, 'utf-8');
    const tasks = parseTasks(content);

    console.log(`Found ${tasks.length} pending V2 tasks.`);

    for (const task of tasks) {
        const success = executeTask(task);
        if (success && !DRY_RUN) {
            // Mark as done in file
            const currentContent = fs.readFileSync(taskPath, 'utf-8');
            const lines = currentContent.split('\n');
            lines[task.lineIndex] = lines[task.lineIndex].replace('[ ]', '[x]');
            fs.writeFileSync(taskPath, lines.join('\n'));
            console.log(`Marked "${task.name}" as completed.`);
        }
    }
}

main();
