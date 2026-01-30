#!/bin/bash
# OpenClaw Credential Scanner Script
# Part of HUMMBL-Agent OpenClaw security extensions

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/var/log/openclaw-credential-scan.log"
REPORT_FILE="/tmp/openclaw-credential-report-$(date +%Y%m%d_%H%M%S).md"

# Ensure log directory exists
sudo mkdir -p "$(dirname "$LOG_FILE")"
sudo touch "$LOG_FILE"
sudo chown "$(whoami):staff" "$LOG_FILE"

log_message() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Initialize report
cat > "$REPORT_FILE" << EOF
# OpenClaw Credential Security Report

**Generated:** $(date)  
**Scanner:** HUMMBL-Agent OpenClaw Security Extensions  
**Version:** 1.0.0

---

EOF

scan_credential_storage() {
  log_message "🔍 Scanning OpenClaw credential storage..."
  
  echo "## 🔍 Credential Storage Analysis" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local issues_found=0
  
  # Scan ~/.clawdbot/ directory
  if [ -d "$HOME/.clawdbot" ]; then
    echo "### 📁 ~/.clawdbot/ Directory Found" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    
    # Directory permissions
    local dir_perms=$(stat -f "%A" "$HOME/.clawdbot")
    echo "- **Directory Permissions:** \`$dir_perms\`" >> "$REPORT_FILE"
    if [ "$dir_perms" != "700" ]; then
      echo "  - ⚠️ **Issue:** Should be \`700\` (private)" >> "$REPORT_FILE"
      ((issues_found++))
    else
      echo "  - ✅ **Secure:** Proper permissions" >> "$REPORT_FILE"
    fi
    echo "" >> "$REPORT_FILE"
    
    # File analysis
    echo "### 📄 Files in ~/.clawdbot/" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "| File | Permissions | Size | Issues |" >> "$REPORT_FILE"
    echo "|------|-------------|------|--------|" >> "$REPORT_FILE"
    
    while IFS= read -r -d '' file; do
      local filename=$(basename "$file")
      local file_perms=$(stat -f "%A" "$file")
      local file_size=$(stat -f "%z" "$file")
      local file_issues=""
      
      if [ "$file_perms" != "600" ]; then
        file_issues="Permissions should be 600"
        ((issues_found++))
      fi
      
      # Check for plaintext secrets
      if grep -q -E "(api[_-]?key|password|secret|token)" "$file" 2>/dev/null; then
        if [ -n "$file_issues" ]; then
          file_issues="$file_issues; Plaintext secrets"
        else
          file_issues="Plaintext secrets"
        fi
        ((issues_found++))
      fi
      
      echo "| \`$filename\` | \`$file_perms\` | $file_size bytes | $file_issues |" >> "$REPORT_FILE"
    done < <(find "$HOME/.clawdbot" -type f -print0 2>/dev/null)
    echo "" >> "$REPORT_FILE"
    
  else
    echo "### ✅ ~/.clawdbot/ Directory Not Found" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "No OpenClaw credential directory detected." >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
  fi
  
  # Scan OAuth files
  echo "### 🔑 OAuth Files" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local oauth_files_found=0
  while IFS= read -r -d '' oauth_file; do
    ((oauth_files_found++))
    local filename=$(basename "$oauth_file")
    local file_size=$(stat -f "%z" "$oauth_file")
    local file_type=$(file "$oauth_file")
    
    echo "- **File:** \`$filename\`" >> "$REPORT_FILE"
    echo "  - **Size:** $file_size bytes" >> "$REPORT_FILE"
    echo "  - **Type:** $file_type" >> "$REPORT_FILE"
    
    if echo "$file_type" | grep -q "encrypted"; then
      echo "  - ✅ **Status:** Encrypted" >> "$REPORT_FILE"
    else
      echo "  - ❌ **Status:** Not encrypted" >> "$REPORT_FILE"
      ((issues_found++))
    fi
    echo "" >> "$REPORT_FILE"
  done < <(find "$HOME" -name "oauth.json" -print0 2>/dev/null)
  
  if [ "$oauth_files_found" -eq 0 ]; then
    echo "No OAuth files found." >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
  fi
  
  return $issues_found
}

