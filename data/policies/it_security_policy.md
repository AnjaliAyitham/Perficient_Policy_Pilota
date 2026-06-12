# Perficient IT Security Policy

**Effective Date:** January 1, 2024  
**Last Updated:** April 1, 2024  
**Policy Owner:** Chief Information Security Officer (CISO)  
**Applies To:** All Perficient employees, contractors, and third-party vendors with access to Perficient systems

---

## 1. Purpose and Scope

This policy establishes the security requirements for all information technology resources owned, operated, or managed by Perficient, Inc. Compliance is mandatory for all personnel who access Perficient systems, networks, or data.

---

## 2. Password and Authentication

### 2.1 Password Requirements
All passwords must meet the following minimum standards:
- Minimum 14 characters in length
- Must contain at least one uppercase letter, one lowercase letter, one number, and one special character
- Cannot reuse any of the last 12 passwords
- Must be changed every 90 days
- Cannot contain the user's name, username, or common dictionary words

### 2.2 Multi-Factor Authentication (MFA)
MFA is required for:
- All VPN connections
- Access to email and collaboration tools (Microsoft 365)
- Access to client environments
- Administrative access to any system
- Access to source code repositories

Approved MFA methods: Microsoft Authenticator app, hardware security keys (FIDO2). SMS-based MFA is not permitted.

### 2.3 Single Sign-On (SSO)
All SaaS applications must be integrated with Perficient's Okta SSO platform. Applications that do not support SSO require CISO approval and must use unique, complex passwords stored in the approved password manager (1Password).

---

## 3. Device Management

### 3.1 Company-Issued Devices
All company laptops are managed through Microsoft Intune and must have:
- Full-disk encryption (BitLocker for Windows, FileVault for macOS)
- Endpoint Detection and Response (EDR) agent installed
- Automatic OS updates enabled
- Screen lock after 5 minutes of inactivity
- Company-approved antivirus software

### 3.2 Personal Devices (BYOD)
Personal devices may access company email and Teams only if enrolled in Intune Mobile Device Management. BYOD devices must have:
- Device passcode/biometric lock enabled
- Remote wipe capability accepted
- Latest OS version installed
- No jailbroken or rooted devices

### 3.3 Lost or Stolen Devices
Report lost or stolen devices immediately to the IT Service Desk (servicedesk@perficient.com or ext. 4357). IT will remotely wipe the device within 1 hour of report. Delayed reporting may result in disciplinary action.

---

## 4. Network Security

### 4.1 VPN Usage
The Perficient VPN (GlobalProtect) must be used when:
- Connecting from any network outside Perficient offices
- Accessing client environments
- Accessing internal applications (Jira, Confluence, internal wikis)

Split-tunneling is disabled. All traffic routes through the VPN when connected.

### 4.2 Public Wi-Fi
Employees must use the VPN when connecting to public Wi-Fi networks (hotels, airports, coffee shops). Direct access to company resources over public Wi-Fi without VPN is prohibited.

### 4.3 Home Network Requirements
Employees working from home should:
- Use WPA3 or WPA2 encryption on home Wi-Fi
- Change default router admin passwords
- Keep router firmware updated
- Separate work devices from IoT devices (use guest network for smart home devices)

---

## 5. Data Classification and Handling

### 5.1 Data Classification Levels

| Level | Description | Examples |
|-------|-------------|----------|
| **Public** | Information approved for public release | Marketing materials, published blog posts |
| **Internal** | General business information | Internal memos, org charts, meeting notes |
| **Confidential** | Sensitive business or client data | Client contracts, financial data, source code |
| **Restricted** | Highly sensitive data requiring strictest controls | PII, PHI, payment card data, credentials |

### 5.2 Handling Requirements

**Confidential and Restricted Data:**
- Must be encrypted in transit (TLS 1.2+) and at rest (AES-256)
- Must not be stored on personal devices or unauthorized cloud services
- Must not be shared via personal email or unauthorized file-sharing platforms
- Must be disposed of securely (digital: secure delete; physical: cross-cut shredding)

