#!/bin/bash
# OpenClaw Security Lint Script
# Part of HUMMBL-Agent OpenClaw security extensions

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/log/openclaw-security-lint.log"

# Ensure log directory exists
sudo mkdir -p "$(dirname "$LOG_FILE")"
sudo touch "$LOG_FILE"
sudo chown "$(whoami):staff" "$LOG_FILE"

log_message() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_credential_security() {
  log_message "🔐 Checking OpenClaw credential security..."
  
  local security_issues=0
  
  # Check ~/.clawdbot/ directory
  if [ -d "$HOME/.clawdbot" ]; then
    # Check directory permissions
    local dir_perms=$(stat -f "%A" "$HOME/.clawdbot")
    if [ "$dir_perms" != "700" ]; then
      log_message "❌ ~/.clawdbot/ directory has insecure permissions: $dir_perms (should be 700)"
      ((security_issues++))
    else
      log_message "✅ ~/.clawdbot/ directory permissions are secure"
    fi
    
    # Check file permissions
    while IFS= read -r -d '' file; do
      local file_perms=$(stat -f "%A" "$file")
      if [ "$file_perms" != "600" ]; then
        log_message "❌ File has insecure permissions: $file ($file_perms, should be 600)"
        ((security_issues++))
      fi
    done < <(find "$HOME/.clawdbot" -type f -print0 2>/dev/null)
    
    # Check for plaintext secrets
    if grep -r -E "(api[_-]?key|password|secret|token)" "$HOME/.clawdbot" >/dev/null 2>&1; then
      log_message "❌ Plaintext secrets found in ~/.clawdbot/"
      ((security_issues++))
    else
      log_message "✅ No plaintext secrets found in ~/.clawdbot/"
    fi
  else
    log_message "✅ ~/.clawdbot/ directory not found"
  fi
  
  # Check OAuth files
  while IFS= read -r -d '' oauth_file; do
    if [ -f "$oauth_file" ]; then
      # Check if OAuth file is encrypted
      if ! file "$oauth_file" | grep -q "encrypted"; then
        log_message "❌ OAuth file is not encrypted: $oauth_file"
        ((security_issues++))
      else
        log_message "✅ OAuth file is encrypted: $oauth_file"
      fi
    fi
  done < <(find "$HOME" -name "oauth.json" -print0 2>/dev/null)
  
  return $security_issues
}

check_network_security() {
  log_message "🌐 Checking OpenClaw network security..."
  
  local security_issues=0
  
  # Check if OpenClaw gateway is listening on port 18789
  if lsof -i :18789 >/dev/null 2>&1; then
    local connections=$(lsof -i :18789 | grep -c "LISTEN")
    log_message "📊 OpenClaw gateway listening on port 18789 ($connections connections)"
    
    # Check if bound to loopback only
    local binding=$(lsof -i :18789 | grep "LISTEN" | awk '{print $8}')
    if [[ "$binding" == *"127.0.0.1"* ]] || [[ "$binding" == *"localhost"* ]]; then
      log_message "✅ Gateway bound to loopback interface"
    else
      log_message "❌ Gateway not bound to loopback: $binding"
      ((security_issues++))
    fi
  else
    log_message "✅ OpenClaw gateway not listening (not running)"
  fi
  
  # Check for unexpected OpenClaw network connections
  local unexpected_ports=$(lsof -i -P | grep -E "(openclaw|clawdbot)" | grep -v ":18789")
  if [ -n "$unexpected_ports" ]; then
    log_message "❌ OpenClaw connecting to unexpected ports:"
    echo "$unexpected_ports" | while read -r line; do
      log_message "   $line"
    done
    ((security_issues++))
  else
    log_message "✅ No unexpected network connections found"
  fi
  
  return $security_issues
}

