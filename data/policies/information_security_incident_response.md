# Perficient Information Security Incident Response Policy

**Effective Date:** January 1, 2024  
**Last Updated:** March 20, 2024  
**Policy Owner:** Chief Information Security Officer  
**Applies To:** All Perficient employees, contractors, and third-party service providers

---

## 1. Purpose

This policy defines Perficient's procedures for detecting, reporting, assessing, and responding to information security incidents. A well-coordinated incident response minimizes damage, reduces recovery time, and protects client and company data.

---

## 2. Incident Classification

### 2.1 Severity Levels

| Severity | Description | Response Time | Examples |
|----------|-------------|---------------|----------|
| **Critical (P1)** | Active breach, data exfiltration, or business-critical system down | 15 minutes | Ransomware, confirmed data breach, production outage |
| **High (P2)** | Significant security threat with potential for escalation | 1 hour | Compromised account, malware detected, unauthorized access attempt |
| **Medium (P3)** | Security concern requiring investigation | 4 hours | Phishing attack reported, policy violation detected, suspicious activity |
| **Low (P4)** | Minor security event, no immediate threat | 24 hours | Failed login attempts, minor policy violation, vulnerability scan finding |

### 2.2 Incident Categories
- **Malware/Ransomware:** Infection of systems with malicious software
- **Unauthorized Access:** Access to systems or data without proper authorization
- **Data Breach:** Confirmed unauthorized disclosure of sensitive data
- **Denial of Service:** Attack disrupting system availability
- **Insider Threat:** Malicious or negligent action by an employee/contractor
- **Physical Security:** Unauthorized physical access to facilities or equipment
- **Social Engineering:** Phishing, pretexting, or other manipulation tactics
- **Supply Chain:** Compromise through a third-party vendor or software

---

## 3. Incident Response Team

### 3.1 Core Team Members
- **Incident Commander:** CISO or designated Security Manager
- **Security Analysts:** SOC team members for investigation and containment
- **IT Operations:** Infrastructure and system administrators
- **Legal Counsel:** For regulatory and contractual obligations
- **Communications:** PR/Marketing for external communications
- **HR:** When the incident involves an employee

### 3.2 Extended Team (Activated as needed)
- Executive Leadership (CEO, CFO for Critical incidents)
- Client Account Managers (when client data is involved)
- External forensics firm (pre-contracted: CrowdStrike)
- Law enforcement liaison
- Cyber insurance provider

---

## 4. Incident Response Phases

### 4.1 Phase 1: Detection and Reporting
**Who reports:** Any Perficient employee who observes suspicious activity  
**How to report:**
- Email: security@perficient.com (monitored 24/7)
- Phone: Security Operations Center ext. 9111
- Slack: #security-incidents (urgent only)
- Self-service: IT Service Desk portal → Security Incident

**Information to provide:**
- What happened (describe the event)
- When it was observed
- Systems or data potentially affected
- Actions already taken
- Contact information for follow-up

### 4.2 Phase 2: Triage and Assessment
Within the response time window:
1. SOC analyst reviews and classifies the incident
2. Assign severity level and category
3. Notify Incident Commander if P1 or P2
4. Begin evidence preservation (logs, screenshots, memory dumps)
5. Activate appropriate team members

### 4.3 Phase 3: Containment
**Short-term containment (immediate):**
- Isolate affected systems from the network
- Disable compromised accounts
- Block malicious IPs/domains
- Preserve forensic evidence before changes

**Long-term containment:**
- Apply temporary patches or workarounds
- Redirect traffic if needed
- Set up enhanced monitoring on affected systems
- Implement additional access controls

### 4.4 Phase 4: Eradication
- Remove malware and unauthorized access mechanisms
- Patch exploited vulnerabilities
- Reset compromised credentials
- Rebuild affected systems from known-good images
- Verify removal is complete through scanning

### 4.5 Phase 5: Recovery
- Restore systems to normal operation
- Monitor for re-infection or recurring indicators
- Gradually remove containment measures
- Validate system integrity before returning to production
- Communicate restoration to affected parties

### 4.6 Phase 6: Post-Incident Review
Within 5 business days of incident closure:
- Root cause analysis document
- Timeline reconstruction
- Lessons learned meeting with all responders
- Action items for prevention (assigned owners and deadlines)
- Metrics update (MTTD, MTTR, impact assessment)
- Client notification completion verification

---

## 5. Communication Protocols

### 5.1 Internal Communication
- P1/P2: War room established (Teams channel or physical room)
- Status updates every 30 minutes during active response
- Executive briefing at 1-hour and 4-hour marks for P1
- All communications marked as Confidential

### 5.2 Client Communication
- Account Manager notified immediately if client data is involved
- Client notification per DPA terms (typically within 24-72 hours)
- Written incident summary provided within 5 business days
- Follow-up remediation plan within 10 business days

### 5.3 Regulatory Notification
- GDPR: Supervisory authority within 72 hours (if personal data breach)
- State breach notification laws: Varies by state (tracked by Legal)
- SEC disclosure: For material cybersecurity incidents (per new SEC rules)
- Industry-specific: HIPAA (60 days), PCI DSS (immediately)

### 5.4 Media/Public Communication
- All media inquiries directed to Communications team
- No employee may discuss incidents publicly without Legal approval
- Prepared statement templates maintained for common scenarios
- Social media monitoring during active incidents

---

## 6. Evidence Handling

### 6.1 Chain of Custody
All evidence must maintain documented chain of custody:
- Who collected it, when, and how
- Where it is stored
- Who has accessed it
- Hash values for digital evidence (SHA-256)

### 6.2 Preservation
- Do NOT shut down compromised systems (risk of evidence loss)
- Capture memory dumps before disk imaging
- Preserve all relevant logs (system, network, application, security)
- Screenshot any transient evidence
- Document everything in the incident timeline

### 6.3 Storage
- Evidence stored in locked, access-controlled evidence locker (physical)
- Digital evidence on write-protected, encrypted storage
- Retention: Minimum 7 years or per legal hold requirements

---

## 7. Business Continuity

### 7.1 Critical System Recovery Priorities
1. Authentication and access management systems (Okta, AD)
2. Email and communication platforms (M365, Teams)
3. Client-facing production systems
4. Source code repositories
5. Financial systems
6. Internal business applications

### 7.2 Backup and Recovery
- All critical systems backed up daily (RPO: 24 hours or less)
- Recovery Time Objective (RTO): 4 hours for P1 systems
- Backup integrity testing: Monthly
- Disaster recovery drills: Annually

---

## 8. Training and Exercises

### 8.1 Training Requirements
- All employees: Annual incident reporting awareness
- IT staff: Incident response procedures (semi-annual)
- SOC team: Advanced incident handling (quarterly)
- Leadership: Crisis communication and decision-making (annual)

### 8.2 Exercises
- **Tabletop exercises:** Quarterly (scenario-based discussion)
- **Red team exercises:** Semi-annual (simulated attack)
- **Full DR drill:** Annual (complete failover test)
- After-action reports from all exercises feed into policy improvements
