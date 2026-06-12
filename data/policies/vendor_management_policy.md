# Perficient Vendor and Third-Party Management Policy

**Effective Date:** January 1, 2024  
**Last Updated:** March 10, 2024  
**Policy Owner:** VP of Procurement & Chief Information Security Officer  
**Applies To:** All Perficient employees who engage, manage, or oversee third-party vendors

---

## 1. Purpose

This policy governs the selection, onboarding, management, and offboarding of third-party vendors and service providers. Effective vendor management protects Perficient from operational, financial, security, and compliance risks.

---

## 2. Vendor Classification

### 2.1 Risk Tiers

| Tier | Criteria | Examples | Review Frequency |
|------|----------|----------|-----------------|
| **Critical** | Access to sensitive data, mission-critical services, or high spend (>$500K/year) | Cloud providers (Azure, AWS), HRIS (Workday), payment processors | Quarterly |
| **High** | Access to internal data or significant operational dependency ($100K-$500K/year) | SaaS tools (Jira, Salesforce), staffing partners, security tools | Semi-annual |
| **Medium** | Limited data access, moderate spend ($25K-$100K/year) | Training platforms, office supplies, marketing tools | Annual |
| **Low** | No data access, minimal spend (<$25K/year) | Catering, event venues, print services | Every 2 years |

---

## 3. Vendor Selection

### 3.1 Competitive Bidding
- Engagements over $50,000 require minimum 3 competitive bids
- Engagements over $250,000 require formal RFP process
- Sole-source justification required for non-competitive selections (VP + Procurement approval)

### 3.2 Evaluation Criteria
Vendors are evaluated on:
- Technical capabilities and fit
- Security posture (SOC 2, ISO 27001, penetration test results)
- Financial stability
- References from comparable clients
- Pricing and total cost of ownership
- Data privacy compliance (GDPR, CCPA readiness)
- Business continuity and disaster recovery capabilities
- Cultural alignment and diversity commitment

### 3.3 Security Assessment
All vendors in Critical and High tiers must complete:
- Security questionnaire (SIG Lite or equivalent)
- SOC 2 Type II report review (or ISO 27001 certificate)
- Data processing impact assessment
- Review of recent penetration test results
- Assessment of incident response capabilities

---

## 4. Contracting

### 4.1 Required Contract Terms
All vendor contracts must include:
- Clear scope of services and deliverables
- Data protection and confidentiality obligations
- Security requirements and incident notification (24-72 hours)
- Right to audit clause
- Termination provisions (for cause and convenience)
- Insurance requirements (cyber liability, professional liability)
- Compliance with applicable laws and regulations
- Subcontractor restrictions and approval requirements

### 4.2 Data Processing Agreements
Vendors processing personal data on behalf of Perficient or its clients must execute a DPA that includes:
- Processing purposes and limitations
- Data retention and deletion obligations
- Cross-border transfer mechanisms (SCCs if applicable)
- Data breach notification requirements
- Data subject rights assistance obligations

### 4.3 Approval Authority

| Contract Value | Approval Required |
|---------------|-------------------|
| Under $25,000 | Manager |
| $25,000 - $100,000 | Director + Procurement |
| $100,000 - $500,000 | VP + Procurement + Legal |
| Over $500,000 | CFO + Legal + CISO (if data access) |

---

## 5. Vendor Onboarding

### 5.1 Onboarding Checklist
Before a vendor begins work:
- [ ] Contract fully executed and filed
- [ ] Security assessment completed and approved
- [ ] Data processing agreement signed (if applicable)
- [ ] Insurance certificates received and verified
- [ ] Access provisioned per least-privilege principle
- [ ] Vendor contacts added to vendor management system
- [ ] Business continuity plan reviewed
- [ ] Compliance certifications verified

### 5.2 Access Provisioning
- Time-limited accounts (90-day maximum, renewable)
- MFA required for all vendor access
- Dedicated vendor accounts (no shared credentials)
- VPN access only when necessary, with IP restrictions
- Activity logging enabled on all vendor accounts

---

## 6. Ongoing Vendor Management

### 6.1 Performance Monitoring
- Define and track SLAs for all Critical and High vendors
- Monthly performance reviews for Critical vendors
- Quarterly business reviews (QBRs) with vendor leadership
- Track incidents, downtime, and response quality
- Document escalation paths and contacts

### 6.2 Risk Reassessment
- Annual risk tier review for all active vendors
- Trigger-based reassessment for:
  - Data breaches at the vendor
  - Significant changes in services
  - Mergers, acquisitions, or leadership changes
  - New regulatory requirements
  - Financial instability indicators

### 6.3 Compliance Monitoring
- Annual SOC 2 report collection for Critical/High vendors
- Insurance certificate renewal tracking
- Regulatory compliance confirmation (GDPR, HIPAA, PCI)
- Subcontractor change notifications

---

## 7. Vendor Offboarding

### 7.1 Offboarding Triggers
- Contract expiration or non-renewal
- Termination for cause (breach, non-performance)
- Vendor merger/acquisition changing risk profile
- Business decision to consolidate or switch vendors

### 7.2 Offboarding Checklist
- [ ] Formal termination notice per contract terms
- [ ] All Perficient data returned or certified destroyed
- [ ] All vendor access revoked (accounts, VPN, badges)
- [ ] Encryption keys rotated where vendor had access
- [ ] Final invoice reconciliation
- [ ] Knowledge transfer completed (if transitioning services)
- [ ] Post-mortem/lessons learned documented
- [ ] Vendor removed from active vendor registry

---

## 8. Roles and Responsibilities

- **Business Owner:** Manages day-to-day vendor relationship, monitors performance
- **Procurement:** Handles contracting, negotiations, and financial management
- **IT Security:** Conducts security assessments and monitors vendor access
- **Legal:** Reviews contracts, DPAs, and compliance requirements
- **Finance:** Manages payments, budget tracking, and financial risk monitoring
- **Data Privacy:** Oversees DPAs and privacy impact assessments