check_process_security() {
  log_message "⚙️ Checking OpenClaw process security..."
  
  local security_issues=0
  
  # Check for suspicious OpenClaw processes
  local suspicious_processes=$(ps aux | grep -E "(openclaw|clawdbot)" | grep -E "(sh|bash|python|perl|nc|netcat|curl|wget)" | grep -v grep)
  if [ -n "$suspicious_processes" ]; then
    log_message "❌ Suspicious OpenClaw processes detected:"
    echo "$suspicious_processes" | while read -r line; do
      log_message "   $line"
    done
    ((security_issues++))
  else
    log_message "✅ No suspicious OpenClaw processes found"
  fi
  
  # Check for debugging attempts
  local debug_attempts=$(ps aux | grep -E "(gdb|lldb|strace|dtruss)" | grep -E "(openclaw|clawdbot)" | grep -v grep)
  if [ -n "$debug_attempts" ]; then
    log_message "❌ Debugging attempts detected:"
    echo "$debug_attempts" | while read -r line; do
      log_message "   $line"
    done
    ((security_issues++))
  else
    log_message "✅ No debugging attempts found"
  fi
  
  return $security_issues
}

check_file_integrity() {
  log_message "📋 Checking OpenClaw file integrity..."
  
  local security_issues=0
  
  # Check for modified OpenClaw binaries
  if command -v openclaw >/dev/null 2>&1; then
    local openclaw_path=$(which openclaw)
    if [ -f "$openclaw_path" ]; then
      # Check if binary is executable by owner only
      local bin_perms=$(stat -f "%A" "$openclaw_path")
      if [ "$bin_perms" != "755" ] && [ "$bin_perms" != "700" ]; then
        log_message "❌ OpenClaw binary has unusual permissions: $bin_perms"
        ((security_issues++))
      else
        log_message "✅ OpenClaw binary permissions are normal"
      fi
    fi
  fi
  
  # Check for modified configuration files
  local config_files=(
    "$HOME/.clawdbot/config.json"
    "$HOME/.openclaw/config.json"
    "$HOME/.config/openclaw/config.json"
  )
  
  for config_file in "${config_files[@]}"; do
    if [ -f "$config_file" ]; then
      local config_perms=$(stat -f "%A" "$config_file")
      if [ "$config_perms" != "600" ] && [ "$config_perms" != "644" ]; then
        log_message "❌ Config file has unusual permissions: $config_file ($config_perms)"
        ((security_issues++))
      fi
    fi
  done
  
  return $security_issues
}

check_keychain_security() {
  log_message "🔑 Checking OpenClaw Keychain security..."
  
  local security_issues=0
  
  # Check if OpenClaw credentials are stored in Keychain
  local keychain_creds=(
    "discord_token"
    "anthropic_api_key"
    "twilio_auth_token"
    "twilio_account_sid"
  )
  
  local keychain_count=0
  for cred in "${keychain_creds[@]}"; do
    if security find-generic-password -a "openclaw" -s "$cred" -g >/dev/null 2>&1; then
      ((keychain_count++))
    fi
  done
  
  if [ "$keychain_count" -gt 0 ]; then
    log_message "✅ Found $keychain_count OpenClaw credentials in Keychain"
  else
    log_message "⚠️ No OpenClaw credentials found in Keychain (may be using other storage)"
  fi
  
  # Check for Keychain access
  local recent_access=$(log show --predicate 'subsystem == "com.apple.security"' --last 1m | grep -i "openclaw\|clawdbot" | grep -i "keychain" | wc -l)
  if [ "$recent_access" -gt 0 ]; then
    log_message "📊 Recent Keychain access events: $recent_access"
  fi
  
  return $security_issues
}

main() {
  log_message "🚀 Starting OpenClaw security lint..."
  
  local total_issues=0
  
  # Run all security checks
  check_credential_security
  ((total_issues+=$?))
  
  check_network_security
  ((total_issues+=$?))
  
  check_process_security
  ((total_issues+=$?))
  
  check_file_integrity
  ((total_issues+=$?))
  
  check_keychain_security
  ((total_issues+=$?))
  
  # Summary
  log_message "📊 Security lint completed with $total_issues issues found"
  
  if [ "$total_issues" -eq 0 ]; then
    log_message "🎉 OpenClaw security lint passed - no issues found!"
    exit 0
  else
    log_message "⚠️ OpenClaw security lint failed - $total_issues issues found"
    log_message "📋 Review the log above for details on each issue"
    exit 1
  fi
}

# Run main function
main "$@"