### 5.3 Approved Tools for Data Sharing
- Internal: Microsoft Teams, SharePoint, OneDrive for Business
- Client collaboration: Microsoft Teams (guest access), approved client portals
- Prohibited: Personal Gmail, Dropbox, WeTransfer, USB drives (without encryption and approval)

---

## 6. Acceptable Use

### 6.1 General Principles
Company technology resources are provided for business purposes. Limited personal use is permitted provided it does not interfere with work duties, consume excessive bandwidth, or violate any other policy.

### 6.2 Prohibited Activities
The following are strictly prohibited on company systems:
- Downloading or distributing pirated software, music, or movies
- Accessing, downloading, or distributing pornographic material
- Cryptocurrency mining
- Running unauthorized servers or services
- Attempting to bypass security controls
- Accessing systems or data without authorization
- Installing unauthorized software without IT approval

### 6.3 Software Installation
All software must be installed through the Perficient Software Center (managed by IT). Requests for software not in the catalog should be submitted through the IT Service Desk. Shadow IT (unauthorized SaaS tools) is prohibited.

---

## 7. Email Security

### 7.1 Phishing Awareness
Employees must exercise caution with email:
- Do not click links or open attachments from unknown senders
- Verify unexpected requests for sensitive information through a separate communication channel
- Report suspicious emails using the "Report Phishing" button in Outlook
- IT Security conducts monthly phishing simulations; employees who fail 3 consecutive tests must complete additional security training

### 7.2 Email Encryption
Emails containing Confidential or Restricted data must be encrypted using Microsoft 365 Message Encryption. Apply the "Encrypt" sensitivity label before sending.

### 7.3 External Email
An "[EXTERNAL]" banner is automatically added to emails from outside the organization. Exercise additional caution with external emails, especially those requesting urgent action or financial transactions.

---

## 8. Incident Reporting

### 8.1 What to Report
Report any suspected or confirmed security incident including:
- Suspected phishing or social engineering attempts
- Unauthorized access to systems or data
- Lost or stolen devices
- Malware infections
- Data breaches or unauthorized data exposure
- Physical security breaches

### 8.2 How to Report
- **Immediate:** Email security@perficient.com or call the Security Operations Center at ext. 9111
- **Non-urgent:** Submit a ticket through the IT Service Desk portal
- All incidents are tracked and investigated within 4 hours of report

### 8.3 Incident Response
The Security Operations team follows a structured incident response process:
1. Detection and reporting
2. Triage and classification (Critical/High/Medium/Low)
3. Containment
4. Eradication
5. Recovery
6. Post-incident review and lessons learned

---

## 9. Compliance and Training

### 9.1 Mandatory Training
All employees must complete:
- Annual Security Awareness Training (due by March 31 each year)
- Quarterly phishing simulation assessments
- Role-specific training (developers: secure coding; admins: privileged access management)

### 9.2 Non-Compliance
Violations of this policy may result in:
- First offense: Mandatory additional security training
- Second offense: Written warning and manager notification
- Third offense or severe violation: Suspension of system access and potential termination
- Intentional or malicious violations: Immediate termination and potential legal action

---

## 10. Third-Party and Vendor Security

### 10.1 Vendor Assessment
All third-party vendors with access to Perficient data or systems must complete a security assessment before engagement. Assessments include SOC 2 Type II review, penetration test results, and data processing agreements.

### 10.2 Vendor Access
Vendor access is provisioned on a least-privilege basis with:
- Time-limited accounts (maximum 90-day renewal cycle)
- MFA required
- Activity logging enabled
- Access reviewed quarterly

---

## 11. Cloud Security

### 11.1 Approved Cloud Platforms
- Microsoft Azure (primary)
- Amazon Web Services (client projects with approval)
- Google Cloud Platform (client projects with approval)

### 11.2 Cloud Security Requirements
All cloud deployments must:
- Use infrastructure-as-code (Terraform/ARM templates)
- Enable audit logging (CloudTrail, Azure Monitor)
- Encrypt data at rest and in transit
- Follow the Perficient Cloud Security Baseline document
- Pass security review before production deployment
