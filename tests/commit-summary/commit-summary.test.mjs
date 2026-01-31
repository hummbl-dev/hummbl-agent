#!/usr/bin/env node

import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const scriptPath = join(process.cwd(), 'scripts', 'generate-commit-summary.sh');

function runScript(args, cwd) {
  return execFileSync(scriptPath, args, { encoding: 'utf8', cwd });
}

test('generate-commit-summary reports commits and type counts for a date', () => {
  const repoDir = mkdtempSync(join(tmpdir(), 'commit-summary-'));
  execFileSync('git', ['init'], { cwd: repoDir });
  execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: repoDir });
  execFileSync('git', ['config', 'user.name', 'Test User'], { cwd: repoDir });

  const date = '2026-01-31';
  const commitEnv = {
    ...process.env,
    GIT_AUTHOR_DATE: `${date}T10:00:00Z`,
    GIT_COMMITTER_DATE: `${date}T10:00:00Z`
  };

  writeFileSync(join(repoDir, 'alpha.txt'), 'alpha');
  execFileSync('git', ['add', '.'], { cwd: repoDir });
  execFileSync('git', ['commit', '-m', 'feat(core): add alpha'], {
    cwd: repoDir,
    env: commitEnv
  });

  writeFileSync(join(repoDir, 'beta.txt'), 'beta');
  execFileSync('git', ['add', '.'], { cwd: repoDir });
  execFileSync('git', ['commit', '-m', 'fix: add beta'], {
    cwd: repoDir,
    env: commitEnv
  });

  const output = runScript(['--date', date, '--repo', repoDir], repoDir);

  assert.match(output, /COMMIT SUMMARY REPORT/);
  assert.match(output, /Total commits: 2/);
  assert.match(output, /Commit Details:/);
  assert.match(output, /feat\(core\): add alpha/);
  assert.match(output, /fix: add beta/);
  assert.match(output, /Commit Types:/);
  assert.match(output, /feat: 1/);
  assert.match(output, /fix: 1/);
});

test('generate-commit-summary reports no commits for a date with no entries', () => {
  const repoDir = mkdtempSync(join(tmpdir(), 'commit-summary-empty-'));
  execFileSync('git', ['init'], { cwd: repoDir });
  execFileSync('git', ['config', 'user.email', 'test@example.com'], { cwd: repoDir });
  execFileSync('git', ['config', 'user.name', 'Test User'], { cwd: repoDir });

  const output = runScript(['--date', '2026-01-30', '--repo', repoDir], repoDir);

  assert.match(output, /No commits found for 2026-01-30/);
});