scan_environment_files() {
  log_message "🌍 Scanning environment files for OpenClaw credentials..."
  
  echo "## 🌍 Environment File Analysis" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local issues_found=0
  
  # Find .env files
  local env_files=(
    "$HOME/.env"
    "$HOME/.env.local"
    "$HOME/.env.development"
    "$HOME/.env.production"
  )
  
  echo "### 📄 Environment Files" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "| File | OpenClaw References | Issues |" >> "$REPORT_FILE"
  echo "|------|-------------------|--------|" >> "$REPORT_FILE"
  
  for env_file in "${env_files[@]}"; do
    if [ -f "$env_file" ]; then
      local filename=$(basename "$env_file")
      local openclaw_refs=""
      local file_issues=""
      
      # Check for OpenClaw references
      if grep -q -E "(claw|openclaw)" "$env_file" 2>/dev/null; then
        openclaw_refs="Found"
        
        # Check for credentials
        if grep -q -E "(api[_-]?key|password|secret|token)" "$env_file" 2>/dev/null; then
          file_issues="Contains credentials"
          ((issues_found++))
        fi
      fi
      
      echo "| \`$filename\` | $openclaw_refs | $file_issues |" >> "$REPORT_FILE"
    fi
  done
  
  echo "" >> "$REPORT_FILE"
  
  # Scan for OpenClaw-specific environment variables
  echo "### 🔍 OpenClaw Environment Variables" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local openclaw_vars=(
    "OPENCLAW_"
    "CLAWDBOT_"
    "DISCORD_TOKEN"
    "TWILIO_"
    "ANTHROPIC_API_KEY"
  )
  
  local vars_found=0
  for var in "${openclaw_vars[@]}"; do
    if env | grep -q "^$var"; then
      ((vars_found++))
      echo "- \`$var\*: Set (potentially sensitive)" >> "$REPORT_FILE"
      ((issues_found++))
    fi
  done
  
  if [ "$vars_found" -eq 0 ]; then
    echo "No OpenClaw environment variables found." >> "$REPORT_FILE"
  fi
  
  echo "" >> "$REPORT_FILE"
  
  return $issues_found
}

scan_keychain_storage() {
  log_message "🔑 Scanning macOS Keychain for OpenClaw credentials..."
  
  echo "## 🔑 Keychain Analysis" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local issues_found=0
  
  # Check for OpenClaw credentials in Keychain
  local keychain_creds=(
    "discord_token"
    "anthropic_api_key"
    "twilio_auth_token"
    "twilio_account_sid"
    "openclaw_"
    "clawdbot_"
  )
  
  echo "### 🔐 Stored Credentials" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "| Service | Account | Status |" >> "$REPORT_FILE"
  echo "|---------|--------|--------|" >> "$REPORT_FILE"
  
  local keychain_count=0
  for cred in "${keychain_creds[@]}"; do
    if security find-generic-password -a "openclaw" -s "$cred" -g >/dev/null 2>&1; then
      ((keychain_count++))
      echo "| \`$cred\` | \`openclaw\` | ✅ Stored |" >> "$REPORT_FILE"
    elif security find-generic-password -s "$cred" -g >/dev/null 2>&1; then
      ((keychain_count++))
      local account=$(security find-generic-password -s "$cred" -g 2>/dev/null | grep "account:" | cut -d'"' -f2 || echo "unknown")
      echo "| \`$cred\` | \`$account\` | ✅ Stored |" >> "$REPORT_FILE"
    fi
  done
  
  if [ "$keychain_count" -eq 0 ]; then
    echo "| *No OpenClaw credentials found* | - | ⚠️ Not stored |" >> "$REPORT_FILE"
    ((issues_found++))
  fi
  
  echo "" >> "$REPORT_FILE"
  
  # Check Keychain access logs
  echo "### 📊 Recent Keychain Access" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local recent_access=$(log show --predicate 'subsystem == "com.apple.security"' --last 1h | grep -i "openclaw\|clawdbot" | grep -i "keychain" | wc -l)
  echo "- **Recent access events (1h):** $recent_access" >> "$REPORT_FILE"
  
  if [ "$recent_access" -gt 5 ]; then
    echo "- ⚠️ **High access frequency - investigate**" >> "$REPORT_FILE"
    ((issues_found++))
  fi
  
  echo "" >> "$REPORT_FILE"
  
  return $issues_found
}

scan_process_memory() {
  log_message "🧠 Scanning process memory for credential exposure..."
  
  echo "## 🧠 Process Memory Analysis" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local issues_found=0
  
  # Check OpenClaw processes
  echo "### 🔄 Running OpenClaw Processes" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local openclaw_processes=$(ps aux | grep -E "(openclaw|clawdbot)" | grep -v grep)
  if [ -n "$openclaw_processes" ]; then
    echo "$openclaw_processes" | while IFS= read -r line; do
      local pid=$(echo "$line" | awk '{print $2}')
      local cmd=$(echo "$line" | awk '{print $11}')
      local args=$(echo "$line" | cut -d' ' -f12-)
      
      echo "- **PID:** $pid" >> "$REPORT_FILE"
      echo "  - **Command:** \`$cmd $args\`" >> "$REPORT_FILE"
      
      # Check for credentials in command line arguments
      if echo "$args" | grep -q -E "(api[_-]?key|password|secret|token)"; then
        echo "  - ❌ **Issue:** Credentials in command line!" >> "$REPORT_FILE"
        ((issues_found++))
      else
        echo "  - ✅ **Status:** No credentials in command line" >> "$REPORT_FILE"
      fi
      echo "" >> "$REPORT_FILE"
    done
  else
    echo "No OpenClaw processes currently running." >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
  fi
  
  # Check for suspicious processes accessing OpenClaw files
  echo "### 🔍 File Access Monitoring" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  local suspicious_access=$(lsof +D "$HOME/.clawdbot" 2>/dev/null | grep -v "PID" | grep -E "(cat|less|more|vim|nano|emacs)" || true)
  if [ -n "$suspicious_access" ]; then
    echo "❌ **Suspicious file access detected:**" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "\`\`\`" >> "$REPORT_FILE"
    echo "$suspicious_access" >> "$REPORT_FILE"
    echo "\`\`\`" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    ((issues_found++))
  else
    echo "✅ No suspicious file access detected." >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
  fi
  
  return $issues_found
}

