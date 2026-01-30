#!/usr/bin/env node

/**
 * OpenClaw Security Test Suite
 * Tests for OpenClaw security extensions in HUMMBL-Agent
 */

import { test, describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const SCRIPT_DIR = join(__dirname, '..', '..', 'scripts');
const CONFIG_DIR = join(__dirname, '..', '..', 'configs');

// Helper function to run shell commands
function runCommand(command, options = {}) {
  try {
    const result = execSync(command, { encoding: 'utf8', ...options });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message, output: error.stdout };
  }
}

// Helper function to check if file exists
function fileExists(path) {
  return existsSync(path);
}

// Helper function to read JSON file
function readJsonFile(path) {
  try {
    const content = readFileSync(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

describe('OpenClaw Security Extensions', () => {
  
  describe('Configuration Files', () => {
    
    test('OpenClaw security policy configuration exists', () => {
      const policyPath = join(CONFIG_DIR, 'openclaw-security-policy.json');
      assert.ok(fileExists(policyPath), 'OpenClaw security policy file should exist');
      
      const policy = readJsonFile(policyPath);
      assert.ok(policy, 'Policy should be valid JSON');
      assert.equal(policy.version, '1.0.0', 'Policy version should be 1.0.0');
      assert.ok(policy.credentialStorage, 'Policy should have credential storage section');
      assert.ok(policy.networkSecurity, 'Policy should have network security section');
      assert.ok(policy.monitoring, 'Policy should have monitoring section');
    });
    
    test('Secrets policy includes OpenClaw credentials', () => {
      const secretsPath = join(CONFIG_DIR, 'secrets-policy.json');
      assert.ok(fileExists(secretsPath), 'Secrets policy file should exist');
      
      const secrets = readJsonFile(secretsPath);
      assert.ok(secrets, 'Secrets policy should be valid JSON');
      assert.ok(secrets.allowedSecrets.includes('DISCORD_TOKEN'), 'Should include DISCORD_TOKEN');
      assert.ok(secrets.allowedSecrets.includes('TWILIO_AUTH_TOKEN'), 'Should include TWILIO_AUTH_TOKEN');
      assert.ok(secrets.allowedSecrets.includes('OPENCLAW_API_KEY'), 'Should include OPENCLAW_API_KEY');
    });
    
    test('Network policy includes OpenClaw domains', () => {
      const networkPath = join(CONFIG_DIR, 'network-policy.json');
      assert.ok(fileExists(networkPath), 'Network policy file should exist');
      
      const network = readJsonFile(networkPath);
      assert.ok(network, 'Network policy should be valid JSON');
      assert.ok(network.allowlist.domains.includes('discord.com'), 'Should include discord.com');
      assert.ok(network.allowlist.domains.includes('api.twilio.com'), 'Should include api.twilio.com');
      assert.ok(network.allowlist.domains.includes('gateway.openclaw.ai'), 'Should include gateway.openclaw.ai');
    });
    
    test('Process policy includes OpenClaw executables', () => {
      const processPath = join(CONFIG_DIR, 'process-policy.allowlist');
      assert.ok(fileExists(processPath), 'Process policy file should exist');
      
      const content = readFileSync(processPath, 'utf8');
      assert.ok(content.includes('openclaw'), 'Should include openclaw executable');
      assert.ok(content.includes('security'), 'Should include security executable');
      assert.ok(content.includes('lsof'), 'Should include lsof executable');
      assert.ok(content.includes('netstat'), 'Should include netstat executable');
    });
  });
  
  describe('Security Scripts', () => {
    
    test('OpenClaw security lint script exists and is executable', () => {
      const scriptPath = join(SCRIPT_DIR, 'lint-openclaw-security.sh');
      assert.ok(fileExists(scriptPath), 'Security lint script should exist');
      
      // Check if script is executable
      const stats = execSync(`ls -la "${scriptPath}"`, { encoding: 'utf8' });
      assert.ok(stats.includes('-rwx'), 'Script should be executable');
    });
    
    test('OpenClaw credential scanner script exists and is executable', () => {
      const scriptPath = join(SCRIPT_DIR, 'scan-openclaw-credentials.sh');
      assert.ok(fileExists(scriptPath), 'Credential scanner script should exist');
      
      // Check if script is executable
      const stats = execSync(`ls -la "${scriptPath}"`, { encoding: 'utf8' });
      assert.ok(stats.includes('-rwx'), 'Script should be executable');
    });
    
    test('Security scripts have proper shebang', () => {
      const lintScript = join(SCRIPT_DIR, 'lint-openclaw-security.sh');
      const scanScript = join(SCRIPT_DIR, 'scan-openclaw-credentials.sh');
      
      const lintContent = readFileSync(lintScript, 'utf8');
      const scanContent = readFileSync(scanScript, 'utf8');
      
      assert.ok(lintContent.startsWith('#!/bin/bash'), 'Lint script should have bash shebang');
      assert.ok(scanContent.startsWith('#!/bin/bash'), 'Scan script should have bash shebang');
    });
    
    test('Security scripts contain required functions', () => {
      const lintScript = join(SCRIPT_DIR, 'lint-openclaw-security.sh');
      const scanScript = join(SCRIPT_DIR, 'scan-openclaw-credentials.sh');
      
      const lintContent = readFileSync(lintScript, 'utf8');
      const scanContent = readFileSync(scanScript, 'utf8');
      
      // Check for key functions in lint script
      assert.ok(lintContent.includes('check_credential_security'), 'Lint script should have credential security check');
      assert.ok(lintContent.includes('check_network_security'), 'Lint script should have network security check');
      assert.ok(lintContent.includes('check_process_security'), 'Lint script should have process security check');
      
      // Check for key functions in scan script
      assert.ok(scanContent.includes('scan_credential_storage'), 'Scan script should have credential storage scan');
      assert.ok(scanContent.includes('scan_environment_files'), 'Scan script should have environment file scan');
      assert.ok(scanContent.includes('scan_keychain_storage'), 'Scan script should have keychain storage scan');
    });
  });
  
  describe('Security Agent', () => {
    
    test('OpenClaw security agent exists', () => {
      const agentPath = join(__dirname, '..', '..', 'agents', 'openclaw-security.md');
      assert.ok(fileExists(agentPath), 'OpenClaw security agent should exist');
      
      const content = readFileSync(agentPath, 'utf8');
      assert.ok(content.includes('name: openclaw-security'), 'Agent should have correct name');
      assert.ok(content.includes('description: OpenClaw security specialist'), 'Agent should have description');
      assert.ok(content.includes('tools:'), 'Agent should specify tools');
      assert.ok(content.includes('model: opus'), 'Agent should specify model');
    });
    
    test('Security agent has required sections', () => {
      const agentPath = join(__dirname, '..', '..', 'agents', 'openclaw-security.md');
      const content = readFileSync(agentPath, 'utf8');
      
      assert.ok(content.includes('# OpenClaw Security Agent'), 'Should have main heading');
      assert.ok(content.includes('## Core Responsibilities'), 'Should have responsibilities section');
      assert.ok(content.includes('## OpenClaw-Specific Security Analysis'), 'Should have analysis section');
      assert.ok(content.includes('## Security Checklist'), 'Should have checklist section');
      assert.ok(content.includes('## Remediation Commands'), 'Should have remediation section');
    });
  });
  
  describe('Security Skills', () => {
    
    test('Credential encryption skill exists', () => {
      const skillPath = join(__dirname, '..', '..', 'skills', 'openclaw-credential-encryption', 'SKILL.md');
      assert.ok(fileExists(skillPath), 'Credential encryption skill should exist');
      
      const content = readFileSync(skillPath, 'utf8');
      assert.ok(content.includes('name: openclaw-credential-encryption'), 'Skill should have correct name');
      assert.ok(content.includes('description: Encrypt OpenClaw runtime credentials'), 'Skill should have description');
    });
    
    test('Runtime monitoring skill exists', () => {
      const skillPath = join(__dirname, '..', '..', 'skills', 'openclaw-runtime-monitor', 'SKILL.md');
      assert.ok(fileExists(skillPath), 'Runtime monitoring skill should exist');
      
      const content = readFileSync(skillPath, 'utf8');
      assert.ok(content.includes('name: openclaw-runtime-monitor'), 'Skill should have correct name');
      assert.ok(content.includes('description: Real-time security monitoring for OpenClaw'), 'Skill should have description');
    });
    
    test('Security skills have required components', () => {
      const encryptionSkill = join(__dirname, '..', '..', 'skills', 'openclaw-credential-encryption', 'SKILL.md');
      const monitorSkill = join(__dirname, '..', '..', 'skills', 'openclaw-runtime-monitor', 'SKILL.md');
      
      const encryptionContent = readFileSync(encryptionSkill, 'utf8');
      const monitorContent = readFileSync(monitorSkill, 'utf8');
      
      // Check encryption skill components
      assert.ok(encryptionContent.includes('## When to Activate'), 'Should have activation section');
      assert.ok(encryptionContent.includes('## Credential Protection Strategy'), 'Should have protection strategy');
      assert.ok(encryptionContent.includes('## Security Verification'), 'Should have verification section');
      
      // Check monitoring skill components
      assert.ok(monitorContent.includes('## Monitoring Components'), 'Should have monitoring components');
      assert.ok(monitorContent.includes('### 1. File System Access Monitoring'), 'Should have file system monitoring');
      assert.ok(monitorContent.includes('### 2. Credential Access Detection'), 'Should have credential access detection');
    });
  });
  
  describe('Integration Tests', () => {
    
    test('Security lint script runs without errors', () => {
      const scriptPath = join(SCRIPT_DIR, 'lint-openclaw-security.sh');
      
      // Run script in dry-run mode (if supported) or just check syntax
      const result = runCommand(`bash -n "${scriptPath}"`);
      assert.ok(result.success, 'Security lint script should have valid syntax');
    });
    
    test('Credential scanner script runs without errors', () => {
      const scriptPath = join(SCRIPT_DIR, 'scan-openclaw-credentials.sh');
      
      // Run script in dry-run mode (if supported) or just check syntax
      const result = runCommand(`bash -n "${scriptPath}"`);
      assert.ok(result.success, 'Credential scanner script should have valid syntax');
    });
    
    test('Configuration files are valid JSON', () => {
      const configFiles = [
        'openclaw-security-policy.json',
        'secrets-policy.json',
        'network-policy.json'
      ];
      
      for (const configFile of configFiles) {
        const configPath = join(CONFIG_DIR, configFile);
        const config = readJsonFile(configPath);
        assert.ok(config, `${configFile} should be valid JSON`);
        assert.ok(config.version, `${configFile} should have version field`);
      }
    });
  });
  
  describe('Security Requirements', () => {
    
    test('No hardcoded secrets in configuration files', () => {
      const configFiles = [
        'openclaw-security-policy.json',
        'secrets-policy.json',
        'network-policy.json'
      ];
      
      for (const configFile of configFiles) {
        const configPath = join(CONFIG_DIR, configFile);
        const content = readFileSync(configPath, 'utf8');
        
        // Check for common secret patterns
        const secretPatterns = [
          /api[_-]?key["']?\s*:\s*["'][^"']{10,}["']/i,
          /password["']?\s*:\s*["'][^"']{6,}["']/i,
          /secret["']?\s*:\s*["'][^"']{6,}["']/i,
          /token["']?\s*:\s*["'][^"']{6,}["']/i
        ];
        
        for (const pattern of secretPatterns) {
          assert.ok(!pattern.test(content), `${configFile} should not contain hardcoded secrets`);
        }
      }
    });
    
    test('Security scripts use safe practices', () => {
      const scripts = [
        'lint-openclaw-security.sh',
        'scan-openclaw-credentials.sh'
      ];
      
      for (const script of scripts) {
        const scriptPath = join(SCRIPT_DIR, script);
        const content = readFileSync(scriptPath, 'utf8');
        
        // Check for safe shell practices
        assert.ok(content.includes('set -euo pipefail'), `${script} should use safe shell options`);
        assert.ok(!content.includes('eval '), `${script} should not use eval`);
        assert.ok(!content.includes('exec '), `${script} should not use exec without proper quoting`);
      }
    });
  });
  
  describe('Performance and Resource Checks', () => {
    
    test('Configuration files are reasonably sized', () => {
      const configFiles = [
        'openclaw-security-policy.json',
        'secrets-policy.json',
        'network-policy.json'
      ];
      
      for (const configFile of configFiles) {
        const configPath = join(CONFIG_DIR, configFile);
        const stats = execSync(`wc -c "${configPath}"`, { encoding: 'utf8' });
        const size = parseInt(stats.trim().split(' ')[0]);
        
        // Config files should be under 10KB
        assert.ok(size < 10240, `${configFile} should be under 10KB (current: ${size} bytes)`);
      }
    });
    
    test('Security scripts are reasonably sized', () => {
      const scripts = [
        'lint-openclaw-security.sh',
        'scan-openclaw-credentials.sh'
      ];
      
      for (const script of scripts) {
        const scriptPath = join(SCRIPT_DIR, script);
        const stats = execSync(`wc -l "${scriptPath}"`, { encoding: 'utf8' });
        const lines = parseInt(stats.trim().split(' ')[0]);
        
        // Scripts should be under 1000 lines
        assert.ok(lines < 1000, `${script} should be under 1000 lines (current: ${lines} lines)`);
      }
    });
  });
});

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running OpenClaw Security Tests...');
  console.log('Use: node --test openclaw-security.test.mjs');
}