generate_recommendations() {
  local total_issues="$1"
  
  echo "## 📋 Security Recommendations" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  
  if [ "$total_issues" -eq 0 ]; then
    echo "🎉 **Excellent!** No security issues found with OpenClaw credentials." >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "### ✅ Best Practices Already Implemented:" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "- Credentials properly stored and encrypted" >> "$REPORT_FILE"
    echo "- File permissions are secure" >> "$REPORT_FILE"
    echo "- No plaintext secrets detected" >> "$REPORT_FILE"
    echo "- Keychain integration active" >> "$REPORT_FILE"
  else
    echo "⚠️ **Security Issues Found:** $total_issues issues require attention" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "### 🚨 Immediate Actions Required:" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "1. **Encrypt all plaintext credentials**" >> "$REPORT_FILE"
    echo "2. **Fix file permissions** (use \`chmod 600\` for files, \`chmod 700\` for directories)" >> "$REPORT_FILE"
    echo "3. **Move credentials to macOS Keychain**" >> "$REPORT_FILE"
    echo "4. **Remove credentials from environment variables**" >> "$REPORT_FILE"
    echo "5. **Enable FileVault for full-disk encryption**" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "### 🔧 Recommended Commands:" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "\`\`\`bash" >> "$REPORT_FILE"
    echo "# Fix file permissions" >> "$REPORT_FILE"
    echo "chmod 700 ~/.clawdbot/" >> "$REPORT_FILE"
    echo "chmod 600 ~/.clawdbot/*" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "# Move to Keychain" >> "$REPORT_FILE"
    echo "security add-generic-password -a \"openclaw\" -s \"discord_token\" -w \"\$(cat ~/.clawdbot/discord)\"" >> "$REPORT_FILE"
    echo "" >> "$REPORT_FILE"
    echo "# Enable FileVault" >> "$REPORT_FILE"
    echo "sudo fdesetup enable" >> "$REPORT_FILE"
    echo "\`\`\`" >> "$REPORT_FILE"
  fi
  
  echo "" >> "$REPORT_FILE"
  echo "### 📚 Additional Resources:" >> "$REPORT_FILE"
  echo "" >> "$REPORT_FILE"
  echo "- [OpenClaw Security Documentation](https://docs.openclaw.ai/security)" >> "$REPORT_FILE"
  echo "- [macOS Keychain Services](https://developer.apple.com/documentation/security/keychain_services)" >> "$REPORT_FILE"
  echo "- [FileVault User Guide](https://support.apple.com/guide/mac-help/mh44584/mac)" >> "$REPORT_FILE"
}

main() {
  log_message "🚀 Starting OpenClaw credential scan..."
  
  local total_issues=0
  
  # Run all scans
  scan_credential_storage
  ((total_issues+=$?))
  
  scan_environment_files
  ((total_issues+=$?))
  
  scan_keychain_storage
  ((total_issues+=$?))
  
  scan_process_memory
  ((total_issues+=$?))
  
  # Generate recommendations
  generate_recommendations "$total_issues"
  
  # Add summary
  cat >> "$REPORT_FILE" << EOF

---

## 📊 Scan Summary

- **Total Issues Found:** $total_issues
- **Report Generated:** $(date)
- **Log File:** \`$LOG_FILE\`
- **Scanner Version:** 1.0.0

**Next Steps:** Review the recommendations above and implement the suggested security improvements.

EOF
  
  log_message "📊 Credential scan completed with $total_issues issues found"
  log_message "📄 Report saved to: $REPORT_FILE"
  
  # Display summary
  echo ""
  echo "🔍 OpenClaw Credential Scan Complete"
  echo "====================================="
  echo "Issues Found: $total_issues"
  echo "Report: $REPORT_FILE"
  echo "Log: $LOG_FILE"
  echo ""
  
  if [ "$total_issues" -gt 0 ]; then
    echo "⚠️ Security issues detected - review report for details"
    exit 1
  else
    echo "🎉 No security issues found!"
    exit 0
  fi
}

# Run main function
main "$@"
